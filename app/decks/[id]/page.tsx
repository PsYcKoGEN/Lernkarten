import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DeckPage({ params }: { params: { id: string } }) {
  const deck = await prisma.deck.findUnique({
    where: { id: params.id },
    include: { cards: { include: { reviews: true }, orderBy: { createdAt: "desc" } } }
  });
  if (!deck) return notFound();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">{deck.title}</h1>
        <p className="text-gray-600">{deck.description}</p>
      </div>

      <div className="grid gap-4">
        {deck.cards.map(card => (
          <div key={card.id} className="rounded-xl border bg-white p-5">
            <div className="font-medium">{card.question}</div>
            <div className="mt-2 text-gray-700">{card.answer}</div>
            <form
              className="mt-4 flex gap-2"
              action={async (formData: FormData) => {
                "use server";
                const rating = Number(formData.get("rating") ?? 3);
                await prisma.review.create({
                  data: { rating, cardId: card.id }
                });
                const { scheduleNext } = await import("@/lib/spaced");
                const { nextIntervalDays } = await scheduleNext(rating, card.intervalDays ?? 1, card.ease ?? 2.5);
                await prisma.card.update({
                  where: { id: card.id },
                  data: {
                    intervalDays: nextIntervalDays,
                    nextReview: new Date(Date.now() + nextIntervalDays * 86400000)
                  }
                });
              }}
            >
              {[1,2,3,4,5].map(r => (
                <button key={r} name="rating" value={r}
                  className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                >
                  {r}
                </button>
              ))}
            </form>
            <div className="mt-2 text-xs text-gray-500">
              Nächste Wiederholung: {card.nextReview?.toLocaleDateString("de-DE") ?? "heute"}
            </div>
          </div>
        ))}
        {deck.cards.length === 0 && <p className="text-gray-600">Keine Karten gefunden.</p>}
      </div>
    </div>
  );
}
