// First-party section composition. Card, badge, and button primitives adapt:
// neobrutalism-card, neobrutalism-badge, neobrutalism-button
// Author repo: https://github.com/ekmas/neobrutalism-components

const specs = [
  ['Publish latency, p95', '38ms'],
  ['Editor cold load', '0.9s'],
  ['Content types', 'unlimited'],
  ['Uptime, trailing 12 months', '99.99%'],
  ['Features you will never use', '0'],
]

export default function Hero() {
  return (
    <section id="top" className="section" data-reveal-group>
      <div className="shell">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">Slab 3.0 - still just a CMS</span>
          <h1 className="display mt-6 max-w-5xl">
            Content. Types. Roles. <span className="text-accent">One API.</span> Done.
          </h1>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div data-reveal style={{ '--reveal-order': 1 }}>
            <p className="max-w-xl text-lg font-semibold leading-8">
              Slab is a CMS. It stores content, lets the right people edit it, and serves it fast.
              It does not want to be your website builder, your data lake, or your friend.
            </p>
            <p className="mt-4 max-w-xl text-[15px] font-medium leading-7 text-mist">
              Every feature below has been in production for at least a year. Nothing on this page is on a roadmap.
              If we have to sell you the future, the present is not good enough.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#cta" className="slab-button">npm create slab</a>
              <a href="#benchmarks" className="slab-button slab-button-ghost">Check our numbers</a>
            </div>
            <p className="mono mt-5 text-[11px] font-semibold tracking-[0.06em] text-mist">
              SELF-HOST FREE FOREVER. CLOUD IF YOU WANT SLEEP.
            </p>
          </div>

          <div className="relative" data-reveal style={{ '--reveal-order': 2 }}>
            <div className="hero-grid">
              <div className="flex items-center justify-between gap-3 border-b-0 px-4 py-3" style={{ borderBottom: '3px solid var(--bw-text)' }}>
                <span className="mono text-[11px] font-bold tracking-[0.12em]">SPEC SHEET - MEASURED, NOT ASPIRED</span>
                <span className="slab-badge slab-badge-accent">v3.0.4</span>
              </div>
              <div>
                {specs.map(([key, value]) => (
                  <div key={key} className="spec-row">
                    <span>{key}</span>
                    <b>{value}</b>
                  </div>
                ))}
              </div>
              <div className="terminal m-4 p-4 shadow-none" style={{ boxShadow: 'none' }}>
                <p><span className="prompt">$</span> curl api.slab.dev/v1/posts?limit=1</p>
                <p className="ok">200 · 41ms · cache HIT</p>
                <p><span className="prompt">$</span> _</p>
              </div>
            </div>
            <span className="sticker slab-badge slab-badge-paper rot-l -top-4 -left-2 sm:-left-5">ZERO ONBOARDING CALLS</span>
            <span className="sticker slab-badge slab-badge-paper rot-r -bottom-4 right-3">READ THE DOCS IN 20 MIN</span>
          </div>
        </div>
      </div>
    </section>
  )
}
