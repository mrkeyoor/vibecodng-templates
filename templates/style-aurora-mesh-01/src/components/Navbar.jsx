// First-party pill nav, frosted on scroll.
import { useEffect, useState } from 'react'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#showcase', label: 'The editor' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#voices', label: 'Writers' },
]

export function Mark({ size = 26 }) {
  return (
    <svg viewBox="0 0 28 28" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={`n-mark-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--bw-accent)" />
          <stop offset="0.55" stopColor="var(--am-rose)" />
          <stop offset="1" stopColor="var(--am-teal)" />
        </linearGradient>
      </defs>
      <path
        d="M6 19a5 5 0 0 1 .9-9.9A6.5 6.5 0 0 1 19.6 9 4.5 4.5 0 0 1 21 19H6Z"
        fill="none"
        stroke={`url(#n-mark-${size})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9 23h10" stroke={`url(#n-mark-${size})`} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
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
          <a href="#top" className="flex items-center gap-2.5 font-bold tracking-tight">
            <Mark /> Nimbus
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#pricing" className="nav-link hidden sm:block">Sign in</a>
            <a href="#cta" className="button button-small">Open the editor</a>
          </div>
        </nav>
      </div>
    </header>
  )
}
