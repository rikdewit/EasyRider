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

---

# PRD — Technical Rider Builder (Fase 1 MVP)

## 1. Overzicht

- **Productnaam (werktitel):** Rider Builder
- **Doelgroep:** beginnende bands & technici
- **Platform:** Web (Next.js)
- **Fase:** MVP / Fase 1
- **Opslag:** geen accounts, geen backend (client-side only)

---

## 2. Probleemstelling

**Beginnende bands:**

- maken geen rider
- weten niet wat erin moet
- leveren incomplete of onduidelijke info

**Dit leidt tot:**

- stress bij technici
- verrassingen op locatie
- onprofessionele indruk

---

## 3. Doelstelling

De gebruiker kan in maximaal 5 minuten:

- instrumenten invoeren
- een stageplot maken
- een technische rider genereren
- deze exporteren als PDF met watermerk

Zonder technische kennis.

---

## 4. Scope (wat zit erin)

### ✅ In scope (MVP)

- Instrumentenlijst invoeren
- Namen per bandlid
- Stageplot maken
- Rider preview
- PDF export
- Watermerk
- Basis uitleg (tooltips)
- Logo upload
- Print-vriendelijk document

### ❌ Out of scope (niet in Fase 1)

- Accounts
- Opslaan van riders
- Hospitality rider
- Betalingen
- Meertaligheid
- AI features
- Templates per genre (later)
- Backend database

---

## 5. Gebruikersflow

1. **Landing page** → “Maak je technische rider in 5 minuten”
2. **Stap 1: Instrumentenlijst** — Bandlid naam, instrument (dropdown), microfoon nodig (auto-voorgesteld)
3. **Stap 2: Stageplot** — Podiumvlak, drag & drop instrumenten, monitor per muzikant
4. **Stap 3: Rider info** — Bandnaam, contactpersoon, email, logo upload, opmerkingen
5. **Stap 4: Preview** — Volledig rider document
6. **Stap 5: Export** — PDF download, watermerk zichtbaar

---

## 6. Functionele Requirements

### 6.1 Instrumentenlijst

- Gebruiker kan meerdere bandleden toevoegen
- Elk bandlid heeft: naam (text), instrument (dropdown), extra opmerkingen (optioneel)
- Automatische suggestie: mic type, DI box ja/nee
- Inputlist automatisch genereren (CH1, CH2, etc.)

### 6.2 Stageplot

- Podiumweergave (rechthoek)
- Instrument iconen
- Drag & drop positioning
- Labels zichtbaar (bijv. Vocal 1, Guitar)
- Monitor indicatie per muzikant

### 6.3 Rider info

- Bandnaam (required)
- Contactpersoon (required)
- Email (required)
- Logo upload (optioneel)
- Algemene opmerkingen (textarea)

### 6.4 Preview

- Live weergave van: band info, input list, stageplot, opmerkingen
- Print layout (A4)

### 6.5 PDF export

- PDF gegenereerd vanuit preview
- Layout vast
- Watermerk onderaan: “Created with [jouwsite.nl]”
- Download knop

---

## 7. UX Requirements

- Wizard met stappen (progress indicator)
- Beginner-proof taalgebruik
- Tooltips met uitleg: “Wat is een monitor?”, “Waarom is dit belangrijk?”
- Fouten afvangen: geen lege bandnaam, minimaal 1 instrument

---

## 8. Design Requirements

- Clean & professioneel
- Muziek/tech vibe
- Mobile friendly
- Logo upload zichtbaar in PDF
- Stageplot zwart-wit printbaar

---

## 9. Niet-functionele eisen

- Werkt in moderne browsers
- Laadt snel
- Geen data wordt opgeslagen
- Privacy: geen tracking behalve analytics (optioneel)

---

## 10. Succescriteria

- Gebruiker maakt rider zonder uitleg
- PDF bruikbaar voor venue
- Tool is begrijpelijk voor niet-technici
- Watermerk zichtbaar
- Eerste 10–20 testers geven positieve feedback

---

## 11. Open vragen (voor later)

- Exacte PDF layout?
- Stageplot library (iconen)?
- Welke instrumenten in dropdown?
- Max aantal bandleden?
- Naam tool?

---

## 12. Risico’s

- Stageplot UX te complex → simpel houden
- PDF layout buggevoelig
- Te veel features willen → MVP bewaken

---

## 13. Toekomst (fase 2, niet nu)

- Account systeem
- Opslaan van riders
- Betaalde tier
- Hospitality rider
- Templates
- Meertalig
- AI suggesties

---

## Tech Notes (globaal)

**Frontend:**

- Next.js
- State management (useState / zustand)
- Drag & drop library (bijv. dnd-kit)
- PDF export (html2pdf / react-pdf)

Geen backend nodig in fase 1.
