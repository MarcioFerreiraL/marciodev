import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";
import { ROUTES, THEMES } from "./routes";

/** Aperta Tab até `target` receber o foco. */
async function tabUntil(page: Page, target: Locator) {
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((el) => el === document.activeElement)) return;
  }
  throw new Error("o elemento não recebeu foco pelo teclado");
}

const outlineOf = (el: Element) => {
  const s = getComputedStyle(el);
  return { width: parseFloat(s.outlineWidth), style: s.outlineStyle };
};

for (const theme of THEMES) {
  test.describe(`acessibilidade · tema ${theme}`, () => {
    test.use({ colorScheme: theme });

    for (const route of ROUTES) {
      test(`axe sem violações serious/critical em ${route}`, async ({ page }) => {
        await page.goto(route);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        // Espera a animação de entrada terminar para medir o contraste final.
        await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)));
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        const graves = results.violations
          .filter((v) => v.impact === "serious" || v.impact === "critical")
          .map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target.join(" ")) }));
        expect(graves).toEqual([]);
      });
    }

    test("foco visível", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

      const toggle = page.locator("[data-theme-toggle]");
      // Primeiro link do topo: currículo quando pronto, senão GitHub.
      const cv = page.locator("main section").first().locator("a").first();
      const cardLink = page.locator('[data-project-card] a[href^="/projetos/"]').first();

      // Ordem do documento: cabeçalho → topo (currículo) → destaques.
      await tabUntil(page, toggle);
      let o = await toggle.evaluate(outlineOf);
      expect(o.style).not.toBe("none");
      expect(o.width).toBeGreaterThanOrEqual(2);

      await tabUntil(page, cv);
      o = await cv.evaluate(outlineOf);
      expect(o.style).not.toBe("none");
      expect(o.width).toBeGreaterThanOrEqual(2);

      await tabUntil(page, cardLink);
      o = await cardLink.evaluate((el) => {
        const s = getComputedStyle(el.closest(".card")!);
        return { width: parseFloat(s.outlineWidth), style: s.outlineStyle };
      });
      expect(o.style).not.toBe("none");
      expect(o.width).toBeGreaterThanOrEqual(2);
    });
  });
}
