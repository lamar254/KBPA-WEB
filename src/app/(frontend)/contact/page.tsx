import ContactForm from "@/components/forms/ContactForm";

export const metadata = { title: "Contact | KBPA" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kbpa-orange">
        Contact
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-kbpa-black sm:text-4xl">
        Get in touch
      </h1>
      <p className="mt-4 text-base text-black/60">
        General questions, media enquiries, or partnership ideas &mdash;
        send us a message and we&rsquo;ll respond as soon as we can. Looking
        for confidential player support instead? Visit{" "}
        <a href="/support" className="font-semibold text-kbpa-orange hover:underline">
          Get Support
        </a>
        .
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
