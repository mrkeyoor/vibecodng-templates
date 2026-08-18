// Source slug: tailark-dusk-call-to-action-1
// Author repo: https://github.com/tailark/blocks
// The dusk CTA banner reduced to one bordered panel; the install line and
// grid backdrop are first-party.

export default function Cta() {
  return (
    <section id="cta" className="section" data-reveal-group>
      <div className="shell">
        <div className="cta-panel" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="cta-grid-bg" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="eyebrow">06 / Deploy</p>
              <h2 className="section-title mt-4 max-w-lg text-white">First sensor live before your coffee cools</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-mist">
                One command on a capture host. Blacksite finds its taps,
                builds a baseline overnight, and starts naming intrusions on
                day one.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#pricing" className="button">Request clearance</a>
                <a href="#faq" className="button button-ghost">Security review pack</a>
              </div>
            </div>
            <div>
              <p className="mb-2 text-[0.6rem] uppercase tracking-[0.18em] text-mist">capture host, as root</p>
              <p className="install-line m-0">
                <b>$</b> blacksite sensor init --net vpc-payments
              </p>
              <p className="mt-3 text-[0.65rem] leading-5 text-mist">
                Verifies the signed bundle, detects interfaces, and registers
                with your console. Nothing else touches the host.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
