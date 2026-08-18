import { useEffect, useRef, useState } from 'react'

const flavours = [
  { name: 'Black Cherry', note: 'Ruby grapefruit · hibiscus', tone: 'cherry', price: '$6' },
  { name: 'Night Citrus', note: 'Blood orange · pink salt', tone: 'citrus', price: '$6' },
  { name: 'Electric Plum', note: 'Damson · shiso leaf', tone: 'plum', price: '$6' },
]

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from, to, progress) => from + (to - from) * progress

export default function App() {
  const journeyRef = useRef(null)
  const [bag, setBag] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const [menu, setMenu] = useState(false)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    let frame = 0
    const root = document.documentElement
    const update = () => {
      frame = 0
      const journey = journeyRef.current
      if (!journey) return
      const start = journey.offsetTop
      const distance = Math.max(1, journey.offsetHeight - window.innerHeight)
      const progress = clamp((window.scrollY - start) / distance)
      const first = clamp(progress / 0.32)
      const second = clamp((progress - 0.32) / 0.34)
      const third = clamp((progress - 0.66) / 0.34)
      let x = mix(0, -27, first)
      let y = mix(0, 3, first)
      let rotate = mix(0, -14, first)
      let scale = mix(1, 0.78, first)
      if (progress > 0.32) {
        x = mix(-27, 25, second)
        y = mix(3, -5, second)
        rotate = mix(-14, 17, second)
        scale = mix(0.78, 0.88, second)
      }
      if (progress > 0.66) {
        x = mix(25, 0, third)
        y = mix(-5, 7, third)
        rotate = mix(17, 0, third)
        scale = mix(0.88, 0.7, third)
      }
      root.style.setProperty('--journey', progress.toFixed(4))
      root.style.setProperty('--scene-one', (1 - clamp((progress - 0.2) / 0.2)).toFixed(4))
      root.style.setProperty('--scene-two', (clamp((progress - 0.18) / 0.2) * (1 - clamp((progress - 0.55) / 0.18))).toFixed(4))
      root.style.setProperty('--scene-three', clamp((progress - 0.58) / 0.2).toFixed(4))
      root.style.setProperty('--copy-one', (1 - clamp((progress - 0.16) / 0.1)).toFixed(4))
      root.style.setProperty('--copy-two', (clamp((progress - 0.25) / 0.08) * (1 - clamp((progress - 0.56) / 0.1))).toFixed(4))
      root.style.setProperty('--copy-three', clamp((progress - 0.68) / 0.08).toFixed(4))
      root.style.setProperty('--can-x', `${x.toFixed(2)}vw`)
      root.style.setProperty('--can-y', `${y.toFixed(2)}vh`)
      root.style.setProperty('--can-r', `${rotate.toFixed(2)}deg`)
      root.style.setProperty('--can-s', scale.toFixed(4))
      const total = Math.max(1, root.scrollHeight - window.innerHeight)
      root.style.setProperty('--page-progress', (window.scrollY / total).toFixed(4))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting))
    }, { threshold: 0.18 })
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node))
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const add = (index = selected) => {
    setSelected(index)
    setBag((count) => count + 1)
    setDrawer(true)
  }

  return <div className="experience">
    <div className="page-progress" aria-hidden="true" />
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="Pulse home"><span>●</span>PULSE</a>
      <nav aria-label="Primary"><a href="#inside">Inside</a><a href="#flavours">Flavours</a><a href="#ritual">Ritual</a></nav>
      <div className="nav-actions"><button type="button" onClick={() => setMenu(true)}>Menu</button><button type="button" onClick={() => setDrawer(true)}>Bag <b>{String(bag).padStart(2, '0')}</b></button></div>
    </header>

    {menu && <div className="menu-panel"><button type="button" onClick={() => setMenu(false)} aria-label="Close menu">×</button><p>Explore PULSE</p><a href="#inside" onClick={() => setMenu(false)}>Inside the flavour</a><a href="#flavours" onClick={() => setMenu(false)}>The full spectrum</a><a href="#ritual" onClick={() => setMenu(false)}>Serve it colder</a><span>Botanicals, bubbles, zero noise.</span></div>}

    <main id="top">
      <section className="journey" ref={journeyRef} aria-label="PULSE product story">
        <div className="stage">
          <div className="scene scene-liquid" aria-hidden="true"><img src="liquid.webp" alt="" fetchPriority="high" /></div>
          <div className="scene scene-ingredients" aria-hidden="true"><img src="ingredients.webp" alt="" /></div>
          <div className="scene scene-spectrum" aria-hidden="true"><div className="mesh" /><div className="halo halo-a" /><div className="halo halo-b" /></div>
          <div className="grain" aria-hidden="true" />
          <div className="orb orb-one" aria-hidden="true" /><div className="orb orb-two" aria-hidden="true" /><div className="orb orb-three" aria-hidden="true" />

          <div className="hero-copy scene-copy copy-one">
            <p><span>01</span> Botanical carbonation</p>
            <h1>FEEL<br />THE <i>PULSE.</i></h1>
            <div><span>Black cherry / ruby grapefruit</span><button type="button" onClick={() => add(0)}>Taste the first drop ↗</button></div>
          </div>

          <div id="inside" className="scene-copy copy-two">
            <p><span>02</span> What is inside</p>
            <h2>Dark fruit.<br />Bright nerve.</h2>
            <p className="body-copy">Tart black cherry, ruby grapefruit and hibiscus lifted by microscopic bubbles. No syrupy finish. Just a clean electric snap.</p>
            <dl><div><dt>42</dt><dd>calories</dd></div><div><dt>0g</dt><dd>added sugar</dd></div><div><dt>∞</dt><dd>spark</dd></div></dl>
          </div>

          <div className="scene-copy copy-three">
            <p><span>03</span> Find your frequency</p>
            <h2>Three moods.<br />One signal.</h2>
            <p className="body-copy">A flavour spectrum engineered for different hours, served on one shared wavelength.</p>
          </div>

          <div className="product-orbit" aria-hidden="true"><div className="can-glow" /><img className="hero-can" src="pulse-can.webp" alt="" /></div>
          <div className="side-can side-can-left" aria-hidden="true"><img src="pulse-can.webp" alt="" /></div>
          <div className="side-can side-can-right" aria-hidden="true"><img src="pulse-can.webp" alt="" /></div>
          <div className="stage-index" aria-hidden="true"><span>SCROLL</span><i /><b>03</b></div>
        </div>
      </section>

      <section className="manifesto" data-reveal>
        <p>Quiet ingredients / loud sensation</p>
        <h2>Not another sweet drink.<br /><em>A change in atmosphere.</em></h2>
        <div className="manifesto-meta"><span>Made with real extracts</span><span>Micro-carbonated</span><span>Best served at 3°C</span></div>
      </section>

      <section id="flavours" className="flavours">
        <header data-reveal><p>The full spectrum</p><h2>Choose your<br />frequency.</h2><span>03 botanical blends</span></header>
        <div className="flavour-grid">
          {flavours.map((flavour, index) => <article className={`flavour-card ${flavour.tone}`} key={flavour.name} data-reveal>
            <div className="card-art"><span>0{index + 1}</span><div className="card-ring" /><img src="pulse-can.webp" alt={`${flavour.name} slim beverage can`} /></div>
            <div className="card-info"><div><p>{flavour.note}</p><h3>{flavour.name}</h3></div><button type="button" onClick={() => add(index)}>Add — {flavour.price}</button></div>
          </article>)}
        </div>
      </section>

      <section id="ritual" className="ritual">
        <div className="ritual-image" data-reveal><img src="ingredients.webp" alt="Black cherries and ruby grapefruit in a carbonated botanical landscape" /></div>
        <div className="ritual-copy" data-reveal><p>Serving ritual / 03° C</p><h2>Cold glass.<br />Slow pour.<br />Stay present.</h2><ol><li><span>01</span>Chill until the can feels almost weightless.</li><li><span>02</span>Pour high over one clear block of ice.</li><li><span>03</span>Let the first bubbles settle. Then taste.</li></ol><button type="button" onClick={() => add(0)}>Build a tasting box — $24</button></div>
      </section>

      <section className="closing"><div className="ticker" aria-hidden="true"><span>PULSE / PULSE / PULSE / PULSE /</span><span>PULSE / PULSE / PULSE / PULSE /</span></div><div className="closing-inner" data-reveal><p>Botanical soda for electric hours.</p><a href="#top">Back to the signal ↑</a></div></section>
    </main>

    <footer><a className="brand" href="#top"><span>●</span>PULSE</a><p>Born after dark. Made for daylight.</p><nav><a href="#stockists">Stockists</a><a href="#shipping">Shipping</a><a href="#social">Instagram</a></nav></footer>

    <aside className={`drawer ${drawer ? 'open' : ''}`} aria-hidden={!drawer}>
      <button className="drawer-close" type="button" onClick={() => setDrawer(false)} aria-label="Close bag">×</button>
      <p>Bag / {String(bag).padStart(2, '0')}</p>
      <div className="drawer-item"><div><img src="pulse-can.webp" alt="Selected PULSE can" /></div><section><small>Selected flavour</small><h2>{flavours[selected].name}</h2><p>{flavours[selected].note}</p><strong>{flavours[selected].price}</strong></section></div>
      <div className="drawer-bottom"><p>{bag ? `${bag} can${bag === 1 ? '' : 's'} ready for dispatch.` : 'Your bag is waiting for a signal.'}</p><button type="button" disabled={!bag}>{bag ? 'Continue to checkout' : 'Bag is empty'}</button></div>
    </aside>
    {drawer && <button className="scrim" type="button" onClick={() => setDrawer(false)} aria-label="Close bag overlay" />}
  </div>
}
