import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import NewsCarousel, { type NewsCardData } from "./NewsCarousel";

export default async function LatestNews() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "news",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 12,
    depth: 1,
  });

  if (docs.length === 0) return null;

  const items: NewsCardData[] = docs.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: item.category,
    publishedAt: item.publishedAt ?? null,
    imageUrl:
      item.featuredImage &&
      typeof item.featuredImage === "object" &&
      item.featuredImage.url
        ? item.featuredImage.url
        : null,
    imageAlt:
      item.featuredImage && typeof item.featuredImage === "object"
        ? (item.featuredImage.alt ?? null)
        : null,
    videoUrl:
      item.featuredVideo &&
      typeof item.featuredVideo === "object" &&
      item.featuredVideo.url
        ? item.featuredVideo.url
        : null,
  }));

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

        <NewsCarousel items={items} />
      </div>
    </section>
  );
}
