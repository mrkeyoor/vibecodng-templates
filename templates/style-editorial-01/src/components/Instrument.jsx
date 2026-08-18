// Derived from index slug: hyperui-feature-grids-1
// Author repo: https://github.com/markmead/hyperui
// Structure kept (section heading with lede, repeated feature rows of
// marker, title, description); icon cards recast as a numbered editorial
// spread with hairline rules and oversized Fraunces numerals.

const features = [
  {
    n: '01',
    title: 'An editor that holds still',
    body: 'No toolbars sliding in, no assistant clearing its throat. A page, a serif, and your cursor. Formatting lives under a single keystroke and stays there until asked.',
  },
  {
    n: '02',
    title: 'Drafts age well',
    body: 'Every save is a version you can walk back to. Compare Tuesday against October side by side and watch the argument sharpen. Nothing is ever overwritten, only outgrown.',
  },
  {
    n: '03',
    title: 'Footnotes, finally',
    body: 'Real footnotes that sit where a reader expects them, numbered and linked both ways. The web forgot them for twenty years. We hold a grudge about this.',
  },
  {
    n: '04',
    title: 'Readers arrive on purpose',
    body: 'Your work reaches people who subscribed to you, in full, in order. No ranking, no reach mechanics, no punishment for taking March off to actually write.',
  },
  {
    n: '05',
    title: 'The archive is yours',
    body: 'One click exports everything you have ever written as plain files with your subscriber list beside them. The door is always open, which is why people stay.',
  },
  {
    n: '06',
    title: 'Money without a maze',
    body: 'Readers pay you directly if you let them. One price, set by you, settled to your account. Longform takes a flat cut and publishes the number in the footer.',
  },
]

export default function Instrument() {
  return (
    <section id="instrument" className="section" data-reveal-group>
      <div className="shell">
        <div className="double-rule pt-8" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="folio"><span>No. 1</span><span>The instrument</span></div>
          <h2 className="section-title mt-6 max-w-[18ch]">Six decisions we will not walk back</h2>
        </div>
        <div className="mt-12" data-reveal style={{ '--reveal-order': 1 }}>
          {features.map((feature) => (
            <article key={feature.n} className="spread">
              <p className="spread-number">{feature.n}</p>
              <h3>{feature.title}</h3>
              <p className="body-text">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
