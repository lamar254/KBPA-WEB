import JoinForm from "@/components/forms/JoinForm";

export const metadata = { title: "Join KBPA | KBPA" };

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
        Join KBPA
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
        Every player deserves a seat at the table.
      </h1>
      <p className="mt-4 text-base text-black/60">
        Membership is free to join and gives you access to KBPA&rsquo;s
        support network, resources, and representation. Fill out the form
        below and our team will review your application.
      </p>

      <div className="mt-10">
        <JoinForm />
      </div>
    </div>
  );
}
