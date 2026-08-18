// First-party. The nav is the first bento card rather than a bar above the grid.

import { Card } from './Effects.jsx'

function Mark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="var(--bw-accent)" />
      <rect x="7" y="7" width="8" height="8" rx="2.5" fill="white" />
      <rect x="17" y="7" width="8" height="8" rx="2.5" fill="white" opacity=".55" />
      <rect x="7" y="17" width="8" height="8" rx="2.5" fill="white" opacity=".55" />
      <rect x="17" y="17" width="8" height="8" rx="2.5" fill="white" />
    </svg>
  )
}

export default function Header() {
  return (
    <Card as="header" span="b12" order={0} className="!py-3.5">
      <div className="flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 text-ink no-underline" aria-label="Hub home">
          <Mark />
          <span className="text-lg font-bold tracking-tight">Hub</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {[['Workspace', '#workspace'], ['Teams', '#teams'], ['Pricing', '#pricing']].map(([label, href]) => (
            <a key={label} href={href} className="footer-link !text-sm">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <a href="#pricing" className="footer-link hidden !text-sm sm:block">Sign in</a>
          <a href="#pricing" className="button !min-h-[2.5rem] !px-4 !text-[0.8125rem]">Get Hub free</a>
        </div>
      </div>
    </Card>
  )
}
