// Source slug: motion-primitives-transition-panel
// Author repo: https://github.com/ibelick/motion-primitives
// Tab-driven panel transitions rebuilt with CSS transforms; instant swap under reduced motion.
import { useState } from 'react'

const views = [
  {
    id: 'reader',
    tab: 'Reader',
    title: 'The reader view keeps the map in the margin',
    body: 'A page reads like a page. But the margin shows the plane one level up and the planes one link away, so nobody bookmarks fourteen tabs to hold context.',
    visual: 'reader',
  },
  {
    id: 'graph',
    tab: 'Graph',
    title: 'The graph view is the org chart your docs never had',
    body: 'Zoom out and the space becomes a constellation: clusters are products, bridges are shared concepts, orphans are the pages nobody links to. Orphans get flagged weekly.',
    visual: 'graph',
  },
  {
    id: 'review',
    tab: 'Review',
    title: 'The review view shows drift before readers do',
    body: 'Planes tied to changed sources rise to the top with a diff of what moved underneath them. Reviewers clear the queue; readers never see the drift.',
    visual: 'review',
  },
]

function Visual({ kind }) {
  if (kind === 'reader') {
    return (
      <svg viewBox="0 0 320 190" className="w-full" aria-hidden="true">
        <rect x="10" y="12" width="196" height="166" rx="8" fill="white" stroke="var(--bw-text)" strokeOpacity="0.12" />
        <rect x="26" y="30" width="120" height="9" rx="4" fill="var(--bw-accent)" opacity="0.75" />
        {[52, 68, 84, 100, 116, 132].map((y, i) => (
          <rect key={y} x="26" y={y} width={i % 3 === 2 ? 96 : 164} height="6" rx="3" fill="var(--bw-text)" opacity="0.12" />
        ))}
        <rect x="222" y="12" width="88" height="76" rx="8" fill="white" stroke="var(--bw-accent)" strokeOpacity="0.4" />
        <circle cx="266" cy="42" r="6" fill="var(--bw-accent)" />
        <circle cx="242" cy="66" r="4" fill="var(--bw-text)" opacity="0.3" />
        <circle cx="290" cy="66" r="4" fill="var(--bw-text)" opacity="0.3" />
        <line x1="266" y1="42" x2="242" y2="66" stroke="var(--bw-text)" strokeOpacity="0.2" />
        <line x1="266" y1="42" x2="290" y2="66" stroke="var(--bw-text)" strokeOpacity="0.2" />
        <rect x="222" y="100" width="88" height="78" rx="8" fill="white" stroke="var(--bw-text)" strokeOpacity="0.12" />
        {[116, 132, 148].map((y) => (
          <rect key={y} x="234" y={y} width="64" height="6" rx="3" fill="var(--bw-text)" opacity="0.12" />
        ))}
      </svg>
    )
  }
  if (kind === 'graph') {
    return (
      <svg viewBox="0 0 320 190" className="w-full" aria-hidden="true">
        <g stroke="var(--bw-text)" strokeOpacity="0.16">
          <line x1="70" y1="60" x2="128" y2="92" /><line x1="70" y1="60" x2="52" y2="120" />
          <line x1="128" y1="92" x2="52" y2="120" /><line x1="128" y1="92" x2="196" y2="70" />
          <line x1="196" y1="70" x2="248" y2="110" /><line x1="248" y1="110" x2="286" y2="60" />
          <line x1="248" y1="110" x2="228" y2="156" /><line x1="128" y1="92" x2="150" y2="150" />
        </g>
        <g fill="var(--bw-text)" opacity="0.3">
          <circle cx="52" cy="120" r="7" /><circle cx="196" cy="70" r="7" />
          <circle cx="286" cy="60" r="6" /><circle cx="228" cy="156" r="6" /><circle cx="150" cy="150" r="5" />
        </g>
        <circle cx="70" cy="60" r="10" fill="var(--bw-accent)" />
        <circle cx="128" cy="92" r="12" fill="var(--bw-accent)" opacity="0.65" />
        <circle cx="248" cy="110" r="9" fill="var(--bw-accent)" opacity="0.4" />
        <circle cx="292" cy="160" r="6" fill="none" stroke="var(--bw-accent)" strokeDasharray="3 3" />
        <text x="278" y="182" fontFamily="var(--font-mono)" fontSize="9" fill="var(--bw-muted)">orphan</text>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 320 190" className="w-full" aria-hidden="true">
      {[
        { y: 16, w: 250, hot: true, label: 'auth/session-tokens' },
        { y: 62, w: 250, hot: true, label: 'webhooks/retries' },
        { y: 108, w: 250, hot: false, label: 'billing/proration' },
        { y: 154, w: 250, hot: false, label: 'cli/install' },
      ].map((row) => (
        <g key={row.y}>
          <rect x="16" y={row.y} width="288" height="34" rx="7" fill="white" stroke={row.hot ? 'var(--bw-accent)' : 'var(--bw-text)'} strokeOpacity={row.hot ? 0.5 : 0.12} />
          <circle cx="36" cy={row.y + 17} r="5" fill={row.hot ? 'var(--bw-accent)' : 'var(--bw-text)'} opacity={row.hot ? 1 : 0.25} />
          <text x="52" y={row.y + 21} fontFamily="var(--font-mono)" fontSize="10" fill="var(--bw-text)" opacity="0.75">{row.label}</text>
          <text x="236" y={row.y + 21} fontFamily="var(--font-mono)" fontSize="9" fill={row.hot ? 'var(--bw-accent)' : 'var(--bw-muted)'}>{row.hot ? 'DRIFTED' : 'VERIFIED'}</text>
        </g>
      ))}
    </svg>
  )
}

export default function Showcase() {
  const [active, setActive] = useState(0)

  return (
    <section id="views" className="section" data-reveal-group>
      <div className="shell">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal style={{ '--reveal-order': 0 }}>
            <div className="eyebrow"><i /> Three altitudes</div>
            <h2 className="section-title mt-5">One space, <em>three ways in</em></h2>
            <div className="panel-tabs mt-8" role="tablist" aria-label="Space views">
              {views.map((view, index) => (
                <button
                  key={view.id}
                  type="button"
                  role="tab"
                  id={`tab-${view.id}`}
                  aria-selected={index === active}
                  aria-controls={`panel-${view.id}`}
                  onClick={() => setActive(index)}
                >
                  {view.tab}
                </button>
              ))}
            </div>
            <div className="mt-8">
              {views.map((view, index) => (
                <div key={view.id} hidden={index !== active}>
                  <h3 className="font-display text-2xl">{view.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-7 text-mist">{view.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-view" data-reveal style={{ '--reveal-order': 1 }}>
            {views.map((view, index) => (
              <div
                key={view.id}
                id={`panel-${view.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${view.id}`}
                className="panel-slide"
                data-active={index === active}
              >
                <div className="plane p-5 sm:p-7">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="mono text-[10px] tracking-[0.16em] text-mist">ATLAS / {view.tab.toUpperCase()} VIEW</span>
                    <span className="mono text-[10px] text-accent">LIVE SPACE</span>
                  </div>
                  <Visual kind={view.visual} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
