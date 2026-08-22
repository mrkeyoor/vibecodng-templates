import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
function paletteInjection() {
  const raw = process.env.BW_PALETTE;
  if (!raw) return null;
  const p = JSON.parse(raw),
    { accent, surface, text, muted } = p.colors,
    scheme = p.tags.includes("light") ? "light" : "dark";
  const lum = (h) =>
      h
        .replace("#", "")
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16) / 255)
        .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
        .reduce((n, x, i) => n + x * [0.2126, 0.7152, 0.0722][i], 0),
    a = lum(accent),
    s = lum(surface),
    safe =
      (Math.max(a, s) + 0.05) / (Math.min(a, s) + 0.05) >= 4.5 ? accent : text,
    on = (a + 0.05) / 0.05 > 1.05 / (a + 0.05) ? "#101010" : "#fff";
  return {
    name: "palette",
    transformIndexHtml: {
      order: "post",
      handler: (h) =>
        h
          .replace(
            /(<meta name="theme-color" content=")[^"]+("\/>)/,
            `$1${surface}$2`,
          )
          .replace(
            "</head>",
            `<style>html:root{--bw-accent:${accent};--bw-surface:${surface};--bw-text:${text};--bw-muted:${muted};--bw-on-accent:${on};--bw-accent-safe:${safe};color-scheme:${scheme}}</style></head>`,
          ),
    },
  };
}
export default defineConfig({
  plugins: [react(), paletteInjection()].filter(Boolean),
});
