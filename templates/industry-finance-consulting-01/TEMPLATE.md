# industry-finance-consulting-01

Meridian Ledger Advisors is a complete finance-consulting template adapted from `landing-01`. It retains the source provenance records, attribution comments, and the four-variable `--bw-*` palette contract while establishing a brand and voice distinct from the Meridian finance app template.

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

The source structures were retained while the content, palette, spacing, and product interface were rebuilt for an operator-led finance advisory. The page uses native React, CSS, and `IntersectionObserver`; reduced-motion mode keeps every section visible.

## Pack

- Base skeleton: `landing-01`
- Default palette: `mint-ledger`
- Added forecasting and margin services, USD consulting fees, a four-step working cadence, founder-focused credentials, consulting FAQs, and a clear non-affiliation note
- Replaced the software dashboard with first-party inline SVG management reporting artwork

