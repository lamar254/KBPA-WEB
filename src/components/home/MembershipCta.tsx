import Link from "next/link";

export default function MembershipCta() {
  return (
    <section className="bg-kbpa-orange py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold text-kbpa-black sm:text-4xl">
            Every player deserves a seat at the table.
          </h2>
          <p className="mt-3 text-base text-black/70">
            Membership is free to join and gives you access to KBPA&rsquo;s
            support network, resources, and representation.
          </p>
        </div>
        <Link
          href="/join"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-kbpa-black px-7 py-3.5 text-sm font-semibold text-kbpa-white transition-colors hover:bg-kbpa-charcoal"
        >
          Join KBPA Today
        </Link>
      </div>
    </section>
  );
}
