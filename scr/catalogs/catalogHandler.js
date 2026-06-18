'use strict';

const {
  getAllChannels,
  getChannelsByCategory,
  searchChannels
} = require('./channels');
const logger = require('../utils/logger');

const CATALOG_PAGE_SIZE = 50;

/**
 * Map a catalog ID to a channel category filter.
 * Returns null for "all channels" catalog.
 */
const CATALOG_TO_CATEGORY = {
  fantastic_all:           null,
  fantastic_news:          'News',
  fantastic_sports:        'Sports',
  fantastic_entertainment: 'Entertainment',
  fantastic_music:         'Music',
  fantastic_kids:          'Kids',
  fantastic_education:     'Education',
  fantastic_regional:      'Regional',
  fantastic_international: 'International'
};

/**
 * Convert a channel object to a Stremio meta object (catalog entry).
 */
const channelToMeta = (ch) => ({
  id:          ch.id,
  type:        'tv',
  name:        ch.name,
  poster:      ch.logo || null,
  logo:        ch.logo || null,
  background:  ch.background || ch.logo || null,
  description: ch.description || '',
  genres:      [ch.category],
  country:     ch.country || null,
  language:    ch.language || null,
  website:     ch.website || null,
  posterShape: 'square'
});

/**
 * Handle catalog requests.
 *
 * @param {string} catalogId  - one of the catalog IDs from manifest.json
 * @param {object} extra      - extra params: { search, skip, genre }
 * @returns {{ metas: Array }}
 */
const handleCatalog = (catalogId, extra = {}) => {
  logger.debug(`Catalog request: id=${catalogId} extra=${JSON.stringify(extra)}`);

  const skip = parseInt(extra.skip, 10) || 0;

  // ── Search mode ──────────────────────────────────────────────────────────
  if (extra.search) {
    const results = searchChannels(extra.search.trim());
    logger.info(`Search "${extra.search}" → ${results.length} results`);
    return { metas: results.map(channelToMeta) };
  }

  // ── Category-filtered catalog ─────────────────────────────────────────
  const category = CATALOG_TO_CATEGORY[catalogId];
  let channels;

  if (category === undefined) {
    // Unknown catalog ID
    logger.warn(`Unknown catalog id: ${catalogId}`);
    return { metas: [] };
  }

  if (category === null) {
    channels = getAllChannels();
  } else {
    channels = getChannelsByCategory(category);
  }

  // Pagination
  const page = channels.slice(skip, skip + CATALOG_PAGE_SIZE);
  logger.info(`Catalog "${catalogId}" → skip=${skip} returning ${page.length}/${channels.length} channels`);

  return { metas: page.map(channelToMeta) };
};

module.exports = { handleCatalog, channelToMeta };
