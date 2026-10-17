import { expect, test } from "@playwright/test";
import { site, t } from "../../src/i18n/pt";
import { whatsappLink } from "../../src/lib/whatsapp";

const wa = whatsappLink(site.whatsapp, t.servicos.message);

test.describe("/servicos", () => {
  test("título fala do problema e o botão principal abre o WhatsApp com a mensagem", async ({ page }) => {
    await page.goto("/servicos");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("problema no seu negócio");
    await expect(page.locator(`main a[href="${wa}"]`).first()).toBeVisible();
  });

  test("8 soluções e exemplos ligados aos projetos", async ({ page }) => {
    await page.goto("/servicos");
    await expect(page.locator("[data-solution]")).toHaveCount(8);
    for (const href of ["/projetos/clinics", "/projetos/barbearia", "/projetos/assistencia-tecnica"]) {
      await expect(page.locator(`[data-solution] a[href="${href}"]`)).toHaveCount(1);
    }
  });

  test("3 passos de como funciona", async ({ page }) => {
    await page.goto("/servicos");
    await expect(page.locator("[data-step]")).toHaveCount(3);
  });

  test("sem preço, sem jargão técnico", async ({ page }) => {
    await page.goto("/servicos");
    const text = await page.locator("main").innerText();
    for (const proibido of ["R$", "API", "full-stack", "Spring", "Márcio Tec"]) expect(text).not.toContain(proibido);
  });

  test("botão fixo de WhatsApp no celular não cobre o fim da página", async ({ browser }) => {
    const page = await browser.newPage({ viewport: { width: 360, height: 740 } });
    await page.goto("/servicos");
    const fixo = page.locator("[data-whatsapp-fixo]");
    await expect(fixo).toBeVisible();
    await expect(fixo).toHaveAttribute("href", wa);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const ultimo = await page.locator("footer").boundingBox();
    const botao = await fixo.boundingBox();
    expect(ultimo!.y + ultimo!.height).toBeLessThanOrEqual(botao!.y + 1);
    await page.close();
  });

  test("menu tem Serviços", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('header nav a[href="/servicos"]')).toHaveText("Serviços");
  });
});
