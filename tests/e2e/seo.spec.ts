import { expect, test } from "@playwright/test";

const canonicals: Record<string, string> = {
  "/": "https://marciodev.com/",
  "/projetos": "https://marciodev.com/projetos",
  "/projetos/clinics": "https://marciodev.com/projetos/clinics",
};

for (const [route, url] of Object.entries(canonicals)) {
  test(`canonical e og:url sem .html em ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", url);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", url);
  });
}

for (const slug of ["clinics", "barbearia", "assistencia-tecnica", "urbansense"]) {
  test(`og:image de ${slug} não é placeholder`, async ({ page, request }) => {
    await page.goto(`/projetos/${slug}`);
    const src = await page.locator('meta[property="og:image"]').getAttribute("content");
    const path = new URL(src!).pathname;
    const body = await (await request.get(path)).body();
    expect(body.length).toBeGreaterThan(20_000);
  });
}

for (const route of ["/", "/projetos", "/servicos", "/links"]) {
  test(`${route} tem imagem de prévia para redes sociais`, async ({ page, request }) => {
    await page.goto(route);
    const src = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(src).toBeTruthy();
    const body = await (await request.get(new URL(src!).pathname)).body();
    expect(body.length).toBeGreaterThan(20_000);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  });
}

test("banners são decorativos para leitores de tela", async ({ page }) => {
  await page.goto("/");
  const svgs = page.locator("[data-project-card] svg, [data-mystery-card] svg");
  for (const svg of await svgs.all()) {
    await expect(svg).toHaveAttribute("aria-hidden", "true");
    await expect(svg).not.toHaveAttribute("role", "img");
  }
});
