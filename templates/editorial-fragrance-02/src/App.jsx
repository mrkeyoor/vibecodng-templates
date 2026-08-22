import { useEffect, useMemo, useRef, useState } from 'react'
import { site } from './site.js'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from, to, progress) => from + (to - from) * progress

export default function App() {
  const storyRef = useRef(null)
  const [menu, setMenu] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [selected, setSelected] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const choice = useMemo(() => site.choices[selected], [selected])
  const focusAsset = { architecture:'panel-3.webp', agency:'panel-1.webp', interior:'panel-2.webp', expedition:'panel-3.webp', fragrance:'panel-1.webp', tech:'panel-1.webp', resort:'panel-2.webp' }[site.theme]

  useEffect(() => {
    document.documentElement.dataset.theme = site.theme
    const root = document.documentElement
    let frame = 0
    const update = () => {
      frame = 0
      const max = Math.max(1, root.scrollHeight - innerHeight)
      root.style.setProperty('--page', (scrollY / max).toFixed(4))
      if (storyRef.current) {
        const box = storyRef.current
        const progress = clamp((scrollY - box.offsetTop) / Math.max(1, box.offsetHeight - innerHeight))
        const first = clamp(progress / .32)
        const second = clamp((progress - .32) / .34)
        const third = clamp((progress - .66) / .34)
        let x = mix(0, -28, first), y = mix(0, 4, first), rotate = mix(0, -11, first), scale = mix(1, .76, first)
        if (progress > .32) { x = mix(-28, 27, second); y = mix(4, -6, second); rotate = mix(-11, 13, second); scale = mix(.76, .88, second) }
        if (progress > .66) { x = mix(27, 0, third); y = mix(-6, 7, third); rotate = mix(13, 0, third); scale = mix(.88, .7, third) }
        root.style.setProperty('--story', progress.toFixed(4))
        root.style.setProperty('--scene-one', (1 - clamp((progress - .2) / .18)).toFixed(4))
        root.style.setProperty('--scene-two', (clamp((progress - .17) / .18) * (1 - clamp((progress - .55) / .18))).toFixed(4))
        root.style.setProperty('--scene-three', clamp((progress - .57) / .2).toFixed(4))
        root.style.setProperty('--copy-one', (1 - clamp((progress - .16) / .1)).toFixed(4))
        root.style.setProperty('--copy-two', (clamp((progress - .25) / .08) * (1 - clamp((progress - .56) / .1))).toFixed(4))
        root.style.setProperty('--copy-three', clamp((progress - .68) / .08).toFixed(4))
        root.style.setProperty('--focus-x', `${x.toFixed(2)}vw`)
        root.style.setProperty('--focus-y', `${y.toFixed(2)}vh`)
        root.style.setProperty('--focus-r', `${rotate.toFixed(2)}deg`)
        root.style.setProperty('--focus-s', scale.toFixed(4))
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: .12 })
    document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node))
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { observer.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menu || drawer ? 'hidden' : ''
    const onKey = event => { if (event.key === 'Escape') { setMenu(false); setDrawer(false) } }
    addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', onKey) }
  }, [menu, drawer])

  const openEnquiry = () => { setSubmitted(false); setDrawer(true) }

  return <div className="page-shell">
    <div className="progress" aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#top" aria-label={`${site.brand} home`}>{site.brand}</a>
      <nav aria-label="Primary navigation"><a href="#story">Story</a><a href="#collection">Collection</a><a href="#facts">Details</a></nav>
      <div className="top-actions"><button type="button" onClick={() => setMenu(true)}>Index</button><button className="primary" type="button" onClick={openEnquiry}>{site.cta}</button></div>
    </header>

    {menu && <div className="menu" role="dialog" aria-modal="true" aria-label="Site index">
      <button type="button" className="close" onClick={() => setMenu(false)}>Close ×</button>
      <p>{site.brand} / INDEX</p>
      <nav>{['story','collection','facts'].map((id, index) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>0{index + 1} — {site.menu[index]}</a>)}</nav>
      <small>{site.location}</small>
    </div>}

    <main id="top">
      <section id="story" className="story journey" ref={storyRef} aria-label={`${site.brand} visual story`}>
        <div className="story-stage stage">
          <div className="scene scene-one" aria-hidden="true"><img src="panel-1.webp" alt="" fetchPriority="high" /></div>
          <div className="scene scene-two" aria-hidden="true"><img src="panel-2.webp" alt="" /></div>
          <div className="scene scene-three" aria-hidden="true"><img src="panel-3.webp" alt="" /></div>
          <div className="story-shade" aria-hidden="true" />
          <div className="stage-fx" aria-hidden="true"><i className="fx-orb orb-a" /><i className="fx-orb orb-b" /><i className="fx-line" /><i className="fx-grid" /></div>
          <div className="focus-object"><div className="focus-glow" aria-hidden="true" /><img src={focusAsset} alt={site.alt} /></div>
          <div className="satellite satellite-left" aria-hidden="true"><img src="panel-1.webp" alt="" /></div>
          <div className="satellite satellite-right" aria-hidden="true"><img src="panel-3.webp" alt="" /></div>
          <article className="chapter hero-chapter chapter-1">
            <p><span>01</span>{site.eyebrow}</p><h1>{site.hero[0]}<i>{site.hero[1]}</i><b>{site.hero[2]}</b></h1>
            <div className="scene-intro"><span>{site.intro}</span><button type="button" onClick={openEnquiry}>{site.cta} ↗</button></div>
          </article>
          {[site.chapters[1], site.chapters[2]].map((chapter, index) => <article key={chapter.title} className={`chapter chapter-${index + 2}`}>
            <p><span>0{index + 2}</span>{chapter.kicker}</p><h2>{chapter.title}<i>{chapter.italic}</i></h2><em>{chapter.copy}</em>
          </article>)}
          <div className="stage-code" aria-hidden="true">{site.code}</div>
          <div className="story-track" aria-hidden="true"><span /><b>01</b><b>02</b><b>03</b></div>
        </div>
      </section>

      <section className="manifesto" data-reveal>
        <p>{site.manifestoKicker}</p><h2>{site.manifesto[0]}<br /><i>{site.manifesto[1]}</i></h2><span>{site.manifestoCopy}</span>
      </section>

      <section id="collection" className="collection">
        <header data-reveal><p>02 / {site.collectionKicker}</p><h2>{site.collectionTitle[0]}<i>{site.collectionTitle[1]}</i></h2></header>
        <div className="collection-grid">
          <figure data-reveal><div className="crop-window"><img src={`panel-${selected + 1}.webp`} alt={choice.alt} /></div><figcaption><span>{choice.code}</span><b>{choice.name}</b><small>{choice.detail}</small></figcaption></figure>
          <div className="choice-list" role="group" aria-label={site.selectorLabel}>
            {site.choices.map((item, index) => <button key={item.name} type="button" className={selected === index ? 'active' : ''} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span><b>{item.name}</b><small>{item.short}</small><em>↗</em></button>)}
          </div>
        </div>
      </section>

      <section id="facts" className="facts">
        <header data-reveal><p>03 / {site.factsKicker}</p><h2>{site.factsTitle[0]}<i>{site.factsTitle[1]}</i></h2></header>
        <div className="fact-grid">{site.facts.map((fact, index) => <article key={fact.label} data-reveal><span>0{index + 1}</span><strong>{fact.value}</strong><small>{fact.unit}</small><p>{fact.label}</p></article>)}</div>
      </section>

      <section className="finale">
        <img src="panel-2.webp" alt={site.finaleAlt} />
        <div className="finale-wash" aria-hidden="true" />
        <div data-reveal><p>{site.finaleKicker}</p><h2>{site.finale[0]}<i>{site.finale[1]}</i></h2><button type="button" onClick={openEnquiry}>{site.cta} ↗</button></div>
      </section>
      <section className="signal" aria-label={`${site.brand} closing`}><div aria-hidden="true"><span>{site.brand} / {site.brand} / {site.brand} /</span><span>{site.brand} / {site.brand} / {site.brand} /</span></div><p data-reveal>{site.footer}</p><a href="#top">Back to the beginning ↑</a></section>
    </main>

    <footer><a className="brand" href="#top">{site.brand}</a><p>{site.footer}</p><nav><a href="#story">Story</a><a href="#collection">Collection</a><a href="#facts">Details</a></nav><small>© 2026 {site.brand}</small></footer>

    {drawer && <><button className="scrim" type="button" aria-label="Close enquiry" onClick={() => setDrawer(false)} /><aside className="drawer" role="dialog" aria-modal="true" aria-label={`${site.brand} enquiry`}>
      <button className="close" type="button" onClick={() => setDrawer(false)}>Close ×</button>
      <p>{site.brand} / PRIVATE ENQUIRY</p><h2>{submitted ? site.successTitle : site.drawerTitle}</h2>
      {submitted ? <div className="success"><span>Request received / 01</span><p>{site.successCopy}</p><button type="button" onClick={() => setDrawer(false)}>Return to {site.brand}</button></div> : <form onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
        <label>{site.selectorLabel}<select value={selected} onChange={event => setSelected(Number(event.target.value))}>{site.choices.map((item, index) => <option key={item.name} value={index}>{item.name}</option>)}</select></label>
        <div className="field-pair"><label>Preferred date<input type="date" required /></label><label>Party / team<select required defaultValue="1"><option value="1">01</option><option value="2">02</option><option value="4">04</option><option value="8">08+</option></select></label></div>
        <label>Name<input type="text" autoComplete="name" placeholder="Your name" required /></label>
        <label>Email<input type="email" autoComplete="email" placeholder="you@example.com" required /></label>
        <label>Tell us more<textarea rows="3" placeholder={site.formPrompt} /></label>
        <label className="consent"><input type="checkbox" required /><span>I agree to be contacted about this enquiry.</span></label>
        <button className="submit" type="submit">Send request ↗</button>
      </form>}
    </aside></>}
  </div>
}
