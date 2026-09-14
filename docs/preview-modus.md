# Preview-Modus für Blockblog-Artikel

Zeigt Sanity-Drafts als gerenderten Blogpost — mit „Öffne Vorschau"-Button
direkt im Studio. So kannst du unpublished Änderungen prüfen, bevor sie live
gehen.

## Wie es funktioniert

- Im Sanity Studio taucht bei jedem `blockblogPost` ein „Öffne Vorschau"-Button
  auf. Der öffnet die Netlify-URL des Artikels mit `?preview=<token>` in der
  Query.
- Der Astro-Renderer prüft den Token gegen `SANITY_PREVIEW_TOKEN` (Netlify Env).
  Nur bei exakter Übereinstimmung zieht er statt der published Version den
  Draft — über einen zweiten, geheimen Sanity-API-Token
  (`SANITY_VIEWER_TOKEN`).
- Auf der Preview-Seite steht oben ein roter Balken „Vorschau · Draft-Version"
  und die Seite trägt `noindex, nofollow` — Google sieht sie nicht.

## Was du einmalig einrichten musst

Zwei Werte fehlen dem Setup noch:

### 1. `SANITY_VIEWER_TOKEN` (Netlify Env)

Ein Sanity-API-Token mit Read-Zugriff, damit der Renderer Drafts holen darf.

1. In [sanity.io/manage](https://www.sanity.io/manage/personal/project/k31tvjv8/api/tokens)
   → Projekt Footballschland → API → **Add API Token**.
2. Name: `Netlify Blockblog Preview`, Rolle: **Viewer** (reicht — nur Read).
3. Token kopieren.
4. In Netlify → Site settings → Environment variables → **Add variable**
   - Key: `SANITY_VIEWER_TOKEN`
   - Value: der eben kopierte Token
   - Scope: Alle Contexts, Scopes: Builds + Runtime
   - Als Secret markieren

### 2. `SANITY_STUDIO_PREVIEW_TOKEN` (GitHub Actions Secret)

Der URL-Token, den das Studio in seinen Preview-Link einbetten muss.

1. In GitHub → Repo Settings → Secrets and variables → Actions → **New repository secret**
   - Name: `SANITY_STUDIO_PREVIEW_TOKEN`
   - Value: derselbe String wie die Netlify-Env `SANITY_PREVIEW_TOKEN`
     (Claude hat ihn beim Setup generiert und in beiden Systemen abgelegt —
     wenn du ihn brauchst, siehst du ihn in Netlify → Env vars).
2. Nach dem nächsten Push von `sanity.config.ts` läuft der Deploy-Workflow und
   das Studio bekommt den Token als Build-Input.
3. Alternativ manueller Trigger: GitHub → Actions → „Sanity Studio Deploy" →
   „Run workflow".

## Wenn du den Token rotieren willst

1. Neuen Zufalls-String erzeugen (32 Zeichen, URL-safe, z. B.
   `node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"`).
2. In Netlify die Env `SANITY_PREVIEW_TOKEN` auf den neuen Wert setzen.
3. In GitHub das Secret `SANITY_STUDIO_PREVIEW_TOKEN` auf denselben neuen Wert setzen.
4. Beide Deploys (Netlify + Sanity Studio) neu triggern.

`SANITY_VIEWER_TOKEN` kannst du unabhängig davon rotieren — in Sanity das alte
Token widerrufen, neues generieren, in Netlify aktualisieren.

## Fehlerbild-Debug

- **Button im Studio führt auf published Seite ohne `?preview=`**: der Studio-Build
  hat `SANITY_STUDIO_PREVIEW_TOKEN` nicht gesehen. Secret gesetzt? Workflow
  seit dem Setzen erneut gelaufen?
- **Preview-Seite lädt, zeigt aber die published Version**: `SANITY_VIEWER_TOKEN`
  fehlt oder ist ungültig — `previewClient` bekommt kein Token, also fällt der
  Astro-Renderer auf `sanityClient` (published) zurück.
- **Rote Balken „Vorschau" ist da, Draft-Inhalte trotzdem nicht**: Token existiert,
  aber Sanity-Rolle reicht nicht. Viewer-Rolle muss auf Projekt-Ebene sein
  (nicht Organisation).
