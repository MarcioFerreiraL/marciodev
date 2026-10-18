import { expect, test } from "@playwright/test";

test.describe("tema", () => {
  test("segue o sistema sem escolha salva", async ({ browser }) => {
    for (const scheme of ["light", "dark"] as const) {
      const page = await browser.newPage({ colorScheme: scheme });
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", scheme);
      await page.close();
    }
  });

  test("toggle persiste após reload", async ({ browser }) => {
    const page = await browser.newPage({ colorScheme: "dark" });
    await page.goto("/");
    await page.locator("[data-theme-toggle]").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.close();
  });

  test("localStorage bloqueado não quebra", async ({ browser }) => {
    const page = await browser.newPage({ colorScheme: "light" });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.addInitScript(() => {
      const fail = () => { throw new Error("bloqueado"); };
      Object.defineProperty(window, "localStorage", { get: fail });
    });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.locator("[data-theme-toggle]").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(errors).toEqual([]);
    await page.close();
  });

  test("o botão diz o que vai fazer, nos dois temas", async ({ browser }) => {
    const page = await browser.newPage({ colorScheme: "dark" });
    await page.goto("/");
    const botao = page.locator("[data-theme-toggle]");
    await expect(botao).toHaveAttribute("aria-label", "Usar tema claro");
    await expect(botao).not.toHaveAttribute("aria-pressed", /.*/);
    await botao.click();
    await expect(botao).toHaveAttribute("aria-label", "Usar tema escuro");
    await page.close();
  });

  test("fundo usa a cor da paleta", async ({ browser }) => {
    const page = await browser.newPage({ colorScheme: "dark" });
    await page.goto("/");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe("rgb(21, 19, 15)");
    await page.close();
  });
});
