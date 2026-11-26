import Link from "next/link";

export default function ConceptsIndex() {
  return (
    <main className="min-h-svh bg-[#0E1424] px-6 py-16 text-[#F4EFE6]">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9AA3B5]">
          Concept demo · pick a direction
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Singh Tour & Travels — V2 visual concepts
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#9AA3B5]">
          Two commissioned art directions for the owner to compare. These are
          visual concept pages, not the final site. Call +91 98187 49172 to
          confirm any trip.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          <li>
            <Link
              href="/concepts/a"
              className="block rounded-sm border border-[#F2A93B]/40 bg-[#1A2236] p-6 transition hover:border-[#F2A93B]"
            >
              <p className="font-mono text-xs text-[#F2A93B]">DIRECTION A</p>
              <h2 className="mt-2 text-2xl">Departures · रवानगी</h2>
              <p className="mt-2 text-sm text-[#9AA3B5]">
                Night departure board. Sodium amber on indigo. Ticket planner.
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/concepts/b"
              className="block rounded-sm border border-[#C8641E]/40 bg-[#1F1A16] p-6 transition hover:border-[#C8641E]"
            >
              <p className="font-mono text-xs text-[#E8955A]">DIRECTION B</p>
              <h2 className="mt-2 text-2xl">Safarnama · सफ़रनामा</h2>
              <p className="mt-2 text-sm text-[#9AA3B5]">
                Road journal. Warm paper, editorial chapters, family voice.
              </p>
            </Link>
          </li>
        </ul>
        <p className="mt-10 text-sm text-[#9AA3B5]">
          <Link href="/" className="underline underline-offset-4">
            ← Back to V1 site
          </Link>
        </p>
      </div>
    </main>
  );
}
