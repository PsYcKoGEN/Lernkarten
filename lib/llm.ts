// Placeholder: real LLM integration can be wired here.
// For now we create naive Q/A cards from text chunks.
import { chunkText, simpleCardify, type CardDraft } from "@/lib/nlp";

export async function generateCardsFromText(text: string, maxCards = 20): Promise<CardDraft[]> {
  const chunks = chunkText(text);
  const drafts = chunks.flatMap(simpleCardify).slice(0, maxCards);
  return drafts;
}
