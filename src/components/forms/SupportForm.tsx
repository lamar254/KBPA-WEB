"use client";

import { useState, type FormEvent } from "react";

const CATEGORIES = [
  { value: "legal-rights", label: "Legal / Rights" },
  { value: "welfare", label: "Welfare" },
  { value: "contract-agent", label: "Contract / Agent" },
  { value: "career", label: "Career" },
  { value: "other", label: "Other" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function SupportForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      category: formData.get("category"),
      description: formData.get("description"),
      status: "new",
      submittedBy: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
      },
    };

    try {
      const res = await fetch("/api/support-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.errors?.[0]?.message || "Something went wrong. Please try again.",
        );
      }

      setReferenceNumber(data?.doc?.referenceNumber ?? null);
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
          Your case has been logged
        </h2>
        <p className="mt-2 text-sm text-black/60">
          This enquiry is confidential and only visible to KBPA support
          staff. Keep your reference number to track its progress.
        </p>
        {referenceNumber && (
          <p className="mt-4 text-lg font-bold text-kbpa-orange">
            {referenceNumber}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="rounded-lg bg-kbpa-off-white px-4 py-3 text-xs text-black/60">
        This form is confidential. Only KBPA support staff can view what you
        submit here.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Phone (optional)" name="phone" type="tel" required={false} />

      <div>
        <label className="block text-sm font-semibold text-kbpa-black">
          Category <span className="text-kbpa-orange">*</span>
        </label>
        <select
          name="category"
          required
          className="mt-1.5 w-full rounded-lg border border-black/15 bg-kbpa-white px-3 py-2.5 text-sm text-kbpa-black outline-none focus:border-kbpa-orange"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-kbpa-black">
          Tell us what&rsquo;s going on{" "}
          <span className="text-kbpa-orange">*</span>
        </label>
        <textarea
          name="description"
          required
          rows={6}
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
        {status === "submitting" ? "Submitting..." : "Submit Confidentially"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-kbpa-black">
        {label}
        {required && <span className="text-kbpa-orange"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-black/15 bg-kbpa-white px-3 py-2.5 text-sm text-kbpa-black outline-none focus:border-kbpa-orange"
      />
    </div>
  );
}
