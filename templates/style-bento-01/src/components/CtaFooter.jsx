// First-party: closing CTA card, setup mini-card, and footer card.

import { Card } from './Effects.jsx'

export function CtaCard() {
  return (
    <Card span="b8" tone="card-accent" order={0} className="flex min-h-[15rem] flex-col justify-between gap-8">
      <h2 className="m-0 max-w-[18ch] text-balance text-[clamp(1.9rem,3.8vw,3rem)] font-bold leading-[1.02] tracking-tight">
        Move one project into Hub this week.
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="m-0 max-w-sm text-sm leading-6 opacity-85">
          Import the channel, invite the team, and run the project to the end. If Hub
          has not earned the rest of your work by then, it never will.
        </p>
        <a href="#top" className="button button-paper">Get Hub free</a>
      </div>
    </Card>
  )
}

export function SetupCard() {
  const steps = [
    ['1', 'Import from your chat tool'],
    ['2', 'Invite the project team'],
    ['3', 'Ship something'],
  ]
  return (
    <Card span="b4" order={1} className="flex flex-col gap-4">
      <p className="card-label">Setup, honestly</p>
      <ol className="m-0 grid list-none gap-3 p-0">
        {steps.map(([number, step]) => (
          <li key={number} className="flex items-center gap-3 text-sm font-medium">
            <span className="mono grid h-7 w-7 flex-none place-items-center rounded-full border border-edge text-[11px] text-accent">{number}</span>
            {step}
          </li>
        ))}
      </ol>
      <p className="mono m-0 mt-auto text-[10px] tracking-[0.12em] text-mist">MEDIAN TIME TO FIRST THREAD: 4 MIN</p>
    </Card>
  )
}

export function FooterCard() {
  const groups = [
    ['Product', ['Workspace', 'Integrations', 'Pricing', 'Changelog']],
    ['Company', ['About', 'Notes', 'Careers', 'Press kit']],
    ['Support', ['Help center', 'Status', 'Security', 'Contact']],
  ]
  return (
    <Card as="footer" span="b12" order={2}>
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div className="max-w-xs">
          <p className="m-0 text-lg font-bold tracking-tight">Hub</p>
          <p className="m-0 mt-2 text-sm leading-6 text-mist">
            The team workspace that fits on one screen. Made by a team of nine who use it all day.
          </p>
        </div>
        <nav className="flex flex-wrap gap-12" aria-label="Footer">
          {groups.map(([title, links]) => (
            <div key={title}>
              <p className="card-label m-0 mb-3">{title}</p>
              <ul className="m-0 grid list-none gap-1.5 p-0">
                {links.map((link) => (
                  <li key={link}><a href="#top" className="footer-link">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3 border-t border-edge pt-5">
        <p className="m-0 text-xs text-mist">&copy; 2026 Hub Systems. All rights reserved.</p>
        <p className="mono m-0 text-[10px] tracking-[0.14em] text-mist">EVERY PIXEL ON THIS PAGE IS A CARD</p>
      </div>
    </Card>
  )
}
