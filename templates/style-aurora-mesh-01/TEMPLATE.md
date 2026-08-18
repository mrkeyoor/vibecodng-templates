# style-aurora-mesh-01 — Nimbus

An aurora mesh landing page for Nimbus, a fictional AI writing tool. The entire page sits
on a fixed field of four drifting, heavily blurred gradient blobs; the headline, stat
numbers, featured pricing border, and CTA orbs all draw from the same three aurora hues,
so the mesh is the design language rather than a backdrop decoration.

## Stack

- Vite
- React 19
- Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies

Typography: Bricolage Grotesque for display, Schibsted Grotesk for body, loaded from
Google Fonts. Palette runs through `--bw-accent`, `--bw-surface`, `--bw-text`,
`--bw-muted`; the rose and teal companions are derived from the accent with CSS relative
color syntax (`oklch(from ...)`), so a palette swap re-keys the whole aurora.

## Provenance and measured results

Numbers are copied verbatim from `/var/www/mrkeyoor.com/harness/out/<slug>/results.json`.
A11y columns are critical / serious / moderate / minor counts. Bundle columns are
gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar | first-party | — | — | — | — |
| Aurora background field | `animata-blurry-blob` | https://github.com/codse/animata | 0 / 0 / 0 / 0 | 91.7 / 65.4 / 26.3 | 82020 |
| Hero aurora headline | `magicui-aurora-text` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 82.9 / 65.4 / 17.5 | 76558 |
| Hero editor mock | first-party | — | — | — | — |
| Logo strip | first-party | — | — | — | — |
| Features card wash | `animata-moving-gradient` | https://github.com/codse/animata | 0 / 0 / 0 / 0 | 91.7 / 65.4 / 26.3 | 75805 |
| Showcase stat glow | `magicui-backlight` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 82.8 / 65.4 / 17.4 | 75710 |
| Showcase layout and copy | first-party | — | — | — | — |
| Pricing | first-party | — | — | — | — |
| Testimonials | first-party | — | — | — | — |
| CTA orb atmosphere | `fancy-animated-gradient-with-svg` | https://github.com/danielpetho/fancy | 0 / 0 / 0 / 0 | 92.4 / 65.4 / 27 | 74797 |
| CTA panel and copy | first-party | — | — | — | — |
| Footer | first-party | — | — | — | — |
| Reveal controller, icons, logo art | first-party | — | — | — | — |

All five indexed sources have `build.ok` and `mount.ok` true and zero recorded a11y
violations.

## Adaptation notes

- `animata-blurry-blob`: the two pulsing mix-blend blobs became a fixed four-blob field
  with palette-derived hues and slow 26 to 38 second drifts instead of a pulse.
- `magicui-aurora-text`: kept gradient-clipped drifting text and the sr-only copy for
  assistive tech; the hard-coded hex stops became the derived aurora hues. Used on the
  hero headline, featured plan tag, and stat numbers.
- `animata-moving-gradient`: kept the low-opacity panning linear gradient wash behind
  card content, slowed to 14s alternate and recolored from the palette.
- `magicui-backlight`: the feGaussianBlur + saturate + composite filter is defined once
  and haloes the showcase stat numbers.
- `fancy-animated-gradient-with-svg`: kept blurred SVG circles drifting behind content as
  the CTA atmosphere; framer-motion was replaced with CSS keyframes.

Motion: once-only scroll reveals (90ms stagger) plus four slow ambient loops that define
the style (blob drift, aurora text, card wash, CTA orbs) and a blinking caret in the
editor mock. All of it, including the ambient loops, stops under `prefers-reduced-motion`;
the aurora text then rests at a fixed gradient position so the words stay visible.

Honest accessibility note: gradient-clipped text is the one deliberate contrast risk in
this style. At the default palette the aurora hues stay light against the near-black
surface (roughly 7:1 or better at their darkest stop), but a custom palette whose derived
hues turn dark could pull parts of the headline or stat numbers below AA. Panels use a
72 percent opaque surface behind body text to keep the mesh from bleeding through
paragraphs. The muted body-on-panel combinations sit above 4.5:1 at the default palette.

## Signature hero — real animated mesh-gradient shader

The hero background is a first-party GLSL mesh-gradient field
(`src/components/shader/MeshShader.jsx`, runtime in
`src/components/shader/shader-runtime.js`): simplex-noise fbm, domain-warped
twice (the classic `fbm(p + k·fbm(p + k·fbm(p)))` construction), blending
four palette-derived colors into a slow, hypnotic ink-flow. The pointer
bulges the field around the cursor. Raw WebGL2 — **zero new npm
dependencies**. The CSS blob field stays in the page as both the no-WebGL
fallback and the below-the-fold backdrop; the canvas fades into it at the
hero's bottom edge via a CSS mask.

Engineering facts, all verifiable in the source:

- Lazy chunk, loaded only after a WebGL2 probe succeeds; compile failure or
  context loss falls back to the CSS blobs.
- Colors are uniforms resolved from `--bw-accent` / `--bw-surface` computed
  style, with the same +75° / −105° hue rotations the CSS layer derives via
  `oklch` — palette swaps re-key the shader identically.
- `devicePixelRatio` cap 2, and the field intentionally renders at 0.5×
  internal resolution (upscaled by CSS — invisible on a soft gradient,
  4× cheaper per frame). Loop pauses off-viewport and on `document.hidden`;
  adaptive quality steps resolution down further if frame-time stays over
  ~30 ms. `prefers-reduced-motion` renders exactly one static frame.
- A radial scrim inside the shader dims the field behind the headline
  column so the aurora never outshouts the copy.
- FPS note: on this build box's SwiftShader *software* GL the full-bleed
  field settles around 15–25 fps after adaptive steps; hardware GL
  (any real GPU, including integrated) runs this class of shader at 60 fps.

## Build

```bash
npm install
npx vite build
```

Measured production bundle (this commit): `index.html` 0.57 KB gzip + CSS 6.63 KB gzip +
main JS 68.09 KB gzip = **75.29 KB gzip initial**, plus the lazy
`MeshShader` chunk 3.92 KB gzip = **79.21 KB gzip total** (budget: under 160 KB).
Honest delta vs the CSS-only v1 (74.56 KB): **+4.65 KB total** — 3.92 KB lazy
shader chunk, ~0.7 KB wrapper in the main bundle.

## Run locally

```bash
npm install
npm run dev
```
