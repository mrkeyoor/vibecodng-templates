// First-party section (no matching indexed footer in the neobrutalism set).

const columns = [
  { title: 'Product', links: ['Docs', 'Benchmark harness', 'Changelog', 'Status'] },
  { title: 'Source', links: ['GitHub', 'Export format', 'Self-host guide', 'Security'] },
  { title: 'Company', links: ['Pricing', 'The NOT-doing list', 'Support', 'Terms'] },
]

export default function Footer() {
  return (
    <footer className="slab-footer">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-5xl uppercase leading-none text-surface">Slab</p>
          <p className="mono mt-4 max-w-xs text-[11px] font-semibold leading-5 text-[#cfc7a8]">
            THE CMS THAT DOES CONTENT AND SHUTS UP. SINCE 2021, ON PURPOSE.
          </p>
          <p className="mono mt-6 text-[10px] text-[#8a8264]">© 2026 SLAB SOFTWARE - MIT CORE</p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="mono text-[10px] font-bold tracking-[0.2em] text-surface">{column.title.toUpperCase()}</p>
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
