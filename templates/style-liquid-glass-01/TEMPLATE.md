# style-liquid-glass-01 — Meridian

A light liquid glass landing page for Meridian, a fictional personal finance app. The
language is Apple-adjacent: white translucent panels with heavy backdrop blur and
saturation, specular top-edge highlights, a one-pass sheen sweep, conic refraction rings
around buttons, and soft colored light washing the field behind the glass.

## Stack

- Vite
- React 19
- Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies

Typography: Instrument Sans with Instrument Serif italics as accent words, loaded from
Google Fonts. Palette runs through `--bw-accent`, `--bw-surface`, `--bw-text`,
`--bw-muted`; a companion tint is derived from the accent via CSS relative color syntax
so palette swaps recolor the light field, flow rails, and logo gradient together.

## Provenance and measured results

Numbers are copied verbatim from `/var/www/mrkeyoor.com/harness/out/<slug>/results.json`.
A11y columns are critical / serious / moderate / minor counts. Bundle columns are
gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar | first-party | — | — | — | — |
| Hero (composition) | `cultui-hero-liquid-metal` | https://github.com/nolly-studio/cult-ui | 0 / 1 / 0 / 0 | 109.8 / 65.4 / 44.4 | 52988 |
| Hero balance card art | first-party | — | — | — | — |
| Buttons (liquid ring) | `cultui-metal-button` | https://github.com/nolly-studio/cult-ui | 0 / 0 / 0 / 0 | 112.4 / 65.4 / 47 | 79274 |
| Ratings strip | first-party | — | — | — | — |
| Features (3 of 4 cards) | first-party | — | — | — | — |
| Features insight card | `ruixen-glass-ai-card` | https://github.com/ruixenui/ruixen.com | 0 / 0 / 0 / 0 | 124.9 / 65.4 / 59.5 | 77110 |
| Auto-save flow diagram | `ruixen-glass-shipment-flow` | https://github.com/ruixenui/ruixen.com | 0 / 0 / 0 / 0 | 125.4 / 65.4 / 60 | 71609 |
| Stats | first-party | — | — | — | — |
| Pricing | first-party | — | — | — | — |
| FAQ | first-party | — | — | — | — |
| CTA form | `ruixen-glass-form` | https://github.com/ruixenui/ruixen.com | 0 / 0 / 0 / 0 | 125.6 / 65.4 / 60.2 | 83735 |
| Footer | first-party | — | — | — | — |
| Reveal controller, icons | first-party | — | — | — | — |

All five indexed sources have `build.ok` and `mount.ok` true. The index records one
serious color-contrast finding for `cultui-hero-liquid-metal`; this template does not
inherit the offending shader-over-text treatment, hero text here is solid ink on the light
surface. The other four sources recorded zero violations.

## Adaptation notes

- `cultui-hero-liquid-metal`: kept the badge / display heading / description / CTA / visual
  arrangement; the real LiquidMetal shader is restored as a raw WebGL2 port (see
  "Signature hero" below) with the CSS-and-SVG glass balance card floating on the
  chrome stage. The CSS chrome gradient remains as the no-WebGL fallback.
- `cultui-metal-button`: the MetalFx shader ring is reinterpreted as a CSS conic-gradient
  ring (masked padding-box) over a glass or accent fill; the shadcn host layer is gone.
- `ruixen-glass-ai-card`: kept the shimmering skeleton lines and primary action; dropped
  motion/react and the AudioContext click sound; shimmer respects reduced motion.
- `ruixen-glass-shipment-flow`: kept the glass-node-plus-animated-dashed-rail idea, retold
  as checking to vault and index accounts; rails pause under reduced motion and the layout
  gained a vertical mobile variant.
- `ruixen-glass-form`: kept the separated frosted rows and iOS-style toggle as an email
  capture form with a real switch role; sound and entrance animation removed.

Motion: once-only reveals (90ms stagger), one-pass sheens on hero card, flow panel, and
CTA panel, looping dashed rails and skeleton shimmer as the only persistent motion, hover
lift on cards. Everything is disabled under `prefers-reduced-motion`.

Honest accessibility note: the liquid style itself costs little here because text sits on
high-opacity white glass over a light surface, body text and headings are comfortably AA.
The two decorative rail labels and muted 11px metadata are the closest to the AA line, and
a saturated custom palette behind low-opacity panels could push muted text under 4.5:1.
The skeleton lines in the insight card are decorative and hidden from assistive tech.

## Build

```bash
npm install
npx vite build
```

Measured production bundle (this commit): `index.html` 0.52 KB gzip + CSS 7.11 KB gzip +
JS 68.11 KB gzip = **75.74 KB gzip total** (budget: under 160 KB).

## Run locally

```bash
npm install
npm run dev
```

## Signature hero

The hero visual is a real **liquid-metal / chrome WebGL2 shader**
(`src/components/LiquidMetal.jsx`): a raw GLSL port of the
`@paper-design/shaders` "LiquidMetal" fragment (MIT — the exact shader the
original `cultui-hero-liquid-metal` used via `@paper-design/shaders-react`),
reduced to the full-fill canvas variant with the original cult-ui defaults
(repetition 6, softness 0.8, distortion 0.4, contour 0.4; dispersion calmed to
±0.5 and tinted Meridian steel-blue for the light UI). A first-party
pointer-reactive ripple displaces the surface and shears the band phase around
the cursor, so the chrome flows away from the mouse. The glass balance card
floats over the stage.

Performance contract:

- Raw WebGL2, one fullscreen triangle, no runtime dependency added.
- `devicePixelRatio` capped at 2; rAF paused off-viewport
  (`IntersectionObserver`) and while `document.hidden`.
- `prefers-reduced-motion: reduce` renders exactly one static frame.
- No WebGL2 (or while the lazy chunk loads): the `.metal-fallback` CSS chrome
  gradient renders the stage instead.

Honest bundle cost (gzip, this commit): initial JS **68.72 KB** + CSS 7.72 KB +
HTML 0.55 KB; the shader ships as a lazy chunk `LiquidMetal-*.js` of
**+3.84 KB** after first paint. Total **80.8 KB** — the restored shader costs
under 4 KB because it is plain GLSL, not the shader-react runtime.
