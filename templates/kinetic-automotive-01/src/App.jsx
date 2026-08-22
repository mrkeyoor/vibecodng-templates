import { useEffect, useRef, useState } from 'react'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const trims = [
  { id: 'graphite', name: 'Liquid Graphite', code: 'A0 / 01', detail: 'Satin mineral finish', color: '#343b42' },
  { id: 'ceramic', name: 'Ceramic Silver', code: 'A0 / 02', detail: 'Cold metallic finish', color: '#b4b9b5' },
  { id: 'ion', name: 'Ion Copper', code: 'A0 / 03', detail: 'Burnished warm finish', color: '#9d6040' },
]

const specs = [
  ['02.8', 'seconds', '0—100 km/h'],
  ['724', 'kilometres', 'projected range'],
  ['468', 'kilowatts', 'dual-motor output'],
  ['18', 'minutes', '10—80% charge'],
]

export default function App() {
  const storyRef = useRef(null)
  const [chapter, setChapter] = useState(0)
  const [trim, setTrim] = useState('graphite')
  const [drawer, setDrawer] = useState(false)
  const [menu, setMenu] = useState(false)
  const [requestType, setRequestType] = useState('drive')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    let lastChapter = -1
    const update = () => {
      frame = 0
      const story = storyRef.current
      if (story) {
        const distance = Math.max(1, story.offsetHeight - innerHeight)
        const progress = clamp((scrollY - story.offsetTop) / distance)
        root.style.setProperty('--story', progress.toFixed(4))
        root.style.setProperty('--scene-one', (1 - clamp((progress - .19) / .13)).toFixed(4))
        root.style.setProperty('--scene-two', (clamp((progress - .16) / .13) * (1 - clamp((progress - .53) / .13))).toFixed(4))
        root.style.setProperty('--scene-three', clamp((progress - .5) / .15).toFixed(4))
        root.style.setProperty('--copy-one', (1 - clamp((progress - .14) / .08)).toFixed(4))
        root.style.setProperty('--copy-two', (clamp((progress - .27) / .08) * (1 - clamp((progress - .45) / .08))).toFixed(4))
        root.style.setProperty('--copy-three', (clamp((progress - .63) / .08) * (1 - clamp((progress - .82) / .08))).toFixed(4))
        root.style.setProperty('--shutter', `${(8 + progress * 35).toFixed(2)}%`)
        const next = progress < .25 ? 0 : progress < .62 ? 1 : 2
        if (next !== lastChapter) { lastChapter = next; setChapter(next) }
      }
      root.style.setProperty('--page-progress', (scrollY / Math.max(1, root.scrollHeight - innerHeight)).toFixed(4))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting)), { threshold: .16 })
    document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node))
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      observer.disconnect()
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawer || menu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawer, menu])

  const openDrawer = (type = 'drive') => {
    setRequestType(type)
    setSubmitted(false)
    setDrawer(true)
  }

  const selectedTrim = trims.find(item => item.id === trim)

  return <div className="site-shell">
    <div className="page-progress" aria-hidden="true" />
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label="Aeron home"><span>A</span>AERON</a>
      <nav aria-label="Primary navigation"><a href="#design">Design</a><a href="#atelier">Atelier</a><a href="#performance">Performance</a></nav>
      <div className="top-actions"><button type="button" onClick={() => setMenu(true)}>Index</button><button className="drive-button" type="button" onClick={() => openDrawer('drive')}>Book a drive <span>↗</span></button></div>
    </header>

    {menu && <div className="menu" role="dialog" aria-modal="true" aria-label="Site index">
      <button className="menu-close" type="button" onClick={() => setMenu(false)}>Close ×</button>
      <p>AERON / Origin 01</p>
      <div><a href="#design" onClick={() => setMenu(false)}>01 — Form</a><a href="#atelier" onClick={() => setMenu(false)}>02 — Atelier</a><a href="#performance" onClick={() => setMenu(false)}>03 — Velocity</a></div>
      <span>Independent concept / No inherited shape</span>
    </div>}

    <main id="top">
      <section className="hero">
        <img src="aeron-exterior.webp" alt="AERON electric grand tourer beneath monumental basalt architecture" fetchPriority="high" />
        <div className="hero-shade" aria-hidden="true" />
        <p className="hero-edition">ORIGIN / 01<br />Electric grand touring</p>
        <h1><span>FORM</span><i>without</i><span>HISTORY.</span></h1>
        <p className="hero-note">A new shape for the long way round.<br />Designed in silence. Built around motion.</p>
        <a className="scroll-cue" href="#design"><span>Enter the study</span><b>↓</b></a>
      </section>

      <section id="design" className="story" ref={storyRef} aria-label="AERON design story">
        <div className="story-stage">
          <div className="story-media" aria-hidden="true">
            <img className="scene scene-one" src="aeron-exterior.webp" alt="" />
            <img className="scene scene-two" src="aeron-interior.webp" alt="" />
            <img className="scene scene-three" src="aeron-motion.webp" alt="" />
          </div>
          <div className="story-wash" aria-hidden="true" />
          <div className="cut cut-a" aria-hidden="true" /><div className="cut cut-b" aria-hidden="true" />
          <div className="chapter copy-01">
            <p>01 / Proportion</p><h2>Drawn by<br /><i>the air.</i></h2><span>One gesture from nose to tail. Every surface exists to move the next kilometre with less resistance.</span>
          </div>
          <div className="chapter copy-02">
            <p>02 / The cabin</p><h2>Technology<br /><i>steps back.</i></h2><span>No glowing wall of glass. Only the information you need, the materials you touch, and the road ahead.</span>
          </div>
          <div className="chapter copy-03">
            <p>03 / Motion</p><h2>Fast is quiet<br /><i>from here.</i></h2><span>Instant response without theatre. Dual motors shape power hundreds of times per second.</span><button type="button" onClick={() => openDrawer('drive')}>Experience AERON ↗</button>
          </div>
          <div className="chapter-index" aria-label={`Chapter ${chapter + 1} of 3`}><span>0{chapter + 1}</span><i /><span>03</span></div>
          <div className="telemetry" aria-hidden="true"><span>AERON_OS</span><b>{chapter === 0 ? 'CD 0.19' : chapter === 1 ? 'HMI / CALM' : '468 KW'}</b></div>
          <div className="grain" aria-hidden="true" />
        </div>
      </section>

      <section className="thesis" data-reveal>
        <p>An electric grand tourer / not a shortcut</p>
        <h2>Distance is not<br />the problem.<br /><i>Indifference is.</i></h2>
        <div><span>Four-seat architecture</span><span>800-volt platform</span><span>Carbon-negative cabin</span></div>
      </section>

      <section id="atelier" className={`atelier trim-${trim}`}>
        <header data-reveal><p>02 / AERON Atelier</p><h2>Material is<br /><i>the colour.</i></h2><span>Choose an exterior study</span></header>
        <div className="atelier-view" data-reveal>
          <img src="aeron-exterior.webp" alt={`AERON shown in ${selectedTrim.name}`} />
          <div className="paint-layer" aria-hidden="true" />
          <div className="atelier-stamp"><span>{selectedTrim.code}</span><b>{selectedTrim.name}</b><small>{selectedTrim.detail}</small></div>
        </div>
        <div className="trim-list" role="group" aria-label="Exterior finish">
          {trims.map(item => <button key={item.id} type="button" className={trim === item.id ? 'active' : ''} aria-pressed={trim === item.id} onClick={() => setTrim(item.id)}><i style={{ background: item.color }} /><span>{item.code}</span><b>{item.name}</b><em>↗</em></button>)}
        </div>
        <button className="configure-link" type="button" onClick={() => openDrawer('configure')}>Continue this configuration <span>↗</span></button>
      </section>

      <section className="cabin">
        <div className="cabin-copy" data-reveal><p>03 / Interior logic</p><h2>A room for<br /><i>moving through.</i></h2><p>Woven wool absorbs noise. Tactile copper controls reward muscle memory. The display disappears when the road has more to say.</p><ul><li><span>01</span>Regenerative basalt composite</li><li><span>02</span>Traceable saddle leather</li><li><span>03</span>Seventeen-speaker spatial field</li></ul></div>
        <figure data-reveal><img src="aeron-interior.webp" alt="AERON cockpit with copper controls and floating leather seats" /><figcaption><span>CABIN / NIGHT MODE</span><span>NO DISTRACTION LAYER</span></figcaption></figure>
      </section>

      <section id="performance" className="performance">
        <header data-reveal><p>04 / Useful force</p><h2>Numbers that<br /><i>change distance.</i></h2></header>
        <div className="spec-grid">{specs.map(([value, unit, label], index) => <article data-reveal key={label}><span>0{index + 1}</span><strong>{value}</strong><small>{unit}</small><p>{label}</p></article>)}</div>
        <p className="legal">Concept targets shown. Final production figures, charging time, and range may vary by market and conditions.</p>
      </section>

      <section className="motion-finale">
        <img src="aeron-motion.webp" alt="AERON moving across a wet salt road before dawn" />
        <div className="motion-shade" aria-hidden="true" />
        <div data-reveal><p>The road is still here.</p><h2>Go further.<br /><i>Leave less.</i></h2><button type="button" onClick={() => openDrawer('drive')}>Request a private drive ↗</button></div>
        <span className="motion-coordinate">39° 17′ N / ORIGIN TEST ROUTE</span>
      </section>
    </main>

    <footer><a className="wordmark" href="#top"><span>A</span>AERON</a><p>Original electric grand touring.<br />A fictional independent concept.</p><nav><a href="#design">Form</a><a href="#atelier">Atelier</a><a href="#performance">Velocity</a></nav><small>© 2026 AERON</small></footer>

    {drawer && <aside className="drive-drawer open" aria-label="AERON private appointment">
      <button className="drawer-close" type="button" onClick={() => setDrawer(false)}>Close ×</button>
      <p>AERON / Private appointment</p>
      <h2>{submitted ? 'Your road begins here.' : requestType === 'drive' ? 'Take the long way.' : 'Complete your study.'}</h2>
      {submitted ? <div className="success"><span>Request received / 01</span><p>An AERON specialist will contact you to arrange the next step.</p><button type="button" onClick={() => setDrawer(false)}>Return to the studio</button></div> : <form onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
        <div className="request-switch" role="group" aria-label="Appointment type"><button type="button" className={requestType === 'drive' ? 'active' : ''} onClick={() => setRequestType('drive')}>Private drive</button><button type="button" className={requestType === 'configure' ? 'active' : ''} onClick={() => setRequestType('configure')}>Configuration</button></div>
        <label>Preferred studio<select required defaultValue=""><option value="" disabled>Select a studio</option><option>London / Mayfair</option><option>Los Angeles / Arts District</option><option>Dubai / Design District</option><option>Singapore / Marina</option></select></label>
        <div className="field-pair"><label>Preferred date<input type="date" required /></label><label>Current finish<select value={trim} onChange={event => setTrim(event.target.value)}>{trims.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label></div>
        <label>Name<input type="text" placeholder="Your name" autoComplete="name" required /></label>
        <label>Email<input type="email" placeholder="you@example.com" autoComplete="email" required /></label>
        <label className="consent"><input type="checkbox" required /><span>I agree to be contacted about this private appointment.</span></label>
        <button className="submit" type="submit">Send request ↗</button>
      </form>}
    </aside>}
    {drawer && <button className="scrim" type="button" onClick={() => setDrawer(false)} aria-label="Close appointment drawer" />}
  </div>
}
