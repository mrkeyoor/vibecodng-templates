// First-party section: offset floating quote planes (marked first-party; reuses the shared plane system).

const quotes = [
  {
    quote: 'Our onboarding doc was a 40-minute read nobody finished. In Atlas it became a path through eleven planes, and new engineers actually walk it.',
    name: 'Priya Raghunathan',
    role: 'Staff engineer, Fernwood Robotics',
    offset: '',
  },
  {
    quote: 'The drift queue is the first docs feature that made our writers look forward to a Monday. It tells them exactly what moved and where it lives.',
    name: 'Tomas Lindqvist',
    role: 'Docs lead, Meridian Payments',
    offset: 'md:translate-y-8',
  },
  {
    quote: 'I was sure the spatial thing was a gimmick. Then I watched a support agent find a proration edge case in eight seconds without asking anyone.',
    name: 'Amara Okafor',
    role: 'VP Support, Hollowbeam',
    offset: 'md:translate-y-16',
  },
]

export default function Testimonials() {
  return (
    <section className="section" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow"><i /> Field notes</div>
          <h2 className="section-title mt-5">Skeptics make <em>the best references</em></h2>
        </div>
        <div className="mt-12 grid gap-5 pb-6 md:grid-cols-3 md:pb-20">
          {quotes.map((item, index) => (
            <figure key={item.name} className={`plane quote-plane ${item.offset}`} data-reveal style={{ '--reveal-order': index + 1 }}>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <p className="text-sm font-bold">{item.name}</p>
                <p className="mono mt-1 text-[10px] tracking-[0.12em] text-mist">{item.role.toUpperCase()}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
