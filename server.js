'use strict';

require('dotenv').config();

const express     = require('express');
const cors        = require('cors');
const compression = require('compression');
const helmet      = require('helmet');
const rateLimit   = require('express-rate-limit');
const cron        = require('node-cron');
const path        = require('path');

const logger        = require('./src/utils/logger');
const cache         = require('./src/utils/cache');
const { handleCatalog }  = require('./src/catalogs/catalogHandler');
const { handleStream }   = require('./src/streams/streamHandler');
const { handleMeta }     = require('./src/streams/metaHandler');
const { runFullHealthCheck } = require('./src/utils/healthCheck');
const { getAllChannels }  = require('./src/catalogs/channels');
const { bootstrapEpg }   = require('./src/epg/epgHandler');
const manifest           = require('./manifest.json');

const app  = express();
const PORT = parseInt(process.env.PORT || '7860', 10);
const HOST = process.env.HOST || '0.0.0.0';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// ─────────────────────────────────────────────────────────────────────────────
//  Middleware
// ─────────────────────────────────────────────────────────────────────────────

app.use(helmet({
  contentSecurityPolicy: false,  // Stremio iframe embeds need this off
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(compression());
app.use(express.json());

// Rate limiting — generous for a public addon
const limiter = rateLimit({
  windowMs: 60 * 1000,        // 1 minute
  max:      300,
  standardHeaders: true,
  legacyHeaders:   false,
  message:  { error: 'Too many requests, slow down.' }
});
app.use(limiter);

// Request logging
app.use((req, _res, next) => {
  logger.debug(`${req.method} ${req.path}`);
  next();
});

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Stremio requires CORS headers on every response.
 * This helper sends a JSON response with the right headers.
 */
const sendJson = (res, data) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
};

/**
 * Simple response-level caching middleware factory.
 */
const withCache = (ttl = 120) => (req, res, next) => {
  const key = `resp_${req.path}`;
  const hit = cache.get(key);
  if (hit) {
    res.setHeader('X-Cache', 'HIT');
    return sendJson(res, hit);
  }
  res.locals.cacheKey = key;
  res.locals.cacheTtl = ttl;
  next();
};

const saveCache = (res, data) => {
  if (res.locals.cacheKey) {
    cache.set(res.locals.cacheKey, data, res.locals.cacheTtl);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
//  Routes
// ─────────────────────────────────────────────────────────────────────────────

// ── Static assets ─────────────────────────────────────────────────────────────
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

// ── Landing page ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  const installUrl = `${BASE_URL}/manifest.json`;
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fantastic Live TV — Stremio Addon</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
           background: #0f0f0f; color: #eee; min-height: 100vh;
           display: flex; flex-direction: column; align-items: center;
           justify-content: center; padding: 2rem; }
    .card { background: #1a1a2e; border: 1px solid #2a2a4a; border-radius: 16px;
            padding: 2.5rem; max-width: 560px; width: 100%; text-align: center; }
    h1 { font-size: 2rem; margin-bottom: .5rem; color: #fff; }
    .version { color: #888; font-size: .85rem; margin-bottom: 1.5rem; }
    p { color: #ccc; line-height: 1.6; margin-bottom: 1.5rem; }
    .btn { display: inline-block; background: #7c3aed; color: #fff;
           padding: .75rem 2rem; border-radius: 8px; text-decoration: none;
           font-weight: 600; font-size: 1rem; transition: background .2s; }
    .btn:hover { background: #6d28d9; }
    .url-box { background: #111; border: 1px solid #333; border-radius: 8px;
               padding: .75rem 1rem; font-family: monospace; font-size: .85rem;
               color: #7dd3fc; word-break: break-all; margin-top: 1rem; }
    .channels { margin-top: 2rem; text-align: left; }
    .channels h3 { color: #a78bfa; margin-bottom: .75rem; }
    .cat { display: inline-block; background: #2d2d4e; border-radius: 6px;
           padding: .3rem .7rem; margin: .25rem; font-size: .8rem; }
    footer { margin-top: 1.5rem; color: #555; font-size: .8rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>📺 Fantastic Live TV</h1>
    <div class="version">v${manifest.version}</div>
    <p>${manifest.description}</p>
    <a class="btn" href="stremio://${BASE_URL.replace(/^https?:\/\//, '')}/manifest.json">
      ▶ Install in Stremio
    </a>
    <div class="url-box">${installUrl}</div>
    <div class="channels">
      <h3>📂 Categories</h3>
      ${['News','Sports','Entertainment','Music','Kids','Education','Regional','International']
        .map(c => `<span class="cat">${c}</span>`).join('')}
    </div>
    <footer>
      Free &amp; legal public streams only · ${getAllChannels().length} channels ·
      <a href="/health" style="color:#7dd3fc">Health</a>
    </footer>
  </div>
</body>
</html>`);
});

// ── Manifest ──────────────────────────────────────────────────────────────────
app.get('/manifest.json', (_req, res) => {
  logger.info('Manifest requested');
  sendJson(res, manifest);
});

// ── Catalog ───────────────────────────────────────────────────────────────────
// GET /catalog/{type}/{id}.json
// GET /catalog/{type}/{id}/{extra}.json  (extra = "search=foo&skip=0" etc.)
app.get('/catalog/:type/:id/:extra?.json', withCache(120), (req, res) => {
  const { type, id, extra } = req.params;

  if (type !== 'tv') return sendJson(res, { metas: [] });

  const extraParams = {};
  if (extra) {
    extra.split('&').forEach(part => {
      const [key, ...rest] = part.split('=');
      if (key) extraParams[decodeURIComponent(key)] = decodeURIComponent(rest.join('='));
    });
  }

  const result = handleCatalog(id, extraParams);
  saveCache(res, result);
  sendJson(res, result);
});

// ── Meta ──────────────────────────────────────────────────────────────────────
// GET /meta/{type}/{id}.json
app.get('/meta/:type/:id.json', withCache(300), async (req, res) => {
  const { type, id } = req.params;
  try {
    const result = await handleMeta(type, id);
    saveCache(res, result);
    sendJson(res, result);
  } catch (err) {
    logger.error(`Meta error: ${err.message}`);
    sendJson(res, { meta: null });
  }
});

// ── Stream ────────────────────────────────────────────────────────────────────
// GET /stream/{type}/{id}.json
app.get('/stream/:type/:id.json', withCache(60), async (req, res) => {
  const { type, id } = req.params;
  if (type !== 'tv') return sendJson(res, { streams: [] });

  try {
    const result = await handleStream(id);
    saveCache(res, result);
    sendJson(res, result);
  } catch (err) {
    logger.error(`Stream error for ${id}: ${err.message}`);
    sendJson(res, { streams: [] });
  }
});

// ── Health endpoint ───────────────────────────────────────────────────────────
app.get('/health', async (_req, res) => {
  const channels  = getAllChannels();
  const cacheInfo = cache.stats();

  sendJson(res, {
    status:    'ok',
    version:   manifest.version,
    channels:  channels.length,
    uptime:    Math.floor(process.uptime()),
    cache:     cacheInfo,
    timestamp: new Date().toISOString()
  });
});

// ── Cache flush (internal) ────────────────────────────────────────────────────
app.post('/admin/flush-cache', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (process.env.ADMIN_TOKEN && token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  cache.flush();
  logger.info('Cache flushed via admin endpoint');
  sendJson(res, { ok: true });
});

// ── 404 catch-all ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Background jobs
// ─────────────────────────────────────────────────────────────────────────────

// Health check all streams every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  logger.info('⏱ Cron: running stream health checks…');
  await runFullHealthCheck(getAllChannels());
});

// Refresh EPG every 30 minutes
cron.schedule('*/30 * * * *', async () => {
  logger.info('⏱ Cron: refreshing EPG…');
  await bootstrapEpg();
});

// ─────────────────────────────────────────────────────────────────────────────
//  Start
// ─────────────────────────────────────────────────────────────────────────────

app.listen(PORT, HOST, async () => {
  logger.info(`🚀 Fantastic Live TV v${manifest.version} running at http://${HOST}:${PORT}`);
  logger.info(`📺 ${getAllChannels().length} channels across 8 categories`);
  logger.info(`📡 Manifest: ${BASE_URL}/manifest.json`);

  // Pre-warm EPG in background
  bootstrapEpg().catch(err => logger.warn(`EPG bootstrap error: ${err.message}`));
});

module.exports = app; // for testing
