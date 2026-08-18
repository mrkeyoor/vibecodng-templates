// Source slug: animata-moving-gradient
// Author repo: https://github.com/codse/animata
// Adapted: the low-opacity panning gradient wash sits behind each card's content
// (`.mesh-card::before`), recolored from palette-derived aurora hues and slowed;
// card structure, icons, and copy are first-party.
import { Outline, Tone, Cite, Rewrite, Doc, Team } from './Icons.jsx'

const features = [
  {
    icon: Outline,
    title: 'Outlines from a sentence',
    body: 'Type the argument you want to make. Nimbus lays out sections, counterpoints, and the research you still owe yourself.',
  },
  {
    icon: Tone,
    title: 'Your voice, learned',
    body: 'Nimbus studies the pieces you mark as your best and flags paragraphs that drift away from how you actually sound.',
  },
  {
    icon: Cite,
    title: 'Facts with receipts',
    body: 'Every suggested claim arrives with a source attached. One click inserts the citation in your house style.',
  },
  {
    icon: Rewrite,
    title: 'Rewrites you can steer',
    body: 'Tighter, warmer, half the length, or plainer English. Rewrites appear side by side, and your original never disappears.',
  },
  {
    icon: Doc,
    title: 'One draft, every format',
    body: 'A finished piece exports as a newsletter, a script, and a thread, each reshaped for the medium rather than pasted.',
  },
  {
    icon: Team,
    title: 'Edits without email',
    body: 'Editors leave notes directly on sentences. Accept, decline, or ask Nimbus to attempt the fix in your voice.',
  },
]

export default function Features() {
  return (
    <section id="features" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">Features</span>
          <h2 className="section-title mt-6 text-balance">A drafting partner, not a ghostwriter</h2>
          <p className="mt-5 text-pretty text-base leading-7 text-mist">
            Six ways Nimbus helps you finish the piece you meant to write.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="pane pane-hover mesh-card p-7"
              data-reveal
              style={{ '--reveal-order': index + 1 }}
            >
              <span className="text-accent"><feature.icon /></span>
              <h3 className="mt-5 text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-mist">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
