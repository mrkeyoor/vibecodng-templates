// Source slug: tripled-holographic-wall-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
// The indexed holographic wall is the grid-of-foil-tiles idea this section
// adapts: same tile rhythm, rebuilt on the first-party .holo-surface system
// with hover-only hue shift and shimmer instead of the indexed continuous
// animation. Artwork is inline SVG line work over the foil.

const works = [
  {
    title: 'Meridian typeface',
    author: 'Ines Duarte',
    kind: 'Type design',
    art: (
      <g stroke="rgb(20 16 28 / 55%)" strokeWidth="3" fill="none">
        <path d="M60 150 L110 50 L160 150 M78 116 h64" strokeLinecap="round" />
        <path d="M200 50 v100 M200 50 h52a26 26 0 0 1 0 52 h-52" strokeLinecap="round" />
      </g>
    ),
  },
  {
    title: 'Softbody studies',
    author: 'Kip Aroyan',
    kind: '3D motion',
    art: (
      <g stroke="rgb(20 16 28 / 55%)" strokeWidth="3" fill="none">
        <ellipse cx="110" cy="100" rx="52" ry="40" />
        <ellipse cx="196" cy="112" rx="34" ry="46" transform="rotate(18 196 112)" />
        <path d="M62 160 q80 26 190 -8" strokeLinecap="round" />
      </g>
    ),
  },
  {
    title: 'Harbor at 5am',
    author: 'Mai Nakagawa',
    kind: 'Photography',
    art: (
      <g stroke="rgb(20 16 28 / 55%)" strokeWidth="3" fill="none">
        <path d="M48 132 h224 M76 132 V84 l40 -22 v70 M148 132 V64 l52 -18 v86" strokeLinejoin="round" />
        <circle cx="236" cy="66" r="16" />
      </g>
    ),
  },
  {
    title: 'Wayfinding, Linz metro',
    author: 'Studio Pels',
    kind: 'Identity',
    art: (
      <g stroke="rgb(20 16 28 / 55%)" strokeWidth="3" fill="none">
        <path d="M56 100 h132 M188 100 l-28 -28 M188 100 l-28 28" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="232" cy="100" r="26" />
        <path d="M232 84 v32 M216 100 h32" />
      </g>
    ),
  },
  {
    title: 'Glass instrument UI',
    author: 'Roos Vermeer',
    kind: 'Product design',
    art: (
      <g stroke="rgb(20 16 28 / 55%)" strokeWidth="3" fill="none">
        <rect x="58" y="52" width="204" height="96" rx="14" />
        <circle cx="106" cy="100" r="22" />
        <path d="M150 82 h84 M150 100 h60 M150 118 h84" strokeLinecap="round" />
      </g>
    ),
  },
  {
    title: 'Botanic risographs',
    author: 'Teo Marchetti',
    kind: 'Illustration',
    art: (
      <g stroke="rgb(20 16 28 / 55%)" strokeWidth="3" fill="none">
        <path d="M160 160 V70 M160 96 q-34 -8 -44 -44 q40 2 44 44 M160 118 q34 -8 44 -44 q-40 2 -44 44" strokeLinecap="round" />
        <path d="M112 160 h96" strokeLinecap="round" />
      </g>
    ),
  },
]

const tilts = [204, 226, 188, 242, 214, 196]

export default function Showcase() {
  return (
    <section id="work" className="section" data-reveal-group>
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal style={{ '--reveal-order': 0 }}>
          <div>
            <p className="eyebrow">The wall</p>
            <h2 className="section-title mt-4 max-w-xl text-white">Six portfolios, printed on foil</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-mist">
            Every tile is a live Flux page. Hover one: the foil turns, once,
            and settles.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map(({ title, author, kind, art }, index) => (
            <a key={title} href="#cta" className="work-card" data-reveal style={{ '--reveal-order': index + 1 }}>
              <figure className="holo-surface holo-shimmer" style={{ '--holo-angle': `${tilts[index]}deg` }}>
                <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">{art}</svg>
              </figure>
              <span className="work-meta">
                <span>
                  <span className="block text-sm font-bold text-white">{title}</span>
                  <span className="block text-xs text-mist">{author}</span>
                </span>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent">{kind}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
