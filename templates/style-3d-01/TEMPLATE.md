# sir-style-3d-01 — "Prism"

Style showcase: **stylized 3D objects integrated in the interface**. Prism is a fictional production
3D asset library. The page treats the interface itself as a viewport: a pointer-tilted hero stage that
now hosts a **real three.js scene** (see "Signature hero"), HUD chips at three depths, a tilted marquee
shelf, flip cards, a rotating ring carousel, a holographic pricing tier, and a magnetic CTA. Outside the
hero viewport, all 3D is CSS transforms; the CSS-built cube remains as the hero's no-WebGL fallback.

## Stack

- Vite, React 19, Tailwind CSS 4 (`@tailwindcss/vite`)
- Runtime dependencies for the signature hero only: `three` + `@react-three/fiber`
  (lazy-loaded chunk; the rest of the page has no component runtime dependencies)
- Fonts: Unbounded / Outfit / JetBrains Mono via Google Fonts

## Provenance and measured results

Component patterns were selected from the `mrkeyoor.components` index (`style: '3d'`, published, mount ok)
and rebuilt on CSS custom properties + pointer events to avoid the `motion` dependency, keeping each
source's interaction pattern. Numbers are copied verbatim from
`/var/www/mrkeyoor.com/harness/out/<slug>/results.json`. A11y columns are critical / serious / moderate /
minor counts; bundle columns are gzip / baseline gzip / marginal in KB; `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Hero / stage rig tilt | `motion-primitives-tilt` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 124.4 / 65.4 / 59 | 84697 |
| Hero / floating parallax objects | `fancy-parallax-floating` | https://github.com/danielpetho/fancy | 0 / 0 / 0 / 0 | 92.9 / 65.4 / 27.5 | 70314 |
| Asset shelf (tilted-plane marquee) | `uilayouts-3d-marquee` | https://github.com/ui-layouts/uilayouts | 0 / 0 / 2 / 0 | 91.9 / 65.4 / 26.5 | 68157 |
| Features (3D flip cards) | `eldora-card-flip-hover` | https://github.com/karthikmudunuri/eldoraui | 0 / 0 / 0 / 0 | 82.9 / 65.4 / 17.5 | 72763 |
| Collections (ring carousel) | `cultui-three-d-carousel` | https://github.com/nolly-studio/cult-ui | 0 / 0 / 0 / 0 | 126.6 / 65.4 / 61.2 | 71679 |
| Pricing (holographic featured tier) | `eldora-holographic-card` | https://github.com/karthikmudunuri/eldoraui | 0 / 0 / 0 / 0 | 125.8 / 65.4 / 60.4 | 74009 |
| Testimonials (tilt quote cards) | `motion-primitives-tilt` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 124.4 / 65.4 / 59 | 84697 |
| CTA (magnetic button) | `motion-primitives-magnetic` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 124.3 / 65.4 / 58.9 | 78882 |
| All section reveals | `motion-primitives-in-view` (cross-style, spatial index) | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |
| Navbar | first-party | — | — | — | — |
| Stats row (in Collections) | first-party | — | — | — | — |
| Footer | first-party | — | — | — | — |

Honesty notes:

- `uilayouts-3d-marquee` carries 2 moderate indexed findings; this template's shelf is decorative
  (`aria-label` on the section, duplicated set `aria-hidden`) and text inside tiles keeps AA contrast.
- The reveal controller pattern comes from a spatial-index entry because the 3d set has no
  scroll-reveal primitive; it is the same adaptation used across the sir-templates series.
- All CSS objects (cube, wire sphere, torus, asset glyphs) are first-party inline SVG/CSS inheriting the
  `--bw-*` variables.

## Motion policy

Pointer-driven only: stage tilt (max 7deg), parallax floats (max ~30px), card flips on hover/focus,
holographic sheen tracking, magnetic pull. Reveals are once-only via IntersectionObserver. The only loops
are the shelf marquee and a 14s cube idle. Under `prefers-reduced-motion` every animation stops and the 3D
flattens: the shelf becomes a static grid, flip cards render both faces stacked, the ring carousel becomes
a flat list, and tilt/magnetic/parallax transforms are removed. `?static` in the URL forces the fully
revealed, motionless state for screenshot tooling.

## Build

```bash
npm install
npx vite build --base=./
```

Measured production bundle (dist html+css+js, gzip): **74.8 KB** total
(index.html 0.65 KB, CSS 7.1 KB, JS 69 KB gzip). Budget: < 160 KB. Fonts load from Google Fonts at runtime.

Screenshot (768px full page): `/tmp/opus-style-3d.png`

## Signature hero

The hero viewport hosts a **real three.js scene** rendered through
`@react-three/fiber` (`src/components/PrismScene.jsx`): a faceted chrome
icosahedron, an accent-metal torus knot, and the Prism mark itself — a glass
triangular prism (`MeshPhysicalMaterial` with transmission, dispersion, and
iridescence) — plus five octahedron shards drifting at depth over a viewport
grid. Studio lighting comes from a key directional, an accent point light, and
`RoomEnvironment` reflections generated on the GPU with `PMREMGenerator` (no
HDR download, works offline). The rig orbits slowly; the pointer parallaxes the
camera and tilts the group with eased lerps, layered on top of the template's
existing CSS stage tilt.

Performance contract:

- `dpr={[1, 2]}` caps devicePixelRatio at 2.
- The R3F `frameloop` flips to `'never'` when the viewport leaves the screen
  (`IntersectionObserver`) or the document hides — rendering fully stops.
- `prefers-reduced-motion: reduce` mounts with `frameloop='demand'` and no
  animation hooks: exactly one posed frame is rendered.
- WebGL unavailable (or while the lazy chunk loads): the original CSS-built
  cube renders in the viewport instead.

Honest bundle cost (gzip, this commit): initial JS **69.73 KB** + CSS 6.89 KB +
HTML 0.66 KB = 77.3 KB before the scene loads; the three.js scene ships as a
lazy chunk `PrismScene-*.js` of **+242.38 KB** (three r185 + @react-three/fiber 9).
Total **319.7 KB** gzip. That 242 KB is the published price of a real 3D
viewport — for a 3D asset-library template, it earns its keep.
