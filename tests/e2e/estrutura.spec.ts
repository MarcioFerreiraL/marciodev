import { expect, test } from "@playwright/test";
import { ROUTES } from "./routes";

test("número de estudos de caso no texto bate com os cards", async ({ page }) => {
  await page.goto("/projetos");
  const cards = await page.locator("[data-project-card]").count();
  await expect(page.locator("[data-case-count]")).toHaveText(String(cards));
});

for (const route of ROUTES) {
  test(`ids únicos em ${route}`, async ({ page }) => {
    await page.goto(route);
    const repetidos = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
      return ids.filter((id, i) => ids.indexOf(id) !== i);
    });
    expect(repetidos).toEqual([]);
  });
}
