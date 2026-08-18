// First-party footer.
const columns = [
  { title: 'Product', links: ['Funnels', 'Cohorts', 'Alerts', 'Warehouse sync', 'Changelog'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press kit'] },
  { title: 'Resources', links: ['Docs', 'API reference', 'Status', 'Security'] },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="flex items-center gap-2.5 font-semibold tracking-tight">
              <svg viewBox="0 0 28 28" width="24" height="24" aria-hidden="true">
                <rect x="2" y="2" width="24" height="24" rx="7" fill="none" stroke="var(--bw-accent)" strokeWidth="1.6" opacity="0.55" />
                <path d="M8 9.5 14 19l6-9.5" fill="none" stroke="var(--bw-accent)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Vantage
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-mist">
              Product analytics your whole team can read. Built in Amsterdam, hosted where your data lives.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="mono text-[10px] uppercase tracking-[0.18em] text-mist">{column.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}><a href="#top" className="footer-link">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6">
          <p className="text-xs text-mist">© 2026 Vantage Analytics BV. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#top" className="footer-link">Privacy</a>
            <a href="#top" className="footer-link">Terms</a>
            <a href="#top" className="footer-link">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
