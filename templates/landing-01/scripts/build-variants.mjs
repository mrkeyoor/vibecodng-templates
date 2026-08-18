import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const catalogPath = path.resolve(root, '../../mrkeyoor.com/data/palettes.json')
const deployRoot = path.resolve(root, '../../mrkeyoor.com/public/social/template-01/p')
const defaults = ['aurora-terminal', 'paper-coral', 'midnight-lilac', 'canyon-dusk', 'arcade-sunset']
const requested = process.argv.slice(2)
const slugs = requested.length ? requested : defaults
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'))
const byName = new Map(catalog.map((palette) => [palette.name, palette]))

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
}

const palettes = slugs.map((slug) => {
  const palette = byName.get(slug)
  if (!palette) throw new Error(`unknown palette: ${slug}`)
  return palette
})

if (new Set(slugs).size !== slugs.length) throw new Error('palette slugs must be unique')

for (const palette of palettes) {
  const base = `/social/template-01/p/${palette.name}/`
  const outDir = path.join(deployRoot, palette.name)
  process.stdout.write(`\nBuilding ${palette.name} -> ${base}\n`)
  const result = spawnSync(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'build', '--', `--base=${base}`, `--outDir=${outDir}`],
    {
      cwd: root,
      env: { ...process.env, BW_PALETTE: JSON.stringify(palette) },
      stdio: 'inherit',
    },
  )
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

const cards = palettes.map((palette) => {
  const href = `/social/template-01/p/${palette.name}/`
  const swatches = ['accent', 'surface', 'text', 'muted'].map((role) => (
    `<span title="${role}: ${palette.colors[role]}" style="background:${palette.colors[role]}"></span>`
  )).join('')
  return `<li><a href="${href}"><div class="swatches">${swatches}</div><strong>${escapeHtml(palette.name)}</strong><small>${palette.tags.map(escapeHtml).join(' · ')}</small></a></li>`
}).join('\n        ')

const index = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Boardwatch palette variants</title>
  <style>
    :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #0d1117; color: #f5f7fa; }
    * { box-sizing: border-box; }
    body { width: min(100% - 2rem, 68rem); margin: 0 auto; padding: clamp(3rem, 8vw, 7rem) 0; }
    h1 { margin: 0; font-size: clamp(2.4rem, 7vw, 5rem); letter-spacing: -.06em; }
    p { max-width: 42rem; color: #aab2bd; line-height: 1.7; }
    ul { display: grid; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); gap: 1rem; margin: 3rem 0 0; padding: 0; list-style: none; }
    a { display: block; min-height: 12rem; border: 1px solid #2a3039; border-radius: 1rem; background: #151a21; padding: 1rem; color: inherit; text-decoration: none; transition: transform 150ms ease, border-color 150ms ease; }
    a:hover { border-color: #697586; transform: translateY(-3px); }
    .swatches { display: grid; height: 6rem; grid-template-columns: repeat(4, 1fr); overflow: hidden; border-radius: .65rem; }
    .swatches span { min-width: 0; }
    strong, small { display: block; }
    strong { margin-top: 1rem; font-size: .95rem; }
    small { margin-top: .35rem; color: #9ca6b3; }
  </style>
</head>
<body>
  <main>
    <h1>Boardwatch in five moods.</h1>
    <p>Each link is a complete build of template 01, themed through the shared four-role should-i-render palette contract.</p>
    <ul>
        ${cards}
    </ul>
  </main>
</body>
</html>
`

writeFileSync(path.join(deployRoot, 'index.html'), index)
process.stdout.write(`\nWrote ${path.join(deployRoot, 'index.html')}\n`)
