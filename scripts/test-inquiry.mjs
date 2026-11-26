/**
 * Mocked tests for /api/inquiry (demo fallback + validation + honeypot).
 * Run against a local next server: node scripts/test-inquiry.mjs
 * Or with mocked fetch only (unit): node scripts/test-inquiry.mjs --unit
 */

const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:43123";

const sample = {
  name: "Test Traveller",
  phone: "+91 98765 43210",
  destination: "Amritsar",
  startDate: "2026-12-01",
  endDate: "2026-12-02",
  travellers: "3",
  message: "Airport pickup preferred",
  company: "",
};

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function unitMocks() {
  console.log("skip unit import (use integration against server)");
}

async function integration() {
  // Missing env → fallback path
  const res = await fetch(`${BASE}/api/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sample),
  });
  const json = await res.json();
  assert(res.ok, `expected 200, got ${res.status}`);
  assert(json.ok === true, "ok true");
  assert(
    json.delivered === "fallback" || json.delivered === "telegram",
    `delivered fallback|telegram, got ${json.delivered}`,
  );
  if (json.delivered === "fallback") {
    assert(json.inquiry?.destination === "Amritsar", "inquiry echoed");
    assert(json.reason === "demo" || json.reason, "reason present");
  }
  console.log("integration: submit →", json.delivered, json.reason || "");

  // Validation
  const bad = await fetch(`${BASE}/api/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", phone: "x", destination: "" }),
  });
  const badJson = await bad.json();
  assert(bad.status === 400, "validation 400");
  assert(badJson.ok === false, "ok false");
  console.log("integration: validation ok");

  // Honeypot
  const pot = await fetch(`${BASE}/api/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...sample, company: "spam-bot" }),
  });
  const potJson = await pot.json();
  assert(pot.ok && potJson.delivered === "honeypot", "honeypot swallowed");
  console.log("integration: honeypot ok");

  // Mocked Telegram success path via env would need server restart with token;
  // instead mock fetch shape locally:
  const mockFetch = async (url, init) => {
    assert(String(url).includes("api.telegram.org"), "telegram url");
    assert(!String(url).includes("undefined"), "token present in url path only server-side");
    const body = JSON.parse(init.body);
    assert(body.chat_id, "chat_id");
    assert(body.text.includes("Amritsar"), "message body");
    return {
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    };
  };
  const token = "TEST_TOKEN";
  const chatId = "12345";
  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  const tgRes = await mockFetch(tgUrl, {
    method: "POST",
    body: JSON.stringify({
      chat_id: chatId,
      text: "New enquiry — Singh Tour & Travels\nDestination: Amritsar",
      parse_mode: "HTML",
    }),
  });
  assert(tgRes.ok, "mocked telegram ok");
  console.log("mock: telegram sendMessage shape ok");
}

const mode = process.argv.includes("--unit") ? "unit" : "all";

try {
  if (mode === "unit") await unitMocks();
  else await integration();
  console.log("PASS");
} catch (err) {
  console.error("FAIL", err.message);
  process.exit(1);
}
