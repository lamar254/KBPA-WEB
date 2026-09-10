const PILLARS = [
  {
    title: "Protect",
    description:
      "Safeguarding player rights, welfare, and fair treatment across every level of the game.",
  },
  {
    title: "Represent",
    description:
      "Giving players a collective, credible voice in decisions that shape Kenyan basketball.",
  },
  {
    title: "Educate",
    description:
      "Equipping players with knowledge of their rights, contracts, and career pathways.",
  },
  {
    title: "Empower",
    description:
      "Building skills and opportunities that support players on and beyond the court.",
  },
  {
    title: "Advocate",
    description:
      "Pushing for systemic change that puts players' interests at the center of the game.",
  },
];

export default function Pillars() {
  return (
    <section className="bg-kbpa-off-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
            Our Foundation
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
            Five Pillars
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-black/5 bg-kbpa-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="h-1 w-10 rounded-full bg-kbpa-orange" />
              <h3 className="mt-4 text-lg font-bold text-kbpa-black">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-black/60">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
