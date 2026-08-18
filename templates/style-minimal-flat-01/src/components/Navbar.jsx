// Derived from index slug: efferd-header-1
// Author repo: https://github.com/shabanhr/efferd-ui
// Structure kept (wordmark left, links center, sign in + solid CTA right);
// restyled flat with hairline border and no elevation.

export default function Navbar() {
  return (
    <header className="border-b border-rule bg-paper">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-baseline gap-2 text-ink no-underline" aria-label="Ledger home">
          <span className="text-[1.05rem] font-semibold tracking-tight">Ledger</span>
          <span className="mono hidden text-[10px] tracking-[0.14em] text-mist sm:inline">INVOICING</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <a className="nav-link" href="#how">How it works</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <a className="nav-link" href="#faq">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#pricing" className="link-plain hidden sm:inline">Sign in</a>
          <a href="#pricing" className="button">Start invoicing</a>
        </div>
      </div>
    </header>
  )
}
