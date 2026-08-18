// First-party. Floating pill nav that turns to frosted glass on scroll.
import { useEffect, useState } from 'react'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#metrics', label: 'Numbers' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#voices', label: 'Customers' },
]

function Mark() {
  return (
    <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
      <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="7" fill="none" stroke="var(--bw-accent)" strokeWidth="1.6" opacity="0.55" />
        <path d="M8 9.5 14 19l6-9.5" fill="none" stroke="var(--bw-accent)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Vantage
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="shell">
        <nav
          className={`site-nav flex items-center justify-between px-5 py-3 ${scrolled ? 'nav-scrolled' : ''}`}
          aria-label="Main"
        >
          <Mark />
          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#pricing" className="nav-link hidden sm:block">Sign in</a>
            <a href="#cta" className="button button-small">Start free</a>
          </div>
        </nav>
      </div>
    </header>
  )
}
