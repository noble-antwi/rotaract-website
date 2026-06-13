# Images

These are **branded placeholders**. Swap them for real photos when you have them.

## How images are referenced (Astro)

In components/pages, images use the `img()` helper from `src/config.ts`:

```astro
import { img } from '../config';
<img src={img('connect.svg')} alt="..." />
```

`img('connect.svg')` resolves to `/assets/img/connect.svg` (this folder).

## Image map

| File          | Where it appears          | Size       |
|---------------|---------------------------|------------|
| `connect.svg` | "We connect people" row   | 800 × 600  |
| `transform.svg`| "We transform" row       | 800 × 600  |
| `solve.svg`   | "We solve problems" row   | 800 × 600  |
| `about.svg`   | About portrait            | 800 × 1000 |
| `event-1/2/3.svg` | Events bento / updates | 800 × 600  |

## Swapping in a real photo

1. Drop the file here, e.g. `connect.jpg` (prefer `.webp` — smaller).
2. Update the reference: `img('connect.jpg')`.

> **Weekly meeting photos do NOT go here.** Those are added through the CMS
> (Phase 2) and stored on the CMS's own CDN — keeping the git repo small.
> This folder is only for the fixed design images above.

## Hosting on Cloudflare

- **Cloudflare Pages (default):** images served from the same site — nothing to do.
- **Cloudflare R2 / CDN:** set an environment variable in the Pages dashboard:

  ```
  PUBLIC_ASSET_BASE = https://cdn.rotaractchicago.org/img
  ```

  `img()` automatically uses it. No code changes.
