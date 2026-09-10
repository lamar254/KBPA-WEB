import Link from "next/link";

const PLACEHOLDER_NEWS = [
  {
    title: "KBPA statement on the 2026 league restructuring",
    category: "Statement",
    date: "2026-08-14",
    href: "/news",
  },
  {
    title: "Player spotlight: the journey from Eldoret to the national team",
    category: "Player Story",
    date: "2026-08-02",
    href: "/news",
  },
  {
    title: "Recap: KBPA welfare workshop in Nairobi",
    category: "Event Recap",
    date: "2026-07-21",
    href: "/news",
  },
];

export default function LatestNews() {
  return (
    <section className="bg-kbpa-off-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
              Latest News
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
              From the association
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm font-semibold text-kbpa-black underline decoration-kbpa-orange decoration-2 underline-offset-4 hover:text-kbpa-orange"
          >
            View all news
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PLACEHOLDER_NEWS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-kbpa-white transition-colors hover:border-kbpa-orange"
            >
              <div className="aspect-[16/10] w-full bg-kbpa-black/90" />
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-kbpa-orange">
                  {item.category}
                </span>
                <h3 className="mt-2 text-base font-bold text-kbpa-black">
                  {item.title}
                </h3>
                <span className="mt-auto pt-4 text-xs text-black/40">
                  {new Date(item.date).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
