import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { makeProjectSchema } from "./lib/projects";

// Só nos testes E2E (E2E_FIXTURES=1) a coleção inclui projetos de teste de tests/fixtures/projetos.
const withFixtures = process.env.E2E_FIXTURES === "1";

const projetos = defineCollection({
  loader: withFixtures
    ? glob({
        base: ".",
        pattern: ["src/content/projetos/**/*.md", "tests/fixtures/projetos/*.md"],
        generateId: ({ entry }) => entry.replace(/^.*\//, "").replace(/\.md$/, ""),
      })
    : glob({ pattern: "**/*.md", base: "./src/content/projetos" }),
  schema: ({ image }) => makeProjectSchema(image),
});

export const collections = { projetos };
