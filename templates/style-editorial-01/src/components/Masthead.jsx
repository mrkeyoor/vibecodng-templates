// Derived from index slug: hyperui-headers-4
// Author repo: https://github.com/markmead/hyperui
// Structure kept (wordmark left, horizontal nav, action button right);
// restyled as a newspaper masthead: mono small-caps links, a dateline folio
// above, and the thick-thin double rule beneath.

export default function Masthead() {
  return (
    <header>
      <div className="shell">
        <div className="folio pt-4">
          <span>Vol. 01 &middot; The writing issue</span>
          <span className="hidden sm:block">A platform for work that lasts</span>
          <span><b>Est. 2026</b></span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-6 border-t border-rule py-3.5">
          <a href="#top" className="display-face text-2xl font-semibold tracking-tight text-ink no-underline" aria-label="Longform home">
            Longform<span className="text-accent">.</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            <a className="nav-link" href="#instrument">The instrument</a>
            <a className="nav-link" href="#essays">Recently published</a>
            <a className="nav-link" href="#subscriptions">Subscriptions</a>
          </nav>
          <a href="#subscriptions" className="button !min-h-[2.5rem] !px-4">Start writing</a>
        </div>
        <div className="double-rule" aria-hidden="true" />
      </div>
    </header>
  )
}
