import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/*.md',
      schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        tags: z.array(z.string()),
        description: z.string(),
        til: z.boolean().default(false),
      }),
    }),
  },
})
