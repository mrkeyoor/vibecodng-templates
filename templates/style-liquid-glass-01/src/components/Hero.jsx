// Source slug: cultui-hero-liquid-metal
// Author repo: https://github.com/nolly-studio/cult-ui
// Adapted: badge / display heading / description / CTA / visual composition kept.
// The real liquid-metal shader is RESTORED: LiquidMetal.jsx carries a raw WebGL2
// port of the @paper-design/shaders "LiquidMetal" fragment (MIT) with the
// original cult-ui defaults plus a pointer-reactive ripple. It ships as a lazy
// chunk; while it loads — or without WebGL2 / with reduced data — the CSS
// chrome gradient stays as the fallback. Balance card art first-party.
import { Suspense, lazy } from 'react'
import { ArrowRight, Sparkle, Wallet, Coffee, Home, Leaf } from './Icons.jsx'

const LiquidMetal = lazy(() => import('./LiquidMetal.jsx'))

const ledger = [
  { icon: Coffee, label: 'Cafe Aurelio', tag: 'Eating out', amount: '-$4.80' },
  { icon: Home, label: 'Rent · September', tag: 'Housing', amount: '-$1,450' },
  { icon: Wallet, label: 'Salary · Northwind', tag: 'Income', amount: '+$4,120' },
  { icon: Leaf, label: 'Rainy day rule', tag: 'Auto-save', amount: '+$62' },
]

function BalanceCard() {
  return (
    <div className="liquid phone-card sheenable mx-auto w-full max-w-sm p-6" aria-label="Preview of the Meridian balance screen">
      <span className="sheen" aria-hidden="true" />
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mist">Everyday balance</p>
        <span className="rounded-full border border-ink/8 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-mist">Sep</span>
      </div>
      <p className="mt-3 text-4xl font-semibold tracking-tight">$8,214<span className="text-2xl text-mist">.36</span></p>
      <p className="mt-1 text-xs font-medium text-mist">
        <span className="text-accent">$612 saved</span> by rules this month
      </p>
      <svg viewBox="0 0 300 64" className="spark-line mt-4 block w-full" role="img" aria-label="Balance trending upward this month">
        <defs>
          <linearGradient id="m-spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 50 C28 46 40 52 62 44 S98 28 124 33 S164 20 190 24 S238 10 264 14 S292 8 300 7 L300 64 L0 64 Z" fill="url(#m-spark)" />
        <path d="M0 50 C28 46 40 52 62 44 S98 28 124 33 S164 20 190 24 S238 10 264 14 S292 8 300 7" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
      <div className="mt-4 space-y-1">
        {ledger.map((row) => (
          <div key={row.label} className="ledger-row">
            <span className="ledger-icon"><row.icon /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{row.label}</span>
              <span className="block text-[11px] font-medium text-mist">{row.tag}</span>
            </span>
            <span className={`text-sm font-semibold tabular-nums ${row.amount.startsWith('+') ? 'text-accent' : ''}`}>{row.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-36 sm:pt-40" data-reveal-group>
      <div className="shell grid items-center gap-14 pb-16 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow"><Sparkle /> Meridian 3.0 · Rules that run themselves</span>
          <h1 className="display mt-7 text-balance">
            Your money, finally <span className="serif-accent text-accent">in focus</span>
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-mist sm:text-lg sm:leading-8">
            Meridian gathers every account into one clear glass ledger. It sorts what you spend,
            saves before you notice, and shows the month ahead instead of the month behind.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#cta" className="button w-full sm:w-auto">Start saving today <ArrowRight /></a>
            <a href="#flow" className="button button-ghost w-full sm:w-auto">Watch the rules work</a>
          </div>
          <p className="mt-4 text-xs font-medium tracking-wide text-mist">
            Free to try · Bank-level encryption · Read-only connections
          </p>
        </div>
        <div data-reveal style={{ '--reveal-order': 1 }}>
          <div className="metal-stage">
            <div className="metal-fallback" aria-hidden="true" />
            <Suspense fallback={null}>
              <LiquidMetal />
            </Suspense>
            <div className="relative z-10 w-full px-6 py-10 sm:px-10">
              <BalanceCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
