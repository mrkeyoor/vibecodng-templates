// Capture panel built from adapted clay-input and clay-button
// (mrkeyoor/sir-originals).
import { useState } from 'react'
import { ClayButton, ClayInput } from './Clay.jsx'
import { Flower } from './Art.jsx'

export default function Cta() {
  const [sent, setSent] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="cta" className="section" data-reveal-group>
      <div className="shell">
        <div className="clay-panel relative mx-auto max-w-3xl overflow-hidden rounded-[48px] p-9 text-center sm:p-14" data-reveal style={{ '--reveal-order': 0 }}>
          <Flower className="absolute -left-8 -top-8 h-28 w-28 rotate-12 opacity-40" />
          <Flower className="absolute -bottom-10 -right-8 h-32 w-32 -rotate-12 opacity-40" />
          <p className="eyebrow justify-center">Ready to plant?</p>
          <h2 className="section-title mt-4 text-balance">Your first seed is free.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-bold leading-7 text-mist">
            Pop in your email and we will send the download link, a printable starter garden, and nothing else. No newsletter ambush, promise.
          </p>
          {sent ? (
            <p className="clay-panel-soft mx-auto mt-9 max-w-md rounded-[24px] px-6 py-5 text-sm font-black text-ink" role="status">
              Seed planted. The starter kit is on its way to your inbox.
            </p>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-9 flex max-w-md flex-col gap-4 sm:flex-row sm:items-end">
              <ClayInput id="cta-email" type="email" required label="Your email" placeholder="you@example.com" className="flex-1 text-left" />
              <ClayButton type="submit" className="shrink-0">Send my kit</ClayButton>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
