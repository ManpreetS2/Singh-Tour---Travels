import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:43123";
const OUT = "/opt/cursor/artifacts";
fs.mkdirSync(OUT, { recursive: true });

const shots = [];

async function shot(page, name) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  shots.push(file);
  console.log("saved", file);
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  // Desktop 1440
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto(BASE, { waitUntil: "networkidle" });
    await shot(page, "desktop-1440-hero");

    await page.locator("#destinations").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await shot(page, "desktop-1440-destinations");

    await page.locator("#planner").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, "desktop-1440-planner");

    // Fill planner and submit → fallback
    await page.fill('input[name="name"]', "Demo Guest");
    await page.fill('input[name="phone"]', "+91 98100 00000");
    await page.fill('input[name="destination"]', "Manali");
    await page.fill('input[name="startDate"]', "2026-12-10");
    await page.fill('input[name="endDate"]', "2026-12-14");
    await page.fill('input[name="travellers"]', "4");
    await page.fill('textarea[name="message"]', "Family trip, prefer SUV");
    await page.getByRole("button", { name: /Send enquiry/i }).click();
    await page.getByRole("link", { name: /Send on WhatsApp/i }).waitFor({
      timeout: 8000,
    });
    await shot(page, "desktop-1440-planner-fallback");

    // Filters
    await page.locator("#destinations").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Mountains", exact: true }).click();
    await page.waitForTimeout(300);
    await shot(page, "desktop-1440-destinations-mountains");

    await page.locator("#reviews").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, "desktop-1440-reviews");

    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await shot(page, "desktop-1440-contact");

    // Link checks
    const call = await page.locator('a[href^="tel:"]').first().getAttribute("href");
    const wa = await page
      .locator('a[href*="wa.me/919818749172"]')
      .first()
      .getAttribute("href");
    console.log("call link", call, "wa sample", wa?.slice(0, 60));
    if (errors.length) console.log("console errors", errors);
    else console.log("no console errors on desktop");

    await context.close();
  }

  // Mobile 390 portrait
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await shot(page, "mobile-390-hero");
    await page.locator("#destinations").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, "mobile-390-destinations");
    await page.locator("#planner").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, "mobile-390-planner");
    await page.locator("#reviews").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, "mobile-390-reviews");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await shot(page, "mobile-390-contact");
    await context.close();
  }

  // Mobile 390 landscape
  {
    const context = await browser.newContext({
      viewport: { width: 844, height: 390 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await shot(page, "mobile-390-landscape-hero");
    await page.locator("#destinations").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, "mobile-390-landscape-destinations");
    await page.locator("#planner").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, "mobile-390-landscape-planner");
    await page.locator("#reviews").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, "mobile-390-landscape-reviews");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await shot(page, "mobile-390-landscape-contact");
    await context.close();
  }

  await browser.close();
  fs.writeFileSync(
    path.join(OUT, "screenshot-index.json"),
    JSON.stringify(shots, null, 2),
  );
  console.log("done", shots.length, "screenshots");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
