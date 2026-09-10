const PLACEHOLDER_PARTNERS = [
  "Kenya Basketball Federation",
  "National Sports Fund",
  "Courtside Wakili",
  "Basketball Africa League",
  "County Sports Associations",
];

export default function Partners() {
  return (
    <section className="bg-kbpa-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
          Partners
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
          Working together for the game
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {PLACEHOLDER_PARTNERS.map((partner) => (
            <div
              key={partner}
              className="flex h-24 items-center justify-center rounded-xl border border-black/10 bg-kbpa-off-white px-4 text-center text-xs font-semibold text-black/50"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
