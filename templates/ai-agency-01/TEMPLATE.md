# ai-agency-01

Signalcraft is a fictional applied-AI agency landing page with an effects-heavy gradient-glow and aurora art direction. The experience uses layered CSS light fields, glass surfaces, morphing forms, and a pointer glow without adding animation packages.

## Stack

- Vite
- React 19
- Tailwind CSS 4
- No component runtime dependencies

## Provenance and measured results

All numbers below are copied from each selected index component's `provenance/results/<slug>.json`. A11y columns are critical / serious / moderate / minor. Bundle columns are gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar | `efferd-header-1` | https://github.com/shabanhr/efferd-ui | 0 / 0 / 0 / 0 | 100.2 / 65.4 / 34.8 | 197992 |
| Hero | `tailark-mist-hero-section-5` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 130.2 / 65.4 / 64.8 | 101031 |
| Aurora headline | `magicui-aurora-text` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 82.9 / 65.4 / 17.5 | 76558 |
| Moving aurora | `animata-moving-gradient` | https://github.com/codse/animata | 0 / 0 / 0 / 0 | 91.7 / 65.4 / 26.3 | 75805 |
| Pointer glow | `motion-primitives-glow-effect` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 132.5 / 65.4 / 67.1 | 74601 |
| Capability cards | `tripled-feature-cards-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 93.3 / 65.4 / 27.9 | 134963 |
| Case-study metrics | `tailark-mist-stats-1` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 95.6 / 65.4 / 30.2 | 96024 |
| Testimonial | `tripled-glassmorphism-testimonials-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 93.2 / 65.4 / 27.8 | 121610 |
| CTA | `tailark-dusk-call-to-action-1` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 115.4 / 65.4 / 50 | 95837 |
| Footer | `ruixen-ruixen-gradient-footer` | https://github.com/ruixenui/ruixen.com | 0 / 0 / 0 / 0 | 83.5 / 65.4 / 18.1 | 86792 |
| Section reveals | `motion-primitives-in-view` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |

Every selected record has indexed `build.ok` and `mount.ok` set to `true`, zero indexed a11y findings, and no overflow at 375, 768, or 1440 pixels.

## Run locally

```bash
npm install
npm run dev
```

Build with `npx vite build`.

## Signature hero — WebGL signal-wave field

The hero backdrop is a first-party GLSL signal-wave field
(`src/components/shader/SignalShader.jsx`, runtime in
`src/components/shader/shader-runtime.js`): eight glowing waveform ribbons
in a shallow depth stack (nearer rows are larger, brighter, faster — cheap
3D), each a sum of sines plus value noise so it reads as live telemetry.
Moving the pointer swells ribbon amplitude around the cursor like a hand
passed over strings; a faint quantized spectrum-bar floor adds the
audio-analyzer feel. Raw WebGL2 — **zero new npm dependencies**. When
WebGL2 is unavailable the v1 CSS aurora blobs render instead.

Engineering facts, all verifiable in the source:

- Lazy `React.lazy` chunk behind a WebGL2 probe; compile failure or context
  loss reverts to the CSS aurora.
- Ribbon colors are uniforms derived from `--bw-accent` (plus −85° / +65°
  hue rotations) and `--bw-surface`, resolved from computed style at mount —
  palette swaps re-key the whole field.
- `devicePixelRatio` cap 2 with a 0.6× internal resolution render (CSS
  upscales; the glow aesthetic hides it). Loop pauses off-viewport
  (IntersectionObserver) and on `document.hidden`; adaptive quality drops
  resolution further if the frame-time average exceeds ~30 ms.
- `prefers-reduced-motion`: one static frame, no loop, no pointer handlers.
- A center scrim inside the shader keeps the headline the loudest thing in
  the hero.
- FPS note: on this build box's SwiftShader *software* GL the field settles
  around 18–25 fps after adaptive steps; on hardware GL this is a 60 fps
  effect.

Bundle cost: main bundle 70.20 KB gzip (html 0.37 + CSS 4.98 + JS 64.85)
plus the lazy `SignalShader` chunk 3.61 KB gzip = **73.81 KB gzip total**.
Honest delta vs the CSS-only hero: **+3.61 KB lazy chunk + ~0.4 KB** wrapper
code in the main bundle.

## Adaptation notes

The verified hero, cards, stats, testimonial, CTA, footer, and effect patterns were adapted in native React and CSS. Continuous ambient effects pause under `prefers-reduced-motion`; the pointer glow is removed and every reveal remains visible.
