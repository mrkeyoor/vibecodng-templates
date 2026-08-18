// Derived from index slug: meraki-logo-wall-trusted-by
// Author repo: https://github.com/merakiui/merakiui
// Structure kept (short trust line above a single row of marks); image logos
// replaced with set-width text wordmarks so the row stays flat and font-only.

const clients = ['Fielding & Co.', 'North Kiln', 'Studio Ost', 'Paper Crane', 'Halvard Press']

export default function LogoRow() {
  return (
    <section className="section pb-0">
      <div className="shell">
        <div className="rule pt-8 text-center">
          <p className="text-xs text-mist">Used by independent designers, writers, and developers billing clients like</p>
          <ul className="mt-5 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3">
            {clients.map((name) => (
              <li key={name} className="text-sm font-semibold tracking-tight text-ink/60">{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
