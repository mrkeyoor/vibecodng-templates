// First-party section (no matching indexed navbar in the 3d style set).
import { useEffect, useState } from 'react'

const links = [
  { href: '#library', label: 'Library' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#collections', label: 'Collections' },
  { href: '#pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-nav fixed inset-x-0 top-0 z-50 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Prism home">
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
            <polygon points="16,3 29,26 3,26" fill="none" stroke="var(--bw-accent)" strokeWidth="2.4" />
            <polygon points="16,12 22,23 10,23" fill="var(--bw-accent)" opacity="0.55" />
          </svg>
          <span className="mono text-sm font-semibold tracking-[0.18em]">PRISM</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#pricing" className="nav-link">Sign in</a>
          <a href="#cta" className="button min-h-10 px-4 py-2 text-xs">Browse assets</a>
        </div>

        <button
          type="button"
          className="mono grid h-10 w-10 place-items-center border border-white/15 text-xs md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? '✕' : '≡'}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-ink md:hidden" aria-label="Mobile">
          <div className="shell flex flex-col py-3">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link py-3" onClick={() => setOpen(false)}>{link.label}</a>
            ))}
            <a href="#cta" className="button mt-3 w-full" onClick={() => setOpen(false)}>Browse assets</a>
          </div>
        </nav>
      )}
    </header>
  )
}
