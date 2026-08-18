// Source slug: tailark-dusk-hero-section-3 (header block)
// Author repo: https://github.com/tailark/blocks
// The dusk hero's fixed translucent header, restyled to the Blacksite
// terminal system with a first-party status strip above the links.

import { useEffect, useState } from 'react'
import { useReducedMotion } from './Effects.jsx'

const links = [
  { label: 'Coverage', href: '#coverage' },
  { label: 'Detections', href: '#detections' },
  { label: 'Numbers', href: '#numbers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

function UtcClock() {
  const reduced = useReducedMotion()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (reduced) return undefined
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [reduced])

  return <span>{now.toISOString().slice(11, 19)} UTC</span>
}

export default function Navbar() {
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50">
      <div className="shell statusbar">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden="true" />
          all sensors reporting
        </span>
        <UtcClock />
      </div>
      <div className="shell flex h-14 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="16" height="16" stroke="var(--bw-accent)" strokeWidth="1.5" />
            <rect x="6" y="6" width="6" height="6" fill="var(--bw-accent)" />
          </svg>
          Blacksite
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </nav>
        <a href="#cta" className="button" style={{ minHeight: '2.4rem', padding: '0.55rem 0.9rem', fontSize: '0.65rem' }}>
          Console
        </a>
      </div>
    </header>
  )
}
