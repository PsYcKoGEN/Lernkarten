export function normalizeWhitespace(text: string) {
  return text.replace(/[ \t\f\v]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim();
}

export function chunkText(text: string, maxChars = 800) {
  const chunks: string[] = [];
  let current = "";
  for (const line of text.split(/\n+/)) {
    if ((current + " " + line).length > maxChars) {
      if (current) chunks.push(current.trim());
      current = line;
    } else {
      current += " " + line;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export type CardDraft = { question: string; answer: string };

export function simpleCardify(chunk: string): CardDraft[] {
  const sentences = chunk.split(/(?<=[.!?])\s+/).filter(Boolean);
  const cards: CardDraft[] = [];
  for (const s of sentences.slice(0, 3)) {
    const words = s.split(" ");
    if (words.length < 6) continue;
    const mid = Math.max(5, Math.min(12, Math.floor(words.length / 2)));
    const answer = words.slice(mid).join(" ").replace(/[\s.]+$/, "");
    const question = words.slice(0, mid).join(" ") + " …?";
    cards.push({ question, answer });
  }
  if (cards.length === 0) {
    cards.push({ question: "Worum geht es hier?", answer: chunk.slice(0, 160) + (chunk.length > 160 ? "…" : "") });
  }
  return cards;
}
