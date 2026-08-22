import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function paletteInjection(){
  const raw=process.env.BW_PALETTE;if(!raw)return null
  const palette=JSON.parse(raw);const{accent,surface,text,muted}=palette.colors
  const scheme=palette.tags.includes('light')?'light':'dark'
  const channels=accent.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)/255)
  const luminance=channels.map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0)
  const darkContrast=(luminance+.05)/.05;const lightContrast=1.05/(luminance+.05)
  const onAccent=darkContrast>lightContrast?'#101010':'#ffffff'
  const css=`html:root{--bw-accent:${accent};--bw-surface:${surface};--bw-text:${text};--bw-muted:${muted};--bw-on-accent:${onAccent};--bw-statement-em:${onAccent};color-scheme:${scheme}}`
  return{name:'vibecodng-palette',transformIndexHtml:{order:'post',handler(html){return html.replace(/(<meta name="theme-color" content=")[^"]+("\/>)/,`$1${surface}$2`).replace('</head>',`<style id="bw-palette">${css}</style></head>`)}}}
}
export default defineConfig({plugins:[react(),tailwindcss(),paletteInjection()].filter(Boolean)})
