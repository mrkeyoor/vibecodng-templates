// Derived from index slug: hyperui-stats-2
// Author repo: https://github.com/markmead/hyperui
// Structure kept (heading with supporting copy above a grid of large
// figures with labels); boxed stat cards recast as hairline-separated
// circulation figures in light Fraunces.

const figures = [
  { value: '94,000', label: 'readers who finish what they start' },
  { value: '38 min', label: 'median time spent with a piece' },
  { value: '1,270', label: 'writers paid directly by readers' },
  { value: '0', label: 'algorithms deciding who sees your work' },
]

export default function Circulation() {
  return (
    <section className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="double-rule pt-8" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="folio"><span>No. 3</span><span>Circulation</span></div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_24rem]">
            <h2 className="section-title max-w-[16ch]">An audit, in <em>public</em></h2>
            <p className="body-text m-0 self-end">
              Platforms brag about time on site. We publish attention honestly
              instead: these figures cover the trailing twelve months and update
              on the first of each.
            </p>
          </div>
        </div>
        <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal style={{ '--reveal-order': 1 }}>
          {figures.map((figure) => (
            <div key={figure.label} className="hairline pt-4">
              <dd className="big-number m-0">{figure.value}</dd>
              <dt className="mt-3 text-sm italic leading-6 text-mist">{figure.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
