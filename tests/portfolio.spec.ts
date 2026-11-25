import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const featuredSlugs = [
  "cm-stock",
  "conlac-t",
  "trello-github",
  "face-access-cnn",
];
const slugs = [
  ...featuredSlugs,
  "flota-traccar",
  "reasons",
  "icase",
  "smartpick-recommender",
];
const es = [
  "/",
  "/proyectos/",
  "/sobre-mi/",
  "/contacto/",
  "/cv/",
  ...slugs.map((slug) => "/proyectos/" + slug + "/"),
];
const en = [
  "/en/",
  "/en/projects/",
  "/en/about/",
  "/en/contact/",
  "/en/cv/",
  ...slugs.map((slug) => "/en/projects/" + slug + "/"),
];

test("publishes the Spanish and English routes and resolves internal links", async ({
  page,
  request,
}) => {
  const issues: string[] = [];
  page.on("pageerror", (error) => issues.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") issues.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) issues.push(response.url());
  });
  const targets = new Set<string>();
  for (const [i, path] of [...es, ...en].entries()) {
    expect((await page.goto(path))?.status(), path).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      i < es.length ? "es" : "en",
    );
    await expect(page.locator("a.language")).toHaveAttribute(
      "href",
      i < es.length ? en[i] : es[i - es.length],
    );
    for (const target of await page
      .locator('a[href^="/"], img[src^="/"], link[href^="/"]')
      .evaluateAll((nodes) =>
        nodes.map(
          (node) => node.getAttribute("href") ?? node.getAttribute("src") ?? "",
        ),
      ))
      targets.add(target);
  }
  for (const target of targets)
    expect((await request.get(target)).ok(), target).toBe(true);
  expect(issues).toEqual([]);
  expect((await page.goto("/sin-esta-ruta/"))?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Página no encontrada" }),
  ).toBeVisible();
});

for (const width of [375, 768, 1024, 1440]) {
  test("fits the viewport at " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [...es, ...en]) {
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        path,
      ).toBe(width);
    }
    if (width === 375 || width === 1440) {
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: "test-results/screenshots/home-" + width + ".png",
        fullPage: true,
      });
    }
  });
}

test("catalog filters all eight projects and home retains the original four", async ({
  page,
  browser,
}) => {
  const filters = {
    web: ["cm-stock", "conlac-t", "reasons"],
    integration: ["flota-traccar"],
    automation: ["trello-github"],
    ai: ["face-access-cnn", "smartpick-recommender"],
    engineering: ["icase"],
    all: slugs,
  };
  const noScript = await browser.newContext({ javaScriptEnabled: false });
  try {
    const staticPage = await noScript.newPage();
    for (const [home, catalog, singular, plural] of [
      ["/", "/proyectos/", "proyecto", "proyectos"],
      ["/en/", "/en/projects/", "project", "projects"],
    ]) {
      await page.goto(home);
      const links = page.locator(".project-card a");
      await expect(links).toHaveCount(4);
      for (const [i, slug] of featuredSlugs.entries()) {
        await expect(links.nth(i)).toHaveAttribute(
          "href",
          catalog + slug + "/",
        );
      }
      await staticPage.goto(catalog);
      await expect(staticPage.locator(".project-card:visible")).toHaveCount(8);
      await expect(staticPage.getByRole("status")).toHaveText("8 " + plural);
      await page.goto(catalog);
      await expect(page.getByRole("status")).toHaveText("8 " + plural);
      for (const [category, expected] of Object.entries(filters)) {
        const button = page.locator(`button[data-filter="${category}"]`);
        await button.focus();
        await page.keyboard.press("Enter");
        await expect(button).toHaveAttribute("aria-pressed", "true");
        const visible = page.locator(".project-card:visible a");
        await expect(visible).toHaveCount(expected.length);
        for (const [i, slug] of expected.entries()) {
          await expect(visible.nth(i)).toHaveAttribute(
            "href",
            catalog + slug + "/",
          );
        }
        await expect(page.getByRole("status")).toHaveText(
          expected.length + " " + (expected.length === 1 ? singular : plural),
        );
      }
    }
  } finally {
    await noScript.close();
  }
});

