# VELLUM OBJECTS — Numbered Furniture Editions

A measured collectible-furniture commerce template with a real-time Three.js room composer, numbered object ledger, material junction study, edition provenance, and inline reservation record.

This original fictional furniture bureau is built around a **room volume that registers**. Rather than treating collectible furniture as a product-card grid, the page lets a collector configure Ledge 02 inside a live spatial model and resolve span, finish, wall position, viewpoint, side clearance, edition, lead time, price, deposit, and reservation code.

## Spatial 3D system

- React Three Fiber and Three.js build the room, architectural grid, wall and configurable Ledge 02 geometry.
- Framer Motion registers viewpoint and measurement-copy changes.
- Elevation, corner and plan cameras are explicit controls; the scene never auto-rotates.
- Reduced-motion mode freezes travel while preserving every camera, material, span and placement outcome.
- The WebGL configurator intentionally uses a 360 KB compressed code budget instead of shipping a video or image sequence.

Desktop uses a simultaneous drafting plan. Mobile becomes a one-hand swatch wallet and explicit Swatch → Span → Place sequence, followed by an inline reservation record rather than a cart or drawer.

## Run locally

```bash
npm install
npm run dev
npm run build
```

## Palette support

The Vite build accepts a `BW_PALETTE` JSON object and maps its `accent`, `surface`, `text`, and `muted` colors onto semantic `--bw-*` variables. The default world is `vellum-carbon`; representative light and dark library palettes are intended to preserve the same hierarchy and interaction states.

## Asset provenance

All three shipped images were generated specifically for this fictional template with OpenAI's built-in image generation tool on 2026-08-19, then locally converted to optimized WebP. They contain no external brand, copied reference asset, embedded text, or runtime dependency.

- `ledge-02-studio.webp`: original Ledge 02 hero object; sparse lime-plaster stage, charred ash, asymmetric timber return, brushed-aluminium support. Prompt constrained the full object and floor contacts to a measurement-safe crop.
- `sill-01-room.webp`: original Sill 01 leather-sling chair in a restrained apartment, providing domestic scale only in the object dossier.
- `material-junction.webp`: original macro construction junction of charred ash, brushed aluminium, and clay lacquer, used only as material evidence.

Dimensions, prices, edition counts, lead windows, clearances, product names, placement codes, studio identity, and reservation responses are fictional demonstration data. The fit calculation is geometric guidance, not installation or safety advice.

## Review boundary

This directory is review-only. It is not connected to a catalog, shared manifest, Git history, deployed route, payment service, or live inventory system.
