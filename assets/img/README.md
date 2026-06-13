# Images

Every image on the site is loaded through one small system so you can swap
placeholders for real photos — and point at Cloudflare — without hunting
through the HTML.

## How it works

In `index.html`, images use a `data-img` attribute instead of `src`:

```html
<img data-img="hero.svg" alt="...">
```

A script at the bottom resolves each one against `ASSET_BASE`:

```js
const ASSET_BASE = window.ASSET_BASE || 'assets/img';
```

So `data-img="hero.svg"` becomes `assets/img/hero.svg`.

## Image map (what goes where)

| File          | Where it appears              | Recommended size | Subject                          |
|---------------|-------------------------------|------------------|----------------------------------|
| `hero.svg`    | Full-width hero background     | 1600 × 900       | Members at a social/service event|
| `connect.svg` | "We Connect People" card      | 800 × 600        | People / networking              |
| `transform.svg`| "We Transform Communities"   | 800 × 600        | Community service                |
| `solve.svg`   | "We Solve Problems" card      | 800 × 600        | International service            |
| `about.svg`   | About section portrait        | 800 × 1000 (4:5) | Club / members portrait          |
| `event-1.svg` | Events gallery                | 800 × 600        | Event photo                      |
| `event-2.svg` | Events gallery                | 800 × 600        | Event photo                      |
| `event-3.svg` | Events gallery                | 800 × 600        | Event photo                      |

The `.svg` files are branded placeholders. They tell you the filename and
target dimensions right on the image.

## Swapping in a real photo

1. Add the real file to this folder, e.g. `hero.jpg` (or `.webp` — preferred for size).
2. Update the matching attribute in `index.html`: `data-img="hero.jpg"`.
3. Delete the old `.svg` placeholder if you like.

**Tip:** `.webp` at ~80% quality is typically 4–6× smaller than `.jpg` with no
visible loss. Export at the recommended size above (don't upload 4000px photos).

## Hosting on Cloudflare

**Option A — Cloudflare Pages (simplest).**
Deploy the whole folder. Images are served from the same origin, so the default
`ASSET_BASE = 'assets/img'` just works. Nothing to change.

**Option B — Cloudflare R2 / CDN on a custom domain.**
Upload this `img/` folder to an R2 bucket exposed at e.g.
`https://cdn.rotaractchicago.org/img`, then point the site at it. Add **one line**
in `<head>` before the main script:

```html
<script>window.ASSET_BASE = 'https://cdn.rotaractchicago.org/img';</script>
```

Every image now loads from the CDN — no other edits needed.
