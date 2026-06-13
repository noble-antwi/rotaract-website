/**
 * Image asset base — CLOUDFLARE-READY.
 *
 * Images live in /public/assets/img and are served from the same origin
 * by default (works on Cloudflare Pages with no changes).
 *
 * To serve images from Cloudflare R2 / a CDN instead, set an env var
 * before building (e.g. in the Cloudflare Pages dashboard → Settings →
 * Environment variables):
 *
 *     PUBLIC_ASSET_BASE = https://cdn.rotaractchicago.org/img
 *
 * Everything keeps working — no code changes needed.
 */
export const ASSET_BASE = (import.meta.env.PUBLIC_ASSET_BASE || '/assets/img').replace(/\/$/, '');

/** Resolve a placeholder/asset filename to its full URL. */
export const img = (name: string) =>
  /^https?:\/\//.test(name) ? name : `${ASSET_BASE}/${name}`;

/**
 * TEMPORARY dummy photos (real stock images) used until the club's own
 * photos are added. Swap these out by replacing the calls in the pages, or
 * by uploading real photos in Sanity (leaders/events/updates).
 *   - stockPhoto: themed scenery/people via Lorem Picsum (stable per seed)
 *   - avatarPhoto: real-looking headshots via Pravatar (img 1–70)
 */
export const stockPhoto = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
export const avatarPhoto = (n: number) => `https://i.pravatar.cc/600?img=${n}`;

/**
 * Google Calendar embed.
 * After making the club calendar PUBLIC, set its ID here (or via the
 * PUBLIC_GCAL_ID env var in Cloudflare Pages). The Events page shows the
 * embedded month view automatically when this is set; otherwise it's hidden.
 * The ID looks like:  abc123...@group.calendar.google.com  or your gmail.
 */
export const GCAL_ID = import.meta.env.PUBLIC_GCAL_ID || '';
export const GCAL_TZ = 'America/Chicago';

export const SITE = {
  name: 'Rotaract Club of Chicago',
  short: 'Rotaract Chicago',
  email: 'info@rotaractchicago.org',
  instagram: 'https://www.instagram.com/rotaractclubofchicago/',
  facebook: 'https://www.facebook.com/RotaractClubOfChicago/',
};
