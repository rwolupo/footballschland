# content/

Quelle-der-Wahrheit-Ordner für Inhalte, die über Claude/Git nach Sanity gespielt werden.

Jede `*.json`-Datei unterhalb von `content/` wird beim nächsten Main-Push durch den
Workflow `.github/workflows/sanity-content-sync.yml` via `createOrReplace` nach Sanity
geschrieben. Die SSR-Seite liest anschließend live – Artikel sind ca. 30–90 Sek. nach dem
Push sichtbar.

## Format

Eine JSON-Datei = ein Sanity-Dokument. Minimal für einen Blockblog-Artikel:

```json
{
  "_type": "blockblogPost",
  "slug": { "_type": "slug", "current": "artikel-slug" },
  "title": "…",
  "description": "…",
  "pubDate": "2026-04-20",
  "author": "Daniel Düngel",
  "category": "NFL Draft",
  "readTime": "5 Min.",
  "body": [
    { "_type": "block", "children": [{ "_type": "span", "text": "Hallo Welt" }] }
  ]
}
```

- `_id` kann weggelassen werden – das Script leitet `blockblogPost-<slug>` ab.
- Custom-Blocks (`playerCard`, `playerTable`, `mockDraftComparison`, `imageGallery`)
  laut `sanity.config.ts` verwendbar.
- Bild-Uploads (`heroImage`, Bilder in `playerCard` etc.) werden **nicht**
  automatisch hochgeladen; Assets bitte weiterhin direkt im Studio pflegen oder
  per Asset-Referenz einfügen.

## Warnung

`createOrReplace` überschreibt existierende Dokumente komplett. Wenn du denselben
Artikel parallel im Studio editierst, gehen die Studio-Änderungen beim nächsten
Sync verloren. Konvention: Artikel, die hier liegen, werden hier gepflegt.
