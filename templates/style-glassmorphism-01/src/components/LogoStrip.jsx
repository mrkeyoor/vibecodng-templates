// Source slug: tripled-glassmorphism-logo-showcase-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
// Adapted: single frosted panel holding a partner logo grid kept; framer-motion reveal
// replaced by the shared IntersectionObserver reveal; logos are first-party inline SVG wordmarks.
const logos = [
  { name: 'Helioship', art: (
    <svg viewBox="0 0 120 28" width="112" height="26" role="img" aria-label="Helioship">
      <circle cx="14" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 3v4M14 21v4M3 14h4M21 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <text x="32" y="19" fill="currentColor" fontFamily="inherit" fontSize="13" fontWeight="600" letterSpacing="0.4">Helioship</text>
    </svg>
  ) },
  { name: 'Duskbyte', art: (
    <svg viewBox="0 0 120 28" width="112" height="26" role="img" aria-label="Duskbyte">
      <path d="M8 5a9 9 0 1 0 9 13A11 11 0 0 1 8 5Z" fill="currentColor" opacity="0.8" />
      <text x="26" y="19" fill="currentColor" fontFamily="inherit" fontSize="13" fontWeight="600" letterSpacing="0.4">Duskbyte</text>
    </svg>
  ) },
  { name: 'Fernwald', art: (
    <svg viewBox="0 0 120 28" width="112" height="26" role="img" aria-label="Fernwald">
      <path d="M12 24V10M12 10 6 16M12 10l6 6M12 14 7.5 9.5M12 14l4.5-4.5M12 8 9 5m3 3 3-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <text x="26" y="19" fill="currentColor" fontFamily="inherit" fontSize="13" fontWeight="600" letterSpacing="0.4">Fernwald</text>
    </svg>
  ) },
  { name: 'Copperline', art: (
    <svg viewBox="0 0 130 28" width="120" height="26" role="img" aria-label="Copperline">
      <path d="M4 20c4-10 10-10 14 0s10 10 14 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <text x="40" y="19" fill="currentColor" fontFamily="inherit" fontSize="13" fontWeight="600" letterSpacing="0.4">Copperline</text>
    </svg>
  ) },
  { name: 'Nautel', art: (
    <svg viewBox="0 0 100 28" width="92" height="26" role="img" aria-label="Nautel">
      <path d="M6 22 14 6l8 16M10 16h8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="30" y="19" fill="currentColor" fontFamily="inherit" fontSize="13" fontWeight="600" letterSpacing="0.4">Nautel</text>
    </svg>
  ) },
  { name: 'Quarry', art: (
    <svg viewBox="0 0 100 28" width="92" height="26" role="img" aria-label="Quarry">
      <rect x="5" y="9" width="10" height="10" rx="2" transform="rotate(45 10 14)" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <text x="26" y="19" fill="currentColor" fontFamily="inherit" fontSize="13" fontWeight="600" letterSpacing="0.4">Quarry</text>
    </svg>
  ) },
]

export default function LogoStrip() {
  return (
    <section className="section pt-0" data-reveal-group aria-label="Teams using Vantage">
      <div className="shell">
        <div className="glass px-6 py-8 sm:px-10" data-reveal>
          <p className="mono text-center text-[10px] uppercase tracking-[0.2em] text-mist">
            Product teams reading the same numbers
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {logos.map((logo) => (
              <div key={logo.name} className="logo-cell">{logo.art}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
