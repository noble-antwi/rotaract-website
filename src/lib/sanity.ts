import { createClient, type ClientConfig } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config: ClientConfig = {
  projectId: 'aqniv96b',
  dataset: 'production',
  apiVersion: '2024-10-01',
  useCdn: true, // public, cached reads — fine for a static build
};

export const sanity = createClient(config);

const builder = createImageUrlBuilder(sanity);
/** Build an image URL from a Sanity image reference. */
export const urlFor = (source: SanityImageSource) => builder.image(source);

/* ----------------------------- Types ----------------------------- */
export interface Update {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  cover?: SanityImageSource;
  youtube?: string;
  body?: any;
  gallery?: SanityImageSource[];
}

export interface Leader {
  _id: string;
  name: string;
  role: string;
  photo?: SanityImageSource;
  linkedin?: string;
}

/** Resolve the best thumbnail for an update card. */
export function updateThumb(u: Update): string {
  if (u.youtube) return `https://i.ytimg.com/vi/${u.youtube}/hqdefault.jpg`;
  if (u.cover) return urlFor(u.cover).width(800).height(500).fit('crop').auto('format').url();
  return '/assets/img/event-1.svg';
}

/* ----------------------------- Queries ----------------------------- */
const publishedUpdate = `_type == "update" && !(_id in path("drafts.**"))`;

export async function getUpdates(limit?: number): Promise<Update[]> {
  const slice = limit ? `[0...${limit}]` : '';
  return sanity.fetch(
    `*[${publishedUpdate}] | order(date desc) ${slice}{
      _id, title, "slug": slug.current, date, excerpt, cover, youtube
    }`,
  );
}

export async function getUpdate(slug: string): Promise<Update | null> {
  return sanity.fetch(
    `*[${publishedUpdate} && slug.current == $slug][0]{
      _id, title, "slug": slug.current, date, excerpt, cover, youtube, body, gallery
    }`,
    { slug },
  );
}

export async function getUpdateSlugs(): Promise<string[]> {
  return sanity.fetch(`*[${publishedUpdate} && defined(slug.current)].slug.current`);
}

export async function getLeaders(): Promise<Leader[]> {
  return sanity.fetch(
    `*[_type == "leader" && !(_id in path("drafts.**"))] | order(order asc){
      _id, name, role, photo, linkedin
    }`,
  );
}
