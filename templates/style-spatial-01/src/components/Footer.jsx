// First-party section (no matching indexed footer in the spatial set).

const columns = [
  { title: 'Product', links: ['Spaces', 'Views', 'Drift review', 'Changelog'] },
  { title: 'Import', links: ['Markdown & MDX', 'OpenAPI', 'Git sync', 'Migration guide'] },
  { title: 'Company', links: ['About', 'Pricing', 'Support', 'Status'] },
]

export default function Footer() {
  return (
    <footer className="footer-edge">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
              <rect x="4" y="8" width="20" height="14" rx="2" fill="none" stroke="var(--bw-text)" strokeWidth="2" />
              <rect x="9" y="13" width="20" height="14" rx="2" fill="var(--bw-accent)" />
            </svg>
            <span className="text-[15px] font-bold tracking-tight">Atlas</span>
          </div>
          <p className="mt-4 max-w-xs text-[13px] leading-6 text-mist">
            Documentation with a sense of place. Readers free forever, at every tier.
          </p>
          <p className="mono mt-6 text-[10px] tracking-[0.1em] text-mist">© 2026 ATLAS SYSTEMS</p>
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
