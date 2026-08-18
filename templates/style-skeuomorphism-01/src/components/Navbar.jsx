// First-party chrome: tolex bar with a brass logo plate; grain overlay is the
// adapted magicui-noise-texture (https://github.com/magicuidesign/magicui).
import { useEffect, useState } from 'react'
import { NoiseTexture } from './Skeuo.jsx'

const links = [
  { href: '#rig', label: 'The rig' },
  { href: '#room', label: 'Practice room' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-nav fixed inset-x-0 top-0 z-50 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="shell flex h-18 items-center justify-between gap-4">
        <a href="#top" className="relative flex items-center gap-3">
          <span className="metal-panel grid h-10 w-10 place-items-center !rounded-[8px]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              <circle cx="12" cy="12" r="8" fill="var(--bw-accent)" />
              <rect x="11" y="4.5" width="2" height="6.5" rx="1" fill="var(--bw-surface)" />
            </svg>
          </span>
          <span className="font-display text-2xl tracking-[0.14em] text-ink">DECK</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}
        </nav>
        <a href="#cta" className="push-button !min-h-10 !px-4 !py-2 !text-sm">Plug in</a>
      </div>
    </header>
  )
}
