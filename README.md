# Footballschland

Website zum Podcast **Footballschland – American Football MADE IN GERMANY**.
Erzählt die Geschichten deutscher Talente in High School, College, NFL, GFL und ELF.

Live: [footballschland.de](https://footballschland.de)

## Stack

- **Astro 5** (SSR via `@astrojs/netlify`, `trailingSlash: 'always'`)
- **React** Islands für interaktive Komponenten
- **Tailwind CSS** + `@tailwindcss/typography`
- **Sanity** als Headless CMS (Projekt `k31tvjv8`, Dataset `production`, Studio unter `/studio`)
- **Netlify** als Hosting / Deploy

## Struktur

```
src/
├── layouts/BaseLayout.astro   Seitenrahmen, SEO, Consent-Banner, Header/Footer
├── lib/
│   ├── sanity.ts              Sanity-Client
│   └── queries.ts             GROQ-Queries (Blockblog, Pages)
└── pages/
    ├── index.astro            Startseite
    ├── episoden.astro         Episoden-Liste
    ├── blockblog/             Blog-Übersicht + [slug].astro
    ├── guides.astro
    ├── nfl-draft.astro        Guide: NFL Draft
    ├── weg-in-die-nfl.astro   Guide: Karrierewege
    ├── partner.astro
    ├── impressum.astro
    ├── datenschutz.astro
    └── sitemap.xml.ts
public/                        Assets, Fonts (Antonio + Poppins self-hosted)
sanity.config.ts               Sanity-Schema (blockblogPost, podcastTranscript, page)
```

## Setup

Voraussetzungen: **Node ≥ 22.12**.

```sh
npm install
npm run dev       # Dev-Server auf http://localhost:4321
npm run build     # Production-Build nach ./dist
npm run preview   # Preview des Builds
```

## Deployment

Auto-Deploy über Netlify auf Push in `main`. Konfiguration in `netlify.toml`
(inkl. `www → non-www` Redirect und Legacy-Redirects `/blog/* → /blockblog/*`).

## Brand

- Farben: `rot` `#e31837`, `gold` `#ffb81c`, Schwarz `#231f20` (Schwarz-Rot-Gold)
- Fonts: **Antonio** (Display) + **Poppins** (Body), self-hosted unter `public/fonts/`
- Consent-Banner lädt externe Inhalte (Spotify, LightWidget/Instagram) erst nach Zustimmung

## Links

- Podcast: [Spotify](https://open.spotify.com/show/1DlSNLB5HsxSp12nilwjbc) · [Apple Podcasts](https://podcasts.apple.com/de/podcast/footballschland-american-football-made-in-germany/id1674301287)
- Shop: [shop.footballschland.com](https://shop.footballschland.com)
- Support: [Patreon](https://www.patreon.com/footballschland)
