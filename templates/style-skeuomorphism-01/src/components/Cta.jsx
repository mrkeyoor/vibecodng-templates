// First-party capture panel on stitched tolex; grain is the adapted
// magicui-noise-texture (https://github.com/magicuidesign/magicui).
import { useState } from 'react'
import { NoiseTexture } from './Skeuo.jsx'

export default function Cta() {
  const [sent, setSent] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="cta" className="section" data-reveal-group>
      <div className="shell">
        <div className="leather-panel mx-auto max-w-3xl overflow-hidden rounded-[20px] p-9 text-center sm:p-14" data-reveal style={{ '--reveal-order': 0 }}>
          <NoiseTexture className="opacity-30" frequency={0.9} noiseOpacity={0.35} />
          <span className="stitched" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow justify-center">Sound check</p>
            <h2 className="section-title mt-4 text-balance">Tonight counts. Plug in.</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-mist">
              Leave your email and we will send the app plus a printable practice sheet for your first week. No riff-a-day newsletter unless you ask for it.
            </p>
            {sent ? (
              <p className="metal-panel mx-auto mt-9 max-w-md rounded-[10px] px-6 py-5 text-sm text-ink" role="status">
                <span className="led mr-2 inline-block align-middle" aria-hidden="true" />
                Signal received. Check your inbox for the download.
              </p>
            ) : (
              <form onSubmit={submit} className="mx-auto mt-9 flex max-w-md flex-col gap-4 sm:flex-row">
                <label className="flex-1 text-left">
                  <span className="engraved mb-2 block text-[0.7rem]">Input · Email</span>
                  <input
                    type="email" required placeholder="you@example.com"
                    className="min-h-12 w-full rounded-[10px] border border-black/60 bg-black/45 px-4 text-sm text-ink shadow-[inset_0_3px_6px_rgb(0_0_0/0.6)] outline-none placeholder:text-mist focus:ring-2 focus:ring-accent"
                  />
                </label>
                <button type="submit" className="push-button self-end">Send it</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
