import { describe, expect, test } from "vitest";
import { z } from "astro/zod";
import { hasPage, makeProjectSchema, sortFeatured } from "../../src/lib/projects";

const schema = makeProjectSchema(() => z.string());

const valid = {
  title: "Projeto",
  summary: "Resumo curto.",
  tags: ["Spring Boot"],
  order: 1,
  status: "destaque",
  cover: "./cover.webp",
};

describe("sortFeatured", () => {
  test("ordena por order asc sem mutar a entrada", () => {
    const items = [{ id: "c", data: { order: 3 } }, { id: "a", data: { order: 1 } }, { id: "b", data: { order: 2 } }];
    const copy = structuredClone(items);
    const sorted = sortFeatured(items);
    expect(sorted.map((i) => i.id)).toEqual(["a", "b", "c"]);
    expect(items).toEqual(copy);
    expect(sorted).not.toBe(items);
  });
});

describe("hasPage", () => {
  test("false para em-construcao", () => {
    expect(hasPage({ data: { status: "em-construcao" } })).toBe(false);
  });
  test("true para destaque", () => {
    expect(hasPage({ data: { status: "destaque" } })).toBe(true);
  });
});

describe("projectSchema", () => {
  test("aceita destaque válido", () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });
  test("rejeita 5 tags", () => {
    expect(schema.safeParse({ ...valid, tags: ["a", "b", "c", "d", "e"] }).success).toBe(false);
  });
  test("rejeita destaque sem cover", () => {
    const { cover: _cover, ...noCover } = valid;
    expect(schema.safeParse(noCover).success).toBe(false);
  });
  test("rejeita summary com 141 caracteres", () => {
    expect(schema.safeParse({ ...valid, summary: "x".repeat(141) }).success).toBe(false);
  });
  test("aceita em-construcao sem cover", () => {
    const { cover: _cover, ...noCover } = valid;
    expect(schema.safeParse({ ...noCover, status: "em-construcao" }).success).toBe(true);
  });
});
