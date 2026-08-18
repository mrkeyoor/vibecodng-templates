// First-party footer.
import { Mark } from './Navbar.jsx'

const columns = [
  { title: 'Product', links: ['Editor', 'Voice profiles', 'Citations', 'Exports', 'Changelog'] },
  { title: 'Company', links: ['About', 'Field notes', 'Careers', 'Press'] },
  { title: 'Trust', links: ['Privacy', 'Model policy', 'Security', 'Status'] },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="flex items-center gap-2.5 font-bold tracking-tight">
              <Mark size={24} /> Nimbus
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-mist">
              The writing tool that drafts beside you. Your voice, your facts, your byline.
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
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6">
          <p className="text-xs text-mist">© 2026 Nimbus Writing Co. Your drafts belong to you.</p>
          <div className="flex gap-5">
            <a href="#top" className="footer-link">Privacy</a>
            <a href="#top" className="footer-link">Terms</a>
            <a href="#top" className="footer-link">Model policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
