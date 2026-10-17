import { expect, test } from "@playwright/test";

test.describe("404", () => {
  test("não é indexada e não declara canonical", async ({ page }) => {
    const res = await page.goto("/qualquer-coisa");
    expect(res?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
  });

  test("mostra o caminho que a pessoa digitou", async ({ page }) => {
    await page.goto("/pagina-que-nao-existe");
    await expect(page.locator("[data-caminho]")).toHaveText("/pagina-que-nao-existe");
  });

  test("páginas normais continuam indexáveis", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });
});
