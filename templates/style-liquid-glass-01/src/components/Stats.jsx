// First-party stats band.
const stats = [
  { value: '840k', label: 'People budgeting with Meridian' },
  { value: '$1,940', label: 'Average saved per member, per year' },
  { value: '12,300', label: 'Banks and brokerages supported' },
  { value: '11 yrs', label: 'Of transaction history you can search' },
]

export default function Stats() {
  return (
    <section className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="liquid-deep grid gap-8 px-8 py-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="stat-value text-balance">{stat.value}</p>
              <p className="mx-auto mt-2 max-w-40 text-xs font-medium leading-5 text-mist">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
