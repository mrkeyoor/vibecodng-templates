// First-party. Fixed translucent nav; links underline with the foil ramp.

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Platform', href: '#platform' },
  { label: 'Numbers', href: '#numbers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="holo-hover flex items-center gap-2.5 text-base font-bold text-white">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <defs>
              <linearGradient id="flux-mark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ff9ae5" />
                <stop offset="0.3" stopColor="#ffd36b" />
                <stop offset="0.55" stopColor="#7df3d2" />
                <stop offset="0.8" stopColor="#7fb4ff" />
                <stop offset="1" stopColor="#c39bff" />
              </linearGradient>
            </defs>
            <path d="M3 3h14l-5.6 6H17l-11 8 3.2-6H3z" fill="url(#flux-mark)" />
          </svg>
          Flux
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </nav>
        <a href="#cta" className="button" style={{ minHeight: '2.5rem', padding: '0.6rem 1.1rem', fontSize: '0.78rem' }}>
          Claim your page
        </a>
      </div>
    </header>
  )
}
