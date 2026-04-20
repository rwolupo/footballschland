# CLAUDE.md

Dieses Dokument gibt Claude Code Kontext über das Footballschland-Projekt.
Sprache für Commits, PR-Beschreibungen und Kommunikation mit dem Maintainer: **Deutsch**.

## Projektüberblick

Website zum Podcast „Footballschland – American Football MADE IN GERMANY".
Technischer Stack: **Astro 5 (SSR)** + **React Islands** + **Tailwind** + **Sanity CMS**, deployed auf **Netlify**.
Inhalte (Blockblog-Artikel, Podcast-Transkripte, Seitentexte) liegen in Sanity – der Code rendert sie nur.

## Kommandos

```sh
npm run dev        # Astro Dev-Server (localhost:4321)
npm run build      # Production-Build
npm run preview    # Preview des Builds
npm run astro      # Astro-CLI (z. B. `astro check`)
```

Node ≥ 22.12 ist in `package.json` erzwungen. Es gibt **kein** Lint-/Test-Setup – Build ist das Qualitätsnetz.

## Architektur & Konventionen

- **Seiten** unter `src/pages/` (`.astro`). Top-Level-Pages wie `episoden.astro`, `nfl-draft.astro`, `weg-in-die-nfl.astro`, `partner.astro`, `guides.astro`, Rechtstexte (`impressum.astro`, `datenschutz.astro`). Blog-Routen unter `src/pages/blockblog/`.
- **Routing:** `trailingSlash: 'always'` – interne Links immer mit Slash am Ende (`/episoden/`, `/blockblog/[slug]/`).
- **SSR ist Standard** (`output: 'server'`), einzelne Seiten setzen `export const prerender = true;` (z. B. `src/pages/index.astro`), wenn kein Live-Fetch nötig ist.
- **Layout:** Alles läuft durch `src/layouts/BaseLayout.astro` – Header, Footer, SEO-Meta, JSON-LD, Consent-Banner. Props: `title`, `description`, `ogImage`, `canonical` (wird automatisch auf `https://footballschland.de` + Trailing-Slash normalisiert). Seitenspezifisches `<head>` geht über `<slot name="head">`.
- **Sanity-Zugriff:** Client in `src/lib/sanity.ts` (Projekt `k31tvjv8`, Dataset `production`, `apiVersion: '2026-03-28'`). Queries in `src/lib/queries.ts` – neue Queries bitte hier bündeln, nicht inline in Seiten.
- **Schema:** Definiert in `sanity.config.ts`. Drei Dokumenttypen: `blockblogPost` (inkl. Custom-Blöcke `playerCard`, `playerTable`), `podcastTranscript`, `page`. Schema-Änderungen erfordern ein Deployment des Studios (Pfad `/studio`).
- **Tailwind:** Farben in `tailwind.config.mjs` – `rot`, `gold`, `brand.*`, Legacy `crimson` (Alias auf `rot`). Display-Font **Antonio**, Body-Font **Poppins** (self-hosted in `public/fonts/`, eingebunden über `public/fonts/fonts.css`). Globale Component-Classes (z. B. `.btn-primary`, `.btn-patreon`, `.btn-gold`, `.btn-episodes`, `.section-label`, `.prose-section`, `.article-body`) leben in `<style is:global>` am Ende von `BaseLayout.astro`.
- **Consent / externe Inhalte:** Spotify-Embeds und LightWidget/Instagram laden erst nach Zustimmung. Platzhalter nutzen die Klasse `consent-placeholder`, der echte Inhalt `consent-content` (`display:none` per Default). iframes verwenden `data-consent-src` statt `src`. Consent-Manager-Skript liegt in `BaseLayout.astro`, `localStorage`-Key: `fs_consent`.
- **Bilder:** Uploads aus Sanity kommen mit `asset->{ url }`. Statische Assets unter `public/assets/` (Logos, Partner, Blog-Hero-Fallbacks). Dateinamen mit Leerzeichen via `%20` encoden.

