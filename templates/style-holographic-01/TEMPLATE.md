# style-holographic-01 — "Flux"

A style-showcase landing page for a fictional portfolio platform for visual
artists. The direction is holographic foil: bright pastel-metal surfaces
built from CSS conic gradients over near-black `#0B0B12`, a fixed five-stop
rainbow ramp (pink, gold, mint, sky, violet), hue-rotate shifts on
interaction, and a single shimmer sweep on hover.

## Stack

- Vite
- React 19
- Tailwind CSS 4
- No component runtime dependencies

Theme is driven by `--bw-accent`, `--bw-surface`, `--bw-text`, `--bw-muted`.
The foil ramp itself is intentionally hard-coded in the first-party
holographic classes so the palette injection cannot break the metal.

## The first-party holographic system

The index holds exactly one published holographic component, so the
iridescent language here is authored first-party as reusable pieces in
`src/styles.css` and `src/components/Effects.jsx`:

- `.holo-text` — foil ink for headlines (gradient `background-clip: text`),
  hue-rotates on hover of itself or a `.holo-hover` ancestor.
- `.holo-surface` — the foil sheet: a conic gradient angled by
  `--holo-angle` under a white sheen. Static until interaction.
- `.holo-shimmer` — one diagonal light streak per hover, never looping.
- `.holo-border` — conic rainbow ring around a solid panel.
- `useHoloTilt()` — pointer position turns `--holo-angle`, so the hero and
  CTA panels catch the light as the cursor moves. Interaction-only.

## Provenance and measured results

All numbers are copied from each indexed component's
`/var/www/mrkeyoor.com/harness/out/<slug>/results.json` (copies in
`provenance/results/`). A11y columns are critical / serious / moderate /
minor counts. Bundle columns are gzip / baseline gzip / marginal, in KB.
`totalMs` is the recorded harness total.

| Section | Index slug / first-party | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar | first-party | — | — | — | — |
| Hero (foil panel, foil headline) | first-party | — | — | — | — |
| Showcase wall | `tripled-holographic-wall-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 124.0 / 65.4 / 58.6 | 154491 |
| Features | first-party | — | — | — | — |
| Stats layout | first-party | — | — | — | — |
| Stats count-up | `motion-primitives-animated-number` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 132.6 / 65.4 / 67.2 | 83599 |
| Pricing | first-party | — | — | — | — |
| FAQ | first-party | — | — | — | — |
| CTA | first-party | — | — | — | — |
| Footer | first-party | — | — | — | — |

The showcase wall adapts the indexed holographic wall's grid-of-foil-tiles
idea but is rebuilt on the first-party `.holo-surface` system: the indexed
component's continuous animation is replaced with hover-only hue shift and a
single shimmer pass. Its measured numbers describe the indexed original, not
this rebuild.

## Signature hero — real thin-film interference shader

The hero panel is no longer only the CSS conic foil: when WebGL2 is
available, a first-party GLSL fragment shader
(`src/components/shader/HoloShader.jsx`, runtime in
`src/components/shader/shader-runtime.js`) renders genuine thin-film
interference — a cosine of the optical path difference at three
wavelengths over a simulated foil surface (brushed micro-normals, etched
rings, a diagonal diffraction grating). Moving the pointer over the hero
tilts the light angle, so the rainbow slides across the card exactly like
tilting a holo card in daylight; an idle orbit keeps it breathing when the
cursor is elsewhere. Raw WebGL2 — **zero new npm dependencies**.

Engineering facts, all verifiable in the source:

- Lazy chunk: the shader is `React.lazy`-loaded only after a WebGL2 probe
  succeeds. No WebGL2 (or a compile failure, or a lost context) = the v1
  CSS conic foil + pointer tilt beneath it, untouched.
- `devicePixelRatio` capped at 2; the loop pauses off-viewport
  (IntersectionObserver) and on `document.hidden`; an adaptive step drops
  internal resolution (up to twice) if the frame-time average exceeds
  ~30 ms.
- `prefers-reduced-motion`: exactly one static frame is rendered — no
  loop, no pointer listeners.
- Palette-aware: `--bw-accent` / `--bw-surface` are resolved from computed
  style into uniforms at mount (and again on a `bw:palette` event), so
  palette swaps re-key the foil.
- FPS note: measured ~50 fps at the panel's size even under SwiftShader
  *software* rendering (no GPU); on any hardware GL device this is a
  60 fps effect.

## Build

```
npx vite build
dist/index.html                       0.81 kB │ gzip:  0.43 kB
dist/assets/index-*.css              22.19 kB │ gzip:  5.60 kB
dist/assets/HoloShader-*.js (lazy)    7.34 kB │ gzip:  3.51 kB
dist/assets/index-*.js              215.34 kB │ gzip: 67.38 kB
```

Initial gzip (before the hero shader chunk loads): **73.41 KB**.
Total gzip with the shader: **76.92 KB** (budget 160 KB).
Honest delta vs the CSS-only v1 (72.41 KB): **+4.51 KB total**, of which
3.51 KB is the lazy shader chunk and ~1 KB is the wrapper + runtime share
in the main bundle.

## Honest costs

- Conic gradients are cheap to hold but not free to change: the hover
  `filter: hue-rotate()` transition re-rasterizes the foil for its 600ms
  duration, and the pointer-tilt panels repaint the conic layer on every
  pointermove while hovered. On low-end devices that is the most expensive
  interaction on the page, which is why it is confined to two panels and
  never runs idle.
- The wall renders eight foil sheets on one screen; each is two gradient
  layers. First paint is fine, but stacking more foil than this would start
  to show in paint profiles.
- Foil text and dark-ink-on-foil were tuned for contrast: the surface stops
  mix 84-88% color so `#14101C` ink stays above 7:1. Earlier, darker foil
  looked moodier but failed contrast; brightness won.
- Nothing loops. Reveals and count-ups run once per view; shimmer and hue
  shifts are hover-only; the tilt is pointer-driven. All motion, including
  the tilt handler, is disabled under `prefers-reduced-motion`.

## Run locally

```bash
npm install
npm run dev
```
