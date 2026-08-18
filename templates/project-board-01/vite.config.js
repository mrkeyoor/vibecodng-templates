import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function paletteInjection() {
  const raw = process.env.BW_PALETTE
  if (!raw) return null
  const palette = JSON.parse(raw)
  const { accent, surface, text, muted } = palette.colors
  const scheme = palette.tags.includes('light') ? 'light' : 'dark'
  const css = `html:root{--bw-accent:${accent};--bw-surface:${surface};--bw-text:${text};--bw-muted:${muted};color-scheme:${scheme}}`
  return {
    name: 'vibecodng-palette',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace(/(<meta name="theme-color" content=")[^"]+(")/, `$1${surface}$2`)
          .replace('</head>', `<style id="bw-palette">${css}</style></head>`)
      },
    },
  }
}

export default defineConfig({ plugins: [react(), tailwindcss(), paletteInjection()].filter(Boolean) })

