// First-party footer in the shared clay vocabulary.
import { Flower } from './Art.jsx'

export default function Footer() {
  return (
    <footer className="pb-10 pt-4">
      <div className="shell">
        <div className="clay-panel-soft rounded-[36px] px-8 py-10 sm:px-12">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="max-w-xs">
              <p className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight">
                <Flower className="h-7 w-7" />
                Petalboard
              </p>
              <p className="mt-4 text-sm font-bold leading-6 text-mist">
                A learning garden for small hands. Made by parents, checked by teachers, tested by toddlers.
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-10 sm:grid-cols-3" aria-label="Footer">
              {[
                { heading: 'Petalboard', items: ['How it works', 'Plans', 'Curriculum map'] },
                { heading: 'Grown-ups', items: ['Parent dashboard', 'Safety and privacy', 'Schools'] },
                { heading: 'Help', items: ['Support', 'Device list', 'Contact'] },
              ].map((column) => (
                <div key={column.heading}>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-mist">{column.heading}</p>
                  <ul className="mt-4 space-y-3 text-sm font-bold">
                    {column.items.map((item) => (
                      <li key={item}><a className="text-ink transition-colors hover:text-accent" href="#top">{item}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <p className="mt-10 border-t-2 border-ink/10 pt-6 text-xs font-bold text-mist">
            © 2026 Petalboard Kids Ltd. COPPA and GDPR-K compliant. No ads, no data resale, no dark patterns.
          </p>
        </div>
      </div>
    </footer>
  )
}
