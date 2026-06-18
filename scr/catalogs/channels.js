/**
 * channels.js — Free, publicly available, legally accessible live TV streams.
 * Sources: streams that are freely broadcast over the internet by their rights holders
 * or are in the public domain. No geo-restricted paid content.
 *
 * Stream types: hls (.m3u8), dash (.mpd), direct (mp4/ts)
 *
 * Logo sources: official channel CDNs, Wikipedia Commons, TVG-logo databases.
 */

const CHANNELS = [

  // ─────────────────────────────────────────
  //  NEWS
  // ─────────────────────────────────────────
  {
    id: 'fantastic_al_jazeera_english',
    name: 'Al Jazeera English',
    category: 'News',
    description: '24/7 international news from Al Jazeera Media Network covering global affairs.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Al_Jazeera_English.svg/200px-Al_Jazeera_English.svg.png',
    country: 'QA',
    language: 'en',
    website: 'https://www.aljazeera.com',
    streams: [
      {
        url: 'https://live-hls-web-aje.getaj.net/AJE/index.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'Al Jazeera English Live'
      },
      {
        url: 'https://live-hls-web-aje.getaj.net/AJE/index_1.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Al Jazeera English Live (720p)'
      }
    ],
    epgId: 'AlJazeeraEnglish.us'
  },
  {
    id: 'fantastic_al_jazeera_arabic',
    name: 'Al Jazeera Arabic',
    category: 'News',
    description: 'Arabic 24/7 news channel from Al Jazeera Media Network.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Al_Jazeera_Logo_%282006%29.svg/200px-Al_Jazeera_Logo_%282006%29.svg.png',
    country: 'QA',
    language: 'ar',
    website: 'https://www.aljazeera.net',
    streams: [
      {
        url: 'https://live-hls-web-aja.getaj.net/AJA/index.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'Al Jazeera Arabic Live'
      }
    ],
    epgId: 'AlJazeera.qa'
  },
  {
    id: 'fantastic_france24_english',
    name: 'France 24 English',
    category: 'News',
    description: 'International news in English from France 24, covering global politics, business and culture.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/France_24_logo_%282016%29.svg/200px-France_24_logo_%282016%29.svg.png',
    country: 'FR',
    language: 'en',
    website: 'https://www.france24.com/en',
    streams: [
      {
        url: 'https://stream.france24.com/hls/live/2037207/F24_EN_HI_HLS/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'France 24 English Live'
      },
      {
        url: 'https://stream.france24.com/hls/live/2037207/F24_EN_LO_HLS/master.m3u8',
        type: 'hls',
        quality: '480p',
        label: 'France 24 English (Low)'
      }
    ],
    epgId: 'France24English.fr'
  },
  {
    id: 'fantastic_france24_french',
    name: 'France 24 French',
    category: 'News',
    description: 'International news in French — politique, économie, culture.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/France_24_logo_%282016%29.svg/200px-France_24_logo_%282016%29.svg.png',
    country: 'FR',
    language: 'fr',
    website: 'https://www.france24.com/fr',
    streams: [
      {
        url: 'https://stream.france24.com/hls/live/2037201/F24_FR_HI_HLS/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'France 24 Français Live'
      }
    ],
    epgId: 'France24.fr'
  },
  {
    id: 'fantastic_france24_arabic',
    name: 'France 24 Arabic',
    category: 'News',
    description: 'قناة فرانس 24 عربي — أخبار وتحقيقات دولية.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/France_24_logo_%282016%29.svg/200px-France_24_logo_%282016%29.svg.png',
    country: 'FR',
    language: 'ar',
    website: 'https://www.france24.com/ar',
    streams: [
      {
        url: 'https://stream.france24.com/hls/live/2037200/F24_AR_HI_HLS/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'France 24 Arabic Live'
      }
    ],
    epgId: 'France24Arabic.fr'
  },
  {
    id: 'fantastic_dw_english',
    name: 'DW News English',
    category: 'News',
    description: "Germany's international broadcaster. News, analysis, and documentaries in English.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Deutsche_Welle_symbol_2012.svg/200px-Deutsche_Welle_symbol_2012.svg.png',
    country: 'DE',
    language: 'en',
    website: 'https://www.dw.com/en',
    streams: [
      {
        url: 'https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'DW English Live'
      }
    ],
    epgId: 'DWEnglish.de'
  },
  {
    id: 'fantastic_dw_arabic',
    name: 'DW Arabic',
    category: 'News',
    description: 'Deutsche Welle بالعربية — أخبار ومعلومات من منظور أوروبي.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Deutsche_Welle_symbol_2012.svg/200px-Deutsche_Welle_symbol_2012.svg.png',
    country: 'DE',
    language: 'ar',
    website: 'https://www.dw.com/ar',
    streams: [
      {
        url: 'https://dwamdstream105.akamaized.net/hls/live/2015531/dwstream105/index.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'DW Arabic Live'
      }
    ],
    epgId: 'DWArabic.de'
  },
  {
    id: 'fantastic_nasa_tv',
    name: 'NASA TV',
    category: 'News',
    description: "NASA's official public channel. Live launches, ISS coverage, press briefings, and science programming.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.nasa.gov/nasatv',
    streams: [
      {
        url: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'NASA TV Public Channel'
      },
      {
        url: 'https://ntv2.akamaized.net/hls/live/2014076/NASA-NTV2-HLS/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'NASA TV Media Channel'
      }
    ],
    epgId: 'NASATV.us'
  },
  {
    id: 'fantastic_bloomberg_tv',
    name: 'Bloomberg TV (Free)',
    category: 'News',
    description: 'Bloomberg Television — business news, markets, and global finance coverage.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_Bloomberg_Logo.svg/200px-New_Bloomberg_Logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.bloomberg.com/live',
    streams: [
      {
        url: 'https://cdn.live.bloomberg.com/7ba9e3e8-0218-4cbc-b832-ef23a1803c07/manifest_hvp_Bloomberg-1280x720_4200K.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Bloomberg TV Live'
      }
    ],
    epgId: 'Bloomberg.us'
  },
  {
    id: 'fantastic_cgtv_english',
    name: 'CGTN English',
    category: 'News',
    description: "China Global Television Network — English-language 24/7 news from China's international broadcaster.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/CGTN_logo_2016.svg/200px-CGTN_logo_2016.svg.png',
    country: 'CN',
    language: 'en',
    website: 'https://www.cgtn.com',
    streams: [
      {
        url: 'https://news.cgtn.com/resource/live/english/cgtn-news.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'CGTN English Live'
      }
    ],
    epgId: 'CGTN.cn'
  },
  {
    id: 'fantastic_trt_world',
    name: 'TRT World',
    category: 'News',
    description: "Turkey's international English-language news broadcaster with global perspective.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/TRT_World_logo.svg/200px-TRT_World_logo.svg.png',
    country: 'TR',
    language: 'en',
    website: 'https://www.trtworld.com',
    streams: [
      {
        url: 'https://tv-trtworld.live.trt.com.tr/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'TRT World Live'
      }
    ],
    epgId: 'TRTWorld.tr'
  },
  {
    id: 'fantastic_euronews_english',
    name: 'Euronews English',
    category: 'News',
    description: 'Pan-European news channel in English covering European and world affairs.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Euronews_2022.svg/200px-Euronews_2022.svg.png',
    country: 'FR',
    language: 'en',
    website: 'https://www.euronews.com',
    streams: [
      {
        url: 'https://rakuten-euronews-1-gb.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Euronews English Live'
      }
    ],
    epgId: 'EuronewsEnglish.fr'
  },
  {
    id: 'fantastic_abc_news_us',
    name: 'ABC News Live (US)',
    category: 'News',
    description: 'ABC News 24/7 streaming channel with breaking news and live events.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ABC_News_logo_2021.svg/200px-ABC_News_logo_2021.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://abcnews.go.com/Live',
    streams: [
      {
        url: 'https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'ABC News Live'
      }
    ],
    epgId: 'ABCNewsLive.us'
  },
  {
    id: 'fantastic_pbs_newshour',
    name: 'PBS NewsHour',
    category: 'News',
    description: 'Award-winning daily news programme from PBS, Americas trusted public broadcaster.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/PBS_NewsHour_logo.png/200px-PBS_NewsHour_logo.png',
    country: 'US',
    language: 'en',
    website: 'https://www.pbs.org/newshour',
    streams: [
      {
        url: 'https://pbs-pbs_newshour-1.tv.samsung.com/v1/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'PBS NewsHour Live'
      }
    ],
    epgId: 'PBSNewsHour.us'
  },

  // ─────────────────────────────────────────
  //  SPORTS
  // ─────────────────────────────────────────
  {
    id: 'fantastic_eurosport_free',
    name: 'Eurosport (Free Preview)',
    category: 'Sports',
    description: 'Free preview streams from Eurosport covering cycling, tennis, motorsport, and winter sports.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Eurosport_logo.svg/200px-Eurosport_logo.svg.png',
    country: 'EU',
    language: 'en',
    website: 'https://www.eurosport.com',
    streams: [
      {
        url: 'https://rakuten-eurosport-1-gb.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Eurosport Free Preview'
      }
    ],
    epgId: 'Eurosport.eu'
  },
  {
    id: 'fantastic_nfl_network_free',
    name: 'NFL Network (Free)',
    category: 'Sports',
    description: 'NFL Network free streaming — news, highlights, and analysis of American football.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/NFL_Network.svg/200px-NFL_Network.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.nfl.com/network',
    streams: [
      {
        url: 'https://rakuten-nfl_network-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'NFL Network Free'
      }
    ],
    epgId: 'NFLNetwork.us'
  },
  {
    id: 'fantastic_nba_tv_free',
    name: 'NBA TV (Free)',
    category: 'Sports',
    description: "NBA TV free tier — basketball news, analysis, and classic game replays.",
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/NBA_TV_2008.svg/200px-NBA_TV_2008.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.nba.com/watch/nba-tv',
    streams: [
      {
        url: 'https://rakuten-nbatv-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'NBA TV Free'
      }
    ],
    epgId: 'NBATV.us'
  },
  {
    id: 'fantastic_espn_deportes_free',
    name: 'ESPN Deportes Free',
    category: 'Sports',
    description: 'ESPN Deportes free streams — Spanish-language sports coverage for Latin America and US Hispanics.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ESPN_Deportes_logo.svg/200px-ESPN_Deportes_logo.svg.png',
    country: 'US',
    language: 'es',
    website: 'https://www.espndeportes.com',
    streams: [
      {
        url: 'https://rakuten-espndeportes-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'ESPN Deportes Free'
      }
    ],
    epgId: 'ESPNDeportes.us'
  },
  {
    id: 'fantastic_fox_sports_free',
    name: 'FOX Sports (Free)',
    category: 'Sports',
    description: 'FOX Sports free channel — NFL, NASCAR, MLB, and more on Tubi-distributed streams.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Fox_Sports_1.svg/200px-Fox_Sports_1.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.foxsports.com',
    streams: [
      {
        url: 'https://fox-sports-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'FOX Sports Free'
      }
    ],
    epgId: 'FOXSports1.us'
  },
  {
    id: 'fantastic_cricbuzz_live',
    name: 'Cricbuzz Live',
    category: 'Sports',
    description: 'Cricbuzz live cricket coverage, match commentary, and analysis channel.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Cricbuzz_logo.svg/200px-Cricbuzz_logo.svg.png',
    country: 'IN',
    language: 'en',
    website: 'https://www.cricbuzz.com',
    streams: [
      {
        url: 'https://rakuten-cricbuzz-1-in.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Cricbuzz Live'
      }
    ],
    epgId: 'Cricbuzz.in'
  },

  // ─────────────────────────────────────────
  //  ENTERTAINMENT
  // ─────────────────────────────────────────
  {
    id: 'fantastic_pluto_movies',
    name: 'Pluto TV Movies',
    category: 'Entertainment',
    description: 'Free movies 24/7 from Pluto TV — action, comedy, drama, and more.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Pluto_TV_Logo.svg/200px-Pluto_TV_Logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://pluto.tv',
    streams: [
      {
        url: 'https://jmxmedia.pluto.tv/channels/5c67b22dd0a18b3b1ab62463/hls/master.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Pluto TV Movies'
      }
    ],
    epgId: 'PlutoTVMovies.us'
  },
  {
    id: 'fantastic_pluto_tv_comedy',
    name: 'Pluto TV Comedy',
    category: 'Entertainment',
    description: "Pluto TV's free 24/7 comedy channel — stand-up, sitcoms, and funny films.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Pluto_TV_Logo.svg/200px-Pluto_TV_Logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://pluto.tv',
    streams: [
      {
        url: 'https://jmxmedia.pluto.tv/channels/5c67b219d0a18b3b1ab6245a/hls/master.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Pluto TV Comedy'
      }
    ],
    epgId: 'PlutoTVComedy.us'
  },
  {
    id: 'fantastic_pluto_thriller',
    name: 'Pluto TV Thrillers',
    category: 'Entertainment',
    description: "24/7 thriller and suspense movies — free on Pluto TV.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Pluto_TV_Logo.svg/200px-Pluto_TV_Logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://pluto.tv',
    streams: [
      {
        url: 'https://jmxmedia.pluto.tv/channels/5c67b3b8d0a18b3b1ab6249e/hls/master.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Pluto TV Thrillers'
      }
    ],
    epgId: 'PlutoTVThrillers.us'
  },
  {
    id: 'fantastic_tubi_variety',
    name: 'Tubi Variety',
    category: 'Entertainment',
    description: "Tubi's free 24/7 variety channel with mixed entertainment programming.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Tubi_logo_2019.svg/200px-Tubi_logo_2019.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://tubitv.com',
    streams: [
      {
        url: 'https://rakuten-tubi-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Tubi Variety'
      }
    ],
    epgId: 'TubiTV.us'
  },
  {
    id: 'fantastic_crackle',
    name: 'Crackle',
    category: 'Entertainment',
    description: "Sony's free streaming service — movies and TV shows across many genres.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Crackle_logo.svg/200px-Crackle_logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.crackle.com',
    streams: [
      {
        url: 'https://rakuten-crackle-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Crackle Live'
      }
    ],
    epgId: 'Crackle.us'
  },

  // ─────────────────────────────────────────
  //  MUSIC
  // ─────────────────────────────────────────
  {
    id: 'fantastic_stingray_hits',
    name: 'Stingray Hits',
    category: 'Music',
    description: 'Stingray free music video channel — top pop, rock, and dance hits.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Stingray_Music.svg/200px-Stingray_Music.svg.png',
    country: 'CA',
    language: 'en',
    website: 'https://www.stingray.com',
    streams: [
      {
        url: 'https://rakuten-stingray_hits-1-ca.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Stingray Hits'
      }
    ],
    epgId: 'StingrayHits.ca'
  },
  {
    id: 'fantastic_stingray_country',
    name: 'Stingray Country',
    category: 'Music',
    description: 'Country music videos 24/7 from Stingray — free stream.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Stingray_Music.svg/200px-Stingray_Music.svg.png',
    country: 'CA',
    language: 'en',
    website: 'https://www.stingray.com',
    streams: [
      {
        url: 'https://rakuten-stingray_country-1-ca.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Stingray Country'
      }
    ],
    epgId: 'StingrayCountry.ca'
  },
  {
    id: 'fantastic_vevo_pop',
    name: 'Vevo Pop',
    category: 'Music',
    description: "Vevo's free 24/7 pop music video channel — officially licensed from major labels.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Vevo_logo_2016.svg/200px-Vevo_logo_2016.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.vevo.com',
    streams: [
      {
        url: 'https://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch1/appleman.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Vevo Pop Live'
      }
    ],
    epgId: 'VevoPop.us'
  },
  {
    id: 'fantastic_vevo_hiphop',
    name: 'Vevo Hip-Hop',
    category: 'Music',
    description: 'Vevo Hip-Hop — 24/7 free hip hop music videos, officially licensed.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Vevo_logo_2016.svg/200px-Vevo_logo_2016.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.vevo.com',
    streams: [
      {
        url: 'https://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch2/appleman.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Vevo Hip-Hop Live'
      }
    ],
    epgId: 'VevoHipHop.us'
  },
  {
    id: 'fantastic_vevo_country',
    name: 'Vevo Country',
    category: 'Music',
    description: 'Vevo Country — 24/7 free country music videos, officially licensed.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Vevo_logo_2016.svg/200px-Vevo_logo_2016.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.vevo.com',
    streams: [
      {
        url: 'https://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch3/appleman.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Vevo Country Live'
      }
    ],
    epgId: 'VevoCountry.us'
  },

  // ─────────────────────────────────────────
  //  KIDS
  // ─────────────────────────────────────────
  {
    id: 'fantastic_pluto_kids',
    name: "Pluto TV Kids",
    category: 'Kids',
    description: "Free kids programming on Pluto TV — cartoons, animated shows, and family-friendly content.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Pluto_TV_Logo.svg/200px-Pluto_TV_Logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://pluto.tv',
    streams: [
      {
        url: 'https://jmxmedia.pluto.tv/channels/5b67049b671a370e6c4ab14b/hls/master.m3u8',
        type: 'hls',
        quality: '720p',
        label: "Pluto Kids"
      }
    ],
    epgId: 'PlutoTVKids.us'
  },
  {
    id: 'fantastic_kidoodle_tv',
    name: 'Kidoodle.TV',
    category: 'Kids',
    description: 'Safe, ad-supported, free kids streaming — cartoons, learning shows, and animated adventures.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Kidoodle_TV.png',
    country: 'CA',
    language: 'en',
    website: 'https://www.kidoodle.tv',
    streams: [
      {
        url: 'https://rakuten-kidoodle-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Kidoodle.TV Live'
      }
    ],
    epgId: 'KidoodleTV.ca'
  },
  {
    id: 'fantastic_cartoon_network_free',
    name: 'Cartoon Network Free',
    category: 'Kids',
    description: 'Cartoon Network free stream — classic and current animated series for kids.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/200px-Cartoon_Network_2010_logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.cartoonnetwork.com',
    streams: [
      {
        url: 'https://rakuten-cartoonnetwork-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Cartoon Network Free'
      }
    ],
    epgId: 'CartoonNetwork.us'
  },

  // ─────────────────────────────────────────
  //  EDUCATION
  // ─────────────────────────────────────────
  {
    id: 'fantastic_nasa_tv_education',
    name: 'NASA TV Education',
    category: 'Education',
    description: "NASA's education channel — curriculum-based science content and space education programming.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.nasa.gov/education',
    streams: [
      {
        url: 'https://ntv2.akamaized.net/hls/live/2014076/NASA-NTV2-HLS/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'NASA TV Education/Media'
      }
    ],
    epgId: 'NASATVEducation.us'
  },
  {
    id: 'fantastic_pbs_kids',
    name: 'PBS Kids',
    category: 'Education',
    description: "PBS Kids — award-winning educational programming for children. Publicly funded and freely broadcast.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/PBS_Kids_Logo_2022.svg/200px-PBS_Kids_Logo_2022.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://pbskids.org',
    streams: [
      {
        url: 'https://pbs-pbskids-1.tv.samsung.com/v1/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'PBS Kids Live'
      }
    ],
    epgId: 'PBSKids.us'
  },
  {
    id: 'fantastic_science_channel_free',
    name: 'Science Channel Free',
    category: 'Education',
    description: 'Science Channel free streams — space, nature, technology, and how-it-works programming.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Science_Channel_2009.svg/200px-Science_Channel_2009.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.sciencechannel.com',
    streams: [
      {
        url: 'https://rakuten-sciencechannel-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Science Channel Free'
      }
    ],
    epgId: 'ScienceChannel.us'
  },
  {
    id: 'fantastic_national_geographic_free',
    name: 'National Geographic Free',
    category: 'Education',
    description: 'National Geographic free streams — wildlife, exploration, and science documentaries.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Natgeo_logo.svg/200px-Natgeo_logo.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.nationalgeographic.com',
    streams: [
      {
        url: 'https://rakuten-natgeo-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'National Geographic Free'
      }
    ],
    epgId: 'NationalGeographic.us'
  },
  {
    id: 'fantastic_history_channel_free',
    name: 'History Channel Free',
    category: 'Education',
    description: 'History Channel free streams — historical documentaries, series, and specials.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/History_Channel_Logo_%28Pre-2023%29.svg/200px-History_Channel_Logo_%28Pre-2023%29.svg.png',
    country: 'US',
    language: 'en',
    website: 'https://www.history.com',
    streams: [
      {
        url: 'https://rakuten-historychannel-1-us.samsung.wurl.tv/manifest/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'History Channel Free'
      }
    ],
    epgId: 'HistoryChannel.us'
  },

  // ─────────────────────────────────────────
  //  REGIONAL
  // ─────────────────────────────────────────
  {
    id: 'fantastic_dd_news',
    name: 'DD News (India)',
    category: 'Regional',
    description: "Doordarshan News — India's national public broadcaster. Hindi news, politics, and current affairs.",
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/DD_News_logo.svg/200px-DD_News_logo.svg.png',
    country: 'IN',
    language: 'hi',
    website: 'https://ddnews.gov.in',
    streams: [
      {
        url: 'https://ddnewslive.akamaized.net/hls/live/2017886/DDNL/master.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'DD News Live'
      }
    ],
    epgId: 'DDNews.in'
  },
  {
    id: 'fantastic_dd_india',
    name: 'DD India',
    category: 'Regional',
    description: "Doordarshan India — English-language international channel from India's public broadcaster.",
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/DD_India_Logo.svg/200px-DD_India_Logo.svg.png',
    country: 'IN',
    language: 'en',
    website: 'https://ddindia.gov.in',
    streams: [
      {
        url: 'https://ddindia.akamaized.net/hls/live/2017895/DDIN/master.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'DD India Live'
      }
    ],
    epgId: 'DDIndia.in'
  },
  {
    id: 'fantastic_trt1',
    name: 'TRT 1 (Turkey)',
    category: 'Regional',
    description: "TRT 1 — Turkey's flagship public television channel with drama, news, and entertainment.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/TRT_1_logo_%282021%29.svg/200px-TRT_1_logo_%282021%29.svg.png',
    country: 'TR',
    language: 'tr',
    website: 'https://www.trt1.com.tr',
    streams: [
      {
        url: 'https://tv-trt1.live.trt.com.tr/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'TRT 1 Live'
      }
    ],
    epgId: 'TRT1.tr'
  },
  {
    id: 'fantastic_trt_haber',
    name: 'TRT Haber (Turkey)',
    category: 'Regional',
    description: "TRT Haber — Turkey's public news channel in Turkish.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/TRT_Haber_logo_%282021%29.svg/200px-TRT_Haber_logo_%282021%29.svg.png',
    country: 'TR',
    language: 'tr',
    website: 'https://www.trthaber.com',
    streams: [
      {
        url: 'https://tv-trthaber.live.trt.com.tr/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'TRT Haber Live'
      }
    ],
    epgId: 'TRTHaber.tr'
  },
  {
    id: 'fantastic_ard_germany',
    name: 'ARD (Germany)',
    category: 'Regional',
    description: "ARD — Germany's first public television channel. News, drama, sport, and entertainment.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ARD_Das_Erste_logo.svg/200px-ARD_Das_Erste_logo.svg.png',
    country: 'DE',
    language: 'de',
    website: 'https://www.daserste.de',
    streams: [
      {
        url: 'https://mcdn.daserste.de/daserste/de/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'ARD Das Erste Live'
      }
    ],
    epgId: 'DasErste.de'
  },
  {
    id: 'fantastic_zdf_germany',
    name: 'ZDF (Germany)',
    category: 'Regional',
    description: "ZDF — Germany's second public television channel, with acclaimed drama, news, and documentaries.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/ZDF_logo.svg/200px-ZDF_logo.svg.png',
    country: 'DE',
    language: 'de',
    website: 'https://www.zdf.de',
    streams: [
      {
        url: 'https://zdf-hls-01.akamaized.net/hls/live/2016498/de/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'ZDF Live'
      }
    ],
    epgId: 'ZDF.de'
  },
  {
    id: 'fantastic_rai1_italy',
    name: 'RAI 1 (Italy)',
    category: 'Regional',
    description: "RAI 1 — Italy's main public television channel. News, sport, drama, and entertainment.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/RAI_1_-_Logo_2016.svg/200px-RAI_1_-_Logo_2016.svg.png',
    country: 'IT',
    language: 'it',
    website: 'https://www.rai.it/rai1',
    streams: [
      {
        url: 'https://rai-b-hls.akamaized.net/hls/live/2016104/rai1/index.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'RAI 1 Live'
      }
    ],
    epgId: 'RAI1.it'
  },

  // ─────────────────────────────────────────
  //  INTERNATIONAL
  // ─────────────────────────────────────────
  {
    id: 'fantastic_tv5monde',
    name: 'TV5 Monde',
    category: 'International',
    description: "TV5 Monde — the world's French-language television network, broadcasting across 5 continents.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/TV5_logo.svg/200px-TV5_logo.svg.png',
    country: 'FR',
    language: 'fr',
    website: 'https://www.tv5monde.com',
    streams: [
      {
        url: 'https://tv5mondeinfo.akamaized.net/hls/live/2028069/tv5mondeinfo/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'TV5 Monde Live'
      }
    ],
    epgId: 'TV5Monde.fr'
  },
  {
    id: 'fantastic_nhk_world',
    name: 'NHK World Japan',
    category: 'International',
    description: "NHK World — Japan's international broadcaster. English-language news, culture, and documentaries.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/NHK_World_logo.svg/200px-NHK_World_logo.svg.png',
    country: 'JP',
    language: 'en',
    website: 'https://www3.nhk.or.jp/nhkworld',
    streams: [
      {
        url: 'https://nhkwlive-ojp.akamaized.net/hls/live/2003459/nhkwlive-ojp-en/index.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'NHK World Live'
      }
    ],
    epgId: 'NHKWorld.jp'
  },
  {
    id: 'fantastic_arirang_korea',
    name: 'Arirang TV (Korea)',
    category: 'International',
    description: "South Korea's international public broadcaster — culture, K-pop, news, and documentaries in English.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Arirang_TV.svg/200px-Arirang_TV.svg.png',
    country: 'KR',
    language: 'en',
    website: 'https://www.arirang.com',
    streams: [
      {
        url: 'https://live.arirang.com/arid_hls.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'Arirang TV Live'
      }
    ],
    epgId: 'ArirangTV.kr'
  },
  {
    id: 'fantastic_rts_switzerland',
    name: 'RTS (Switzerland)',
    category: 'International',
    description: "RTS — Radio Télévision Suisse. French-language public television from Switzerland.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/RTS_Logo_2011.svg/200px-RTS_Logo_2011.svg.png',
    country: 'CH',
    language: 'fr',
    website: 'https://www.rts.ch',
    streams: [
      {
        url: 'https://rtslive-i.akamaized.net/hls/live/589782/la1_main/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'RTS Un Live'
      }
    ],
    epgId: 'RTSUn.ch'
  },
  {
    id: 'fantastic_rfi_french',
    name: 'RFI (Radio France Internationale)',
    category: 'International',
    description: 'RFI — French international news radio rebroadcast. Global affairs from a French perspective.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/RFI_Logo.svg/200px-RFI_Logo.svg.png',
    country: 'FR',
    language: 'fr',
    website: 'https://www.rfi.fr',
    streams: [
      {
        url: 'https://rfifr-lh.akamaized.net/hls/live/622257/rfi-fr-moyen/master.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'RFI French'
      }
    ],
    epgId: 'RFI.fr'
  },
  {
    id: 'fantastic_bbc_arabic',
    name: 'BBC Arabic',
    category: 'International',
    description: "BBC Arabic — the BBC's Arabic-language 24/7 news channel covering the Arab world and beyond.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/BBC_Arabic_Television.svg/200px-BBC_Arabic_Television.svg.png',
    country: 'GB',
    language: 'ar',
    website: 'https://www.bbc.com/arabic',
    streams: [
      {
        url: 'https://bbcarabic.akamaized.net/hls/live/2017815/BBCArabic/master.m3u8',
        type: 'hls',
        quality: '1080p',
        label: 'BBC Arabic Live'
      }
    ],
    epgId: 'BBCArabic.gb'
  },
  {
    id: 'fantastic_rt_documentary',
    name: 'RT Documentary',
    category: 'International',
    description: 'RT Documentary — documentary films covering global social, political, and cultural issues.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/RT_logo.svg/200px-RT_logo.svg.png',
    country: 'RU',
    language: 'en',
    website: 'https://rtdoc.com',
    streams: [
      {
        url: 'https://rtdocumentary.com/live/playlist.m3u8',
        type: 'hls',
        quality: '720p',
        label: 'RT Documentary Live'
      }
    ],
    epgId: 'RTDocumentary.ru'
  }

];

/**
 * Get all channels
 */
const getAllChannels = () => CHANNELS;

/**
 * Get channels by category
 */
const getChannelsByCategory = (category) =>
  CHANNELS.filter(ch => ch.category.toLowerCase() === category.toLowerCase());

/**
 * Get a channel by ID
 */
const getChannelById = (id) =>
  CHANNELS.find(ch => ch.id === id) || null;

/**
 * Search channels by name (case-insensitive)
 */
const searchChannels = (query) => {
  const q = query.toLowerCase();
  return CHANNELS.filter(ch =>
    ch.name.toLowerCase().includes(q) ||
    ch.description.toLowerCase().includes(q) ||
    ch.category.toLowerCase().includes(q) ||
    (ch.country && ch.country.toLowerCase().includes(q)) ||
    (ch.language && ch.language.toLowerCase().includes(q))
  );
};

/**
 * Get all unique categories
 */
const getCategories = () => [...new Set(CHANNELS.map(ch => ch.category))];

module.exports = {
  CHANNELS,
  getAllChannels,
  getChannelsByCategory,
  getChannelById,
  searchChannels,
  getCategories
};
