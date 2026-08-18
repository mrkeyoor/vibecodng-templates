# style-skeuomorphism-01 — Deck

A complete skeuomorphism landing page for Deck, a fictional music practice app. The page is built like the gear it describes: tolex leather with stitched seams, brushed-aluminum pedal enclosures with screws and rotary knobs, a cream VU meter, an LED streak strip, ruled setlist paper taped to the amp, and tactile push buttons with real travel. Four indexed components are adapted (`src/components/Skeuo.jsx`); the rest of the hardware is first-party.

## Stack

- Vite 7, React 19, Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies
- Theme is four CSS variables: `--bw-accent`, `--bw-surface`, `--bw-text`, `--bw-muted`. The material palette (leather, brushed metal, paper, LED-off) is entirely `color-mix` derivations of those four, so one palette swap re-upholsters the amp
- Production build: 74.9 KB gzip total (index.html + all assets, gzip -9)

## Provenance and measured results

Every number below is copied from the indexed component's `results.json` (copies in `provenance/results/`). A11y columns are critical / serious / moderate / minor counts. Bundle columns are gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total. For all four adapted slugs, indexed `build.ok` and `mount.ok` are true.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Hero device mockup | `magicui-iphone` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 83.9 / 65.4 / 18.5 | 19997 |
| Global tolex grain, CTA leather grain | `magicui-noise-texture` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 91.7 / 65.4 / 26.3 | 16193 |
| Practice-room LED streak meter | `8bitcn-progress` | https://github.com/TheOrcDev/8bitcn-ui | 0 / 1 / 0 / 0 | 95.3 / 65.4 / 29.9 | 122047 |
| Desk-shortcuts key caps | `8bitcn-kbd` | https://github.com/TheOrcDev/8bitcn-ui | 0 / 0 / 0 / 0 | 91.7 / 65.4 / 26.3 | 80372 |
| Navbar (leather + brass plate) | first-party | this template | — | — | — |
| Hero faceplate: knobs, switches, LEDs | first-party | this template | — | — | — |
| Pedalboard feature cards | first-party | this template | — | — | — |
| VU meter and stat plates | first-party | this template | — | — | — |
| Pricing amp-series plates | first-party | this template | — | — | — |
| FAQ setlist paper | first-party | this template | — | — | — |
| CTA, footer back panel | first-party | this template | — | — | — |
| Reveal controller (IntersectionObserver) | first-party | this template | — | — | — |

## Adaptation notes, honestly

- `magicui-iphone` only accepts an image or video `src` for the screen. This adaptation keeps the exact frame geometry, screen-punch mask, and button paths, but renders arbitrary React children in the screen area so the Deck UI inside is live, palette-aware markup instead of a bitmap. The hard-coded light/dark grays were mapped onto the material variables.
- `magicui-noise-texture` is ported nearly verbatim (TypeScript and `cn()` removed) and used at low opacity as the tolex grain. Note its measured marginal cost (26.3 KB in the indexed harness) is dominated by the harness baseline delta, not the component itself; in this template it is a few hundred bytes of SVG filter.
- `8bitcn-progress` was indexed with a serious `aria-progressbar-name` finding and depends on Radix and cva. The adaptation keeps its distinctive twenty-segment retro indicator and chunky offset-border frame, drops both dependencies, restyles segments as amber LEDs, and names the progressbar (`aria-label`), resolving the recorded finding. The other 8bitcn retro-pixel entries were deliberately not used wholesale; a pixel font would fight the physical-materials direction, so only the segment logic and the kbd cap survived the translation into hardware.
- `8bitcn-kbd` keeps the indexed structure and sizing but swaps the Press Start 2P import for the faceplate display stack and adds a machined-cap gradient.

Other honest costs: engraved faceplate labels are intentionally low contrast (they imitate stamped metal), so every engraved string is either decorative or duplicated by nearby high-contrast text, and controls carry `sr-only` or `aria-label` names. The knobs and switches in the marketing page are illustrative controls, not a functioning metronome: the switches toggle state and LEDs respond, but no audio exists. Dark leather plus the fixed noise overlay costs some paint time on very low-end devices; the noise layer is a single static SVG filter, not an animation.

## Motion

Once-only reveals, a VU needle that sweeps and settles once per visit, LED segments that light left to right once, tactile button travel on press, and switch flips. All motion is disabled under `prefers-reduced-motion`; the needle and LEDs render at their final state.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npx vite build
```

Fonts load from Google Fonts (Bebas Neue + Spectral); everything else is self-contained.
