"use client";

import { useState, type FormEvent } from "react";

const PLAYER_CATEGORIES = [
  { value: "mens-pro", label: "Men's Professional" },
  { value: "womens-pro", label: "Women's Professional" },
  { value: "collegiate", label: "Collegiate" },
  { value: "youth", label: "Youth / Development" },
  { value: "alumni", label: "Retired / Alumni" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function JoinForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      playerCategory: formData.get("playerCategory"),
      club: formData.get("club"),
      consentGiven: formData.get("consentGiven") === "on",
    };

    try {
      const res = await fetch("/api/members", {
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
          Application received
        </h2>
        <p className="mt-2 text-sm text-black/60">
          Thank you for applying to join KBPA. Our team will review your
          application and follow up by email once it has been processed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" name="fullName" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Date of birth" name="dateOfBirth" type="date" required />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-kbpa-black">
            Player category
            <span className="text-kbpa-orange"> *</span>
          </label>
          <select
            name="playerCategory"
            required
            className="mt-1.5 w-full rounded-lg border border-black/15 bg-kbpa-white px-3 py-2.5 text-sm text-kbpa-black outline-none focus:border-kbpa-orange"
          >
            <option value="">Select a category</option>
            {PLAYER_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <Field label="Club (optional)" name="club" required={false} />
      </div>

      <label className="flex items-start gap-3 text-sm text-black/70">
        <input
          type="checkbox"
          name="consentGiven"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-kbpa-orange"
        />
        I consent to KBPA processing this information for membership
        purposes.
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-kbpa-orange px-7 py-3 text-sm font-semibold text-kbpa-black transition-colors hover:bg-kbpa-orange-dark hover:text-kbpa-white disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Application"}
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
