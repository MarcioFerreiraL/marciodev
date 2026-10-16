import { expect, test } from "@playwright/test";

const slugs = {
  clinics: "Clinics",
  barbearia: "Sistema Barbearia",
  "assistencia-tecnica": "Assistência Técnica",
  urbansense: "UrbanSense",
} as const;
const hidden = ["python", "php", "javascript", "html-css", "programacao-I", "perfil-web", "diario_bot"];

for (const [slug, title] of Object.entries(slugs)) {
  test(`case study ${slug}`, async ({ page }) => {
    const res = await page.goto(`/projetos/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    const h2 = await page.getByRole("heading", { level: 2 }).allTextContents();
    for (const s of ["Problema", "Arquitetura", "Infra e deploy", "Minha contribuição"]) expect(h2).toContain(s);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  });
}

test("clinics linka o demo", async ({ page }) => {
  await page.goto("/projetos/clinics");
  await expect(page.locator('a[href="https://clinics.marciodev.com"]')).toHaveCount(1);
});

test("urbansense lista a equipe", async ({ page }) => {
  await page.goto("/projetos/urbansense");
  for (const name of ["Carlos Henrique", "Gabriel Lopes"]) await expect(page.locator("body")).toContainText(name);
});

test("observatório não tem página", async ({ page }) => {
  const res = await page.goto("/projetos/observatorio-upe");
  expect(res?.status()).toBe(404);
  await expect(page.locator('a[href="/"]').first()).toBeVisible();
});

test("lista de projetos com outros projetos", async ({ page }) => {
  await page.goto("/projetos");
  await expect(page.locator("[data-project-card]")).toHaveCount(4);
  const others = page.locator("[data-other-repo]");
  expect(await others.count()).toBeGreaterThanOrEqual(1);
  const names = await others.locator("[data-repo-name]").allTextContents();
  for (const h of hidden) expect(names).not.toContain(h);
});
