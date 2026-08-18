// Product showcase with backlit stats.
//
// Glow source slug: magicui-backlight
// Author repo: https://github.com/magicuidesign/magicui
// Adapted: the feGaussianBlur + saturate + composite SVG filter is defined once and
// applied to the stat numbers so the aurora hues halo them; layout and copy first-party.
const stats = [
  { value: '61%', label: 'less time from outline to first full draft' },
  { value: '2.4M', label: 'citations inserted with sources attached' },
  { value: '180k', label: 'writers drafting in Nimbus every week' },
  { value: '0', label: 'drafts used to train anyone else’s model' },
]

export default function Showcase() {
  return (
    <section id="showcase" className="section pt-0" data-reveal-group>
      <svg width="0" height="0" aria-hidden="true">
        <filter id="am-backlight" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blurred" />
          <feColorMatrix type="saturate" in="blurred" values="3.5" />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </svg>
      <div className="shell">
        <div className="pane p-8 sm:p-12" data-reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="eyebrow">Why it works</span>
              <h2 className="section-title mt-6 text-balance">The page stays yours</h2>
              <p className="mt-5 max-w-md text-pretty text-base leading-7 text-mist">
                Nimbus never replaces your paragraph without asking, never posts on your behalf,
                and never trains on your words. It reads carefully so its suggestions sound like
                you on a good day, then it gets out of the way.
              </p>
              <ul className="mt-7 space-y-3 text-sm leading-6 text-white/85">
                <li className="flex gap-3"><span className="text-accent" aria-hidden="true">01</span> Suggestions appear beside your text, never inside it.</li>
                <li className="flex gap-3"><span className="text-accent" aria-hidden="true">02</span> Every fact links to where it came from.</li>
                <li className="flex gap-3"><span className="text-accent" aria-hidden="true">03</span> Version history keeps each draft you almost sent.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center" data-reveal style={{ '--reveal-order': index + 1 }}>
                  <p className="stat-value backlit aurora-text w-fit mx-auto">{stat.value}</p>
                  <p className="mx-auto mt-2 max-w-44 text-xs font-medium leading-5 text-mist">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
