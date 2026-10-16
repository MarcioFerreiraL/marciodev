import { test } from "@playwright/test";

const out = (name: string) => `.superpowers/shots/${name}.png`;
const desktop = { width: 1440, height: 900 };
const mobile = { width: 390, height: 844 };

const targets = [
  { name: "clinics-landing", url: "https://clinics.marciodev.com/", viewport: desktop, wait: 2000 },
  { name: "clinics-app", url: "https://clinics.marciodev.com/app/", viewport: mobile, wait: 8000 },
  { name: "barbearia-desktop", url: "https://sistema-barbearia-black.vercel.app/", viewport: desktop, wait: 4000 },
  { name: "barbearia-mobile", url: "https://sistema-barbearia-black.vercel.app/", viewport: mobile, wait: 4000 },
];

for (const t of targets) {
  test(t.name, async ({ browser }) => {
    const page = await browser.newPage({ viewport: t.viewport, deviceScaleFactor: 2 });
    await page.goto(t.url, { waitUntil: "networkidle" });
    await page.waitForTimeout(t.wait);
    await page.screenshot({ path: out(t.name) });
    await page.close();
  });
}
