import { describe, expect, test } from "vitest";
import { whatsappLink } from "../../src/lib/whatsapp";

describe("whatsappLink", () => {
  test("monta wa.me com número e texto codificado", () => {
    expect(whatsappLink("5581999069172", "Olá, Márcio! Quero uma solução.")).toBe(
      "https://wa.me/5581999069172?text=Ol%C3%A1%2C%20M%C3%A1rcio!%20Quero%20uma%20solu%C3%A7%C3%A3o.",
    );
  });

  test("rejeita número com caracteres não numéricos", () => {
    expect(() => whatsappLink("(81) 99906-9172", "oi")).toThrow();
  });
});
