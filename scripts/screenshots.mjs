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

async function captureSet(browser, width, height, prefix) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(500);
  await shot(page, `${prefix}-hero`);

  for (const [id, name] of [
    ["destinations", "destinations"],
    ["routes", "routes"],
    ["plan", "planner"],
    ["reviews", "reviews"],
    ["contact", "contact"],
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await shot(page, `${prefix}-${name}`);
  }

  if (errors.length) {
    console.warn("page errors:", errors.slice(0, 5));
  }
  await context.close();
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  await captureSet(browser, 1440, 900, "v3-desktop-1440");
  await captureSet(browser, 390, 844, "v3-mobile-390");
  await browser.close();
  console.log("done", shots.length, "screenshots");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
