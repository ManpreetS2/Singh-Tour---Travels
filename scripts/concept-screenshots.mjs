import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:43123";
const OUT = "/opt/cursor/artifacts";
fs.mkdirSync(OUT, { recursive: true });

async function shoot(page, name) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log("saved", file);
}

async function captureConcept(browser, letter, pathSuffix) {
  const sections = [
    ["hero", "#hero"],
    ["destinations", "#destinations"],
    ["planner", "#planner"],
    ["reviews-contact", "#reviews"],
  ];

  // Desktop 1440
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(`${BASE}${pathSuffix}`, { waitUntil: "networkidle" });
    for (const [slug, sel] of sections) {
      await page.locator(sel).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await shoot(page, `concept-${letter}-desktop-1440-${slug}`);
    }
    // Extra contact frame
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shoot(page, `concept-${letter}-desktop-1440-contact`);
    if (errors.length) console.log(letter, "desktop errors", errors);
    else console.log(letter, "desktop: no page errors");
    await ctx.close();
  }

  // Mobile 390
  {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${pathSuffix}`, { waitUntil: "networkidle" });
    for (const [slug, sel] of sections) {
      await page.locator(sel).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await shoot(page, `concept-${letter}-mobile-390-${slug}`);
    }
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shoot(page, `concept-${letter}-mobile-390-contact`);
    await ctx.close();
  }
}

const browser = await chromium.launch({ headless: true });
await captureConcept(browser, "a", "/concepts/a");
await captureConcept(browser, "b", "/concepts/b");
await browser.close();
console.log("done");
