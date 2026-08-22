import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function paletteInjection() {
  const raw = process.env.BW_PALETTE
  if (!raw) return null
  const palette = JSON.parse(raw)
  const { accent, surface, text, muted } = palette.colors
  const scheme = palette.tags.includes('light') ? 'light' : 'dark'
  const luminance = (hex) => hex.replace('#', '').match(/.{2}/g).map((value) => parseInt(value, 16) / 255).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4).reduce((total, value, index) => total + value * [0.2126, 0.7152, 0.0722][index], 0)
  const accentLuminance = luminance(accent)
  const surfaceLuminance = luminance(surface)
  const accentSurfaceRatio = (Math.max(accentLuminance, surfaceLuminance) + 0.05) / (Math.min(accentLuminance, surfaceLuminance) + 0.05)
  const blackRatio = (accentLuminance + 0.05) / 0.05
  const whiteRatio = 1.05 / (accentLuminance + 0.05)
  const onAccent = blackRatio > whiteRatio ? '#101010' : '#ffffff'
  const safeAccent = accentSurfaceRatio >= 4.5 ? accent : text
  const css = `html:root{--bw-accent:${accent};--bw-surface:${surface};--bw-text:${text};--bw-muted:${muted};--bw-on-accent:${onAccent};--bw-accent-safe:${safeAccent};color-scheme:${scheme}}`
  return { name: 'vibecodng-palette', transformIndexHtml: { order: 'post', handler(html) { return html.replace(/(<meta name="theme-color" content=")[^"]+("\/>)/, `$1${surface}$2`).replace('</head>', `<style id="bw-palette">${css}</style></head>`) } } }
}

export default defineConfig({ plugins: [react(), paletteInjection()].filter(Boolean) })
