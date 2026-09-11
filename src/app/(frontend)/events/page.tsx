import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60;
export const metadata = { title: "Events | KBPA" };

export default async function EventsPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "events",
    sort: "-date",
    limit: 50,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
        Events
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
        Upcoming and past events
      </h1>

      {docs.length === 0 ? (
        <p className="mt-10 text-sm text-black/60">
          No events scheduled yet. Check back soon.
        </p>
      ) : (
        <div className="mt-10 space-y-4">
          {docs.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border border-black/10 bg-kbpa-off-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-kbpa-orange">
                {new Date(event.date).toLocaleDateString("en-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {event.location ? ` · ${event.location}` : ""}
              </p>
              <h2 className="mt-2 text-xl font-bold text-kbpa-black">
                {event.title}
              </h2>
              {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-kbpa-orange hover:underline"
                >
                  Register &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
