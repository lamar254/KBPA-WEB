import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

export default async function Partners() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "partners",
    limit: 5,
    depth: 1,
  });

  if (docs.length === 0) return null;

  return (
    <section className="bg-kbpa-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
              Partners
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
              Working together for the game
            </h2>
          </div>
          <Link
            href="/partners"
            className="text-sm font-semibold text-kbpa-black underline decoration-kbpa-orange decoration-2 underline-offset-4 hover:text-kbpa-orange"
          >
            See all partners
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {docs.map((partner) => (
            <div
              key={partner.id}
              className="flex h-24 items-center justify-center rounded-xl border border-black/10 bg-kbpa-off-white px-4 text-center"
            >
              {partner.logo &&
              typeof partner.logo === "object" &&
              partner.logo.url ? (
                <div className="relative h-10 w-full">
                  <Image
                    src={partner.logo.url}
                    alt={partner.logo.alt ?? partner.name}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              ) : (
                <span className="text-xs font-semibold text-black/50">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
