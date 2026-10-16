import { expect, test, type Page } from "@playwright/test";
import { ROUTES } from "./routes";

const WIDTHS = [360, 768, 1440] as const;

/** Largura do documento além da janela (0 = sem rolagem horizontal). */
const overflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

test.describe("responsivo", () => {
  for (const width of WIDTHS) {
    test.describe(`${width}px`, () => {
      test.use({ viewport: { width, height: 800 } });
      for (const route of ROUTES) {
        test(`sem rolagem horizontal em ${route}`, async ({ page }) => {
          await page.goto(route);
          expect(await overflow(page)).toBeLessThanOrEqual(0);
        });
      }
    });
  }
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("sem animações nos cards em /", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-project-card]").first()).toBeVisible();
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  });
});

// Roda só contra o build com fixtures (npm run test:e2e:fixtures → playwright.fixtures.config.ts).
test.describe("conteúdo longo @fixtures", () => {
  test.use({ viewport: { width: 360, height: 800 } });
  for (const route of ["/", "/projetos", "/projetos/projeto-longo"]) {
    test(`título de 80 caracteres e 4 tags longas sem rolagem horizontal em ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.getByText("Plataforma de Observabilidade Distribuída").first()).toBeVisible();
      expect(await overflow(page)).toBeLessThanOrEqual(0);
      // Nada cortado dentro dos cards (overflow-hidden esconderia o estouro da página).
      const clipped = await page.evaluate(() =>
        [...document.querySelectorAll(".card")].filter((c) => c.scrollWidth > c.clientWidth).length,
      );
      expect(clipped).toBe(0);
    });
  }
});

test.describe("projeto sem banner @fixtures", () => {
  test("card usa a imagem de capa quando não há banner", async ({ page }) => {
    await page.goto("/projetos");
    const card = page.locator("[data-project-card]", { hasText: "Plataforma de Observabilidade Distribuída" });
    await expect(card.locator("img")).toHaveCount(1);
  });
});
