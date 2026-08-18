import { useState } from 'react'

// Source slug: hyperui-headers-4
// Author repo: https://github.com/markmead/hyperui
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [['Work', '#work'], ['Practice', '#practice'], ['About', '#about']]
  return <header className="nav"><div className="shell nav-inner">
    <a className="wordmark" href="#top" aria-label="Mira Vale home">Mira Vale<span>Independent designer</span></a>
    <nav className="desktop-nav" aria-label="Primary">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}<a className="nav-cta" href="mailto:studio@miravale.design">Start a project ↗</a></nav>
    <button className="menu" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
  </div>{open && <nav className="mobile-nav" aria-label="Mobile">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>}</header>
}
