import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    lang: z.enum(["es", "en"]),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    summary: z.string(),
    category: z.string(),
    year: z.number().optional(),
    period: z.string(),
    role: z.string().optional(),
    status: z.string().optional(),
    technologies: z.array(z.string()).min(1),
    theme: z.enum(["mint", "lavender", "sand", "violet"]),
    cover: z.string().startsWith("/").optional(),
    repositories: z.array(z.object({ label: z.string(), url: z.url() })).min(1),
    demo: z.url().optional(),
    featured: z.boolean(),
    order: z.number().int().positive(),
    contributions: z.array(z.string()),
    results: z.array(z.string()),
    limitations: z.array(z.string()),
  }),
});
export const collections = { projects };
