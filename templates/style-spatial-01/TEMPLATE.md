# sir-style-spatial-01 — "Atlas"

Style showcase: **spatial interface** — floating layered planes, AR/VR-inspired depth, restrained parallax.
Atlas is a fictional spatial documentation platform. The page is built from a single "plane" surface system
(soft-shadow floating cards on a fog background), a pointer-parallax hero stack with anchored HUD chips, a
source-to-space beam diagram, tabbed view transitions, a dotted coverage map, and a magnifying integration
dock. Light theme, serif display type, one azure accent.

## Stack

- Vite, React 19, Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies
- Fonts: Instrument Serif / Schibsted Grotesk / Spline Sans Mono via Google Fonts

## Provenance and measured results

Component patterns were selected from the `mrkeyoor.components` index (`style: 'spatial'`, published,
mount ok) and rebuilt without the `motion` runtime, keeping each source's interaction pattern. Numbers are
copied verbatim from `/var/www/mrkeyoor.com/harness/out/<slug>/results.json`. A11y columns are critical /
serious / moderate / minor counts; bundle columns are gzip / baseline gzip / marginal in KB; `totalMs` is
the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| All section reveals | `motion-primitives-in-view` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |
| Reveal stagger (per group) | `motion-primitives-animated-group` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.6 / 65.4 / 58.2 | 74204 |
| Hero headline blur-in | `eldora-blur-in-text` | https://github.com/karthikmudunuri/eldoraui | 0 / 0 / 0 / 0 | 123.6 / 65.4 / 58.2 | 73697 |
| Hero doc plane hover depth | `uilayouts-hovercard3` | https://github.com/ui-layouts/uilayouts | 0 / 0 / 0 / 0 | 90.2 / 65.4 / 24.8 | 69974 |
| Features (beam diagram) | `magicui-animated-beam` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 132.3 / 65.4 / 66.9 | 62218 |
| Views showcase (tab panel transitions) | `motion-primitives-transition-panel` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 133.2 / 65.4 / 67.8 | 71813 |
| Coverage (dotted world map) | `magicui-dotted-map` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 107.6 / 65.4 / 42.2 | 21580 |
| CTA (integration dock) | `magicui-dock` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 133.4 / 65.4 / 68 | 78919 |
| Navbar (floating glass pill) | first-party | — | — | — | — |
| Pricing planes | first-party (reuses plane system + hovercard3 depth) | — | — | — | — |
| Testimonials (offset quote planes) | first-party | — | — | — | — |
| Footer | first-party | — | — | — | — |

Honesty notes:

- The dotted map is a hand-placed coarse dot grid, not the source component's projection math; it keeps
  the visual idea (dot continents + pulsing live regions) at a fraction of the code.
- The beam pulses loop (like the source component); they are the only perpetual motion on the page besides
  the map halos, and both stop under reduced motion.
- Considered `ruixen-deploy-region-globe` for Coverage but its index record shows 2 critical + 2 serious
  a11y findings, so the dotted map won.

## Motion policy

Parallax is pointer-driven and capped at roughly ±10px per depth layer; there is no scroll-driven
transform anywhere. Reveals are once-only. The dock magnifies on pointer proximity only. Under
`prefers-reduced-motion` all parallax, blur-in, beams, halos, dock scaling, and hover depth are disabled
while every plane stays fully visible. `?static` in the URL forces the fully revealed, motionless state
for screenshot tooling.

## Build

```bash
npm install
npx vite build --base=./
```

Measured production bundle (dist html+css+js, gzip): **74.8 KB** total
(index.html 0.7 KB, CSS 6.6 KB, JS 69.4 KB gzip). Budget: < 160 KB. Fonts load from Google Fonts at runtime.

Screenshot (768px full page): `/tmp/opus-style-spatial.png`
