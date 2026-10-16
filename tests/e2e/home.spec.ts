import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("apresentação", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Márcio Ferreira Lima");
    await expect(page.locator("body")).toContainText(
      "Técnico de Informática e estudante de Engenharia de Software (5º período) na UPE",
    );
    await expect(page.locator("body")).toContainText("Backend · DevOps · Infraestrutura");
  });

  test("currículos para download", async ({ page }) => {
    for (const href of ["/curriculo-pt.pdf", "/curriculo-en.pdf"]) {
      await expect(page.locator(`a[href="${href}"][download]`).first()).toBeVisible();
    }
  });

  test("destaques na ordem com Ver detalhes", async ({ page }) => {
    const cards = page.locator("[data-project-card]");
    await expect(cards).toHaveCount(4);
    const hrefs = await cards.locator("a[href^='/projetos/']").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href")),
    );
    expect(hrefs).toEqual([
      "/projetos/clinics",
      "/projetos/barbearia",
      "/projetos/assistencia-tecnica",
      "/projetos/urbansense",
    ]);
    for (const card of await cards.all()) await expect(card).toContainText("Ver detalhes");
  });

  test("card do Observatório sem link", async ({ page }) => {
    const card = page.locator("[data-mystery-card]");
    await expect(card).toContainText("em construção");
    await expect(card.locator("a")).toHaveCount(0);
  });

  test("publicação e contatos", async ({ page }) => {
    await expect(page.locator('a[href="https://doi.org/10.55034/smrv6n2-005"]')).toHaveCount(1);
    await expect(page.locator('a[href="mailto:contactmarcioflima@gmail.com"]').first()).toBeVisible();
    const html = await page.content();
    for (const banned of ["upe.br", "99906", "full-stack", "Full Stack"]) expect(html).not.toContain(banned);
  });

  test("JSON-LD Person", async ({ page }) => {
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(ld ?? "{}")["@type"]).toBe("Person");
  });
});
