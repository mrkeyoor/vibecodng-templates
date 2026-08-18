// Source slug: ruixen-client-carousel-showcase
// Author repo: https://github.com/ruixenui/ruixen.com
// The indexed carousel overflowed at 375 and 768 (fixed-width track), so this
// adaptation lays the same card content in a fluid three-column grid instead
// of a moving track. Quotes and identities are fictional.

const quotes = [
  {
    quote: 'I moved my preset shop over on a Tuesday night. By Friday Bloom had collected EU VAT I did not know I owed, and I had 312 euros I did not expect.',
    name: 'Noor El-Amin',
    role: 'Photographer, 41k followers',
    initials: 'NE',
    tint: 'linear-gradient(135deg, var(--bw-accent), var(--glow-warm))',
  },
  {
    quote: 'My membership pays my studio rent now. The part I did not expect: the automatic thank-you notes get replies. People feel seen, and they stay.',
    name: 'Tomas Ferreira',
    role: 'Ceramicist and teacher',
    initials: 'TF',
    tint: 'linear-gradient(135deg, var(--glow-warm), var(--glow-cool))',
  },
  {
    quote: 'I have tried four platforms in three years. Bloom is the first where the export button is real. Ironically, that is why I stopped looking.',
    name: 'June Park',
    role: 'Newsletter, 9k members',
    initials: 'JP',
    tint: 'linear-gradient(135deg, var(--glow-cool), var(--bw-accent))',
  },
]

export default function Testimonials() {
  return (
    <section id="creators" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="max-w-xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Creator stories</p>
          <h2 className="section-title mt-5 text-white">
            People who quit their <em className="gradient-text">second job</em>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {quotes.map(({ quote, name, role, initials, tint }, index) => (
            <figure key={name} className="quote-card m-0" data-reveal style={{ '--reveal-order': index + 1 }}>
              <blockquote className="m-0 text-[0.92rem] leading-7 text-white/85">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <span className="avatar" style={{ background: tint }}>{initials}</span>
                <span>
                  <span className="block text-sm font-semibold text-white">{name}</span>
                  <span className="block text-xs text-mist">{role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
