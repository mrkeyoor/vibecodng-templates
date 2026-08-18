// First-party section. Native details/summary accordion with a foil plus mark.

const faqs = [
  {
    q: 'Does the holographic finish slow my pages down?',
    a: 'No. The foil is CSS gradients on ordinary elements: no video, no WebGL, no libraries. The hue shift and shimmer run only while a visitor hovers or moves a cursor, and they switch off entirely for anyone with reduced motion enabled.',
  },
  {
    q: 'Can I turn the effect off for my portfolio?',
    a: 'Yes. The finish is a theme setting per portfolio, and you can also disable it per project. Plenty of photographers run Flux fully matte.',
  },
  {
    q: 'What happens to my site if I stop paying?',
    a: 'Your portfolio drops back to the free plan: it stays online at your flux.gallery subdomain with your three most recent projects. Nothing is deleted, and export is one click at any time.',
  },
  {
    q: 'Do client rooms really change anything?',
    a: 'Rooms show which frames a client viewed and for how long. Artists tell us the follow-up call gets easier when you already know the three images they kept returning to.',
  },
  {
    q: 'Can I bring my existing domain and portfolio?',
    a: 'Yes. Point your domain from any registrar, and the importer pulls projects from a folder of images, a zip, or a public Behance or Cargo page, keeping titles and order.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="section pt-0" data-reveal-group>
      <div className="shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title mt-4 text-white">Fair questions about shiny things</h2>
        </div>
        <div data-reveal style={{ '--reveal-order': 1 }}>
          {faqs.map(({ q, a }) => (
            <details key={q} className="faq-item">
              <summary>
                {q}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M7 1v12M1 7h12" />
                </svg>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
