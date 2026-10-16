import { defineConfig, devices } from "@playwright/test";

// Testa sempre o build (dist/) numa porta própria, separada do servidor de desenvolvimento.
// Os testes marcados @fixtures rodam só contra o build com fixtures (playwright.fixtures.config.ts).
export default defineConfig({
  testDir: "tests/e2e",
  grepInvert: /@fixtures/,
  use: { baseURL: "http://localhost:4322" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npx astro preview --port 4322 --ignore-lock",
    url: "http://localhost:4322",
    reuseExistingServer: false,
  },
});
