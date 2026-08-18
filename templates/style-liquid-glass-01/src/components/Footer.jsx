// First-party footer.
import { Mark } from './Navbar.jsx'

const columns = [
  { title: 'App', links: ['Ledger', 'Rules', 'Forecast', 'Goals', 'Changelog'] },
  { title: 'Company', links: ['About', 'Journal', 'Careers', 'Press'] },
  { title: 'Trust', links: ['Security', 'Privacy', 'Open banking', 'Status'] },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink/8">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="flex items-center gap-2.5 font-semibold tracking-tight">
              <Mark size={24} /> Meridian
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-mist">
              The personal finance app that keeps your whole money picture behind one clear
              pane of glass.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-mist">{column.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}><a href="#top" className="footer-link">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/8 pt-6">
          <p className="text-xs text-mist">© 2026 Meridian Money Inc. Meridian is not a bank; banking services are provided by partners.</p>
          <div className="flex gap-5">
            <a href="#top" className="footer-link">Privacy</a>
            <a href="#top" className="footer-link">Terms</a>
            <a href="#top" className="footer-link">Licenses</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
