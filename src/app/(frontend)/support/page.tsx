import SupportForm from "@/components/forms/SupportForm";

export const metadata = { title: "Get Support | KBPA" };

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
        Get Support
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
        We&rsquo;re here to help.
      </h1>
      <p className="mt-4 text-base text-black/60">
        Whether it&rsquo;s a legal question, a welfare concern, a contract
        dispute, or something else &mdash; reach out confidentially and a
        member of KBPA staff will follow up.
      </p>

      <div className="mt-10">
        <SupportForm />
      </div>
    </div>
  );
}
