'use strict';

const { getChannelById } = require('../catalogs/channels');
const { checkStreamHealth } = require('../utils/healthCheck');
const logger = require('../utils/logger');
const NodeCache = require('node-cache');

// Cache stream health results for 5 minutes
const healthCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

// Map stream type to Stremio behaviorHints
const TYPE_HINTS = {
  hls:    { notWebReady: false },
  dash:   { notWebReady: false },
  direct: { notWebReady: false }
};

/**
 * Convert a raw stream entry to a Stremio stream object.
 */
const buildStreamObj = (streamEntry, channelName, isHealthy = true) => {
  const obj = {
    name:  `📺 ${channelName}`,
    title: streamEntry.label || streamEntry.quality || 'Live',
    url:   streamEntry.url,
    behaviorHints: {
      ...(TYPE_HINTS[streamEntry.type] || {}),
      bingeGroup: `fantastic_${channelName}`
    }
  };

  if (!isHealthy) {
    obj.title = `⚠️ ${obj.title} (may be offline)`;
  }

  return obj;
};

/**
 * Handle stream requests.
 *
 * @param {string} id  - channel ID from idPrefixes (e.g. "fantastic_al_jazeera_english")
 * @returns {{ streams: Array }}
 */
const handleStream = async (id) => {
  logger.debug(`Stream request: id=${id}`);

  const channel = getChannelById(id);
  if (!channel) {
    logger.warn(`Stream: unknown channel id=${id}`);
    return { streams: [] };
  }

  if (!channel.streams || channel.streams.length === 0) {
    logger.warn(`Stream: no streams configured for id=${id}`);
    return { streams: [] };
  }

  const cacheKey = `health_${id}`;
  let healthResults = healthCache.get(cacheKey);

  if (healthResults === undefined) {
    // Run health checks in parallel with a 6-second timeout
    const checks = channel.streams.map(async (s) => {
      try {
        const healthy = await checkStreamHealth(s.url);
        return { stream: s, healthy };
      } catch {
        return { stream: s, healthy: false };
      }
    });

    healthResults = await Promise.allSettled(checks).then(results =>
      results.map(r => r.status === 'fulfilled' ? r.value : { stream: null, healthy: false })
    );

    healthCache.set(cacheKey, healthResults);
    logger.info(`Health checks for "${channel.name}": ${healthResults.filter(r => r.healthy).length}/${healthResults.length} healthy`);
  }

  // Sort: healthy streams first, then fallbacks
  const sorted = [...healthResults]
    .filter(r => r.stream !== null)
    .sort((a, b) => {
      if (a.healthy && !b.healthy) return -1;
      if (!a.healthy && b.healthy) return 1;
      return 0;
    });

  if (sorted.length === 0) {
    logger.warn(`Stream: all health checks failed for id=${id}`);
    // Return original streams anyway so the user can try
    return {
      streams: channel.streams.map(s => buildStreamObj(s, channel.name, false))
    };
  }

  const streams = sorted.map(({ stream, healthy }) =>
    buildStreamObj(stream, channel.name, healthy)
  );

  logger.info(`Stream "${channel.name}" → returning ${streams.length} stream(s)`);
  return { streams };
};

module.exports = { handleStream };
