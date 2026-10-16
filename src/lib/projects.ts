import { z } from "astro/zod";

export const makeProjectSchema = (image: () => z.ZodTypeAny) =>
  z
    .object({
      title: z.string(),
      summary: z.string().max(140),
      tags: z.array(z.string()).min(1).max(4),
      order: z.number(),
      status: z.enum(["destaque", "em-construcao"]),
      cover: image().optional(),
      context: z.string().optional(),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      team: z.array(z.string()).optional(),
      gallery: z.array(z.object({ src: image(), alt: z.string().min(1) })).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.status === "destaque" && data.cover === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["cover"],
          message: 'cover é obrigatório quando status = "destaque"',
        });
      }
    });

export function sortFeatured<T extends { data: { order: number } }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.data.order - b.data.order);
}

export function hasPage(p: { data: { status: string } }): boolean {
  return p.data.status === "destaque";
}
