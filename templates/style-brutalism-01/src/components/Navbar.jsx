// Adapted pattern: neobrutalism-navigation-menu
// Author repo: https://github.com/ekmas/neobrutalism-components
// Hard-bordered strip nav rebuilt without Radix; hover inverts cells; mobile collapses to a stacked list.
import { useState } from 'react'

const links = [
  { href: '#features', label: 'What it does' },
  { href: '#benchmarks', label: 'Numbers' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'Straight answers' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="slab-header sticky top-0 z-50">
      <div className="shell flex h-16 items-stretch justify-between">
        <a href="#top" className="flex items-center gap-2.5 pr-4" aria-label="Slab home">
          <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" fill="var(--bw-text)" />
            <rect x="6" y="6" width="20" height="8" fill="var(--bw-surface)" />
            <rect x="6" y="18" width="12" height="8" fill="var(--bw-accent)" />
          </svg>
          <span className="font-display text-2xl uppercase tracking-wide">Slab</span>
        </a>

        <nav className="hidden items-stretch md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          <a href="#cta" className="header-cta">Install</a>
        </nav>

        <button
          type="button"
          className="mono my-3 grid w-12 place-items-center bg-paper text-sm font-bold md:hidden"
          style={{ border: '3px solid var(--bw-text)' }}
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? '✕' : '≡'}
        </button>
      </div>

      {open && (
        <nav className="mobile-menu border-t-3 md:hidden" aria-label="Mobile" style={{ borderTop: '3px solid var(--bw-text)' }}>
          <div className="shell flex flex-col pb-3">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="mono py-3 text-xs font-bold uppercase tracking-wide" onClick={() => setOpen(false)}>{link.label}</a>
            ))}
            <a href="#cta" className="slab-button mt-2" onClick={() => setOpen(false)}>Install Slab</a>
          </div>
        </nav>
      )}
    </header>
  )
}
