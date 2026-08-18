// Adapted pattern: neobrutalism-card (hard border, offset shadow, press-in hover)
// Author repo: https://github.com/ekmas/neobrutalism-components

const features = [
  {
    badge: 'MODELING',
    title: 'Content types in a file',
    body: 'Schemas live in your repo as plain TypeScript. Code review them, diff them, roll them back. No modal-window modeling UI that fights your git history.',
    accent: false,
  },
  {
    badge: 'EDITING',
    title: 'An editor, not an arcade',
    body: 'Writers get a fast form with validation and autosave. No drag-and-drop page builder generating divs nobody asked for. Your frontend renders; Slab stores.',
    accent: true,
  },
  {
    badge: 'ROLES',
    title: 'Permissions a human can audit',
    body: 'Four roles, per-type overrides, one screen. If your CMS permission matrix needs its own consultant, it is not a permission matrix, it is a liability.',
    accent: false,
  },
  {
    badge: 'API',
    title: 'One endpoint shape, forever',
    body: 'REST with stable pagination and a changelog we treat like a legal document. v1 has never broken. v2 does not exist and is not planned.',
    accent: true,
  },
  {
    badge: 'MIGRATION',
    title: 'Leave whenever you like',
    body: 'slab export dumps everything to JSON and Markdown with assets, in minutes. Lock-in is a business model; it is not ours.',
    accent: false,
  },
  {
    badge: 'FOOTPRINT',
    title: 'Runs on a $6 box',
    body: 'Single binary, SQLite or Postgres, 60MB of RAM at idle. Your blog does not need a Kubernetes cluster and neither does your marketing site.',
    accent: false,
  },
]

export default function Features() {
  return (
    <section id="features" className="section" data-reveal-group>
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal style={{ '--reveal-order': 0 }}>
          <h2 className="section-title max-w-2xl">Six things. Done properly.</h2>
          <p className="mono max-w-xs text-[11px] font-bold leading-5 tracking-[0.04em] text-mist">
            THE FULL FEATURE LIST FITS ON THIS PAGE. THAT IS A FEATURE.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article key={feature.title} className="slab-card slab-card-hover flex flex-col gap-4 p-6" data-reveal style={{ '--reveal-order': index + 1 }}>
              <span className={`slab-badge self-start ${feature.accent ? 'slab-badge-accent' : ''}`}>{feature.badge}</span>
              <h3 className="font-display text-2xl uppercase leading-none tracking-wide">{feature.title}</h3>
              <p className="text-[14px] font-medium leading-6 text-mist">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
