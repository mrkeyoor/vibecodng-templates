// First-party FAQ on ruled setlist paper.
const faqs = [
  {
    q: 'Does the tuner work for bass, ukulele, violin?',
    a: 'Yes. Pitch is fully chromatic and tracks from low B on a five string bass up past a violin E. Instrument presets just change the display, not the ears.',
  },
  {
    q: 'Are my takes uploaded anywhere?',
    a: 'Takes stay on your device unless you turn on backup. With backup on, audio is encrypted before it leaves and only you hold the key. We cannot listen, which is honestly a relief for everyone.',
  },
  {
    q: 'What happens when the practice timer ends?',
    a: 'The standby light comes on and Deck stops logging. You can keep playing, but the app will not guilt you into overtime. Rest is part of the practice.',
  },
  {
    q: 'Can I use my own exercise list instead of the drill deck?',
    a: 'Yes. Write your own cards, reorder them, and Deck will still track tempo and takes against each one. The adaptive deck is a default, not a cage.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title mt-4">Taped to the amp.</h2>
        </div>
        <div className="paper-panel mx-auto mt-14 max-w-3xl rotate-[0.4deg] px-7 py-9 sm:px-12 sm:py-12" data-reveal style={{ '--reveal-order': 1 }}>
          <span className="paper-tape" aria-hidden="true" />
          <div className="divide-y divide-(--paper-rule)">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item group py-4 first:pt-0 last:pb-0">
                <summary className="text-base sm:text-lg">
                  {item.q}
                  <span className="font-display text-xl text-(--paper-ink)/60 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-xl pt-3 text-[0.95rem] leading-[1.85rem]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
