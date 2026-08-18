// Source slug: hyperui-headers-4
// Author repo: https://github.com/markmead/hyperui
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const links = [['Menu', '#menu'], ['Our room', '#gallery'], ['Stories', '#stories'], ['Visit', '#visit']]
  return <header className="site-header fixed inset-x-0 top-0 z-50">
    <div className="shell flex h-20 items-center justify-between">
      <a href="#top" className="brand" aria-label="Amber Room home"><span className="brand-mark">A</span><span>AMBER ROOM<small>COFFEE & KITCHEN</small></span></a>
      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">{links.map(([label, href]) => <a className="nav-link" key={href} href={href}>{label}</a>)}</nav>
      <a className="pill hidden sm:inline-flex" href="#book">Book a table <span aria-hidden="true">↗</span></a>
      <button type="button" className="menu-button sm:hidden" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    {open && <nav className="mobile-nav sm:hidden" aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a href="#book" onClick={() => setOpen(false)}>Book a table</a></nav>}
  </header>
}
