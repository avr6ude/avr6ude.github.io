import { glob } from "astro/loaders";
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    excerpt: z.string(),
    til: z.boolean().default(false),
  }),
});

export const collections = { posts };
