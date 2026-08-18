// Derived from index slug: hyperui-blog-cards-2
// Author repo: https://github.com/markmead/hyperui
// Structure kept (list of article entries with date, title, excerpt, meta
// row); image cards recast as a front-page index: hairline rows, serif
// titles, and a reading-time folio. Every essay here is fictional.

const essays = [
  {
    kicker: 'Reported essay',
    title: 'The last typewriter repairman on Ferry Street',
    excerpt:
      'Emil Baran has outlived the machines, the manufacturers, and most of his customers. What forty years of small repairs teach about work that cannot be hurried.',
    author: 'June Okafor',
    date: 'Aug 11',
    time: '28 min',
  },
  {
    kicker: 'Memoir',
    title: 'What the flood left',
    excerpt:
      'When the river took the ground floor, it left the notebooks. A writer returns to the town her family could not keep, and the sentences that kept them anyway.',
    author: 'Daniel Reyes',
    date: 'Aug 04',
    time: '41 min',
  },
  {
    kicker: 'Criticism',
    title: 'Notes on a borrowed kitchen',
    excerpt:
      'The cookbook as autobiography, the recipe as inheritance. Rereading three generations of stained margins in the only library my grandmother ever kept.',
    author: 'Alma Weiss',
    date: 'Jul 27',
    time: '17 min',
  },
]

export default function Essays() {
  return (
    <section id="essays" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="double-rule pt-8" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="folio"><span>No. 2</span><span>Recently published on Longform</span></div>
          <h2 className="section-title mt-6 max-w-[16ch]">Written here, <em>read whole</em></h2>
        </div>
        <div className="mt-12" data-reveal style={{ '--reveal-order': 1 }}>
          {essays.map((essay) => (
            <a key={essay.title} href="#essays" className="essay group">
              <div className="folio !justify-start gap-4">
                <b>{essay.kicker}</b>
                <span>{essay.date}</span>
                <span>{essay.time} read</span>
              </div>
              <div className="grid gap-4 md:grid-cols-[1.1fr_1fr] md:gap-12">
                <h3>{essay.title} <span className="essay-arrow text-accent" aria-hidden="true">&rarr;</span></h3>
                <div>
                  <p className="body-text m-0 mt-2">{essay.excerpt}</p>
                  <p className="m-0 mt-3 text-sm italic text-mist">by {essay.author}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <p className="folio mt-2 border-t border-rule pt-3" data-reveal style={{ '--reveal-order': 2 }}>
          <span>P. 02</span>
          <span>2,400 more in the archive</span>
        </p>
      </div>
    </section>
  )
}