## Styling-Guidelines

- Dunkle Basis `#0D0D0D` / `#111111` / `#1A1A1A`, Schwarz-Rot-Gold-Akzentleisten (`bg-[#231f20]` / `bg-rot` / `bg-gold`) tauchen in Header, Footer und Section-Dividern auf.
- Headlines: `font-display` + farbige Accent-Wörter in `text-rot` / `text-gold` / `text-crimson`.
- „Prose-Sektionen" (Artikel-Fließtext) bekommen `prose-section` (Creme `#f5f0eb` auf Dunkel-Text), Blockblog-Einzelseiten nutzen `article-body`.

## Redirects & SEO

- `netlify.toml` hält alle Redirects (`www → non-www`, `/blog/* → /blockblog/*`, Altpfade `/lander`, Kategorie-Pfade). Wenn du URLs änderst oder Seiten löschst, **hier Redirects pflegen**.
- Sitemap liegt in `src/pages/sitemap.xml.ts` und wird durch `@astrojs/sitemap` ergänzt.
- JSON-LD (Organization, PodcastSeries, WebSite) steckt im `BaseLayout` – Änderungen an Bandname, Social-Links oder Gründer:innen dort pflegen.

## Arbeitsweise mit Claude

- **Branch:** Entwicklung passiert auf dem jeweils zugewiesenen Feature-Branch (aktuell `claude/setup-football-website-XhLDR`). Nie direkt auf `main` pushen.
- **Commits:** Kurze, deutschsprachige Commit-Messages im Imperativ („Erweitert Guides-Übersicht um …"), Fokus auf das **Warum**.
- **Pull Requests:** Nur auf explizite Anweisung erstellen.
- **Scope:** Kleine, fokussierte Änderungen. Keine spekulativen Refactors, keine neuen Abstraktionen ohne Anlass, keine Tooling-Umbauten nebenbei.
- **Tests / Verifikation:** Nach Änderungen `npm run build` lokal durchlaufen lassen, um SSR-/Typfehler zu fangen. Für UI-Änderungen möglichst `npm run dev` und im Browser gegentesten – wenn nicht möglich, explizit sagen.
- **Content vs. Code:** Redaktionelle Inhalte (Blog-Artikel, Seitentexte, Transkripte) liegen in Sanity. Claude kann sie über den Git-basierten Content-Sync (siehe unten) befüllen, ohne dass du manuell ins Studio musst.

## Automatisierung via GitHub Actions

Beide Workflows laufen auf `main` und nutzen Secrets aus dem Repo-Setting
`Settings → Secrets and variables → Actions`.

### `.github/workflows/sanity-deploy.yml`
Deployed das Sanity Studio (`*.sanity.studio`) neu, sobald `sanity.config.ts`
oder `sanity.cli.ts` auf `main` landen. Secret: `SANITY_DEPLOY_TOKEN`
(Permission „Deploy Studio"). Auch manuell über „Run workflow" triggerbar.

### `.github/workflows/sanity-content-sync.yml`
Liest beim Push alle `*.json` unter `content/` und schreibt sie per
`createOrReplace` nach Sanity. Secret: `SANITY_CONTENT_TOKEN` (Permission
„Editor"). Ideal für Blog-Artikel, die Claude pflegt.

### Content-Format
Details in `content/README.md`. Kurz: ein JSON pro Dokument, `_type`
zwingend, `_id` wird aus `<type>-<slug>` abgeleitet. `createOrReplace`
ist destruktiv – Dokumente, die im Git liegen, dürfen nicht parallel im
Studio editiert werden.

### Script
`scripts/sync-sanity-content.mjs` – node-Script ohne Extra-Tooling, nutzt
`@sanity/client` mit Token aus `SANITY_AUTH_TOKEN`. Liegt hier für lokale
Dry-Runs, wird aber primär von der Action ausgeführt.
