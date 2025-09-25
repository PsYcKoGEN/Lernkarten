import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractText } from "@/lib/pdf";
import { generateCardsFromText } from "@/lib/llm";

export const runtime = "nodejs"; // pdf-parse needs Node

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  const title = String(form.get("title") || "Unbenanntes Deck");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  // @ts-ignore Buffer exists in node runtime
  const buffer = Buffer.from(arrayBuffer);

  const text = await extractText(buffer);
  const cards = await generateCardsFromText(text);

  const deck = await prisma.deck.create({
    data: {
      title,
      description: `Automatisch generiert aus ${file.name}`,
      cards: {
        create: cards.map(c => ({
          question: c.question,
          answer: c.answer,
          ease: 2.5,
          intervalDays: 1,
          nextReview: new Date()
        }))
      }
    }
  });

  return NextResponse.json({ deckId: deck.id, count: cards.length });
}
