import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const decks = await prisma.deck.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { cards: true } } }
  });

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Deine Decks</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {decks.map((d) => (
          <Link
            key={d.id}
            href={`/decks/${d.id}`}
            className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">{d.title}</h2>
              <span className="text-sm text-gray-500">{d._count.cards} Karten</span>
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{d.description}</p>
          </Link>
        ))}
        {decks.length === 0 && (
          <p className="text-gray-600">Noch keine Decks – starte im <a className="underline" href="/upload">Upload</a>.</p>
        )}
      </div>
    </div>
  );
}
