import fallback from "../data/repos-fallback.json";

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  homepage: string | null;
  pushedAt: string;
  stars: number;
};

export const HIDDEN: readonly string[] = [
  "python",
  "php",
  "javascript",
  "html-css",
  "programacao-I",
  "programacao-II",
  "programacao-III",
  "perfil-web",
  "projeto-vue-js",
  "diario_bot",
  "MarcioFerreiraL",
];

export const FEATURED_REPOS: readonly string[] = [
  "clinics-backend",
  "clinics-mobile",
  "sistema-barbearia",
  "sistema-assistencia-tecnica",
  "urbansense-app",
];

const API_URL = "https://api.github.com/users/MarcioFerreiraL/repos?per_page=100&sort=pushed";

const str = (v: unknown): string | null => (typeof v === "string" && v !== "" ? v : null);

export function selectRepos(raw: unknown[], exclude: readonly string[] = FEATURED_REPOS): Repo[] {
  const hidden = new Set([...HIDDEN, ...exclude]);
  const out: Repo[] = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) continue;
    const r = item as Record<string, unknown>;
    if (typeof r.name !== "string" || r.name === "") continue;
    if (r.fork === true || hidden.has(r.name)) continue;
    out.push({
      name: r.name,
      description: str(r.description),
      language: str(r.language),
      url: typeof r.html_url === "string" ? r.html_url : `https://github.com/MarcioFerreiraL/${r.name}`,
      homepage: str(r.homepage),
      pushedAt: typeof r.pushed_at === "string" ? r.pushed_at : "",
      stars: typeof r.stargazers_count === "number" ? r.stargazers_count : 0,
    });
  }
  return out.sort((a, b) => (a.pushedAt < b.pushedAt ? 1 : a.pushedAt > b.pushedAt ? -1 : 0));
}

export async function getOtherRepos(
  opts: { fetchImpl?: typeof fetch; exclude?: readonly string[] } = {},
): Promise<Repo[]> {
  const { fetchImpl = fetch, exclude = FEATURED_REPOS } = opts;
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "marciodev-site",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetchImpl(API_URL, { headers, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error("resposta não é um array");
    return selectRepos(data, exclude);
  } catch (err) {
    console.warn(`[github] usando repos-fallback.json: ${err instanceof Error ? err.message : String(err)}`);
    return selectRepos(fallback as unknown[], exclude);
  }
}
