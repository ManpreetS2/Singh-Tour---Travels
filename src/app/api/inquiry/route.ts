import { NextRequest, NextResponse } from "next/server";
import {
  formatTelegramHtml,
  parseInquiryBody,
  type InquiryPayload,
} from "@/lib/inquiry";
import { rateLimit } from "@/lib/rate-limit";

type TelegramResult =
  | { sent: true }
  | { sent: false; reason: "demo" | "telegram_error" | "network" };

async function sendTelegram(data: InquiryPayload): Promise<TelegramResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    return { sent: false, reason: "demo" };
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramHtml(data),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      // Do not leak Telegram error bodies to the client
      console.error("Telegram sendMessage failed", res.status);
      return { sent: false, reason: "telegram_error" };
    }

    return { sent: true };
  } catch (err) {
    console.error("Telegram network error", err);
    return { sent: false, reason: "network" };
  }
}

function clientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `inquiry:${ip}`;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(clientKey(req));
  if (!limited.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many enquiries. Please wait a minute and try again.",
        fallback: true,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body.", fallback: true },
      { status: 400 },
    );
  }

  const { data, errors } = parseInquiryBody(raw);

  // Honeypot: pretend success so bots get nothing useful
  if (data.company) {
    return NextResponse.json({ ok: true, delivered: "honeypot" });
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the form fields.", errors, fallback: false },
      { status: 400 },
    );
  }

  const telegram = await sendTelegram(data);

  if (telegram.sent) {
    return NextResponse.json({ ok: true, delivered: "telegram" });
  }

  // Demo mode or Telegram failure — client shows WhatsApp / SMS fallback
  return NextResponse.json({
    ok: true,
    delivered: "fallback",
    reason: telegram.reason,
    inquiry: {
      name: data.name,
      phone: data.phone,
      destination: data.destination,
      startDate: data.startDate,
      endDate: data.endDate,
      travellers: data.travellers,
      message: data.message,
    },
  });
}
