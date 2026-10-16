import { defineConfig } from "@playwright/test";

// Captura prints dos projetos publicados. Fora do CI: `npx playwright test -c scripts/screenshots.config.ts`.
export default defineConfig({ testDir: ".", testMatch: "screenshots*.spec.ts", timeout: 90_000 });
