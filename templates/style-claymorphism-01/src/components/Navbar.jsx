// First-party chrome; CTA is the adapted clay-button (mrkeyoor/sir-originals).
import { ClayButton } from './Clay.jsx'
import { Flower } from './Art.jsx'

const links = [
  { href: '#play', label: 'How it works' },
  { href: '#garden', label: 'The garden' },
  { href: '#pricing', label: 'Plans' },
  { href: '#parents', label: 'For parents' },
]

export default function Navbar() {
  return (
    <header className="site-nav fixed inset-x-0 top-4 z-50">
      <div className="shell">
        <div className="clay-panel-soft flex h-18 items-center justify-between gap-4 rounded-[28px] px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5 rounded-[18px] font-display text-xl font-extrabold tracking-tight">
            <Flower className="h-8 w-8" />
            Petalboard
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((link) => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}
          </nav>
          <ClayButton as="a" href="#cta" className="!min-h-10 !px-5 !py-2">Try it free</ClayButton>
        </div>
      </div>
    </header>
  )
}
