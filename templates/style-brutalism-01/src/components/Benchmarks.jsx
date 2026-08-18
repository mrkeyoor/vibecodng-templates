// Adapted pattern: neobrutalism-table (hard-ruled data table)
// Author repo: https://github.com/ekmas/neobrutalism-components

const rows = [
  ['Publish to live, p95', '38ms', '1.4s', 'Purge queues are where seconds go to die.'],
  ['Editor cold load', '0.9s', '6.2s', 'A 14MB admin bundle is a choice.'],
  ['API read, p95, cached', '41ms', '210ms', 'Cache HIT should be the boring case.'],
  ['Schema change to deployed', '1 commit', '4 clicks + a prayer', 'Files diff. Dashboards do not.'],
  ['Full content export', '3 min', 'support ticket', 'Your content. Our job to hand it back.'],
  ['RAM at idle', '60MB', '1.2GB', 'A CMS is not a browser tab farm.'],
]

export default function Benchmarks() {
  return (
    <section id="benchmarks" className="section" data-reveal-group>
      <div className="shell">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">Benchmarks - rerun monthly, methodology in the docs</span>
          <h2 className="section-title mt-6 max-w-3xl">We put the numbers in a table so you can argue with them</h2>
          <p className="mt-4 max-w-2xl text-[15px] font-medium leading-7 text-mist">
            "Typical headless CMS" is the median of the three market leaders, measured on the same content set,
            same region, same day. The harness is open source. Run it yourself; we did not pick a flattering Tuesday.
          </p>
        </div>

        <div className="bench-wrap mt-10" data-reveal style={{ '--reveal-order': 1 }} tabIndex="0" aria-label="Scrollable benchmark comparison table">
          <table className="bench">
            <thead>
              <tr>
                <th scope="col">Measurement</th>
                <th scope="col">Slab 3.0</th>
                <th scope="col">Typical headless CMS</th>
                <th scope="col">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([metric, slab, other, why]) => (
                <tr key={metric}>
                  <td className="font-bold">{metric}</td>
                  <td className="win mono-cell">{slab}</td>
                  <td className="mono-cell">{other}</td>
                  <td className="text-[13px] text-mist">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3" data-reveal style={{ '--reveal-order': 2 }}>
          {[
            ['4,120', 'sites in production on Slab'],
            ['11', 'breaking API changes since 2021 (all in v0)'],
            ['100%', 'of support answered by an engineer who can fix it'],
          ].map(([value, label]) => (
            <div key={label} className="slab-card p-5">
              <p className="font-display text-4xl">{value}</p>
              <p className="mono mt-2 text-[11px] font-bold uppercase tracking-[0.06em] text-mist">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
