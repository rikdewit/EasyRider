import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-stage-light to-slate-900 text-white">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Maak je technische rider in 5 minuten
        </h1>
        <p className="mt-6 text-lg text-slate-300">
          Voor beginnende bands en technici. Voer je instrumenten in, teken je
          stageplot en download een professionele rider als PDF — zonder
          technische kennis.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/builder"
            className="rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-accent-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Start je rider
          </Link>
        </div>
        <ul className="mt-16 grid gap-4 text-left sm:grid-cols-3 sm:gap-6">
          <li className="rounded-xl border border-stage-border bg-stage/50 p-4 backdrop-blur">
            <span className="font-semibold text-accent">1.</span> Instrumenten
            invoeren
          </li>
          <li className="rounded-xl border border-stage-border bg-stage/50 p-4 backdrop-blur">
            <span className="font-semibold text-accent">2.</span> Stageplot
            maken
          </li>
          <li className="rounded-xl border border-stage-border bg-stage/50 p-4 backdrop-blur">
            <span className="font-semibold text-accent">3.</span> PDF
            downloaden
          </li>
        </ul>
      </div>
    </main>
  );
}
