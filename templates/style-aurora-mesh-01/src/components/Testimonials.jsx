// First-party testimonials with aurora-ring avatars.
const quotes = [
  {
    quote: 'I was skeptical of every writing tool that promised to sound like me. Nimbus is the first one that flagged a paragraph and said this is not you, and it was right.',
    name: 'Ines Okafor',
    role: 'Columnist, The Longform Review',
    initials: 'IO',
  },
  {
    quote: 'The citation thing alone pays for it. My fact-check pass went from a Saturday to about forty minutes, and the links are already in our house style.',
    name: 'Tomas Lindqvist',
    role: 'Senior Editor, Orbit Weekly',
    initials: 'TL',
  },
  {
    quote: 'We publish in three formats from one draft now. The thread version actually reads like a thread instead of a chopped-up essay.',
    name: 'Mara Estevez',
    role: 'Founder, Foghorn',
    initials: 'ME',
  },
]

export default function Testimonials() {
  return (
    <section id="voices" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">Writers</span>
          <h2 className="section-title mt-6 text-balance">People who write for a living, on the record</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {quotes.map((item, index) => (
            <figure key={item.name} className="pane pane-hover quote-card" data-reveal style={{ '--reveal-order': index + 1 }}>
              <blockquote className="text-sm leading-7 text-white/88">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-white/8 pt-5">
                <span className="avatar-ring" aria-hidden="true">{item.initials}</span>
                <span>
                  <span className="block text-sm font-bold">{item.name}</span>
                  <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-[0.1em] text-mist">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
