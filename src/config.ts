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

export const SITE = {
  name: 'Rotaract Club of Chicago',
  short: 'Rotaract Chicago',
  email: 'info@rotaractchicago.org',
  instagram: 'https://www.instagram.com/rotaractclubofchicago/',
  facebook: 'https://www.facebook.com/RotaractClubOfChicago/',
};
