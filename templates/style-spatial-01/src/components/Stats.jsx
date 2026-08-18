// Source slug: magicui-dotted-map
// Author repo: https://github.com/magicuidesign/magicui
// Dotted world map rebuilt as a generated SVG dot grid with live-region halos; halos stop under reduced motion.

const stats = [
  { value: '38,000', label: 'planes served daily across active spaces' },
  { value: '61%', label: 'fewer "where is this documented?" pings, median team, 90 days' },
  { value: '0', label: 'stale links shipped to readers since drift review launched' },
  { value: '190ms', label: 'p95 time to move between linked planes' },
]

// Coarse dot-grid continents (col, row) on a 36x18 grid.
const LAND = [
  '4,4','5,4','6,4','7,4','5,5','6,5','7,5','8,5','6,6','7,6','8,6','7,7','8,7','8,8','9,8','9,9','10,9','9,10','10,10','10,11','10,12','11,12','10,13',
  '15,3','16,3','17,3','15,4','16,4','17,4','18,4','16,5','17,5','18,5','16,6','17,6','18,6','17,7','18,7','19,7','17,8','18,8','19,8','18,9','19,9','18,10','19,10','18,11',
  '20,4','21,4','22,4','23,4','24,4','25,4','26,4','27,4','21,5','22,5','23,5','24,5','25,5','26,5','27,5','28,5','22,6','23,6','24,6','25,6','26,6','27,6','28,6','29,6','24,7','25,7','26,7','27,7','28,7','25,8','26,8','27,8',
  '28,11','29,11','30,12','29,12','28,12','29,13',
  '31,13','32,13','31,14','32,14',
]

const LIVE = [
  { x: 8, y: 5, name: 'Toronto' },
  { x: 17, y: 4, name: 'Amsterdam' },
  { x: 10, y: 10, name: 'São Paulo' },
  { x: 26, y: 6, name: 'Bengaluru' },
  { x: 32, y: 13, name: 'Sydney' },
]

export default function Stats() {
  return (
    <section id="coverage" className="section" data-reveal-group>
      <div className="shell">
        <div className="plane plane-glass grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1fr]">
          <div data-reveal style={{ '--reveal-order': 0 }}>
            <div className="eyebrow"><i /> Coverage</div>
            <h2 className="section-title mt-5">Teams read in <em>every timezone</em></h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-mist">
              Numbers below are medians across active spaces for the trailing 90 days. We publish the query behind each
              one in the changelog, so you can argue with the method instead of the marketing.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="stat-value m-0">{stat.value}</dd>
                  <dt className="mt-2 text-[13px] leading-5 text-mist">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="self-center" data-reveal style={{ '--reveal-order': 1 }}>
            <svg viewBox="0 0 360 190" className="w-full" role="img" aria-label="Dotted world map with live reader regions in Toronto, Amsterdam, São Paulo, Bengaluru, and Sydney">
              {LAND.map((key) => {
                const [x, y] = key.split(',').map(Number)
                return <circle key={key} className="map-dot" cx={x * 10 + 5} cy={y * 10 + 8} r="2.1" />
              })}
              {LIVE.map((spot) => (
                <g key={spot.name}>
                  <circle className="map-live-halo" cx={spot.x * 10 + 5} cy={spot.y * 10 + 8} r="6" />
                  <circle className="map-live" cx={spot.x * 10 + 5} cy={spot.y * 10 + 8} r="3.2" />
                </g>
              ))}
            </svg>
            <p className="mono mt-3 text-center text-[10px] tracking-[0.14em] text-mist">LIVE READER REGIONS · LAST 5 MINUTES</p>
          </div>
        </div>
      </div>
    </section>
  )
}