test("new case studies link to their specified repositories and back to the catalog", async ({
  page,
}) => {
  const repositories = {
    "flota-traccar": ["materubag/ProyectoFlotaTraccar"],
    reasons: ["materubag/REASONS_Frontend", "materubag/REASONS_backend"],
    icase: ["materubag/Proyecto_ICase"],
    "smartpick-recommender": [
      "Cuadrado1224/SmartPick-frontend",
      "Cuadrado1224/SmartPick-backend",
    ],
  };
  for (const catalog of ["/proyectos/", "/en/projects/"]) {
    for (const [slug, expected] of Object.entries(repositories)) {
      await page.goto(catalog + slug + "/");
      const links = page.locator(
        "article.prose a[href^='https://github.com/']",
      );
      await expect(links).toHaveCount(expected.length);
      for (const [i, repository] of expected.entries()) {
        await expect(links.nth(i)).toHaveAttribute(
          "href",
          "https://github.com/" + repository,
        );
      }
      await expect(page.locator("main a.text-link").first()).toHaveAttribute(
        "href",
        catalog,
      );
    }
  }
});

test("mobile menu and language switch work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 800 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await page.locator("summary").focus();
    await page.keyboard.press("Enter");
    await page
      .getByRole("navigation", { name: "Navegación principal" })
      .getByRole("link", { name: "Proyectos" })
      .click();
    await page.locator("a.language").click();
    await expect(page).toHaveURL("/en/projects/");
  } finally {
    await context.close();
  }
});

test("contact copies email", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contacto/");
  await page.getByRole("button", { name: "Copiar correo" }).click();
  await expect(page.getByRole("status")).toHaveText("Correo copiado.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "mateorubag@gmail.com",
  );
});

test("CV renders immediately and downloads on mobile in both languages", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 375, height: 800 });
  const pdfPath = "/cv/Mateo_Rubio_CV.pdf";
  const response = await request.get(pdfPath);
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  for (const [path, viewerName, downloadName, zoomIn, zoomOut] of [
    ["/cv/", "Visor del currículum", "Descargar PDF", "Ampliar", "Alejar"],
    ["/en/cv/", "Résumé viewer", "Download PDF", "Zoom in", "Zoom out"],
  ]) {
    await page.goto(path);
    const viewer = page.getByRole("region", { name: viewerName });
    const preview = viewer.getByRole("img");
    await expect(preview).toBeVisible();
    const initialWidth = (await preview.boundingBox())!.width;
    const zoom = viewer.getByRole("button");
    await expect(zoom).toHaveAccessibleName(zoomIn);
    await zoom.click();
    await expect(zoom).toHaveAccessibleName(zoomOut);
    expect((await preview.boundingBox())!.width).toBeGreaterThan(initialWidth);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(375);
    await zoom.click();
    await expect(zoom).toHaveAccessibleName(zoomIn);
    expect((await preview.boundingBox())!.width).toBe(initialWidth);
    await expect
      .poll(() =>
        preview.evaluate((image: HTMLImageElement) => image.naturalWidth),
      )
      .toBeGreaterThan(0);
    const link = viewer.getByRole("link", { name: downloadName });
    await expect(link).toHaveAttribute("href", pdfPath);
    const download = page.waitForEvent("download");
    await link.click();
    expect((await download).suggestedFilename()).toBe("Mateo_Rubio_CV.pdf");
  }
});

test("basic accessibility on each page type", async ({ page }) => {
  for (const path of [
    "/",
    "/proyectos/",
    "/proyectos/face-access-cnn/",
    "/sobre-mi/",
    "/contacto/",
    "/cv/",
    "/en/",
  ]) {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(violations, path).toEqual([]);
  }
});

test("the original CV and phone numbers are absent from the public build", async () => {
  const files = await readdir("dist", { recursive: true });
  expect(files).not.toContain("MateoRubio_2026_CV.pdf");
  for (const file of files.filter((entry) =>
    /\.(html|js|json|txt|xml)$/.test(entry),
  )) {
    const source = await readFile(join("dist", file), "utf8");
    expect(source, file).not.toMatch(
      /href=["']tel:|(?<![\w.])(?:\+593[ .-]?(?:0)?9(?:[ .-]?\d){8}|09\d{2}[ .-]\d{3}[ .-]\d{3})(?!\d)/,
    );
  }
});
