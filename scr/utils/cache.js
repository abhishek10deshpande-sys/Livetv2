'use strict';

const NodeCache = require('node-cache');

// General-purpose response cache (2 minutes TTL)
const responseCache = new NodeCache({
  stdTTL:      120,
  checkperiod: 30,
  useClones:   false
});

const get = (key) => responseCache.get(key);
const set = (key, value, ttl) => {
  if (ttl !== undefined) {
    responseCache.set(key, value, ttl);
  } else {
    responseCache.set(key, value);
  }
};
const del = (key) => responseCache.del(key);
const flush = () => responseCache.flushAll();
const stats = () => responseCache.getStats();

module.exports = { get, set, del, flush, stats };
