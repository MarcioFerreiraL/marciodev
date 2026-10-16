import { describe, expect, test } from "vitest";
import { HUES, palette, toCssVars, type Theme } from "../../src/design/palette";
import { contrastRatio, hueOf } from "../../src/design/contrast";

const themes: Theme[] = ["dark", "light"];

describe.each(themes)("tema %s", (theme) => {
  const c = palette[theme];

  test("text e muted ≥ 4.5 sobre bg e surface nos dois temas", () => {
    for (const fg of [c.text, c.muted])
      for (const bg of [c.bg, c.surface]) expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  test("purple, blue, brown ≥ 4.5 sobre bg e surface nos dois temas", () => {
    for (const fg of [c.purple, c.blue, c.brown])
      for (const bg of [c.bg, c.surface]) expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  test("brown ≥ 4.5 sobre tag", () => {
    expect(contrastRatio(c.brown, c.tag)).toBeGreaterThanOrEqual(4.5);
  });

  test("onPurple ≥ 4.5 sobre purple", () => {
    expect(contrastRatio(c.onPurple, c.purple)).toBeGreaterThanOrEqual(4.5);
  });

  test("blue (foco) ≥ 3 sobre bg", () => {
    expect(contrastRatio(c.blue, c.bg)).toBeGreaterThanOrEqual(3);
  });

  test("matizes dentro de ±3° de HUES", () => {
    expect(Math.abs(hueOf(c.purple) - HUES.purple)).toBeLessThanOrEqual(3);
    expect(Math.abs(hueOf(c.blue) - HUES.blue)).toBeLessThanOrEqual(3);
    expect(Math.abs(hueOf(c.brown) - HUES.brown)).toBeLessThanOrEqual(3);
  });
});

test("temas espelhados: mesmas chaves", () => {
  expect(Object.keys(palette.dark)).toEqual(Object.keys(palette.light));
});

test("toCssVars gera --c-bg", () => {
  expect(toCssVars("dark")).toContain("--c-bg:#15130F");
});

test("contrastRatio de preto sobre branco é 21", () => {
  expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
});
