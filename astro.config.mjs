import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// O Astro só calcula hash dos scripts que ele processa. Os <script is:inline> (tema antes do
// primeiro paint, botão de tema, caminho na 404) são lidos do código-fonte e liberados pelo hash.
function inlineScriptHashes(dir = "src") {
  const hashes = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) hashes.push(...inlineScriptHashes(path));
    else if (entry.name.endsWith(".astro")) {
      for (const [, body] of readFileSync(path, "utf8").matchAll(/<script is:inline>([\s\S]*?)<\/script>/g)) {
        hashes.push(`sha256-${createHash("sha256").update(body).digest("base64")}`);
      }
    }
  }
  return hashes;
}

export default defineConfig({
  site: "https://marciodev.com",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  // CSP com hashes gerados pelo Astro para os scripts e estilos de cada página.
  // Os domínios da Cloudflare liberam o Web Analytics (injetado pela Cloudflare quando ativo).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self' https://cloudflareinsights.com",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: ["'self'", "https://static.cloudflareinsights.com"],
        hashes: inlineScriptHashes(),
      },
    },
  },
});
