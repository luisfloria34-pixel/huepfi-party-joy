# KI-Webagentur Workflow

## Standard-Architektur

Kunde -> Domain -> Vercel -> Frontend -> Sanity

Lovable bleibt nur Frontend-Builder. Kunden bekommen keinen Zugriff auf Lovable, GitHub, Vercel oder Code.

## Kunden-Setup

1. Lovable-Frontend erstellen.
2. Sanity-Projekt pro Kunde anlegen.
3. Schema aus `sanity/schemas` importieren.
4. Vercel-Env setzen:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET=production`
   - `VITE_SANITY_API_VERSION=2026-03-01`
   - `VITE_SANITY_USE_CDN=true`
5. Domain in Vercel verbinden.
6. Sanity-CORS für Domain und Vercel-Preview erlauben.
7. Kunden nur als Sanity-Editor einladen.

## Hüpfi Projekt

- Sanity Project ID: `4njm9ki2`
- Dataset: `production`
- Studio: `sanity/`
- Seed: `sanity/seed/siteSettings.ndjson`

Studio lokal starten:

```bash
cd sanity
npm install
npm run dev
```

Erstdaten importieren:

```bash
npx sanity dataset import seed/siteSettings.ndjson production --replace
```

## Diese Website

`public/sanity-loader.js` lädt `siteSettings` aus Sanity und überschreibt markierte Inhalte in `public/huepfi.html`.

Ohne `VITE_SANITY_PROJECT_ID` läuft die Website mit Fallback-Inhalten weiter.

## Sanity-Dokument

Ein Dokument vom Typ `siteSettings` muss existieren.

Bearbeitbar:

- Firmenname
- Hero-Texte
- Hero-Bild
- Leistungen
- Über-uns-Inhalt
- Kontakt
- Öffnungszeiten
- Blogbeiträge

Nicht bearbeitbar:

- Layout
- Komponenten
- Design
- Hosting
