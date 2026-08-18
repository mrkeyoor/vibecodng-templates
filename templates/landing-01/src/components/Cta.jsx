// Source slugs: hyperui-ctas-4, magicui-dot-pattern
// Author repos: https://github.com/markmead/hyperui, https://github.com/magicuidesign/magicui

import { ArrowUpRight, Check } from './Icons.jsx'
import { DotPattern } from './Effects.jsx'

export default function Cta() {
  return (
    <section id="final-cta" className="section" data-reveal-group>
      <div className="shell">
        <div className="cta-grid overflow-hidden border border-white/12">
          <DotPattern />
          <div className="relative z-10 flex flex-col justify-center p-7 sm:p-12 lg:p-16" data-reveal style={{ '--reveal-order': 0 }}>
            <div className="eyebrow">Your next review can be different</div>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Know what changed.<br />Know what to do.</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-mist">Connect a workspace today. Boardwatch will assemble your first delivery view before the next stand-up.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#top" className="button justify-center">Start free <ArrowUpRight /></a>
              <a href="mailto:hello@boardwatch.dev" className="button button-ghost justify-center">Talk to a human</a>
            </div>
          </div>
          <div className="cta-visual relative z-10" data-reveal style={{ '--reveal-order': 1 }}>
            <div className="cta-terminal">
              <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="mono text-[10px] tracking-[0.15em] text-mist">WORKSPACE SETUP</span><span className="text-xs text-accent">3 / 3</span></div>
              {['GitHub connected', 'Linear projects mapped', 'First watch view ready'].map((label, index) => (
                <div key={label} className="flex items-center gap-3 border-b border-white/8 py-5 text-sm"><span className="grid size-6 place-items-center rounded-full bg-accent text-black"><Check className="size-3.5" /></span><span>{label}</span><span className="mono ml-auto text-[9px] text-mist">0{index + 1}</span></div>
              ))}
              <p className="mono mt-5 text-[9px] tracking-[0.15em] text-accent">READY TO WATCH</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
