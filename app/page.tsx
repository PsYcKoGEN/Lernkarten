export default function HomePage() {
  return (
    <div className="grid gap-6">
      <section className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-3 text-3xl font-bold">Willkommen 👋</h1>
        <p className="text-gray-600">
          Lade ein PDF hoch und erzeuge daraus automatisch Karteikarten. Lerne sie anschließend mit einfachem Spaced Repetition.
        </p>
        <div className="mt-6 space-x-4">
          <a href="/upload" className="rounded-xl border px-4 py-2 hover:bg-gray-50">PDF hochladen</a>
          <a href="/dashboard" className="rounded-xl bg-black px-4 py-2 text-white">Zum Dashboard</a>
        </div>
      </section>
      <section className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-2xl font-semibold">So funktioniert's</h2>
        <ol className="list-decimal space-y-1 pl-5 text-gray-700">
          <li>PDF hochladen</li>
          <li>Karten generieren</li>
          <li>Im Dashboard lernen & Reviews registrieren</li>
        </ol>
      </section>
    </div>
  );
}
