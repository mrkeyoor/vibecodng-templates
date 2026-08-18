// Source slug: tripled-glassmorphism-cta-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
// Adapted: single frosted panel with blurred glow, big headline, and dual CTAs kept;
// shadcn Card/Button replaced with the template's glass and button primitives.
import { ArrowUpRight } from './Icons.jsx'

export default function Cta() {
  return (
    <section id="cta" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="glass cta-panel" data-reveal>
          <h2 className="section-title mx-auto max-w-2xl text-balance">Give your team one clear pane of glass</h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-mist">
            Connect your event stream in read-only mode and see your first live funnel in about
            eight minutes. The free tier stays free.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#top" className="button w-full sm:w-auto">Create your workspace <ArrowUpRight /></a>
            <a href="#pricing" className="button button-ghost w-full sm:w-auto">Compare plans</a>
          </div>
          <p className="mono mt-6 text-[10px] uppercase tracking-[0.16em] text-mist">
            SOC 2 Type II · GDPR ready · Data stays in your region
          </p>
        </div>
      </div>
    </section>
  )
}
