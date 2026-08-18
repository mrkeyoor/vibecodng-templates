// Source slug: ruixen-ruixen-gradient-footer
// Author repo: https://github.com/ruixenui/ruixen.com
// Link columns above the oversized gradient wordmark ghosted off the page.

const columns = [
  { title: 'Product', links: ['Features', 'Pricing', 'Payouts', 'Changelog'] },
  { title: 'Creators', links: ['Stories', 'Handbook', 'Community', 'Status'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal', links: ['Terms', 'Privacy', 'Fees', 'DMCA'] },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell grid gap-10 pt-16 pb-4 md:grid-cols-[1.3fr_repeat(4,0.55fr)]">
        <div>
          <p className="flex items-center gap-2 text-base font-bold text-white">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <circle cx="11" cy="7" r="4.4" fill="var(--bw-accent)" opacity="0.9" />
              <circle cx="7" cy="13.5" r="4.4" fill="var(--glow-warm)" opacity="0.75" />
              <circle cx="15" cy="13.5" r="4.4" fill="var(--glow-cool)" opacity="0.75" />
            </svg>
            Bloom
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-mist">
            Creator monetization with a 92% take-home rate. Fictional product;
            this page is a design template.
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
      <span className="footer-wordmark" aria-hidden="true">bloom</span>
      <div className="shell flex items-center justify-between pb-6 text-xs text-mist">
        <span>Bloom Labs, 2026. MIT licensed template.</span>
        <span>Made for people who make things.</span>
      </div>
    </footer>
  )
}
