import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Weekly updates — meeting recaps, photos, and videos.
 *
 * For now these are local markdown files in src/content/updates/.
 * In Phase 2 this same collection will be fed by the CMS (Sanity),
 * so the rest of the site won't need to change.
 */
const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    /** Cover image: a /assets/img filename or a full URL. */
    cover: z.string().optional(),
    /** Optional YouTube video ID (e.g. "dQw4w9WgXcQ"). */
    youtube: z.string().optional(),
    /** Optional photo gallery: filenames or URLs. */
    gallery: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { updates };
