# Next 14 Flashcards (PDF ➜ Cards)

Eine minimal lauffähige Next.js 14 (App Router) App, die aus einem PDF einfache Karteikarten generiert und mit einem simplen Spaced-Repetition-Algorithmus Reviews speichert.

## Stack

- Next.js 14 (App Router, TypeScript)
- TailwindCSS
- Prisma (SQLite für lokales Dev)
- `pdf-parse` zur PDF-Textrückgewinnung

## Projektstruktur

```
app/
  api/cards/generate/route.ts  ← PDF Upload + Kartenerzeugung
  dashboard/page.tsx           ← Übersicht über Decks
  decks/[id]/page.tsx          ← Karten eines Decks + Review Buttons
  layout.tsx, page.tsx, upload/page.tsx
components/
  UploadDropzone.tsx
lib/
  llm.ts   ← naive Kartengenerierung (Platzhalter für echtes LLM)
  nlp.ts   ← Chunking & Textvorbereitung
  pdf.ts   ← PDF-Parsing (pdf-parse)
  spaced.ts← SM-2-ähnliche Planung
  prisma.ts← PrismaClient Singleton
prisma/
  schema.prisma
```

## Installation

```bash
pnpm i   # oder npm i / yarn
cp .env.example .env
pnpm prisma:migrate   # erstellt dev.db (SQLite)
pnpm dev
```

> **Hinweis:** Alle Prisma-Kommandos nutzen `--schema=./prisma/schema.prisma` wie gefordert.

## Deployment (Vercel)

1. Repository auf GitHub pushen.
2. In Vercel importieren.
3. Für persistente Daten in Produktion eine externe DB nutzen (z.B. Neon, PlanetScale, Supabase).
   - Setze `DATABASE_URL` entsprechend und führe Migrationen über CI/CD oder manuell aus.
4. Build Command: `pnpm build` (oder npm/yarn äquivalent).
5. Environment Variables: `DATABASE_URL` setzen.
6. Optional: Edge-Runtime ist **deaktiviert** für die Upload-API, da `pdf-parse` Node.js benötigt (`export const runtime = "nodejs"`).

## Review-Relation Fix

- `Card` besitzt `reviews Review[]`.
- `Review` besitzt `cardId` und Relation `card` → `Card`:

```prisma
model Review {
  id     String @id @default(cuid())
  rating Int
  card   Card   @relation(fields: [cardId], references: [id], onDelete: Cascade)
  cardId String
}
```

## Sicherheit & Größe

- Diese Demo nutzt `pdf-parse` und formData Uploads ohne Größenlimit. Passe ggf. Limits/Validierung an.
- Für echte LLMs `lib/llm.ts` anpassen und API-Keys via `.env` verwenden.

## Lizenz

MIT
