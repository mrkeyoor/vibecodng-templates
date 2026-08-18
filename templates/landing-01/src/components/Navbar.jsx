// Source slug: hyperui-headers-4
// Author repo: https://github.com/markmead/hyperui

import { useEffect, useState } from 'react'
import { ArrowUpRight, Mark } from './Icons.jsx'

const links = [
  ['Product', '#features'],
  ['Proof', '#proof'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.2, 0.6] })

    links.forEach(([, href]) => {
      const section = document.querySelector(href)
      if (section) observer.observe(section)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header className={`site-nav fixed inset-x-0 top-0 z-50 border-b ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="shell flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-3 text-white" aria-label="Boardwatch home">
          <Mark className="size-7 text-accent" />
          <span className="text-[15px] font-semibold tracking-[-0.02em]">BOARDWATCH</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="nav-link" data-active={active === href.slice(1)} aria-current={active === href.slice(1) ? 'location' : undefined}>{label}</a>
          ))}
        </nav>

        <a href="#pricing" className="button button-small hidden sm:inline-flex">
          Start a workspace <ArrowUpRight />
        </a>

        <button
          type="button"
          className="micro-button grid size-10 place-items-center rounded-full border border-white/15 text-white sm:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-3.5 w-4">
            <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-3 h-px w-4 bg-current transition-transform ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/8 bg-ink/95 px-5 py-5 backdrop-blur sm:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="nav-link rounded-lg px-3 py-3" data-active={active === href.slice(1)} aria-current={active === href.slice(1) ? 'location' : undefined}>{label}</a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
