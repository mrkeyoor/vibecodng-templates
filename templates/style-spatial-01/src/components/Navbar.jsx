// First-party section: floating glass pill navigation (marked first-party; no indexed navbar in the spatial set).
import { useState } from 'react'

const links = [
  { href: '#spaces', label: 'Spaces' },
  { href: '#views', label: 'Views' },
  { href: '#coverage', label: 'Coverage' },
  { href: '#pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="shell">
        <div className="nav-pill flex h-14 items-center justify-between gap-4 pl-5 pr-2.5">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Atlas home">
            <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
              <rect x="4" y="8" width="20" height="14" rx="2" fill="none" stroke="var(--bw-text)" strokeWidth="2" />
              <rect x="9" y="13" width="20" height="14" rx="2" fill="var(--bw-accent)" />
            </svg>
            <span className="text-[15px] font-bold tracking-tight">Atlas</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a href="#pricing" className="nav-link px-2">Sign in</a>
            <a href="#cta" className="button min-h-9 px-4 py-2 text-xs">Open a space</a>
          </div>

          <button
            type="button"
            className="mono grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-xs md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? '✕' : '≡'}
          </button>
        </div>

        {open && (
          <nav className="nav-pill mt-2 !rounded-2xl p-4 md:hidden" aria-label="Mobile">
            <div className="flex flex-col">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="nav-link py-2.5" onClick={() => setOpen(false)}>{link.label}</a>
              ))}
              <a href="#cta" className="button mt-3 w-full" onClick={() => setOpen(false)}>Open a space</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
