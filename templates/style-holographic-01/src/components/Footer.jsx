// First-party section. Link columns over a single foil rule.

const columns = [
  { title: 'Product', links: ['The wall', 'Platform', 'Pricing', 'Changelog'] },
  { title: 'Artists', links: ['Handbook', 'Importer', 'Community', 'Status'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.3fr_repeat(3,0.6fr)]">
        <div>
          <p className="flex items-center gap-2 text-base font-bold text-white">
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
              <defs>
                <linearGradient id="flux-mark-f" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ff9ae5" />
                  <stop offset="0.3" stopColor="#ffd36b" />
                  <stop offset="0.55" stopColor="#7df3d2" />
                  <stop offset="0.8" stopColor="#7fb4ff" />
                  <stop offset="1" stopColor="#c39bff" />
                </linearGradient>
              </defs>
              <path d="M3 3h14l-5.6 6H17l-11 8 3.2-6H3z" fill="url(#flux-mark-f)" />
            </svg>
            Flux
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-mist">
            Portfolios that catch the light. Fictional product; this page is a
            design template.
          </p>
        </div>
        {columns.map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-mist">{title}</p>
            <ul className="mt-4 space-y-2.5 p-0" style={{ listStyle: 'none' }}>
              {links.map((label) => (
                <li key={label}><a href="#top" className="footer-link">{label}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <hr className="footer-foil-rule" />
      <div className="shell flex items-center justify-between py-5 text-xs text-mist">
        <span>Flux Media, 2026. MIT licensed template.</span>
        <span>Printed on light.</span>
      </div>
    </footer>
  )
}
