# 📺 Fantastic Live TV — Stremio Addon

Free, legal, publicly broadcast live TV channels for [Stremio](https://stremio.com).  
No sign-up. No subscription. No piracy.

---

## ✨ Features

| Feature | Detail |
|---|---|
| **Channels** | 35+ free legal streams |
| **Categories** | News, Sports, Entertainment, Music, Kids, Education, Regional, International |
| **Stream types** | HLS (.m3u8), DASH (.mpd), direct |
| **Search** | Full-text search across all channels |
| **EPG** | Electronic Programme Guide from public XMLTV sources |
| **Health checks** | Auto-tested every 10 min; bad streams pushed to fallback |
| **Caching** | Response and health caches reduce latency |
| **Logging** | Winston logger with configurable level |

---

## 🚀 Quick Install

### Option A — One-click (hosted)
Click the button below (replace with your deployed URL after setup):

```
stremio://YOUR_RENDER_URL/manifest.json
```

Or paste this URL in Stremio → Search → Add Addon:
```
https://YOUR_RENDER_URL/manifest.json
```

### Option B — Run locally
```bash
git clone https://github.com/YOUR_USERNAME/fantastic-live-tv.git
cd fantastic-live-tv
cp .env.example .env        # edit BASE_URL to http://localhost:7860
npm install
npm start
# Then in Stremio, add: http://localhost:7860/manifest.json
```

---

## ☁️ Deploy to Render

### Step 1 — Fork & push to GitHub
```bash
git clone https://github.com/YOUR_USERNAME/fantastic-live-tv.git
cd fantastic-live-tv
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Create a Render Web Service
1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Render auto-detects `render.yaml` — click **Create Web Service**
4. Wait ~2 minutes for the first deploy

### Step 3 — Set BASE_URL
After the first deploy, Render gives you a URL like `https://fantastic-live-tv.onrender.com`.

In the Render dashboard → **Environment** → add:
```
BASE_URL = https://fantastic-live-tv.onrender.com
```
Then click **Manual Deploy** → **Deploy latest commit**.

### Step 4 — Install in Stremio
```
https://fantastic-live-tv.onrender.com/manifest.json
```

---

## 🔧 GitHub Actions Auto-Deploy

The included workflow (`.github/workflows/deploy.yml`) runs lint + smoke tests on every push, then triggers a Render deploy hook on pushes to `main`.

### Setup
1. In Render dashboard → **Settings** → **Deploy Hook** → copy the URL
2. In GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New secret**:
   - Name: `RENDER_DEPLOY_HOOK`
   - Value: the URL from step 1
3. Every push to `main` now auto-deploys ✅

---

## 📁 Project Structure

```
/
├── server.js                    # Express server + all Stremio routes
├── manifest.json                # Addon manifest (catalogs, resources, types)
├── package.json
├── render.yaml                  # Render deployment config
├── .env.example                 # Environment variable template
├── .gitignore
├── README.md
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI + auto-deploy
└── src/
    ├── catalogs/
    │   ├── channels.js          # Channel database (all streams, logos, metadata)
    │   └── catalogHandler.js    # Catalog request handler
    ├── streams/
    │   ├── streamHandler.js     # Stream request handler (with health sorting)
    │   └── metaHandler.js       # Meta request handler (channel detail + EPG)
    ├── epg/
    │   └── epgHandler.js        # XMLTV EPG fetcher & parser
    ├── utils/
    │   ├── healthCheck.js       # Stream URL health checker
    │   ├── cache.js             # node-cache wrapper
    │   └── logger.js            # Winston logger
    └── assets/
        ├── logo.png             # Addon logo (add your own)
        └── background.jpg       # Addon background (add your own)
```

---

## 📡 API Endpoints

| Endpoint | Description |
|---|---|
| `GET /` | Landing page with install button |
| `GET /manifest.json` | Stremio manifest |
| `GET /catalog/tv/{id}.json` | Channel catalog |
| `GET /catalog/tv/{id}/{extra}.json` | Catalog with search/skip params |
| `GET /meta/tv/{id}.json` | Channel metadata + EPG |
| `GET /stream/tv/{id}.json` | Stream URLs |
| `GET /health` | Health status JSON |
| `POST /admin/flush-cache` | Flush response cache (requires `X-Admin-Token` header) |

---

## ➕ Adding Channels

Edit `src/catalogs/channels.js`. Each channel follows this schema:

```js
{
  id:          'fantastic_my_channel',   // MUST start with "fantastic_"
  name:        'My Channel',
  category:    'News',                   // One of the 8 categories
  description: 'Short description.',
  logo:        'https://example.com/logo.png',
  country:     'US',                     // ISO 3166-1 alpha-2
  language:    'en',                     // ISO 639-1
  website:     'https://example.com',
  epgId:       'MyChannel.us',           // TVG/XMLTV channel ID (optional)
  streams: [
    {
      url:     'https://example.com/live.m3u8',
      type:    'hls',                    // hls | dash | direct
      quality: '1080p',
      label:   'My Channel Live'
    },
    // Add fallback URLs here
    {
      url:     'https://backup.example.com/live.m3u8',
      type:    'hls',
      quality: '720p',
      label:   'My Channel (backup)'
    }
  ]
}
```

**Valid categories:** `News`, `Sports`, `Entertainment`, `Music`, `Kids`, `Education`, `Regional`, `International`

**Stream type values:** `hls`, `dash`, `direct`

---

## ⚙️ Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `7860` | Server port |
| `HOST` | `0.0.0.0` | Server host |
| `BASE_URL` | `http://localhost:7860` | Public URL (used in landing page) |
| `LOG_LEVEL` | `info` | `error` / `warn` / `info` / `debug` |
| `LOG_TO_FILE` | `false` | Write logs to `logs/` directory |
| `ADMIN_TOKEN` | _(empty)_ | Token for `POST /admin/flush-cache` |
| `NODE_ENV` | `development` | `development` / `production` |

---

## 📜 Legal

All streams included in this addon are:
- Publicly broadcast on the internet by their rights holders
- Free-to-air or ad-supported with no authentication required
- From public broadcasters (BBC Arabic, DW, NHK, France 24, DD, TRT, ARD, ZDF, RAI, NASA, PBS)
- Or from licensed AVOD platforms (Pluto TV, Tubi, Vevo, Crackle, Stingray)

This addon does **not** host, relay, or modify any stream. It only provides the URLs that content owners have made publicly available.

---

## 🤝 Contributing

1. Fork the repo
2. Add channels to `src/catalogs/channels.js` (public/legal streams only)
3. Test locally: `npm start` then open `http://localhost:7860`
4. Open a PR

---

## 📄 License

MIT © Fantastic Live TV Contributors
