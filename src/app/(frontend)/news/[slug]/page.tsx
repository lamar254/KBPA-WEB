import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  news: "News",
  "player-story": "Player Story",
  statement: "Statement",
  "event-recap": "Event Recap",
};

type Args = {
  params: Promise<{ slug: string }>;
};

export default async function NewsArticlePage({ params }: Args) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "news",
    where: {
      slug: { equals: slug },
      status: { equals: "published" },
    },
    limit: 1,
  });

  const article = docs[0];
  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <span className="text-xs font-semibold uppercase tracking-wide text-kbpa-orange">
        {CATEGORY_LABELS[article.category] ?? article.category}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
        {article.title}
      </h1>
      {article.publishedAt && (
        <p className="mt-3 text-sm text-black/40">
          {new Date(article.publishedAt).toLocaleDateString("en-KE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <div className="prose prose-neutral mt-8 max-w-none">
        <RichText data={article.body} />
      </div>
    </article>
  );
}
