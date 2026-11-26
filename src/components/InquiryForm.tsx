"use client";

import { useState, type FormEvent } from "react";
import {
  inquirySmsUrl,
  inquiryWhatsAppUrl,
  type InquiryPayload,
} from "@/lib/inquiry";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof InquiryPayload, string>>;

type ApiResponse = {
  ok: boolean;
  delivered?: "telegram" | "fallback" | "honeypot";
  reason?: string;
  error?: string;
  errors?: FieldErrors;
  inquiry?: InquiryPayload;
  fallback?: boolean;
};

const empty: InquiryPayload = {
  name: "",
  phone: "",
  destination: "",
  startDate: "",
  endDate: "",
  travellers: "2",
  message: "",
  company: "",
};

type Props = {
  className?: string;
  destinationSuggestions?: string[];
  initial?: Partial<InquiryPayload>;
  /** Compact = trip planner on paper background; default = dark sections */
  tone?: "paper" | "ink";
};

export function InquiryForm({
  className,
  destinationSuggestions = [],
  initial,
  tone = "paper",
}: Props) {
  const [form, setForm] = useState<InquiryPayload>({ ...empty, ...initial });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "telegram" | "fallback" | "error"
  >("idle");
  const [fallbackPayload, setFallbackPayload] = useState<InquiryPayload | null>(
    null,
  );
  const [serverError, setServerError] = useState("");

  const light = tone === "paper";

  function setField<K extends keyof InquiryPayload>(key: K, value: InquiryPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as ApiResponse;

      if (!res.ok && data.errors) {
        setErrors(data.errors);
        setStatus("error");
        setServerError(data.error || "Please check the form.");
        return;
      }

      if (!res.ok && data.fallback) {
        setFallbackPayload(form);
        setStatus("fallback");
        setServerError(
          data.error ||
            "We could not deliver instantly — please send via WhatsApp or SMS.",
        );
        return;
      }

      if (data.ok && data.delivered === "telegram") {
        setStatus("telegram");
        setForm({ ...empty, travellers: "2" });
        return;
      }

      if (data.ok && (data.delivered === "fallback" || data.delivered === "honeypot")) {
        setFallbackPayload(data.inquiry ?? form);
        setStatus("fallback");
        return;
      }

      setFallbackPayload(form);
      setStatus("fallback");
    } catch {
      setFallbackPayload(form);
      setStatus("fallback");
      setServerError(
        "Connection issue — please send your enquiry via WhatsApp or SMS instead.",
      );
    }
  }

  const inputClass = cn(
    "focus-ring mt-1.5 w-full rounded-sm border px-3 py-3 text-base outline-none",
    light
      ? "border-ink/15 bg-white text-ink"
      : "border-sandstone/25 bg-indigo text-paper",
  );

  const labelClass = cn(
    "text-sm font-medium",
    light ? "text-ink/80" : "text-sandstone",
  );

  return (
    <div className={className}>
      {status === "telegram" && (
        <div
          role="status"
          className={cn(
            "mb-6 rounded-sm border px-4 py-3 text-sm",
            light
              ? "border-clay/30 bg-clay/10 text-ink"
              : "border-sandstone/30 bg-indigo text-paper",
          )}
        >
          Enquiry sent. We will get back to you shortly — thank you.
        </div>
      )}

      {status === "fallback" && fallbackPayload && (
        <div
          role="status"
          className={cn(
            "mb-6 rounded-sm border px-4 py-4",
            light
              ? "border-clay/40 bg-white text-ink"
              : "border-sandstone/30 bg-indigo text-paper",
          )}
        >
          <p className="text-sm leading-relaxed">
            {serverError ||
              "Instant notify is in demo mode (or temporarily unavailable). Send the same enquiry as a text so the owner still receives it:"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={inquiryWhatsAppUrl(fallbackPayload)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press focus-ring rounded-sm bg-clay px-4 py-2.5 text-sm font-semibold text-paper"
            >
              Send on WhatsApp
            </a>
            <a
              href={inquirySmsUrl(fallbackPayload)}
              className="btn-press focus-ring rounded-sm border px-4 py-2.5 text-sm font-medium"
              style={{
                borderColor: light ? "rgba(20,17,14,0.2)" : "rgba(232,217,196,0.35)",
              }}
            >
              Send as SMS
            </a>
          </div>
        </div>
      )}

      {status === "error" && serverError && (
        <p role="alert" className="mb-4 text-sm text-clay">
          {serverError}
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        {/* Honeypot — hidden from users */}
        <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
          <label>
            Company
            <input
              tabIndex={-1}
              autoComplete="off"
              value={form.company ?? ""}
              onChange={(e) => setField("company", e.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Name</span>
            <input
              required
              name="name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className={inputClass}
              autoComplete="name"
            />
            {errors.name && (
              <span className="mt-1 block text-xs text-clay">{errors.name}</span>
            )}
          </label>
          <label className="block">
            <span className={labelClass}>Phone</span>
            <input
              required
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+91 …"
              className={inputClass}
              autoComplete="tel"
            />
            {errors.phone && (
              <span className="mt-1 block text-xs text-clay">{errors.phone}</span>
            )}
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Destination</span>
          <input
            required
            list="inquiry-destinations"
            name="destination"
            value={form.destination}
            onChange={(e) => setField("destination", e.target.value)}
            placeholder="e.g. Amritsar, Manali, Agra…"
            className={inputClass}
            autoComplete="off"
          />
          <datalist id="inquiry-destinations">
            {destinationSuggestions.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
          {errors.destination && (
            <span className="mt-1 block text-xs text-clay">
              {errors.destination}
            </span>
          )}
        </label>

        <div className="grid gap-5 sm:grid-cols-3">
          <label className="block">
            <span className={labelClass}>Start date</span>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={(e) => setField("startDate", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>End date</span>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={(e) => setField("endDate", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Travellers</span>
            <input
              type="number"
              min={1}
              max={40}
              name="travellers"
              value={form.travellers}
              onChange={(e) => setField("travellers", e.target.value)}
              className={inputClass}
            />
            {errors.travellers && (
              <span className="mt-1 block text-xs text-clay">
                {errors.travellers}
              </span>
            )}
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Message</span>
          <textarea
            name="message"
            rows={3}
            value={form.message}
            onChange={(e) => setField("message", e.target.value)}
            placeholder="Airport pickup, vehicle preference, luggage…"
            className={cn(inputClass, "resize-y")}
          />
        </label>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-press focus-ring rounded-sm bg-clay px-5 py-3 text-sm font-semibold text-paper disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send enquiry"}
          </button>
          <p
            className={cn(
              "text-xs",
              light ? "text-ink/50" : "text-muted",
            )}
          >
            Instant notify via Telegram when configured · otherwise WhatsApp / SMS
          </p>
        </div>
      </form>
    </div>
  );
}
