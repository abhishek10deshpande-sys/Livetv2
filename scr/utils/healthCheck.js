'use strict';

const axios = require('axios');
const NodeCache = require('node-cache');
const logger = require('./logger');

// Cache health results for 5 minutes
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

const HEALTH_TIMEOUT_MS = 6000;

/**
 * Check whether a stream URL is reachable by sending a HEAD request.
 * Falls back to a partial GET if HEAD is not supported.
 *
 * @param {string} url
 * @returns {Promise<boolean>}
 */
const checkStreamHealth = async (url) => {
  if (!url) return false;

  const cached = cache.get(url);
  if (cached !== undefined) return cached;

  let healthy = false;

  try {
    const resp = await axios.head(url, {
      timeout: HEALTH_TIMEOUT_MS,
      maxRedirects: 5,
      validateStatus: (s) => s < 500  // 2xx, 3xx, 4xx (some streams return 403 to HEAD but work fine)
    });
    healthy = resp.status < 500;
  } catch {
    // HEAD failed — try a range GET for the first 256 bytes
    try {
      const resp = await axios.get(url, {
        timeout: HEALTH_TIMEOUT_MS,
        maxRedirects: 5,
        responseType: 'stream',
        headers: { Range: 'bytes=0-255' },
        validateStatus: (s) => s < 500
      });
      // Close the stream immediately
      resp.data.destroy();
      healthy = resp.status < 500;
    } catch {
      healthy = false;
    }
  }

  cache.set(url, healthy);
  logger.debug(`Health ${healthy ? '✅' : '❌'} ${url}`);
  return healthy;
};

/**
 * Run health checks on all channels and log summary.
 * Called by the cron job.
 */
const runFullHealthCheck = async (channels) => {
  logger.info(`Starting full health check on ${channels.length} channels…`);
  let ok = 0;
  let fail = 0;

  const tasks = channels.map(async (ch) => {
    for (const s of ch.streams || []) {
      const healthy = await checkStreamHealth(s.url);
      healthy ? ok++ : fail++;
    }
  });

  await Promise.allSettled(tasks);
  logger.info(`Health check complete: ${ok} healthy, ${fail} unhealthy`);
  return { ok, fail };
};

module.exports = { checkStreamHealth, runFullHealthCheck };
