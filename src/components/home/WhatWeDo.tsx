import Link from "next/link";

const CARDS = [
  {
    title: "Legal & Rights Support",
    description:
      "Guidance on contracts, agent disputes, and player rights within Kenyan and international basketball.",
    href: "/what-we-do#legal",
  },
  {
    title: "Player Welfare",
    description:
      "Confidential support for players facing welfare, health, or off-court challenges.",
    href: "/what-we-do#welfare",
  },
  {
    title: "Career Development",
    description:
      "Pathways, mentorship, and resources to help players grow their careers on and off the court.",
    href: "/what-we-do#career",
  },
  {
    title: "Advocacy & Policy",
    description:
      "Working with federations and stakeholders to improve standards across the sport.",
    href: "/what-we-do#advocacy",
  },
];

export default function WhatWeDo() {
  return (
    <section className="bg-kbpa-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
              What We Do
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
              Support built around players
            </h2>
          </div>
          <Link
            href="/what-we-do"
            className="text-sm font-semibold text-kbpa-black underline decoration-kbpa-orange decoration-2 underline-offset-4 hover:text-kbpa-orange"
          >
            See all programs
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-black/10 bg-kbpa-off-white p-6 transition-colors hover:border-kbpa-orange sm:p-8"
            >
              <h3 className="text-xl font-bold text-kbpa-black">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-black/60">
                {card.description}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-kbpa-orange">
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
