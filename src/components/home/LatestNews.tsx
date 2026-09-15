import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

const CATEGORY_LABELS: Record<string, string> = {
  news: "News",
  "player-story": "Player Story",
  statement: "Statement",
  "event-recap": "Event Recap",
};

export default async function LatestNews() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "news",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 3,
    depth: 1,
  });

  if (docs.length === 0) return null;

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
          {docs.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-kbpa-white transition-colors hover:border-kbpa-orange"
            >
              <div className="relative aspect-[16/10] w-full bg-kbpa-black/90">
                {item.featuredImage &&
                  typeof item.featuredImage === "object" &&
                  item.featuredImage.url && (
                    <Image
                      src={item.featuredImage.url}
                      alt={item.featuredImage.alt ?? item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-kbpa-orange">
                  {CATEGORY_LABELS[item.category] ?? item.category}
                </span>
                <h3 className="mt-2 text-base font-bold text-kbpa-black">
                  {item.title}
                </h3>
                {item.publishedAt && (
                  <span className="mt-auto pt-4 text-xs text-black/40">
                    {new Date(item.publishedAt).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
