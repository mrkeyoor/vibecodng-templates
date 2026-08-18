// Source slug: ruixen-hover-gradient-navbar
// Author repo: https://github.com/ruixenui/ruixen.com
// Pill links with a soft gradient hover halo, restyled to the Bloom palette.

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Numbers', href: '#numbers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Creators', href: '#creators' },
]

export default function Navbar() {
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2 text-base font-bold text-white">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="7" r="4.4" fill="var(--bw-accent)" opacity="0.9" />
            <circle cx="7" cy="13.5" r="4.4" fill="var(--glow-warm)" opacity="0.75" />
            <circle cx="15" cy="13.5" r="4.4" fill="var(--glow-cool)" opacity="0.75" />
          </svg>
          Bloom
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </nav>
        <a href="#cta" className="button" style={{ minHeight: '2.5rem', padding: '0.6rem 1.1rem', fontSize: '0.78rem' }}>
          Start earning
        </a>
      </div>
    </header>
  )
}
