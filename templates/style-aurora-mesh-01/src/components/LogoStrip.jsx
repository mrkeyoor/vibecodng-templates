// First-party logo strip: fictional publications writing in Nimbus, inline SVG wordmarks.
const logos = [
  { name: 'The Longform Review', art: (
    <svg viewBox="0 0 150 26" width="140" height="24" role="img" aria-label="The Longform Review">
      <path d="M6 20V6h3.5M6 13h6M15.5 20V6" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <text x="26" y="17.5" fill="currentColor" fontFamily="inherit" fontSize="11.5" fontWeight="600" letterSpacing="0.3">Longform Review</text>
    </svg>
  ) },
  { name: 'Saltmarsh Press', art: (
    <svg viewBox="0 0 140 26" width="130" height="24" role="img" aria-label="Saltmarsh Press">
      <path d="M5 18c3-8 8-8 11 0M8.5 13.5h4" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <text x="24" y="17.5" fill="currentColor" fontFamily="inherit" fontSize="11.5" fontWeight="600" letterSpacing="0.3">Saltmarsh Press</text>
    </svg>
  ) },
  { name: 'Orbit Weekly', art: (
    <svg viewBox="0 0 130 26" width="120" height="24" role="img" aria-label="Orbit Weekly">
      <circle cx="12" cy="13" r="6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <ellipse cx="12" cy="13" rx="10" ry="3.4" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
      <text x="28" y="17.5" fill="currentColor" fontFamily="inherit" fontSize="11.5" fontWeight="600" letterSpacing="0.3">Orbit Weekly</text>
    </svg>
  ) },
  { name: 'Foghorn', art: (
    <svg viewBox="0 0 110 26" width="100" height="24" role="img" aria-label="Foghorn">
      <path d="M6 19V8l10 5.5L6 19Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M19 10.5c1.6 1.6 1.6 4.4 0 6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
      <text x="27" y="17.5" fill="currentColor" fontFamily="inherit" fontSize="11.5" fontWeight="600" letterSpacing="0.3">Foghorn</text>
    </svg>
  ) },
  { name: 'Casa Editorial Lumen', art: (
    <svg viewBox="0 0 110 26" width="100" height="24" role="img" aria-label="Lumen">
      <path d="M12 5v5M12 16v5M4.5 13h5m5 0h5M7 8l3 3m4 4 3 3M7 18l3-3m4-4 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <text x="28" y="17.5" fill="currentColor" fontFamily="inherit" fontSize="11.5" fontWeight="600" letterSpacing="0.3">Lumen</text>
    </svg>
  ) },
  { name: 'Driftwood Podcasts', art: (
    <svg viewBox="0 0 120 26" width="110" height="24" role="img" aria-label="Driftwood">
      <path d="M5 16c2-1.5 3-4.5 6-4.5s4 3.5 7 3.5 4-2 5-3" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <text x="27" y="17.5" fill="currentColor" fontFamily="inherit" fontSize="11.5" fontWeight="600" letterSpacing="0.3">Driftwood</text>
    </svg>
  ) },
]

export default function LogoStrip() {
  return (
    <section className="section pt-0" data-reveal-group aria-label="Publications writing in Nimbus">
      <div className="shell" data-reveal>
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-mist">
          Written in Nimbus every week
        </p>
        <div className="mt-4 grid grid-cols-2 border-y border-white/8 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div key={logo.name} className="logo-cell">{logo.art}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
