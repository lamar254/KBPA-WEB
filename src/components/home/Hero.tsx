import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-kbpa-black text-kbpa-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,19,0.18),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
          Kenya Basketball Players Association
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          The Players Are the Game.
        </h1>
        <p className="max-w-xl text-base text-white/70 sm:text-lg">
          KBPA is the voice and support system for every Kenyan basketball
          player on and off the court. We protect rights, represent
          interests, and advocate for a fairer game.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/join"
            className="inline-flex items-center justify-center rounded-full bg-kbpa-orange px-6 py-3 text-sm font-semibold text-kbpa-black transition-colors hover:bg-kbpa-orange-dark hover:text-kbpa-white"
          >
            Join KBPA
          </Link>
          <Link
            href="/support"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-kbpa-white transition-colors hover:border-kbpa-orange hover:text-kbpa-orange"
          >
            Get Support
          </Link>
        </div>
      </div>
    </section>
  );
}
