import { mkdir } from "node:fs/promises";
import { expect, test } from "@playwright/test";

async function prepareFullPageScreenshot(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    const pause = (milliseconds: number) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds));

    // The site uses smooth scrolling; jump instantly so every section is
    // actually visited (and revealed) before the full-page capture.
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.75) {
      window.scrollTo(0, y);
      await pause(150);
    }

    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = scrollBehavior;
    // The grid now loads ~26 photos from the Lightroom proxy; decode each,
    // but bound the wait so a slow rendition can't exceed the test budget.
    await Promise.race([
      Promise.all([...document.images].map((image) => image.decode())),
      pause(20000),
    ]);
    await document.fonts.ready;
    await pause(1400);
  });

  for (const selector of ["#about .about-reveal", "#contact .contact-reveal"]) {
    const reveal = page.locator(selector).first();
    if (await reveal.count()) {
      await reveal.scrollIntoViewIfNeeded();
      await expect(reveal).toHaveCSS("opacity", "1");
    }
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

test("captures the desktop portfolio", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page).toHaveTitle(/Familien Story/);
  await prepareFullPageScreenshot(page);
  await mkdir("artifacts/screenshots", { recursive: true });
  await page.screenshot({
    path: "artifacts/screenshots/portfolio-desktop.png",
    fullPage: true,
  });
});

test("captures the mobile portfolio", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page).toHaveTitle(/Familien Story/);
  await prepareFullPageScreenshot(page);
  await mkdir("artifacts/screenshots", { recursive: true });
  await page.screenshot({
    path: "artifacts/screenshots/portfolio-mobile.png",
    fullPage: true,
  });
});

test("shows the full Lightroom work without filters or external gallery links", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const grid = page.locator("#portfolio .portfolio-bento");
  const count = await grid.locator(".work-tile").count();
  // The grid is fed by the Lightroom share (or the bundled fallback), so it
  // must not be empty — and no tiles may spill outside the grid.
  expect(count).toBeGreaterThan(0);
  const fitsWithinGrid = await grid.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return [...element.querySelectorAll(".work-tile")].every((tile) => {
      const tileBounds = tile.getBoundingClientRect();
      return tileBounds.left >= bounds.left - 1 && tileBounds.right <= bounds.right + 1;
    });
  });
  expect(fitsWithinGrid).toBeTruthy();

  // The category filter tabs and the external "vollständige Galerie" link
  // were removed: the grid shows every photo of the share directly.
  await expect(page.locator("#portfolio .portfolio-filters")).toHaveCount(0);
  await expect(page.getByText("Die vollständige Galerie")).toHaveCount(0);
});

test("keeps section navigation and WhatsApp booking links functional", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  await page.locator('header nav a[href="#portfolio"]').first().click();
  await expect(page).toHaveURL(/#portfolio$/);

  const whatsappLinks = await page.locator('a[href^="https://wa.me/"]').evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).href),
  );
  expect(whatsappLinks.length).toBeGreaterThan(2);
  for (const href of whatsappLinks) {
    const url = new URL(href);
    expect(url.pathname).toBe("/4917664094869");
    expect(url.searchParams.get("text")).toContain("Hallo Kateryna");
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  // The stylesheet enables smooth scrolling; force an instant jump so the
  // #contact hash navigation settles before the in-viewport assertion
  // (the longer Lightroom-fed grid makes the scroll distance larger).
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  await page.getByRole("button", { name: "Navigation öffnen" }).click();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Kontakt" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
  await expect(page.locator("#contact .contact-reveal").first()).toHaveCSS("opacity", "1");

  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Navigation öffnen" }).click();
  await expect(
    page.locator("#mobile-navigation a[href^='https://wa.me/']"),
  ).toBeVisible();
});

test("switches between German and Russian and updates the document language", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await page.getByRole("button", { name: "Auf Russisch umstellen" }).click();

  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  // #work-heading: the section heading is asserted on a single element — the
  // page carries the same copy in two sections (work + process), so an
  // unscoped getByRole would resolve to both and fail strict mode.
  await expect(page.locator("#work-heading")).toHaveText("Настоящие моменты. Навсегда.");
  await page.getByRole("button", { name: "Переключить на немецкий" }).click();

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator("#work-heading")).toHaveText("Echte Momente. Für immer.");
});

test("traps lightbox focus and restores it to the selected photo", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const alt = await page
    .locator(".work-tile img")
    .first()
    .evaluate((img) => img.getAttribute("alt") ?? "");
  const photo = page.getByRole("button", { name: `${alt} — vergrößern` });
  await photo.click();
  const dialog = page.getByRole("dialog", { name: alt });
  const closeButton = dialog.getByRole("button", { name: "Schließen" });
  const nextButton = dialog.getByRole("button", { name: "Nächstes Bild" });
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(nextButton).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(closeButton).toBeFocused();
  await page.keyboard.press("Escape");

  await expect(dialog).toHaveCount(0);
  await expect(photo).toBeFocused();
});

test("keeps content usable with reduced motion enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator(".camera-guide")).toHaveCount(0);
  await expect(page.locator("#top h1")).toBeVisible();
  await expect(page.locator("#contact a[href^='https://wa.me/']")).toBeVisible();
});

test("serves the legal pages through the Worker fallback", async ({ page }) => {
  await mkdir("artifacts/screenshots", { recursive: true });
  const pageTitles: Record<string, string> = {
    "/impressum": "Impressum — FAMILIENSTORY",
    "/datenschutz": "Datenschutzerklärung — FAMILIENSTORY",
  };

  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const path of ["/impressum", "/datenschutz"]) {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page).toHaveTitle(pageTitles[path]);
      await prepareFullPageScreenshot(page);
      await page.screenshot({
        path: `artifacts/screenshots/${path.slice(1)}-${viewport.name}.png`,
        fullPage: true,
      });
    }
  }
});

test("keeps legal pages readable without horizontal overflow on narrow screens", async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });

    for (const path of ["/impressum", "/datenschutz"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${path} overflows at ${width}px`,
      ).toBeTruthy();
      expect(
        await page.locator("h1, h2").evaluateAll((headings) =>
          headings.every((heading) => heading.scrollWidth <= heading.clientWidth + 1),
        ),
        `${path} has a clipped heading at ${width}px`,
      ).toBeTruthy();
    }
  }
});
