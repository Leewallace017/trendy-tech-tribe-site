import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string(),
  date: z.string(),
  category: z.enum([
    'Tech & Innovation',
    'AI & Automation',
    'EVs & Mobility',
    'Energy & Policy',
    'Markets & Money',
    'Picks & Reviews'
  ]),
  tags: z.array(z.string()),
  type: z.enum(['quick-take', 'deep-dive', 'product-review', 'best-list', 'opinion']),
  summary: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  image: z.string(),
  imageAlt: z.string().optional(),
  featured: z.boolean().default(false),
  affiliateProducts: z.array(z.object({
    name: z.string(),
    url: z.string(),
    price: z.string().optional()
  })).optional().default([])
});

const techCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

const aiCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

const evsCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

const energyCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

const marketsCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

const picksCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

export const collections = {
  tech: techCollection,
  ai: aiCollection,
  evs: evsCollection,
  energy: energyCollection,
  markets: marketsCollection,
  picks: picksCollection,
};
