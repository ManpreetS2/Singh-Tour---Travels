/**
 * Playwright: confirm route chapter text is not covered by the sticky map
 * at 390×844 portrait and 844×390 landscape.
 */
import { chromium } from "playwright";

const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:43123";

function overlaps(a, b) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  );
}

async function checkViewport(browser, width, height, label) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });

  await page.locator("#routes").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Both pin + compact trees exist in the DOM; only the CSS-visible layout counts
  const chapters = page.locator(".route-chapter:visible");
  const count = await chapters.count();
  if (count < 1) throw new Error(`${label}: no visible route chapters found`);

  const failures = [];

  for (let i = 0; i < count; i++) {
    const chapter = chapters.nth(i);
    await chapter.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const heading = chapter.locator("h3").first();
    const textBox = await heading.boundingBox();
    if (!textBox) {
      failures.push(`${label} chapter ${i}: heading not visible`);
      continue;
    }

    // Text must be in the viewport
    if (textBox.y + textBox.height < 0 || textBox.y > height) {
      failures.push(`${label} chapter ${i}: heading outside viewport`);
      continue;
    }

    // Sticky / inline map frame must not cover chapter heading
    const mapFrame = page.locator("[data-map-frame]").first();
    const mapCount = await mapFrame.count();
    if (mapCount > 0) {
      const mapBox = await mapFrame.boundingBox();
      if (mapBox) {
        const a = {
          left: textBox.x,
          right: textBox.x + textBox.width,
          top: textBox.y,
          bottom: textBox.y + textBox.height,
        };
        const b = {
          left: mapBox.x,
          right: mapBox.x + mapBox.width,
          top: mapBox.y,
          bottom: mapBox.y + mapBox.height,
        };
        if (overlaps(a, b)) {
          // Allow edge contact of < 2px
          const overlapH = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          const overlapW = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          if (overlapH > 2 && overlapW > 2) {
            failures.push(
              `${label} chapter ${i} ("${await heading.innerText()}"): covered by map (overlap ${Math.round(overlapW)}×${Math.round(overlapH)})`,
            );
          }
        }
      }
    }

    // Sticky call bar (portrait) must not cover chapter text
    if (height >= width) {
      const bar = page.locator('[aria-label="Quick actions"]');
      if ((await bar.count()) > 0 && (await bar.isVisible())) {
        const barBox = await bar.boundingBox();
        if (barBox) {
          const a = {
            left: textBox.x,
            right: textBox.x + textBox.width,
            top: textBox.y,
            bottom: textBox.y + textBox.height,
          };
          const b = {
            left: barBox.x,
            right: barBox.x + barBox.width,
            top: barBox.y,
            bottom: barBox.y + barBox.height,
          };
          if (overlaps(a, b)) {
            failures.push(
              `${label} chapter ${i}: covered by sticky Call bar`,
            );
          }
        }
      }
    }

    // In landscape compact mode, each chapter has its own mini highlight map —
    // heading still must be readable (not zero-size / opacity 0)
    const opacity = await heading.evaluate(
      (el) => getComputedStyle(el).opacity,
    );
    if (Number(opacity) < 0.3) {
      failures.push(`${label} chapter ${i}: heading too faint (opacity ${opacity})`);
    }
  }

  // Portrait: map sticky frame max-height ≤ 45svh (+ small tolerance)
  if (height >= width && height >= 600) {
    const mapFrame = page.locator("[data-map-frame]").first();
    if ((await mapFrame.count()) > 0) {
      const box = await mapFrame.boundingBox();
      const maxAllowed = height * 0.45 + 8;
      if (box && box.height > maxAllowed) {
        failures.push(
          `${label}: sticky map height ${Math.round(box.height)} > 45svh (${Math.round(maxAllowed)})`,
        );
      }
    }
  }

  await context.close();

  if (failures.length) {
    console.error(`FAIL ${label}`);
    failures.forEach((f) => console.error(" -", f));
    return false;
  }
  console.log(`PASS ${label}: ${count} chapters, no coverage`);
  return true;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const portrait = await checkViewport(browser, 390, 844, "390x844-portrait");
  const landscape = await checkViewport(browser, 844, 390, "844x390-landscape");
  await browser.close();
  if (!portrait || !landscape) process.exit(1);
  console.log("map-coverage: all checks passed");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
