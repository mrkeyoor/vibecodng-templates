// Source slug: hyperui-feature-grids-2
// Author repo: https://github.com/markmead/hyperui

import { Branch, Pulse, Shield } from './Icons.jsx'

const features = [
  {
    number: '01',
    icon: Pulse,
    title: 'Catch drift early',
    copy: 'Watch cycle time, review age, and scope movement together. Boardwatch flags the change-not another noisy threshold.',
  },
  {
    number: '02',
    icon: Branch,
    title: 'Trace the real dependency',
    copy: 'Follow a blocked card back to the pull request, owner, incident, or decision that is actually holding it up.',
  },
  {
    number: '03',
    icon: Shield,
    title: 'Report without surveillance',
    copy: 'Measure the system, never keystrokes. Every metric is visible to the team and tied to work they already understand.',
  },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="section border-b border-white/8" data-reveal-group>
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div data-reveal style={{ '--reveal-order': 0 }}>
            <div className="eyebrow">One operating view</div>
            <h2 className="section-title mt-6 text-balance">Less reporting.<br />More signal.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-mist">The work stays in your tools. Boardwatch assembles the context around it, so the next conversation starts with what changed.</p>
            <div className="integration-line mt-10">
              <span>GH</span><i /><span>LI</span><i /><span>PD</span><i /><b>BW</b>
            </div>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {features.map(({ number, icon: Icon, title, copy }, index) => (
              <article key={number} className="feature-row group" data-reveal style={{ '--reveal-order': index + 1 }}>
                <span className="mono text-[10px] text-mist">{number}</span>
                <span className="grid size-10 place-items-center rounded-full border border-white/10 text-accent transition-colors group-hover:border-accent/50"><Icon /></span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-mist sm:text-base sm:leading-7">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
