// Source slug: uilayouts-3d-marquee
// Author repo: https://github.com/ui-layouts/uilayouts
// Tilted-plane marquee rebuilt as a CSS keyframe track inside a perspective container.
// Reduced motion: plane flattens, track stops and wraps as a static grid.

const tiles = [
  { name: 'Brutal tower kit', meta: '48 pcs', art: 'M12 60 L12 22 L34 12 L34 60 Z M38 60 L38 30 L58 24 L58 60 Z', tag: 'ARCH' },
  { name: 'Scanned boulders', meta: '32 pcs', art: 'M8 58 Q14 34 32 36 Q40 22 54 34 Q66 40 60 58 Z', tag: 'NATURE' },
  { name: 'Diner props', meta: '61 pcs', art: 'M14 58 V34 H58 V58 M20 34 V24 H52 V34 M30 46 H42', tag: 'PROPS' },
  { name: 'Mech walker rig', meta: 'rigged', art: 'M28 16 H44 V32 H28 Z M24 32 L18 58 M48 32 L54 58 M32 32 L30 46 M40 32 L42 46', tag: 'RIG' },
  { name: 'Wet asphalt set', meta: '12 mats', art: 'M8 20 H64 V56 H8 Z M8 38 H64 M26 20 V56 M46 20 V56', tag: 'MATERIAL' },
  { name: 'Market awnings', meta: '27 pcs', art: 'M10 30 L20 18 H52 L62 30 M10 30 Q16 40 22 30 Q28 40 34 30 Q40 40 46 30 Q52 40 58 30 M16 30 V58 M56 30 V58', tag: 'ARCH' },
  { name: 'Hero foliage', meta: '44 pcs', art: 'M36 58 V30 M36 40 Q22 38 20 22 Q34 24 36 34 M36 34 Q40 20 54 18 Q52 34 36 40', tag: 'NATURE' },
  { name: 'Cargo drones', meta: 'rigged', art: 'M26 34 H46 V46 H26 Z M18 30 L26 36 M54 30 L46 36 M14 28 A5 5 0 1 1 22 28 M50 28 A5 5 0 1 1 58 28', tag: 'RIG' },
]

function Tile({ tile }) {
  return (
    <figure className="asset-tile">
      <svg viewBox="0 0 72 66" aria-hidden="true">
        <path d={tile.art} fill="none" stroke="var(--bw-accent)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" opacity="0.85" />
      </svg>
      <figcaption>
        <span className="text-xs font-medium text-white">{tile.name}</span>
        <span className="mono text-[9px] text-mist">{tile.meta}</span>
      </figcaption>
      <span className="mono text-[9px] tracking-[0.18em] text-accent">{tile.tag}</span>
    </figure>
  )
}

export default function AssetShelf() {
  return (
    <section id="library" className="shelf" aria-label="Asset collections marquee">
      <div className="shelf-plane">
        <div className="shelf-track">
          <div className="shelf-set">{tiles.map((tile) => <Tile key={tile.name} tile={tile} />)}</div>
          <div className="shelf-set" aria-hidden="true">{tiles.map((tile) => <Tile key={tile.name} tile={tile} />)}</div>
        </div>
      </div>
    </section>
  )
}
