import { afterEach, describe, expect, test, vi } from "vitest";
import { FEATURED_REPOS, HIDDEN, getOtherRepos, selectRepos } from "../../src/lib/github";
import fallback from "../../src/data/repos-fallback.json";

function raw(name: string, extra: Record<string, unknown> = {}) {
  return {
    name,
    description: `desc ${name}`,
    language: "TypeScript",
    html_url: `https://github.com/MarcioFerreiraL/${name}`,
    homepage: "",
    pushed_at: "2026-01-01T00:00:00Z",
    stargazers_count: 0,
    fork: false,
    ...extra,
  };
}

const okResponse = (body: unknown) =>
  new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("selectRepos", () => {
  test("oculta HIDDEN e exclude", () => {
    const input = [...HIDDEN.map((n) => raw(n)), raw("clinics-backend"), raw("extra"), raw("mantido")];
    expect(selectRepos(input, ["extra"]).map((r) => r.name)).toEqual(["clinics-backend", "mantido"]);
    // exclude padrão = FEATURED_REPOS
    const def = selectRepos([...FEATURED_REPOS.map((n) => raw(n)), raw("mantido"), raw("python")]);
    expect(def.map((r) => r.name)).toEqual(["mantido"]);
  });

  test("oculta forks", () => {
    const out = selectRepos([raw("meu"), raw("garfo", { fork: true })]);
    expect(out.map((r) => r.name)).toEqual(["meu"]);
  });

  test("ordena por pushedAt desc", () => {
    const out = selectRepos([
      raw("velho", { pushed_at: "2024-05-01T00:00:00Z" }),
      raw("novo", { pushed_at: "2026-09-01T00:00:00Z" }),
      raw("meio", { pushed_at: "2025-03-01T00:00:00Z" }),
      null,
      "lixo",
      { description: "sem nome" },
    ]);
    expect(out.map((r) => r.name)).toEqual(["novo", "meio", "velho"]);
  });

  test("mapeia html_url → url", () => {
    const [r] = selectRepos([
      raw("x", { homepage: "", stargazers_count: 3, language: null, description: null }),
    ]);
    expect(r).toEqual({
      name: "x",
      description: null,
      language: null,
      url: "https://github.com/MarcioFerreiraL/x",
      homepage: null,
      pushedAt: "2026-01-01T00:00:00Z",
      stars: 3,
    });
  });
});

describe("getOtherRepos", () => {
  test("usa fallback quando fetch retorna 403", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchImpl = vi.fn(async () => new Response("rate limited", { status: 403 })) as unknown as typeof fetch;
    const out = await getOtherRepos({ fetchImpl });
    expect(out).toEqual(selectRepos(fallback as unknown[]));
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test("usa fallback quando fetch lança", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchImpl = vi.fn(async () => {
      throw new Error("network down");
    }) as unknown as typeof fetch;
    await expect(getOtherRepos({ fetchImpl })).resolves.toEqual(selectRepos(fallback as unknown[]));
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test("envia Authorization só com GITHUB_TOKEN", async () => {
    const calls: { url: string; headers: Headers }[] = [];
    const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), headers: new Headers(init?.headers) });
      return okResponse([raw("a")]);
    }) as typeof fetch;

    vi.stubEnv("GITHUB_TOKEN", undefined);
    const sem = await getOtherRepos({ fetchImpl });
    expect(sem.map((r) => r.name)).toEqual(["a"]);

    vi.stubEnv("GITHUB_TOKEN", "fake-test-token");
    await getOtherRepos({ fetchImpl });

    expect(calls[0].url).toBe("https://api.github.com/users/MarcioFerreiraL/repos?per_page=100&sort=pushed");
    expect(calls[0].headers.get("Accept")).toBe("application/vnd.github+json");
    expect(calls[0].headers.get("User-Agent")).toBe("marciodev-site");
    expect(calls[0].headers.has("Authorization")).toBe(false);
    expect(calls[1].headers.get("Authorization")).toBe("Bearer fake-test-token");
  });
});
