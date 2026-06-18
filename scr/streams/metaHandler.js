'use strict';

const { getChannelById } = require('../catalogs/channels');
const { getEpgForChannel } = require('../epg/epgHandler');
const logger = require('../utils/logger');

/**
 * Handle meta requests (detailed channel info).
 * Called when a user clicks on a channel in the catalog.
 *
 * @param {string} type - always 'tv'
 * @param {string} id   - channel ID
 * @returns {{ meta: object } | { meta: null }}
 */
const handleMeta = async (type, id) => {
  logger.debug(`Meta request: type=${type} id=${id}`);

  const channel = getChannelById(id);
  if (!channel) {
    logger.warn(`Meta: unknown channel id=${id}`);
    return { meta: null };
  }

  // Try to enrich with EPG data
  let epgData = null;
  if (channel.epgId) {
    try {
      epgData = await getEpgForChannel(channel.epgId);
    } catch (err) {
      logger.warn(`Meta: EPG fetch failed for ${channel.epgId}: ${err.message}`);
    }
  }

  const meta = {
    id:          channel.id,
    type:        'tv',
    name:        channel.name,
    poster:      channel.logo || null,
    logo:        channel.logo || null,
    background:  channel.background || channel.logo || null,
    description: buildDescription(channel, epgData),
    genres:      [channel.category],
    country:     channel.country || null,
    language:    channel.language || null,
    website:     channel.website || null,
    posterShape: 'square',
    // Videos array represents the "schedule" for a TV channel in Stremio
    videos:      buildVideos(channel, epgData)
  };

  logger.info(`Meta "${channel.name}" → OK${epgData ? ' (with EPG)' : ''}`);
  return { meta };
};

/**
 * Build a description string, optionally including current programme from EPG.
 */
const buildDescription = (channel, epgData) => {
  let desc = channel.description || '';

  if (epgData && epgData.currentShow) {
    desc += `\n\n🎬 Now: ${epgData.currentShow.title}`;
    if (epgData.currentShow.description) {
      desc += ` — ${epgData.currentShow.description}`;
    }
  }

  if (epgData && epgData.nextShow) {
    desc += `\n🔜 Next: ${epgData.nextShow.title}`;
  }

  return desc.trim();
};

/**
 * Build a Stremio videos array from EPG data (upcoming schedule).
 * Returns empty array if no EPG data.
 */
const buildVideos = (channel, epgData) => {
  if (!epgData || !epgData.schedule || epgData.schedule.length === 0) {
    // At minimum, expose a "Live Now" video entry
    return [
      {
        id:        `${channel.id}_live`,
        title:     '🔴 Live Now',
        released:  new Date().toISOString(),
        streams:   [],
        available: true
      }
    ];
  }

  return epgData.schedule.slice(0, 20).map((show, i) => ({
    id:          `${channel.id}_epg_${i}`,
    title:       show.title || 'Unknown',
    released:    show.start ? new Date(show.start).toISOString() : new Date().toISOString(),
    description: show.description || '',
    thumbnail:   show.thumbnail || channel.logo || null,
    available:   true
  }));
};

module.exports = { handleMeta };
