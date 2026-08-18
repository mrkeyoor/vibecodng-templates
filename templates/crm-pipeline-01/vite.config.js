import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const fallback={accent:'#2563eb',surface:'#f8fafc',text:'#0f172a',muted:'#64748b'}
let palette=fallback
try{if(process.env.BW_PALETTE)palette={...fallback,...JSON.parse(process.env.BW_PALETTE)}}catch{}
const vars=Object.entries(palette).map(([k,v])=>`--bw-${k}:${v}`).join(';')
const injectPalette={name:'vibecodng-palette',transformIndexHtml(html){return html.replace('</head>',`<style>:root{${vars}}</style></head>`)}}
export default defineConfig({plugins:[react(),tailwindcss(),injectPalette]})
