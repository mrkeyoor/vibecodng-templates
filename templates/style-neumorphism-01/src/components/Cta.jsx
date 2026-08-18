// Capture panel built from adapted neu-input and neu-button
// (mrkeyoor/sir-originals).
import { useState } from 'react'
import { NeuButton, NeuInput } from './Neu.jsx'

export default function Cta() {
  const [sent, setSent] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="cta" className="section" data-reveal-group>
      <div className="shell">
        <div className="neu-raised-lg mx-auto max-w-3xl rounded-[36px] bg-surface p-9 text-center sm:p-14" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow justify-center">Get started</p>
          <h2 className="section-title mt-4 text-balance">Tomorrow morning, know the answer.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-mist">
            Put in your email and we will send the app link plus a two minute setup guide. First week free, no card, and your data never leaves your account.
          </p>
          {sent ? (
            <p className="neu-inset mx-auto mt-9 max-w-md rounded-[18px] px-6 py-5 text-sm font-bold text-accent" role="status">
              Check your inbox. Your setup guide is on its way.
            </p>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-9 flex max-w-md flex-col gap-4 sm:flex-row sm:items-end">
              <NeuInput id="cta-email" type="email" required label="Email address" placeholder="you@example.com" className="flex-1 text-left" />
              <NeuButton type="submit" className="text-accent">Send the link</NeuButton>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
