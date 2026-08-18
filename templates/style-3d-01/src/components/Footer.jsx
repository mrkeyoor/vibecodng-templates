// First-party section (no matching indexed footer in the 3d style set).

const columns = [
  { title: 'Library', links: ['Collections', 'New this week', 'Silhouette search', 'QA reports'] },
  { title: 'Pipeline', links: ['Engine presets', 'USD resolver', 'API reference', 'Changelog'] },
  { title: 'Company', links: ['About', 'Licensing', 'Support', 'Status'] },
]

export default function Footer() {
  return (
    <footer className="footer-edge">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
              <polygon points="16,3 29,26 3,26" fill="none" stroke="var(--bw-accent)" strokeWidth="2.4" />
            </svg>
            <span className="mono text-sm font-semibold tracking-[0.18em]">PRISM</span>
          </div>
          <p className="mt-4 max-w-xs text-[13px] leading-6 text-mist">
            Production 3D assets, QA'd in three engines before they earn a listing.
          </p>
          <p className="mono mt-6 text-[10px] tracking-[0.1em] text-mist">© 2026 PRISM ASSET WORKS</p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="mono text-[10px] tracking-[0.2em] text-mist">{column.title.toUpperCase()}</p>
            <ul className="mt-4 list-none space-y-2.5 p-0">
              {column.links.map((link) => (
                <li key={link}><a href="#top" className="foot-link">{link}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  )
}
