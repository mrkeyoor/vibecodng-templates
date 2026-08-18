// Source slugs: hyperui-footers-4, magicui-dot-pattern
// Author repos: https://github.com/markmead/hyperui, https://github.com/magicuidesign/magicui

import { ArrowUpRight, Mark } from './Icons.jsx'
import { DotPattern } from './Effects.jsx'

const groups = [
  ['Product', ['Signals', 'Integrations', 'Pricing']],
  ['Company', ['Manifesto', 'Security', 'Contact']],
  ['Follow', ['Changelog', 'GitHub', 'LinkedIn']],
]

export default function Footer() {
  return (
    <footer className="site-footer relative overflow-hidden border-t border-white/8 bg-ink" data-reveal-group>
      <DotPattern />
      <div className="shell relative z-10 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal style={{ '--reveal-order': 0 }}>
            <a href="#top" className="inline-flex items-center gap-3" aria-label="Boardwatch home"><Mark className="size-8 text-accent" /><span className="font-semibold tracking-[-0.02em]">BOARDWATCH</span></a>
            <p className="mt-5 max-w-sm text-sm leading-6 text-mist">A calmer operating view for teams that ship software together.</p>
            <a href="mailto:hello@boardwatch.dev" className="mt-7 inline-flex items-center gap-2 text-sm text-white underline decoration-accent/50 underline-offset-4">hello@boardwatch.dev <ArrowUpRight /></a>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {groups.map(([title, links], index) => (
              <div key={title} data-reveal style={{ '--reveal-order': index + 1 }}>
                <h2 className="mono text-[9px] tracking-[0.16em] text-mist">{title.toUpperCase()}</h2>
                <ul className="mt-5 space-y-3">{links.map((link) => <li key={link}><a href="#top" className="text-xs text-white/70 transition-colors hover:text-accent sm:text-sm">{link}</a></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/8 pt-6 text-[11px] text-mist sm:flex-row sm:items-center sm:justify-between" data-reveal style={{ '--reveal-order': 4 }}>
          <p>© 2026 Boardwatch, Inc.</p>
          <p>Built for the work between planning and production.</p>
        </div>
      </div>
    </footer>
  )
}
