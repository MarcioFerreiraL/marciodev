import { test } from "@playwright/test";

// Navega no app Flutter (canvas) como visitante e captura telas internas do Clinics.
test("clinics-telas", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto("https://clinics.marciodev.com/app/", { waitUntil: "networkidle" });
  await page.waitForTimeout(6000);
  await page.mouse.click(195, 671); // "Entrar como visitante"
  await page.waitForTimeout(5000);
  await page.screenshot({ path: ".superpowers/shots/clinics-inicio.png" });
  await page.mouse.click(329, 500); // "Ver" do exame mais buscado
  await page.waitForTimeout(5000);
  await page.screenshot({ path: ".superpowers/shots/clinics-comparacao.png" });
});
