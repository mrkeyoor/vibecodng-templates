# sir-template-01

Boardwatch is a complete dark landing-page template assembled from verified entries in the `mrkeyoor.components` index. The adaptation uses one accent (`#b9f66c`), keeps source attribution in every section file, and includes a copy of each selected component's test record under `provenance/results/`.

## Stack

- Vite
- React 19
- Tailwind CSS 4
- No component runtime dependencies

## Provenance and measured results

All numbers below are copied from the corresponding indexed component's `results.json`. A11y columns are critical / serious / moderate / minor counts. Bundle columns are gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar | `hyperui-headers-4` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 84.5 / 65.4 / 19.1 | 18133 |
| Hero / spotlight effect | `motion-primitives-spotlight` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 133.2 / 65.4 / 67.8 | 84864 |
| Logo wall | `hyperui-logo-wall-3` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 88.2 / 65.4 / 22.8 | 63176 |
| Feature grid | `hyperui-feature-grids-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.7 / 65.4 / 18.3 | 22241 |
| Stats | `hyperui-stats-1` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 68.8 / 65.4 / 3.4 | 11167 |
| Pricing | `hyperui-pricing-1` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 69.2 / 65.4 / 3.8 | 11547 |
| Testimonials | `meraki-testimonials-full-page-cards` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 84.1 / 65.4 / 18.7 | 53505 |
| FAQ | `hyperui-faq-1` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83 / 65.4 / 17.6 | 66521 |
| CTA | `hyperui-ctas-4` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.2 / 65.4 / 17.8 | 26283 |
| Footer | `hyperui-footers-4` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 85.4 / 65.4 / 20 | 31391 |
| Premium / all section reveals | `motion-primitives-in-view` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |
| Premium / stats count-up | `magicui-number-ticker` | https://github.com/magicuidesign/magicui | 0 / 1 / 0 / 0 | 101.4 / 65.4 / 36 | 78218 |
| Premium / live hero rows | `magicui-animated-list` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 118.6 / 64.6 / 54 | 11965 |
| Premium / logo wall motion | `magicui-marquee` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 76.5 / 64.6 / 11.9 | 11234 |
| Premium / featured pricing tier | `magicui-border-beam` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 132.2 / 65.4 / 66.8 | 73025 |
| Premium / hero H1 accent | `magicui-line-shadow-text` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 132.1 / 65.4 / 66.7 | 74727 |
| Premium / CTA and footer surface | `magicui-dot-pattern` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 132.2 / 65.4 / 66.8 | 99943 |

For all ten original source records and all seven premium effect records, indexed `build.ok` and `mount.ok` are `true`. The table preserves the index result for `magicui-number-ticker` (one serious contrast finding); this template overrides the indexed black text with the existing high-contrast white stat treatment. Indexed overflow is `false` at 375, 768, and 1440 pixels except for the standalone marquee harness at narrow widths; this template contains the marquee in a masked, overflow-hidden track.

## Run locally

```bash
npm install
npm run dev
```

Build the production bundle with:

```bash
npx vite build --base=/social/template-01/
```

## Adaptation notes

The source structures were retained while the content, palette, spacing, and product-specific UI were adapted for Boardwatch. Premium effects keep the indexed interaction patterns but use native React, CSS, and `IntersectionObserver` instead of adding Motion, preserving the bundle budget. Reveals are once-only with an 80ms stagger. The pricing beam and hero line shadow make a single pass; only the logo marquee and live hero demo loop. The global reduced-motion rule disables every animation, count-up, smooth-scroll behavior, and demo update while keeping all content visible.

## Signature hero

The hero backdrop is a full-bleed **raw WebGL2 GPU data-stream field**
(`src/components/HeroField.jsx`, first-party GLSL, no shader library). All 3,000
stream particles and 3,000 motes are derived from `gl_VertexID` + time inside the
vertex shader — zero attribute buffers, zero CPU simulation, two draw calls per
frame (`GL_LINES` motion-streak trails on horizontal data lanes + `GL_POINTS`
packet heads and dust). The pointer parallaxes the field by depth and carries a
190px repulsion radius that bends streams aside and brightens them. An
elliptical safe zone in the shader keeps the headline legible.

Performance contract:

- `devicePixelRatio` capped at 2; single `<canvas>`, additive premultiplied blend.
- rAF loop pauses when the hero leaves the viewport (`IntersectionObserver`)
  and while `document.hidden`.
- `prefers-reduced-motion: reduce` renders exactly one static frame — no loop,
  no pointer listeners.
- No WebGL2 → component returns `null`; the CSS grid + spotlight backdrop
  above remains the fallback (also the Suspense fallback while the chunk loads).

Honest bundle cost (gzip, this commit): initial JS **70.19 KB** + CSS 9.07 KB +
HTML 0.41 KB; the shader ships as a lazy chunk `HeroField-*.js` of **+3.02 KB**
loaded after first paint. Total **82.7 KB** — the signature backdrop costs 3 KB
because the GPU does all the work.
