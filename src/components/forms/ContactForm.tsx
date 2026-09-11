"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      category: "other",
      status: "new",
      description: formData.get("message"),
      submittedBy: {
        name: formData.get("name"),
        email: formData.get("email"),
      },
    };

    try {
      const res = await fetch("/api/support-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data?.errors?.[0]?.message || "Something went wrong. Please try again.",
        );
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-kbpa-orange/40 bg-kbpa-off-white p-8 text-center">
        <h2 className="text-xl font-bold text-kbpa-black">
          Message sent
        </h2>
        <p className="mt-2 text-sm text-black/60">
          Thanks for reaching out. A member of the KBPA team will get back to
          you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-kbpa-black">
            Name <span className="text-kbpa-orange">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            className="mt-1.5 w-full rounded-lg border border-black/15 bg-kbpa-white px-3 py-2.5 text-sm text-kbpa-black outline-none focus:border-kbpa-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-kbpa-black">
            Email <span className="text-kbpa-orange">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1.5 w-full rounded-lg border border-black/15 bg-kbpa-white px-3 py-2.5 text-sm text-kbpa-black outline-none focus:border-kbpa-orange"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-kbpa-black">
          Message <span className="text-kbpa-orange">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-black/15 bg-kbpa-white px-3 py-2.5 text-sm text-kbpa-black outline-none focus:border-kbpa-orange"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-kbpa-orange px-7 py-3 text-sm font-semibold text-kbpa-black transition-colors hover:bg-kbpa-orange-dark hover:text-kbpa-white disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
