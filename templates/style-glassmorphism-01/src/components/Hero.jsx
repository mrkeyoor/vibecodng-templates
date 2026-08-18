// Source slug: tripled-glassmorphism-hero-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
// Adapted: centered badge/headline/dual-CTA structure and blurred orb backdrop kept;
// shadcn Button/lucide swapped for first-party primitives; dashboard mock is first-party.
import { Spark, ArrowUpRight, ArrowRight } from './Icons.jsx'

const kpis = [
  { label: 'Weekly active', value: '48,210', delta: '+6.2%' },
  { label: 'Signup conversion', value: '5.9%', delta: '+0.8 pt' },
  { label: 'Median session', value: '7m 42s', delta: '+41s' },
]

const funnel = [
  { step: 'Visited pricing', pct: 100, count: '31,449' },
  { step: 'Started trial', pct: 62, count: '19,498' },
  { step: 'Invited a teammate', pct: 34, count: '10,693' },
  { step: 'Upgraded to paid', pct: 18, count: '5,661' },
]

function TrendChart() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/8 bg-white/3 p-4">
      <div className="flex items-center justify-between">
        <p className="mono text-[10px] tracking-[0.14em] text-mist">ACTIVATION · LAST 28 DAYS</p>
        <span className="mono flex items-center gap-2 text-[10px] text-mist"><span className="live-dot" /> LIVE</span>
      </div>
      <div className="relative mt-3">
        <svg viewBox="0 0 320 84" className="block w-full" aria-label="Activation trending upward over the last 28 days" role="img">
          <defs>
            <linearGradient id="v-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--bw-accent)" stopOpacity="0.28" />
              <stop offset="1" stopColor="var(--bw-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 66 C30 62 44 68 66 58 S104 40 130 46 S172 30 198 34 S244 18 272 22 S304 12 320 10 L320 84 L0 84 Z" fill="url(#v-fill)" />
          <path d="M0 66 C30 62 44 68 66 58 S104 40 130 46 S172 30 198 34 S244 18 272 22 S304 12 320 10" fill="none" stroke="var(--bw-accent)" strokeWidth="1.6" />
          <circle cx="272" cy="22" r="3" fill="var(--bw-accent)" />
        </svg>
        <span className="chart-sheen" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-36 sm:pt-40" data-reveal-group>
      <div className="shell pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow"><Spark /> Vantage 2.4 · Now with warehouse sync</span>
          <h1 className="display mt-7 text-balance">
            Analytics your whole team can actually read
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-mist sm:text-lg sm:leading-8">
            Vantage turns raw product events into funnels, cohorts, and alerts that make sense to
            everyone, not just the data team. No SQL, no stale dashboards, no guessing.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#cta" className="button w-full sm:w-auto">Start free <ArrowUpRight /></a>
            <a href="#features" className="button button-ghost w-full sm:w-auto">See how it works <ArrowRight /></a>
          </div>
          <p className="mt-4 text-xs tracking-wide text-mist/75">Free for 5 seats · Connects in read-only mode · No card required</p>
        </div>

        <div className="glass mx-auto mt-14 max-w-5xl overflow-hidden sm:mt-20" data-reveal style={{ '--reveal-order': 1 }}>
          <div className="pane-bar">
            <div className="flex items-center gap-2" aria-hidden="true"><i /><i /><i /></div>
            <p className="mono hidden text-[10px] tracking-[0.14em] text-mist sm:block">HELIOSHIP / GROWTH OVERVIEW</p>
            <p className="mono text-[10px] text-mist">Q3</p>
          </div>
          <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="kpi-chip">
                    <p className="mono text-[9px] uppercase tracking-[0.14em] text-mist">{kpi.label}</p>
                    <p className="mt-2 text-xl font-semibold tracking-tight">{kpi.value}</p>
                    <p className="kpi-delta-up mono mt-1 text-[10px]">{kpi.delta}</p>
                  </div>
                ))}
              </div>
              <TrendChart />
            </div>
            <div className="glass-soft p-4 sm:p-5">
              <p className="mono text-[10px] tracking-[0.14em] text-mist">TRIAL FUNNEL · 30 DAYS</p>
              <div className="mt-4 space-y-4">
                {funnel.map((row, index) => (
                  <div key={row.step}>
                    <div className="flex items-baseline justify-between gap-3 text-xs">
                      <span className="text-white/85">{row.step}</span>
                      <span className="mono text-[10px] text-mist">{row.count}</span>
                    </div>
                    <div className="funnel-bar mt-2">
                      <span style={{ width: `${row.pct}%`, animationDelay: `${300 + index * 140}ms` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mono mt-5 rounded-lg border border-white/8 bg-white/3 p-3 text-[10px] leading-4 text-mist">
                ALERT · Upgrade step fell 2.1 pt for the EU cohort this week
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
