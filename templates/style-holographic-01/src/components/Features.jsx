// First-party section. Bordered panels use the foil ring; chips reuse the
// foil ramp as their fill so the icons stay ink-dark on metal.

const features = [
  {
    title: 'Pages that load before the scroll',
    body: 'Images are resized, compressed, and served from the edge automatically. A 60-image case study stays under a second.',
    glyph: <path d="M13 3 5 13h5l-2 8 9-11h-5z" strokeLinejoin="round" />,
  },
  {
    title: 'Layouts that respect the work',
    body: 'Full-bleed, spread, or contact sheet. You choose per project; type, margins, and rhythm stay consistent everywhere.',
    glyph: <><rect x="4" y="4" width="7" height="16" rx="1.5" /><rect x="14" y="4" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="6" rx="1.5" /></>,
  },
  {
    title: 'Password rooms for clients',
    body: 'Share unfinished work behind a passcode with per-room analytics. See exactly which frame a client stopped on.',
    glyph: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  },
  {
    title: 'Your name on the door',
    body: 'Custom domains, clean of any Flux branding on paid plans. Search engines and social cards configured for you.',
    glyph: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.4 3.9 5.2 3.9 8.5s-1.3 6.1-3.9 8.5c-2.6-2.4-3.9-5.2-3.9-8.5s1.3-6.1 3.9-8.5Z" /></>,
  },
]

export default function Features() {
  return (
    <section id="platform" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Platform</p>
          <h2 className="section-title mt-4 text-white">
            Everything between the work<br />and the <span className="holo-text">people who hire</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {features.map(({ title, body, glyph }, index) => (
            <article key={title} className="holo-border feature-panel" data-reveal style={{ '--reveal-order': index + 1 }}>
              <span className="feature-chip" style={{ background: 'linear-gradient(135deg, #ff9ae5, #ffd36b 35%, #7df3d2 65%, #7fb4ff)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                  {glyph}
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
              <p className="mt-2.5 text-sm leading-6.5 text-mist">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
