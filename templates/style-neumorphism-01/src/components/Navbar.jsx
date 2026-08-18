// First-party section chrome; CTA is the adapted neu-button (mrkeyoor/sir-originals).
import { useEffect, useState } from 'react'
import { NeuButton } from './Neu.jsx'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#score', label: 'Your score' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#stories', label: 'Stories' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-nav fixed inset-x-0 top-0 z-50 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="shell flex h-18 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 rounded-full font-extrabold tracking-tight">
          <span className="neu-raised-sm grid h-10 w-10 place-items-center rounded-[14px]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-accent stroke-[2.4]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 13h4l1.8-4.5 3.3 8 2.1-3.5H21" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Pulse
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}
        </nav>
        <NeuButton as="a" href="#cta" className="!min-h-10 !px-5 !py-2.5 text-accent">Get Pulse</NeuButton>
      </div>
    </header>
  )
}
