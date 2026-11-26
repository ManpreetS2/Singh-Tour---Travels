import { business } from "@/lib/business";

export type InquiryPayload = {
  name: string;
  phone: string;
  destination: string;
  startDate: string;
  endDate: string;
  travellers: string;
  message: string;
  company?: string;
};

export type InquiryFieldErrors = Partial<
  Record<keyof InquiryPayload, string>
>;

const MAX = {
  name: 80,
  phone: 24,
  destination: 120,
  startDate: 32,
  endDate: 32,
  travellers: 8,
  message: 1000,
} as const;

export function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function sanitizeMultiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

export function parseInquiryBody(raw: unknown): {
  data: InquiryPayload;
  errors: InquiryFieldErrors;
} {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;

  const data: InquiryPayload = {
    name: sanitizeText(body.name, MAX.name),
    phone: sanitizeText(body.phone, MAX.phone),
    destination: sanitizeText(body.destination, MAX.destination),
    startDate: sanitizeText(body.startDate, MAX.startDate),
    endDate: sanitizeText(body.endDate, MAX.endDate),
    travellers: sanitizeText(body.travellers, MAX.travellers),
    message: sanitizeMultiline(body.message, MAX.message),
    company: sanitizeText(body.company, 80),
  };

  const errors: InquiryFieldErrors = {};

  if (!data.name || data.name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!data.phone || !/^[\d+\-\s()]{7,24}$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!data.destination) {
    errors.destination = "Please enter a destination.";
  }
  if (data.travellers && !/^\d{1,2}$/.test(data.travellers)) {
    errors.travellers = "Travellers should be a number.";
  }
  const n = Number(data.travellers || "0");
  if (data.travellers && (n < 1 || n > 40)) {
    errors.travellers = "Travellers should be between 1 and 40.";
  }

  return { data, errors };
}

export function formatDateEnIN(iso: string): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || "?";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(dt);
}

export function formatDateDdMmYyyy(iso: string): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || "?";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function formatInquiryMessage(data: InquiryPayload): string {
  const start = formatDateEnIN(data.startDate);
  const end = data.endDate ? formatDateEnIN(data.endDate) : "";
  const dates = end && end !== start ? `${start} to ${end}` : start;
  const lines = [
    `Enquiry — ${business.name}`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `From: Delhi`,
    `To: ${data.destination}`,
    `When: ${dates || "?"}`,
    `Travellers: ${data.travellers || "?"}`,
  ];
  if (data.message) lines.push(`Note: ${data.message}`);
  return lines.join("\n");
}

export function formatTelegramHtml(data: InquiryPayload): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  return [
    `<b>New enquiry — ${esc(business.name)}</b>`,
    `<b>Name:</b> ${esc(data.name)}`,
    `<b>Phone:</b> ${esc(data.phone)}`,
    `<b>Destination:</b> ${esc(data.destination)}`,
    `<b>Dates:</b> ${esc(formatDateEnIN(data.startDate))}${data.endDate ? ` → ${esc(formatDateEnIN(data.endDate))}` : ""}`,
    `<b>Travellers:</b> ${esc(data.travellers || "?")}`,
    data.message ? `<b>Note:</b> ${esc(data.message)}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
