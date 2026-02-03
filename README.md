# Easy Rider — Technische Rider (Fase 1 MVP)

Webtool voor beginnende bands en technici: maak in ~5 minuten een technische rider met instrumentenlijst, stageplot en PDF-export.

## Features (MVP)

- **Stap 1:** Instrumentenlijst — bandleden, instrument (dropdown), mic-suggestie, DI, optionele opmerkingen
- **Stap 2:** Stageplot — podiumweergave, drag & drop posities, monitor per muzikant
- **Stap 3:** Rider info — bandnaam, contact, e-mail, logo-upload, opmerkingen
- **Stap 4:** Preview — volledig rider-document
- **Stap 5:** Export — PDF-download met watermerk

Geen accounts, geen backend; alles client-side.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (state)
- **@dnd-kit** (drag & drop stageplot)
- **html2canvas + jsPDF** (PDF-export)

## Lokaal draaien

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Start op de landingspagina, klik op “Start je rider” en doorloop de 5 stappen.

## Build

```bash
npm run build
npm start
```

## PRD

Zie het PRD-document voor scope, gebruikersflow en toekomstige fases (accounts, opslaan, hospitality, meertaligheid, etc.).
