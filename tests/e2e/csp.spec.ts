import { expect, test } from "@playwright/test";
import { ROUTES } from "./routes";

for (const route of ROUTES) {
  test(`CSP presente e nada bloqueado em ${route}`, async ({ page }) => {
    const bloqueios: string[] = [];
    page.on("console", (m) => /Content Security Policy|Refused to/i.test(m.text()) && bloqueios.push(m.text()));
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const csp = await page.locator('meta[http-equiv="content-security-policy"]').getAttribute("content");
    expect(csp).toContain("script-src");
    expect(csp).toContain("default-src 'self'");
    expect(bloqueios).toEqual([]);
  });
}
