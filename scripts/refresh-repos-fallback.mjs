// Atualiza src/data/repos-fallback.json com os repositórios públicos de MarcioFerreiraL.
// Usa a API pública do GitHub, sem token.
import { writeFile } from "node:fs/promises";

const URL_API = "https://api.github.com/users/MarcioFerreiraL/repos?per_page=100&sort=pushed";
const OUT = new URL("../src/data/repos-fallback.json", import.meta.url);
const FIELDS = ["name", "description", "language", "html_url", "homepage", "pushed_at", "stargazers_count", "fork"];

const res = await fetch(URL_API, {
  headers: { Accept: "application/vnd.github+json", "User-Agent": "marciodev-site" },
  signal: AbortSignal.timeout(15000),
});
if (!res.ok) {
  console.error(`Falha: HTTP ${res.status}`);
  process.exit(1);
}
const data = await res.json();
if (!Array.isArray(data)) {
  console.error("Falha: resposta não é um array");
  process.exit(1);
}
const slim = data.map((r) => Object.fromEntries(FIELDS.map((f) => [f, r[f] ?? null])));
await writeFile(OUT, JSON.stringify(slim, null, 2) + "\n");
console.log(`${slim.length} repositórios gravados em src/data/repos-fallback.json`);
