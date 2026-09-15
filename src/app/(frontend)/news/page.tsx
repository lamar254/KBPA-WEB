import { getPayloadClient } from "@/lib/payload";
import NewsFilterGrid, {
  type NewsListItem,
} from "@/components/news/NewsFilterGrid";

export const revalidate = 60;

export default async function NewsIndexPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "news",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 60,
    depth: 1,
  });

  const articles: NewsListItem[] = docs.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: item.category,
    excerpt: item.excerpt ?? null,
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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
        News
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
        From the association
      </h1>

      <NewsFilterGrid articles={articles} />
    </div>
  );
}
