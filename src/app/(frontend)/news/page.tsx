import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60;

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "news", label: "News" },
  { value: "player-story", label: "Player Story" },
  { value: "statement", label: "Statement" },
  { value: "event-recap", label: "Event Recap" },
];

const CATEGORY_LABELS: Record<string, string> = {
  news: "News",
  "player-story": "Player Story",
  statement: "Statement",
  "event-recap": "Event Recap",
};

type Args = {
  searchParams: Promise<{ category?: string }>;
};

export default async function NewsIndexPage({ searchParams }: Args) {
  const { category } = await searchParams;
  const activeCategory = CATEGORIES.some((c) => c.value === category)
    ? category
    : "";

  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "news",
    where: {
      status: { equals: "published" },
      ...(activeCategory ? { category: { equals: activeCategory } } : {}),
    },
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

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
        <aside>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              const href = cat.value ? `/news?category=${cat.value}` : "/news";
              return (
                <Link
                  key={cat.value || "all"}
                  href={href}
                  className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-kbpa-black text-kbpa-white"
                      : "text-black/60 hover:bg-kbpa-off-white hover:text-kbpa-black"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div>
          {docs.length === 0 ? (
            <p className="text-sm text-black/60">
              No articles{activeCategory ? " in this category" : ""} yet.
              Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {docs.map((item) => {
                const image =
                  item.featuredImage && typeof item.featuredImage === "object"
                    ? item.featuredImage
                    : null;
                const video =
                  item.featuredVideo && typeof item.featuredVideo === "object"
                    ? item.featuredVideo
                    : null;

                return (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-kbpa-off-white transition-colors hover:border-kbpa-orange"
                  >
                    <div className="relative aspect-[16/10] w-full bg-kbpa-black/90">
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={image.alt ?? item.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      ) : video?.url ? (
                        <video
                          src={video.url}
                          className="h-full w-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-kbpa-orange">
                        {CATEGORY_LABELS[item.category] ?? item.category}
                      </span>
                      <h2 className="mt-2 text-base font-bold text-kbpa-black">
                        {item.title}
                      </h2>
                      {item.excerpt && (
                        <p className="mt-2 text-sm text-black/60">
                          {item.excerpt}
                        </p>
                      )}
                      {item.publishedAt && (
                        <span className="mt-auto pt-4 text-xs text-black/40">
                          {new Date(item.publishedAt).toLocaleDateString(
                            "en-KE",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
