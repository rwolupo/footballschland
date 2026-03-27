import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Daniel Düngel'),
    category: z.string(),
    readTime: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
