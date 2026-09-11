import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayloadClient } from "@/lib/payload";

export default async function CmsPage({ slug }: { slug: string }) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    limit: 1,
  });

  const page = docs[0];
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="text-3xl font-extrabold text-kbpa-black sm:text-4xl">
        {page.title}
      </h1>
      {page.body && (
        <div className="prose prose-neutral mt-8 max-w-none">
          <RichText data={page.body} />
        </div>
      )}
    </div>
  );
}
