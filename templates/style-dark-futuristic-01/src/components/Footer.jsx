// Source slug: tailark-dusk-footer-1
// Author repo: https://github.com/tailark/blocks
// Column layout from the dusk footer, condensed to three lists plus a
// first-party status line.

const columns = [
  {
    title: 'Product',
    links: ['Coverage', 'Detections', 'Pricing', 'Changelog'],
  },
  {
    title: 'Operators',
    links: ['Documentation', 'Rule reference', 'Deployment guide', 'Status'],
  },
  {
    title: 'Company',
    links: ['About', 'Security', 'Careers', 'Contact'],
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.2fr_repeat(3,0.6fr)]">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="16" height="16" stroke="var(--bw-accent)" strokeWidth="1.5" />
              <rect x="6" y="6" width="6" height="6" fill="var(--bw-accent)" />
            </svg>
            Blacksite
          </p>
          <p className="mt-4 max-w-xs text-xs leading-6 text-mist">
            Security monitoring at wire level. Fictional product; this page is
            a design template.
          </p>
        </div>
        {columns.map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-mist">{title}</p>
            <ul className="mt-4 space-y-2.5 p-0" style={{ listStyle: 'none' }}>
              {links.map((label) => (
                <li key={label}><a href="#top" className="footer-link">{label}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/8">
        <div className="shell statusbar" style={{ borderBottom: 0 }}>
          <span>Blacksite Systems, 2026. MIT licensed template.</span>
          <span>build 4.12.0 / all clear</span>
        </div>
      </div>
    </footer>
  )
}
