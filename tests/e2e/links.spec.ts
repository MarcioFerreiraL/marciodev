import { expect, test } from "@playwright/test";
import { site, t } from "../../src/i18n/pt";
import { whatsappLink } from "../../src/lib/whatsapp";

test.describe("/links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/links");
  });

  test("foto, nome e frase", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
    await expect(page.locator("main img")).toHaveCount(1);
    await expect(page.locator("main")).toContainText(t.links.tagline);
  });

  test("botões na ordem: WhatsApp, serviços, portfólio", async ({ page }) => {
    const hrefs = await page.locator("[data-link]").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(hrefs.slice(0, 3)).toEqual([whatsappLink(site.whatsapp, t.links.message), "/servicos", "/"]);
  });

  test("sem Instagram enquanto não houver perfil profissional", async ({ page }) => {
    test.skip(site.instagram !== null, "Instagram configurado");
    await expect(page.locator("[data-link]")).toHaveCount(3);
    await expect(page.locator('a[href="null"], a[href=""]')).toHaveCount(0);
  });

  test("redes sociais com nome acessível", async ({ page }) => {
    const redes = page.locator("[data-social]");
    await expect(redes.locator(`a[href="${site.linkedin}"]`)).toHaveAttribute("aria-label", "LinkedIn");
    await expect(redes.locator(`a[href="${site.github}"]`)).toHaveAttribute("aria-label", "GitHub");
    await expect(redes.locator(`a[href="mailto:${site.email}"]`)).toHaveAttribute("aria-label", "E-mail");
    if (site.instagram === null) await expect(redes.locator('a[aria-label="Instagram"]')).toHaveCount(0);
  });

  test("sem cabeçalho e rodapé do site", async ({ page }) => {
    await expect(page.locator("header nav")).toHaveCount(0);
    await expect(page.locator("footer")).toHaveCount(0);
  });
});
