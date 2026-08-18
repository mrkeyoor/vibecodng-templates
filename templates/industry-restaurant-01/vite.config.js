import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const defaultPalette={name:'canyon-dusk',colors:{accent:'#E88657',surface:'#2A1814',text:'#FFF0E6',muted:'#C0A094'},tags:['dark','earth','warm']}
function paletteInjection(){const palette=JSON.parse(process.env.BW_PALETTE||JSON.stringify(defaultPalette));const{accent,surface,text,muted}=palette.colors;const scheme=palette.tags.includes('dark')?'dark':'light';const css=`html:root{--bw-accent:${accent};--bw-surface:${surface};--bw-text:${text};--bw-muted:${muted};color-scheme:${scheme}}`;return{name:'bw-palette-injection',transformIndexHtml:{order:'post',handler(html){return html.replace(/(<meta name="theme-color" content=")[^"]+(")/i,`$1${surface}$2`).replace('</head>',`<style id="bw-palette">${css}</style></head>`)}}}}
export default defineConfig({plugins:[react(),tailwindcss(),paletteInjection()]})
