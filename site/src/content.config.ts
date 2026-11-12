import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/**
 * Legal documents: MDX with frontmatter. `draft: true` renders the visible
 * "pending counsel review" notice. Removing it is counsel's sign-off, not a
 * routine content change.
 */
const legal = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    version: z.string(),
    effectiveDate: z.string(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { legal };
