import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function paletteInjection() {
  const raw = process.env.BW_PALETTE
  if (!raw) return null
  const p = JSON.parse(raw)
  const { accent, surface, text, muted } = p.colors
  const scheme = p.tags.includes('light') ? 'light' : 'dark'
  const lum = (hex) => hex.replace('#', '').match(/.{2}/g).map((x) => parseInt(x, 16) / 255).map((x) => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4).reduce((n, x, i) => n + x * [.2126, .7152, .0722][i], 0)
  const a = lum(accent), s = lum(surface)
  const safe = (Math.max(a, s) + .05) / (Math.min(a, s) + .05) >= 4.5 ? accent : text
  const on = (a + .05) / .05 > 1.05 / (a + .05) ? '#101214' : '#ffffff'
  return {
    name: 'palette',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => html.replace(/(<meta name="theme-color" content=")[^"]+("\/>)/, `$1${surface}$2`).replace('</head>', `<style>html:root{--bw-accent:${accent};--bw-surface:${surface};--bw-text:${text};--bw-muted:${muted};--bw-on-accent:${on};--bw-accent-safe:${safe};color-scheme:${scheme}}</style></head>`)
    }
  }
}

export default defineConfig({ plugins: [react(), paletteInjection()].filter(Boolean) })
