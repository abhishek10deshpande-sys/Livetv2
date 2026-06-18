'use strict';

const axios = require('axios');
const xml2js = require('xml2js');
const NodeCache = require('node-cache');
const logger = require('../utils/logger');

// Cache EPG data for 30 minutes
const epgCache = new NodeCache({ stdTTL: 1800, checkperiod: 300 });

// Public EPG sources (XMLTV format)
const EPG_SOURCES = [
  'https://epgshare01.online/epgshare01/epg_ripper_ALL_SOURCES1.xml.gz',
  'https://i.mjh.nz/all/epg.xml.gz',
  'https://raw.githubusercontent.com/iptv-org/epg/gh-pages/guides/us/tvtv.us.epg.xml'
];

// In-memory EPG store (populated on first load)
let epgStore = {}; // { channelId: [ { title, start, stop, description } ] }
let lastFetch = null;
const FETCH_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Parse XMLTV XML and populate epgStore.
 */
const parseXmltv = async (xmlData) => {
  const parser = new xml2js.Parser({ explicitArray: true, mergeAttrs: true });
  try {
    const result = await parser.parseStringPromise(xmlData);
    const programmes = result?.tv?.programme || [];

    programmes.forEach((prog) => {
      const channelId = prog.channel?.[0] || prog.channel;
      if (!channelId) return;

      if (!epgStore[channelId]) epgStore[channelId] = [];

      epgStore[channelId].push({
        title:       (prog.title?.[0]?._ || prog.title?.[0] || 'Unknown').trim(),
        start:       parseXmltvDate(prog.start?.[0] || prog.start),
        stop:        parseXmltvDate(prog.stop?.[0]  || prog.stop),
        description: (prog.desc?.[0]?._ || prog.desc?.[0] || '').trim(),
        thumbnail:   prog.icon?.[0]?.src || null
      });
    });

    logger.info(`EPG parsed: ${Object.keys(epgStore).length} channels, ${programmes.length} programmes`);
  } catch (err) {
    logger.warn(`EPG parse error: ${err.message}`);
  }
};

/**
 * Parse XMLTV date string "20231225120000 +0000" → Date
 */
const parseXmltvDate = (str) => {
  if (!str) return null;
  const s = String(str).trim();
  // "YYYYMMDDHHmmss +HHMM" or "YYYYMMDDHHmmss"
  const match = s.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s*([+-]\d{4})?$/);
  if (!match) return null;
  const [, year, month, day, hour, min, sec, tz] = match;
  const iso = `${year}-${month}-${day}T${hour}:${min}:${sec}${tz ? tz.slice(0,3)+':'+tz.slice(3) : 'Z'}`;
  return new Date(iso).getTime();
};

/**
 * Fetch and parse one EPG source (plain XML only — no gunzip in this env).
 */
const fetchEpgSource = async (url) => {
  try {
    const resp = await axios.get(url, {
      timeout: 15000,
      responseType: 'text',
      headers: { 'Accept-Encoding': 'identity' } // avoid gzip in limited env
    });
    if (resp.data && typeof resp.data === 'string') {
      await parseXmltv(resp.data);
      return true;
    }
  } catch (err) {
    logger.warn(`EPG fetch failed (${url}): ${err.message}`);
  }
  return false;
};

/**
 * Bootstrap EPG: try sources in order, stop on first success.
 */
const bootstrapEpg = async () => {
  if (lastFetch && Date.now() - lastFetch < FETCH_INTERVAL_MS) return;

  logger.info('Bootstrapping EPG data…');
  for (const src of EPG_SOURCES) {
    const ok = await fetchEpgSource(src);
    if (ok) break;
  }
  lastFetch = Date.now();
};

// Kick off EPG fetch at startup (non-blocking)
bootstrapEpg().catch(() => {});

/**
 * Get EPG data for a given TVG/EPG channel ID.
 *
 * @param {string} epgId
 * @returns {{ currentShow, nextShow, schedule } | null}
 */
const getEpgForChannel = async (epgId) => {
  const cached = epgCache.get(epgId);
  if (cached) return cached;

  // Ensure EPG is loaded
  await bootstrapEpg();

  const programmes = epgStore[epgId];
  if (!programmes || programmes.length === 0) {
    return null;
  }

  const now = Date.now();

  const currentShow = programmes.find(p =>
    p.start && p.stop && p.start <= now && p.stop >= now
  ) || null;

  const upcoming = programmes
    .filter(p => p.start && p.start > now)
    .sort((a, b) => a.start - b.start);

  const nextShow = upcoming[0] || null;
  const schedule = currentShow ? [currentShow, ...upcoming.slice(0, 19)] : upcoming.slice(0, 20);

  const result = { currentShow, nextShow, schedule };
  epgCache.set(epgId, result);
  return result;
};

module.exports = { getEpgForChannel, bootstrapEpg };
