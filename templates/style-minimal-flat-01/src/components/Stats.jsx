// Derived from index slug: tailark-mist-stats-2
// Author repo: https://github.com/tailark/blocks
// Structure kept (left-aligned heading and paragraph over a row of plain,
// unboxed figures); numbers set in tabular figures with a hairline above.

const stats = [
  { value: '58s', label: 'Median time to write an invoice' },
  { value: '9 days', label: 'Sooner invoices get paid, on average' },
  { value: '$41M', label: 'Billed through Ledger last year' },
  { value: '12,400', label: 'Freelancers invoicing monthly' },
]

export default function Stats() {
  return (
    <section className="section pt-0">
      <div className="shell">
        <div className="rule pt-14">
          <div className="max-w-2xl">
            <h2 className="section-title">The point is fewer minutes on paperwork.</h2>
            <p className="mt-4 text-[0.9375rem] leading-7 text-mist">
              We measure Ledger by the time it gives back. These figures cover the last
              twelve months across every account.
            </p>
          </div>
          <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="stat-value m-0">{stat.value}</dd>
                <dt className="mt-2 text-[0.8125rem] leading-5 text-mist">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
