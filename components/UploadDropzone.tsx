"use client";

import { useState, DragEvent } from "react";

export default function UploadDropzone() {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }

  async function onSubmit() {
    if (!file) return;
    setStatus("Lade hoch…");
    const form = new FormData();
    form.append("file", file);
    form.append("title", file.name.replace(/\.pdf$/i, ""));
    const res = await fetch("/api/cards/generate", { method: "POST", body: form });
    if (!res.ok) {
      setStatus("Fehler beim Generieren");
      return;
    }
    const data = await res.json();
    setStatus(`Erstellt: Deck ${data.deckId} mit ${data.count} Karten`);
    window.location.href = `/decks/${data.deckId}`;
  }

  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={"flex h-48 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed " + (drag ? "bg-gray-50" : "")}
      >
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <div className="text-center">
          <div className="text-lg">PDF hierher ziehen oder klicken</div>
          <div className="text-sm text-gray-600 mt-1">{file ? file.name : "bis 20MB"}</div>
        </div>
      </label>
      <button
        disabled={!file}
        onClick={onSubmit}
        className="mt-4 rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        Generieren
      </button>
      {status && <div className="mt-2 text-sm text-gray-600">{status}</div>}
    </div>
  );
}
