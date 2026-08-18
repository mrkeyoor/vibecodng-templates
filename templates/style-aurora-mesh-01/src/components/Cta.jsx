// Source slug: fancy-animated-gradient-with-svg
// Author repo: https://github.com/danielpetho/fancy
// Adapted: the blurred drifting SVG circles behind content kept as the CTA panel's
// atmosphere; colors flow from the palette-derived aurora hues, movement is CSS-only
// and pauses under reduced motion. Panel copy and layout first-party.
import { ArrowRight } from './Icons.jsx'

export default function Cta() {
  return (
    <section id="cta" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="pane cta-panel" data-reveal>
          <svg className="cta-orbs" aria-hidden="true">
            <circle className="o1" cx="22%" cy="30%" r="150" />
            <circle className="o2" cx="78%" cy="26%" r="130" />
            <circle className="o3" cx="52%" cy="88%" r="160" />
          </svg>
          <div className="relative">
            <h2 className="section-title mx-auto max-w-2xl text-balance">The blank page ends here</h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-mist">
              Open the editor, paste three pieces you are proud of, and Nimbus learns your voice
              before your coffee cools. The first 20,000 words each month are free.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#top" className="button w-full sm:w-auto">Start writing free <ArrowRight /></a>
              <a href="#pricing" className="button button-ghost w-full sm:w-auto">Compare plans</a>
            </div>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">
              No card required · Drafts export anytime · Never training data
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
