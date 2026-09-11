import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60;
export const metadata = { title: "Partners | KBPA" };

const TIER_LABELS: Record<string, string> = {
  strategic: "Strategic",
  supporting: "Supporting",
  "in-kind": "In-Kind",
};

export default async function PartnersPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "partners",
    limit: 100,
    depth: 1,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
        Partners
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
        Working together for the game
      </h1>

      {docs.length === 0 ? (
        <p className="mt-10 text-sm text-black/60">
          Partner listings will appear here soon.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {docs.map((partner) => (
            <a
              key={partner.id}
              href={partner.website ?? undefined}
              target={partner.website ? "_blank" : undefined}
              rel={partner.website ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center justify-center gap-3 rounded-xl border border-black/10 bg-kbpa-off-white p-6 text-center transition-colors hover:border-kbpa-orange"
            >
              {partner.logo &&
              typeof partner.logo === "object" &&
              partner.logo.url ? (
                <div className="relative h-12 w-full">
                  <Image
                    src={partner.logo.url}
                    alt={partner.logo.alt ?? partner.name}
                    fill
                    className="object-contain"
                    sizes="200px"
                  />
                </div>
              ) : (
                <span className="text-xs font-semibold text-black/50">
                  {partner.name}
                </span>
              )}
              {partner.tier && (
                <span className="text-[10px] font-semibold uppercase tracking-wide text-kbpa-orange">
                  {TIER_LABELS[partner.tier] ?? partner.tier}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
