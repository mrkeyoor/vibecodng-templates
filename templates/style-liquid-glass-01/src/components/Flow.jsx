// Source slug: ruixen-glass-shipment-flow
// Author repo: https://github.com/ruixenui/ruixen.com
// Adapted: the three-node glass flow with animated dashed SVG rails between panels kept;
// shipment nodes became money accounts, rails carry auto-save rules; motion/react removed
// and colors rerouted through the palette variables. Layout rebuilt responsive.
import { Wallet, Vault, Leaf } from './Icons.jsx'

function Node({ icon: Icon, title, sub, amount }) {
  return (
    <div className="liquid-deep flow-node w-44 px-5 py-4 text-center">
      <span className="ledger-icon mx-auto"><Icon /></span>
      <p className="mt-3 text-sm font-semibold tracking-tight">{title}</p>
      <p className="mt-0.5 text-[11px] font-medium text-mist">{sub}</p>
      <p className="mt-2 text-base font-semibold tabular-nums text-accent">{amount}</p>
    </div>
  )
}

export default function Flow() {
  return (
    <section id="flow" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="liquid sheenable p-8 sm:p-12" data-reveal>
          <span className="sheen" aria-hidden="true" />
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Auto-save</span>
            <h2 className="section-title mt-6 text-balance">Money moves while you do not</h2>
            <p className="mt-5 text-pretty text-base leading-7 text-mist">
              Payday lands, rules fire, and the surplus flows into the right pockets.
              You watch it happen on one pane of glass.
            </p>
          </div>

          <div className="relative mx-auto mt-12 flex max-w-3xl flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-0">
            <Node icon={Wallet} title="Everyday checking" sub="Northwind Bank" amount="$8,214" />
            <div className="relative hidden h-24 flex-1 lg:block" aria-hidden="true">
              <svg viewBox="0 0 200 96" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
                <path d="M8 38 H192" className="flow-rail-base" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 38 H192" pathLength="1" className="flow-rail" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.1 0.35" />
                <path d="M8 62 H192" className="flow-rail-base" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 62 H192" pathLength="1" className="flow-rail-alt" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.08 0.4" />
              </svg>
              <p className="absolute inset-x-0 top-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">Round-ups · $2 to $9 a day</p>
              <p className="absolute inset-x-0 bottom-1 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">Payday sweep · 4% of income</p>
            </div>
            <div className="lg:hidden" aria-hidden="true">
              <svg viewBox="0 0 96 56" width="72" height="42" fill="none">
                <path d="M30 6 V50" className="flow-rail-base" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M30 6 V50" pathLength="1" className="flow-rail" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.1 0.35" />
                <path d="M66 6 V50" className="flow-rail-base" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M66 6 V50" pathLength="1" className="flow-rail-alt" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.08 0.4" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-6 sm:flex-row lg:flex-col lg:gap-4">
              <Node icon={Vault} title="Rainy day vault" sub="2.1 months of runway" amount="+$62 this week" />
              <Node icon={Leaf} title="Index investing" sub="Auto-invested monthly" amount="+$180 this month" />
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-md text-center text-xs font-medium leading-5 text-mist">
            Rules only ever move money between your own accounts. Pause any rule with one tap
            and Meridian stops instantly.
          </p>
        </div>
      </div>
    </section>
  )
}
