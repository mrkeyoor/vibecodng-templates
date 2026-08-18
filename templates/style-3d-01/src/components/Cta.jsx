// Source slug: motion-primitives-magnetic (primary CTA pull)
// Author repo: https://github.com/ibelick/motion-primitives
import { Magnetic } from './Effects.jsx'

export default function Cta() {
  return (
    <section id="cta" className="section" data-reveal-group>
      <div className="shell">
        <div className="cta-panel px-6 py-16 text-center sm:px-12 sm:py-20" data-reveal style={{ '--reveal-order': 0 }}>
          <svg viewBox="0 0 32 32" className="mx-auto h-10 w-10" aria-hidden="true">
            <polygon points="16,3 29,26 3,26" fill="none" stroke="var(--bw-accent)" strokeWidth="1.6" />
            <polygon points="16,12 22,23 10,23" fill="var(--bw-accent)" opacity="0.55" />
          </svg>
          <h2 className="section-title mx-auto mt-6 max-w-xl text-balance">Pull 50 assets tonight. Judge us in your own viewport.</h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-7 text-mist">
            The free tier is the real library, not a demo shelf. If the topology disappoints you, walk away and keep the files.
          </p>
          <div className="mt-9">
            <Magnetic>
              <a href="#top" className="button magnet px-7">Create a free account</a>
            </Magnetic>
          </div>
          <p className="mono mt-6 text-[10px] tracking-[0.14em] text-mist/70">NO CARD · 50 DOWNLOADS · FLAT LICENSE FROM DAY ONE</p>
        </div>
      </div>
    </section>
  )
}
