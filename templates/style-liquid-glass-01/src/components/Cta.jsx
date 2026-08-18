// Source slug: ruixen-glass-form
// Author repo: https://github.com/ruixenui/ruixen.com
// Adapted: the frosted settings-style form with separated rows and an iOS toggle kept;
// motion/react entrance and click sound removed, rows recolored via palette variables.
// The surrounding CTA panel and copy are first-party.
import { useState } from 'react'
import { ArrowRight } from './Icons.jsx'

export default function Cta() {
  const [digest, setDigest] = useState(true)
  const [sent, setSent] = useState(false)

  return (
    <section id="cta" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="liquid sheenable grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center" data-reveal>
          <span className="sheen" aria-hidden="true" />
          <div>
            <h2 className="section-title text-balance">
              Put your money <span className="serif-accent text-accent">behind glass</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-7 text-mist">
              Download Meridian and link your first account in about three minutes. The clear
              ledger is free, and the first rule you write usually pays for the rest.
            </p>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-mist">
              iOS · Android · Web
            </p>
          </div>
          <form
            className="liquid-deep overflow-hidden rounded-2xl"
            onSubmit={(event) => { event.preventDefault(); setSent(true) }}
            aria-label="Get a download link"
          >
            <div className="form-row">
              <label htmlFor="cta-email" className="sr-only">Email address</label>
              <input
                id="cta-email"
                type="email"
                required
                className="form-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="form-row">
              <span className="text-sm font-medium">Send the Sunday digest too</span>
              <button
                type="button"
                className="toggle"
                role="switch"
                aria-checked={digest}
                aria-label="Send the Sunday digest too"
                onClick={() => setDigest((v) => !v)}
              />
            </div>
            <div className="form-row">
              <button type="submit" className="button w-full">
                {sent ? 'Link sent, check your inbox' : 'Email me the download link'} <ArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
