import Image from "next/image";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayloadClient } from "@/lib/payload";
import { richTextProseClasses } from "@/lib/richTextStyles";

export default async function CmsPage({ slug }: { slug: string }) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    limit: 1,
    depth: 1,
  });

  const page = docs[0];
  if (!page) notFound();

  const hasSections = page.sections && page.sections.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-kbpa-black sm:text-4xl">
          {page.title}
        </h1>
        {page.body && (
          <div className={richTextProseClasses}>
            <RichText data={page.body} />
          </div>
        )}
      </div>

      {hasSections && (
        <div className="mt-16 space-y-16">
          {page.sections!.map((section, index) => {
            const image =
              section.image && typeof section.image === "object"
                ? section.image
                : null;
            const imageOnRight = index % 2 === 0;

            return (
              <div
                key={section.id ?? index}
                className={`flex flex-col gap-8 lg:items-center lg:gap-12 ${
                  image
                    ? imageOnRight
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                    : ""
                }`}
              >
                <div className={image ? "lg:w-1/2" : "mx-auto max-w-3xl w-full"}>
                  {section.heading && (
                    <h2 className="text-2xl font-extrabold text-kbpa-orange">
                      {section.heading}
                    </h2>
                  )}
                  <div className={richTextProseClasses + " !mt-4"}>
                    <RichText data={section.body} />
                  </div>
                </div>
                {image && image.url && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-kbpa-off-white lg:w-1/2">
                    <Image
                      src={image.url}
                      alt={image.alt ?? section.heading ?? page.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
