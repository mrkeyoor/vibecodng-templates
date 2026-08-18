# docs-01

Gridnote is a fictional minimal mono documentation and changelog template. It combines a persistent docs shell with interactive package-manager tabs, a file tree, API reference table, product concepts, and release notes.

## Stack

- Vite
- React 19
- Tailwind CSS 4
- No component runtime dependencies

## Provenance and measured results

All numbers below are copied from each selected index component's `provenance/results/<slug>.json`. A11y columns are critical / serious / moderate / minor. Bundle columns are gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Top navbar | `hyperui-headers-4` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 84.5 / 65.4 / 19.1 | 18133 |
| Docs sidebar | `shadcn-block-sidebar-13` | https://github.com/shadcn-ui/ui | 0 / 0 / 0 / 0 | 124.8 / 65.4 / 59.4 | 67340 |
| Install tabs | `originui-comp-107` | https://github.com/origin-space/originui | 0 / 0 / 0 / 0 | 101.5 / 65.4 / 36.1 | 30112 |
| File tree | `magicui-file-tree` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 107.5 / 65.4 / 42.1 | 81566 |
| Concept grid | `hyperui-feature-grids-1` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.3 / 65.4 / 17.9 | 28407 |
| API table | `shadcn-table` | https://github.com/shadcn-ui/ui | 0 / 0 / 0 / 0 | 76.6 / 64.6 / 12 | 7617 |
| Changelog cards | `hyperui-blog-cards-1` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83 / 65.4 / 17.6 | 18797 |
| CTA | `hyperui-ctas-4` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.2 / 65.4 / 17.8 | 26283 |
| Footer | `hyperui-footers-5` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 85.6 / 65.4 / 20.2 | 25796 |
| Section reveals | `motion-primitives-in-view` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |

Every selected record has indexed `build.ok` and `mount.ok` set to `true`, zero indexed a11y findings, and no overflow at 375, 768, or 1440 pixels.

## Run locally

```bash
npm install
npm run dev
```

Build with `npx vite build`.

## Adaptation notes

The verified sidebar, tabs, tree, table, card, CTA, and footer structures were adapted into one coherent documentation shell. The clipboard action degrades safely when unavailable. Reveals are once-only; reduced-motion mode disables animation and smooth scrolling while preserving visibility.
