// Source slug: tailark-dusk-features-6
// Author repo: https://github.com/tailark/blocks
// The dusk six-cell feature grid, rebuilt on the Blacksite cell system with
// first-party inline SVG glyphs. The indexed 375/768 overflow came from fixed
// card widths; this adaptation uses fluid grid tracks instead.

const features = [
  {
    title: 'Wire-level capture',
    body: 'Passive taps and eBPF sensors see every packet, not just logs an attacker can silence. Nothing to install on workloads.',
    glyph: <path d="M2 12h6l2-7 4 14 2-7h6" />,
  },
  {
    title: 'Detections as code',
    body: 'Every rule is versioned text in your repo. Review detections in pull requests, roll back bad ones in seconds.',
    glyph: <path d="M8 5 3 12l5 7M16 5l5 7-5 7" />,
  },
  {
    title: 'Rolling baselines',
    body: 'Blacksite learns what normal looks like per subnet and per service, so a quiet 2am exfil stands out like a flare.',
    glyph: <path d="M3 17c3 0 3-10 6-10s3 10 6 10 3-10 6-10" />,
  },
  {
    title: 'Sealed forensics',
    body: 'Full-fidelity pcap around every incident, hashed and sealed at capture time. Evidence that survives counsel.',
    glyph: <path d="M6 10V7a6 6 0 0 1 12 0v3M4 10h16v10H4z" />,
  },
  {
    title: 'On-call routing',
    body: 'Named intrusions page a human with the timeline attached. No alert soup, no severity roulette at 3am.',
    glyph: <path d="M4 6h16v12H4zM4 6l8 6 8-6" />,
  },
  {
    title: 'Air-gapped deploy',
    body: 'Runs fully inside your perimeter, including model updates by signed bundle. Built for networks that never phone home.',
    glyph: <path d="M12 3v6m0 6v6M3 12h6m6 0h6" />,
  },
]

export default function Features() {
  return (
    <section id="coverage" className="section" data-reveal-group>
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal style={{ '--reveal-order': 0 }}>
          <div>
            <p className="eyebrow">01 / Coverage</p>
            <h2 className="section-title mt-4 max-w-xl text-white">Built for the night your SIEM sleeps through</h2>
          </div>
          <p className="max-w-xs text-xs leading-6 text-mist">
            Six subsystems, one job: turn traffic into named intrusions with
            the evidence attached.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, body, glyph }, index) => (
            <article key={title} className="feature-cell" data-reveal style={{ '--reveal-order': index + 1 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                {glyph}
              </svg>
              <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.08em] text-white">{title}</h3>
              <p className="mt-3 text-[0.8rem] leading-7 text-mist">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
