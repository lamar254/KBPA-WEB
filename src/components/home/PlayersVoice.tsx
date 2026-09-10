import Link from "next/link";

export default function PlayersVoice() {
  return (
    <section className="bg-kbpa-black py-16 text-kbpa-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
          Players&rsquo; Voice
        </p>
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <blockquote className="lg:col-span-2">
            <p className="text-2xl font-semibold leading-snug sm:text-3xl">
              &ldquo;For the first time, players have a body that listens,
              represents, and fights for us not just on court, but in
              every part of the game.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/60">
              A KBPA member, Kenyan Premier League
            </footer>
          </blockquote>
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 p-6">
            <p className="text-sm text-white/70">
              Advocacy is at the heart of what we do from contract
              disputes to policy reform. Read how KBPA is pushing for a
              fairer game.
            </p>
            <Link
              href="/advocacy"
              className="inline-flex w-fit items-center justify-center rounded-full border border-kbpa-orange px-5 py-2.5 text-sm font-semibold text-kbpa-orange transition-colors hover:bg-kbpa-orange hover:text-kbpa-black"
            >
              Explore Advocacy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
