// Adapted patterns: neobrutalism-input (email field), neobrutalism-button (submit)
// Author repo: https://github.com/ekmas/neobrutalism-components

export default function Cta() {
  return (
    <section id="cta" className="section" data-reveal-group>
      <div className="shell">
        <div className="cta-block grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr]" data-reveal style={{ '--reveal-order': 0 }}>
          <div>
            <h2 className="section-title text-surface">Install it. Judge it. Keep it or delete it.</h2>
            <p className="mt-5 max-w-md text-[15px] font-medium leading-7 text-[#cfc7a8]">
              One command gives you a running CMS with an example schema. There is no activation,
              no telemetry, and no email gate on the binary. The form below is only for the changelog.
            </p>
            <div className="terminal mt-8 p-4" style={{ border: '3px solid var(--bw-surface)', boxShadow: 'none' }}>
              <p><span className="prompt">$</span> npm create slab@latest</p>
              <p className="ok">✓ slab 3.0.4 running on http://localhost:4000</p>
              <p className="ok">✓ admin: http://localhost:4000/admin</p>
            </div>
          </div>
          <form className="self-center" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="cta-email" className="mono block text-[11px] font-bold uppercase tracking-[0.14em] text-surface">
              Changelog, monthly, no marketing
            </label>
            <input
              id="cta-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
              className="slab-input mt-3"
              style={{ boxShadow: '5px 5px 0 var(--bw-accent)' }}
            />
            <button type="submit" className="slab-button mt-5 w-full" style={{ boxShadow: '6px 6px 0 var(--bw-surface)' }}>
              Subscribe. That's all it does.
            </button>
            <p className="mono mt-4 text-[10px] font-semibold leading-4 tracking-[0.04em] text-[#8a8264]">
              ONE EMAIL A MONTH. UNSUBSCRIBE IS ONE CLICK AND IT WORKS THE FIRST TIME.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
