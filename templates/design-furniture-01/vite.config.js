import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function paletteInjection() {
  const raw = process.env.BW_PALETTE
  if (!raw) return null
  const palette = JSON.parse(raw)
  const { accent, surface, text, muted } = palette.colors
  const scheme = palette.tags.includes('light') ? 'light' : 'dark'
  const luminance = (hex) => hex.replace('#', '').match(/.{2}/g)
    .map((part) => parseInt(part, 16) / 255)
    .map((part) => part <= 0.04045 ? part / 12.92 : ((part + 0.055) / 1.055) ** 2.4)
    .reduce((total, part, index) => total + part * [0.2126, 0.7152, 0.0722][index], 0)
  const accentLum = luminance(accent)
  const surfaceLum = luminance(surface)
  const contrast = (Math.max(accentLum, surfaceLum) + 0.05) / (Math.min(accentLum, surfaceLum) + 0.05)
  const onAccent = (accentLum + 0.05) / 0.05 > 1.05 / (accentLum + 0.05) ? '#101010' : '#ffffff'
  const safeAccent = contrast >= 4.5 ? accent : text
  const css = `html:root{--bw-accent:${accent};--bw-surface:${surface};--bw-text:${text};--bw-muted:${muted};--bw-on-accent:${onAccent};--bw-accent-safe:${safeAccent};color-scheme:${scheme}}`
  return {
    name: 'vibecodng-palette',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => html
        .replace(/(<meta name="theme-color" content=")[^"]+("\/>)/, `$1${surface}$2`)
        .replace('</head>', `<style>${css}</style></head>`),
    },
  }
}

export default defineConfig({
  plugins: [react(), paletteInjection()].filter(Boolean),
})
