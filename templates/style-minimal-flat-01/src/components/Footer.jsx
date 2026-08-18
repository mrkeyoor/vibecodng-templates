// Derived from index slug: efferd-footer-3
// Author repo: https://github.com/shabanhr/efferd-ui
// Structure kept (bordered grid of labeled link columns with a plain
// copyright line beneath); the social header row is folded into a column.

const columns = [
  {
    title: 'Product',
    links: ['How it works', 'Pricing', 'Payment links', 'Tax export'],
  },
  {
    title: 'Company',
    links: ['About', 'Field notes', 'Support', 'Status'],
  },
  {
    title: 'Legal',
    links: ['Terms', 'Privacy', 'Security', 'Fees'],
  },
  {
    title: 'Elsewhere',
    links: ['Mastodon', 'Bluesky', 'YouTube', 'RSS'],
  },
]

export default function Footer() {
  return (
    <footer className="section pt-0">
      <div className="shell">
        <div className="footer-grid">
          {columns.map((column) => (
            <div key={column.title} className="footer-cell">
              <h4>{column.title}</h4>
              {column.links.map((link) => (
                <a key={link} href="#top">{link}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
          <p className="m-0 text-xs text-mist">&copy; 2026 Ledger. Invoicing for freelancers.</p>
          <p className="mono m-0 text-[10px] tracking-[0.14em] text-mist">MADE SLOWLY, ON PURPOSE</p>
        </div>
      </div>
    </footer>
  )
}
