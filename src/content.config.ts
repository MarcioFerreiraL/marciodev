import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { makeProjectSchema } from "./lib/projects";

const projetos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projetos" }),
  schema: ({ image }) => makeProjectSchema(image),
});

export const collections = { projetos };
