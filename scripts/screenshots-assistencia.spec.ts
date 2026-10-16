import { test, type Page } from "@playwright/test";

// Assistência Técnica rodando localmente (API :8080 + Vue :5173) com o seed fictício do repositório.
const base = "http://localhost:5173";
const shot = (page: Page, name: string) => page.screenshot({ path: `.superpowers/shots/${name}.png` });

async function login(page: Page, tipo: string, cpf: string) {
  await page.goto(base);
  await page.locator("select").selectOption(tipo);
  await page.locator("input").first().fill(cpf);
  await page.locator("button[type=submit], button").first().click();
  await page.waitForTimeout(2500);
}

test("assistencia-telas", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(base);
  await page.waitForTimeout(1500);
  await shot(page, "assistencia-login");
  for (const [tipo, cpf, name] of [
    ["tecnicos", "44444444444", "assistencia-tecnico"],
    ["atendente", "22222222222", "assistencia-atendente"],
    ["clientes", "66666666666", "assistencia-cliente"],
  ]) {
    await login(page, tipo, cpf);
    await shot(page, name);
  }
});
