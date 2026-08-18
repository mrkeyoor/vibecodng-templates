// First-party. Liquid glass pill nav, frosted once the page scrolls.
import { useEffect, useState } from 'react'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#flow', label: 'Auto-save' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export function Mark({ size = 26 }) {
  return (
    <svg viewBox="0 0 28 28" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={`m-mark-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--bw-accent)" />
          <stop offset="1" stopColor="var(--lg-alt)" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="11.5" fill="none" stroke={`url(#m-mark-${size})`} strokeWidth="2" />
      <path d="M14 4.5v19M6 9.5c5 3.5 11 3.5 16 0M6 18.5c5-3.5 11-3.5 16 0" fill="none" stroke={`url(#m-mark-${size})`} strokeWidth="1.4" opacity="0.75" />
    </svg>
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
          <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <Mark /> Meridian
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#faq" className="nav-link hidden sm:block">Sign in</a>
            <a href="#cta" className="button button-small">Get the app</a>
          </div>
        </nav>
      </div>
    </header>
  )
}
