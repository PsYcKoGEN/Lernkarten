import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flashcards from PDFs",
  description: "Upload PDFs, auto-generate study decks, and review with spaced repetition."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-5xl p-6">
          <header className="flex items-center justify-between py-6">
            <a href="/" className="text-xl font-semibold">📚 Flashcards</a>
            <nav className="space-x-4">
              <a className="hover:underline" href="/upload">Upload</a>
              <a className="hover:underline" href="/dashboard">Dashboard</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-16 border-t pt-6 text-sm text-gray-500">
            Built with Next.js 14, Prisma & TailwindCSS
          </footer>
        </div>
      </body>
    </html>
  );
}
