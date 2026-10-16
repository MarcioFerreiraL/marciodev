import { defineConfig, devices } from "@playwright/test";

// Build de teste com projetos fictícios (E2E_FIXTURES=1 → dist-fixtures/), servido na porta 4323.
export default defineConfig({
  testDir: "tests/e2e",
  grep: /@fixtures/,
  use: { baseURL: "http://localhost:4323" },
  projects: [{ name: "chromium-fixtures", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npx astro preview --port 4323 --outDir dist-fixtures --ignore-lock",
    url: "http://localhost:4323",
    reuseExistingServer: false,
  },
});
