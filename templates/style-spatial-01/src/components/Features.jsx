// Source slug: magicui-animated-beam (source-to-space connection diagram)
// Author repo: https://github.com/magicuidesign/magicui
// Beams rebuilt as SVG dash-offset pulses that start on reveal; static grey paths under reduced motion.

const sources = [
  { label: 'Git repository', icon: 'M8 4 v8 M8 12 a4 4 0 0 0 4 4 h0 M16 12 a4 4 0 1 1 0 .01 M8 4 a2 2 0 1 1 0 .01' },
  { label: 'OpenAPI spec', icon: 'M5 3 h9 l5 5 v13 h-14 Z M14 3 v5 h5 M8 12 h8 M8 16 h6' },
  { label: 'Support threads', icon: 'M4 5 h16 v10 h-9 l-4 4 v-4 h-3 Z' },
]

const outputs = [
  { label: 'Reader spaces', icon: 'M3 6 h18 v12 h-18 Z M3 10 h18 M7 6 v12' },
  { label: 'In-app help', icon: 'M12 3 a9 9 0 1 1 0 18 a9 9 0 0 1 0-18 M12 16 v.01 M10 9 a2 2 0 1 1 3 2 c-.8.5-1 1-1 2' },
  { label: 'Agent answers', icon: 'M5 7 h14 v10 h-14 Z M9 11 v2 M15 11 v2 M12 3 v4' },
]

const claims = [
  {
    title: 'Every page knows its neighbors',
    body: 'Links are typed: depends-on, supersedes, explains. Atlas renders them as adjacency, so a reader on "Webhooks" can see "Retries" floating one plane away.',
  },
  {
    title: 'Staleness is visible, not discovered',
    body: 'Planes dim as their source drifts. A doc tied to code that changed last week looks different from one verified this morning, before anyone files a ticket.',
  },
  {
    title: 'One source, three altitudes',
    body: 'The same content serves the skim, the read, and the deep dive. Readers move closer instead of opening six tabs.',
  },
]

function Node({ item }) {
  return (
    <div className="node-box">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 shrink-0" aria-hidden="true">
        <path d={item.icon} fill="none" stroke="var(--bw-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {item.label}
    </div>
  )
}

export default function Features() {
  return (
    <section id="spaces" className="section" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow"><i /> How a space works</div>
          <h2 className="section-title mt-5">Sources flow in. <em>Placed knowledge</em> flows out.</h2>
        </div>

        <div className="plane plane-glass mt-12 p-6 sm:p-10" data-reveal style={{ '--reveal-order': 1 }}>
          <div className="grid items-center gap-8 md:grid-cols-[max-content_1fr_max-content]">
            <div className="flex flex-row flex-wrap justify-center gap-3 md:flex-col">
              {sources.map((item) => <Node key={item.label} item={item} />)}
            </div>

            <div className="relative hidden min-h-44 md:block" aria-hidden="true">
              <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <path className="beam-path" d="M0 30 C 90 30 90 80 150 80" />
                <path className="beam-path" d="M0 80 H150" />
                <path className="beam-path" d="M0 130 C 90 130 90 80 150 80" />
                <path className="beam-path" d="M150 80 C 210 80 210 30 300 30" />
                <path className="beam-path" d="M150 80 H300" />
                <path className="beam-path" d="M150 80 C 210 80 210 130 300 130" />
                <path className="beam-pulse" d="M0 30 C 90 30 90 80 150 80" />
                <path className="beam-pulse delay-1" d="M0 80 H150" />
                <path className="beam-pulse delay-2" d="M0 130 C 90 130 90 80 150 80" />
                <path className="beam-pulse delay-1" d="M150 80 C 210 80 210 30 300 30" />
                <path className="beam-pulse delay-2" d="M150 80 H300" />
                <path className="beam-pulse" d="M150 80 C 210 80 210 130 300 130" />
                <circle cx="150" cy="80" r="16" fill="white" stroke="var(--bw-accent)" strokeWidth="1.6" />
                <rect x="143" y="75" width="9" height="7" rx="1" fill="none" stroke="var(--bw-accent)" strokeWidth="1.4" />
                <rect x="148" y="79" width="9" height="7" rx="1" fill="var(--bw-accent)" />
              </svg>
            </div>

            <div className="flex flex-row flex-wrap justify-center gap-3 md:flex-col">
              {outputs.map((item) => <Node key={item.label} item={item} />)}
            </div>
          </div>
          <p className="mono mt-6 text-center text-[10px] tracking-[0.14em] text-mist">SYNC IS CONTINUOUS · A PLANE IS NEVER OLDER THAN ITS SOURCE BY MORE THAN 60S</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {claims.map((claim, index) => (
            <article key={claim.title} className="plane hover-depth p-6" data-reveal style={{ '--reveal-order': index + 2 }}>
              <h3 className="font-display text-xl">{claim.title}</h3>
              <p className="mt-3 text-sm leading-6 text-mist">{claim.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
