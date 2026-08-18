// Derived from index slug: hyperui-faq-2
// Author repo: https://github.com/markmead/hyperui
// Structure kept (native details/summary accordion rows with a rotating
// plus marker); restyled as a ruled "Notes and queries" column with
// Fraunces questions.

const queries = [
  {
    q: 'Who owns what I write here?',
    a: 'You do, entirely and boringly. Longform takes no license beyond what is needed to show your work to the readers you chose. Delete a piece and it is gone from us, not archived against you.',
  },
  {
    q: 'Is there a feed?',
    a: 'No. Readers follow writers, and pieces arrive in the order they were published, whole. The only ranking on Longform is the order you put your own words in.',
  },
  {
    q: 'How do readers pay me?',
    a: 'You set one price for your subscription and we settle it to your bank monthly. Longform keeps a flat 6%, which is printed in the footer and in our accounts. There are no processing surprises buried in the help pages.',
  },
  {
    q: 'What happens if Longform shuts down?',
    a: 'Your export has been one click since the day we opened: every piece as plain files, plus your subscriber list. We also escrow a static copy of every public archive. Trust built on exits is the only kind worth having.',
  },
  {
    q: 'Can I bring my old blog with me?',
    a: 'Yes. The importer reads the usual formats and a paste of raw HTML when it must. Your old URLs can redirect to their new homes so twenty years of links keep working.',
  },
]

export default function Queries() {
  return (
    <section className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="double-rule pt-8" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="folio"><span>No. 5</span><span>Notes &amp; queries</span></div>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr]" data-reveal style={{ '--reveal-order': 1 }}>
          <h2 className="section-title">Asked, <em>answered</em></h2>
          <div>
            {queries.map((query, index) => (
              <details key={query.q} className="query" open={index === 0}>
                <summary>{query.q}</summary>
                <p className="answer">{query.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
