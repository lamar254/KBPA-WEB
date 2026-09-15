import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  news: "News",
  "player-story": "Player Story",
  statement: "Statement",
  "event-recap": "Event Recap",
};

export default async function NewsIndexPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "news",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 24,
    depth: 1,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
        News
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
        From the association
      </h1>

      {docs.length === 0 ? (
        <p className="mt-10 text-sm text-black/60">
          No articles published yet. Check back soon.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-kbpa-off-white transition-colors hover:border-kbpa-orange"
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
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-kbpa-orange">
                  {CATEGORY_LABELS[item.category] ?? item.category}
                </span>
                <h2 className="mt-2 text-base font-bold text-kbpa-black">
                  {item.title}
                </h2>
                {item.excerpt && (
                  <p className="mt-2 text-sm text-black/60">{item.excerpt}</p>
                )}
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
      )}
    </div>
  );
}
