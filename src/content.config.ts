import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared schema for all article collections
const articleSchema = ({ image }: { image: any }) => z.object({
    title: z.string(),
    date: z.string(),
    author: z.string().default('Trendy Tech Tribe Staff'),
    category: z.enum([
        'Tech & Innovation',
        'AI & Automation',
        'EVs & Mobility',
        'Energy & Policy',
        'Markets & Money',
        'Picks & Reviews'
    ]),
    tags: z.array(z.string()),
    type: z.enum(['quick-take', 'deep-dive', 'product-review', 'best-list', 'opinion', 'news-roundup']),
    summary: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    image: image(),
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(),
    featured: z.boolean().default(false),
    affiliateProducts: z.array(z.object({
        name: z.string(),
        url: z.string(),
        price: z.string().optional(),
        description: z.string().optional()
    })).optional().default([]),
    sources: z.array(z.object({
        title: z.string(),
        url: z.string()
    })).optional().default([])
});

// Define collections using the new Content Layer API with glob loaders
export const collections = {
    tech: defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/tech' }),
        schema: articleSchema,
    }),
    ai: defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/ai' }),
        schema: articleSchema,
    }),
    evs: defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/evs' }),
        schema: articleSchema,
    }),
    energy: defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/energy' }),
        schema: articleSchema,
    }),
    markets: defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/markets' }),
        schema: articleSchema,
    }),
    picks: defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/picks' }),
        schema: articleSchema,
    }),
};
