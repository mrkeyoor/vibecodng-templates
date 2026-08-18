// Source slug: magicui-dock (integration dock with pointer-proximity magnification)
// Author repo: https://github.com/magicuidesign/magicui
// Magnification rebuilt with CSS custom properties per item; dock is static under reduced motion.
import { useRef } from 'react'

const tools = [
  { name: 'GitHub', icon: 'M12 3 a9 9 0 0 0-3 17.5 c.5.1.7-.2.7-.5 v-1.7 c-2.5.5-3-1.2-3-1.2 -.4-1-1-1.3-1-1.3 -.8-.6.1-.6.1-.6 .9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8 .1-.6.3-1 .6-1.2 -2-.2-4.1-1-4.1-4.4 0-1 .3-1.8.9-2.4 -.1-.3-.4-1.2.1-2.4 0 0 .8-.3 2.5 1 a8.6 8.6 0 0 1 4.6 0 c1.7-1.3 2.5-1 2.5-1 .5 1.2.2 2.1.1 2.4 .6.6.9 1.4.9 2.4 0 3.4-2.1 4.2-4.1 4.4 .3.3.6.8.6 1.7 v2.5 c0 .3.2.6.7.5 A9 9 0 0 0 12 3' },
  { name: 'GitLab', icon: 'M12 21 L4 15 L6 5 L9 12 H15 L18 5 L20 15 Z' },
  { name: 'Linear', icon: 'M4 13 L11 20 M4 8 L16 20 M6 4 L20 18 M11 4 L20 13' },
  { name: 'Slack', icon: 'M9 4 a2 2 0 1 1 0 4 H9 Z M9 10 h6 a2 2 0 1 1 0 4 H9 a2 2 0 1 1 0-4 M15 20 a2 2 0 1 1 0-4 h0 Z' },
  { name: 'Figma', icon: 'M12 4 H9 a3 3 0 0 0 0 6 h3 Z M12 4 h3 a3 3 0 0 1 0 6 h-3 Z M12 10 H9 a3 3 0 0 0 0 6 h3 Z M12 13 a3 3 0 1 1 6 0 a3 3 0 0 1 -6 0 M9 16 h3 v3 a3 3 0 1 1 -3 -3' },
  { name: 'VS Code', icon: 'M16 4 L20 6 V18 L16 20 L7 13 L4 15 V9 L7 11 Z M16 8 L10.5 12 L16 16 Z' },
]

export default function Cta() {
  const dockRef = useRef(null)

  const onMove = (event) => {
    const dock = dockRef.current
    if (!dock) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = dock.querySelectorAll('.dock-item')
    items.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2))
      const scale = Math.max(1, 1.34 - distance / 240)
      item.style.setProperty('--dock-scale', scale.toFixed(3))
    })
  }

  const onLeave = () => {
    dockRef.current?.querySelectorAll('.dock-item').forEach((item) => {
      item.style.setProperty('--dock-scale', '1')
    })
  }

  return (
    <section id="cta" className="section" data-reveal-group>
      <div className="shell">
        <div className="cta-plane px-6 py-16 text-center sm:px-12 sm:py-20" data-reveal style={{ '--reveal-order': 0 }}>
          <h2 className="section-title mx-auto max-w-xl text-balance">Give your docs <em>somewhere to be</em></h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-7 text-mist">
            Import a repo, watch Atlas lay it out, and decide in an afternoon. Free spaces stay free; no card, no timer.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="dock" ref={dockRef} onPointerMove={onMove} onPointerLeave={onLeave} aria-label="Works alongside">
              {tools.map((tool) => (
                <span key={tool.name} className="dock-item" title={tool.name}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path d={tool.icon} fill="none" stroke="var(--bw-text)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="sr-only">{tool.name}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#top" className="button px-7">Open a free space</a>
            <a href="#views" className="button button-ghost">Watch the 90-second tour</a>
          </div>
        </div>
      </div>
    </section>
  )
}
