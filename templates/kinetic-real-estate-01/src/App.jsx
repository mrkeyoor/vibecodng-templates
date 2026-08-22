import { useEffect, useRef, useState } from 'react'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from, to, progress) => from + (to - from) * progress

const facts = [
  ['7,840', 'Interior sq ft'],
  ['4', 'Private suites'],
  ['2.8', 'Acres of canyon'],
  ['2026', 'Completion'],
]

const rooms = [
  { n: '01', name: 'The living gallery', size: '1,280 sq ft', image: 'orra-interior.webp' },
  { n: '02', name: 'The arrival court', size: 'Open to sky', image: 'orra-court.webp' },
  { n: '03', name: 'The horizon terrace', size: '86 ft waterline', image: 'orra-exterior.webp' },
]

export default function App() {
  const storyRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [interest, setInterest] = useState('Private viewing')

  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    const update = () => {
      frame = 0
      const story = storyRef.current
      if (!story) return
      const distance = Math.max(1, story.offsetHeight - innerHeight)
      const progress = clamp((scrollY - story.offsetTop) / distance)
      const phaseOne = clamp(progress / .32)
      const phaseTwo = clamp((progress - .32) / .34)
      const phaseThree = clamp((progress - .66) / .34)

      root.style.setProperty('--story', progress.toFixed(4))
      root.style.setProperty('--door-left', `${mix(0, -51, phaseOne).toFixed(2)}%`)
      root.style.setProperty('--door-right', `${mix(0, 51, phaseOne).toFixed(2)}%`)
      root.style.setProperty('--hero-scale', mix(1.12, 1, phaseOne).toFixed(4))
      root.style.setProperty('--plan-turn', `${mix(-9, 0, phaseTwo).toFixed(2)}deg`)
      root.style.setProperty('--plan-scale', mix(.68, 1.06, phaseTwo).toFixed(4))
      root.style.setProperty('--interior-in', clamp((progress - .37) / .13).toFixed(4))
      root.style.setProperty('--court-in', clamp((progress - .67) / .14).toFixed(4))
      root.style.setProperty('--copy-a', (1 - clamp((progress - .14) / .1)).toFixed(4))
      root.style.setProperty('--copy-b', (clamp((progress - .24) / .08) * (1 - clamp((progress - .48) / .1))).toFixed(4))
      root.style.setProperty('--copy-c', (clamp((progress - .54) / .09) * (1 - clamp((progress - .76) / .09))).toFixed(4))
      root.style.setProperty('--copy-d', clamp((progress - .82) / .1).toFixed(4))
      root.style.setProperty('--page', (scrollY / Math.max(1, root.scrollHeight - innerHeight)).toFixed(4))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    }), { threshold: .14 })
    document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node))
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const locked = menuOpen || enquiryOpen
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, enquiryOpen])

  const openEnquiry = (type = 'Private viewing') => {
    setInterest(type)
    setSubmitted(false)
    setEnquiryOpen(true)
  }

  return <div className="site-shell">
    <div className="page-meter" aria-hidden="true" />
    <header className="topbar">
      <a href="#top" className="wordmark" aria-label="ORRA House home"><i />ORRA</a>
      <p>Red Mesa / Utah<br />Private residence 01</p>
      <nav aria-label="Primary navigation"><a href="#residence">Residence</a><a href="#details">Details</a><a href="#location">Location</a></nav>
      <button className="menu-button" type="button" onClick={() => setMenuOpen(true)}>Index <span>＋</span></button>
    </header>

    {menuOpen && <div className="index-panel" role="dialog" aria-modal="true" aria-label="Site index">
      <div><a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}><i />ORRA</a><button type="button" onClick={() => setMenuOpen(false)}>Close ×</button></div>
      <nav><a href="#residence" onClick={() => setMenuOpen(false)}><small>01</small>The residence</a><a href="#details" onClick={() => setMenuOpen(false)}><small>02</small>Material &amp; plan</a><a href="#location" onClick={() => setMenuOpen(false)}><small>03</small>The canyon</a></nav>
      <p>Offered discreetly<br />by appointment only</p>
    </div>}

    <main id="top">
      <section className="property-story" ref={storyRef} aria-label="ORRA residence introduction">
        <div className="story-stage">
          <div className="story-image exterior-scene"><img src="orra-exterior.webp" alt="ORRA residence set into a red sandstone canyon" fetchPriority="high" /></div>
          <div className="story-image interior-scene"><img src="orra-interior.webp" alt="" /></div>
          <div className="story-image court-scene"><img src="orra-court.webp" alt="" /></div>
          <div className="image-shade" aria-hidden="true" />

          <div className="bronze-door left" aria-hidden="true"><span>PRIVATE OFFERING</span><b>37° 14′ 02″ N</b></div>
          <div className="bronze-door right" aria-hidden="true"><span>ORRA / HOUSE 01</span><b>110° 52′ 19″ W</b></div>

          <div className="story-copy copy-a"><p>Residence No. 01 / Red Mesa</p><h1>A HOUSE<br />DRAWN <em>FROM</em><br />THE CANYON.</h1><span>Scroll to cross the threshold</span></div>
          <div className="story-copy copy-b"><p>01 / The proposition</p><h2>Not placed<br />on the land.<br /><em>Released from it.</em></h2><span>Architecture by fictional Atelier Northline</span></div>
          <div className="story-copy copy-c"><p>02 / Living gallery</p><h2>Every room<br />holds the<br /><em>horizon.</em></h2><button type="button" onClick={() => openEnquiry('Private viewing')}>Arrange a private viewing ↗</button></div>
          <div className="story-copy copy-d"><p>03 / Offered at</p><h2>$18.4M</h2><span>Fully furnished / Turnkey</span><button type="button" onClick={() => openEnquiry('Request the dossier')}>Request the private dossier ↗</button></div>

          <div className="plan-ghost" aria-hidden="true"><svg viewBox="0 0 600 350"><path d="M30 40h282v54h188v190H320v40H84V218H30z"/><path d="M84 40v178h236V94M210 40v178M320 94v190M500 148H320M140 218v106"/><circle cx="416" cy="215" r="34"/></svg><span>GROUND PLANE / NTS</span></div>
          <div className="story-index" aria-hidden="true"><span>01</span><i /><span>04</span></div>
        </div>
      </section>

      <section className="intro" id="residence">
        <div className="intro-title" data-reveal><p>01 / The residence</p><h2>Seclusion has<br />a new <em>address.</em></h2></div>
        <div className="intro-copy" data-reveal><p>ORRA is a singular private home shaped by its escarpment: part shelter, part observatory. Eighty-six feet of glass dissolves into canyon air, while the rock remains present in every room.</p><button type="button" onClick={() => openEnquiry('Request the dossier')}>Download private dossier <span>↓</span></button></div>
        <div className="facts" data-reveal>{facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      </section>

      <section className="spaces" id="details">
        <header data-reveal><p>02 / Architecture in sequence</p><h2>Three gestures.<br /><em>One continuous line.</em></h2></header>
        <div className="space-list">{rooms.map((room, index) => <article className="space-card" data-reveal key={room.name}>
          <div className="space-image"><img src={room.image} alt={`${room.name} at ORRA House`} loading={index ? 'lazy' : 'eager'} /><button type="button" onClick={() => openEnquiry(`Viewing: ${room.name}`)}>Explore space ↗</button></div>
          <div><span>{room.n}</span><h3>{room.name}</h3><p>{room.size}</p></div>
        </article>)}</div>
      </section>

      <section className="material-study">
        <div className="material-copy" data-reveal><p>03 / Material study</p><h2>Made to<br /><em>weather well.</em></h2><p>Stone quarried within 40 miles. Bronze designed to deepen with time. Rooms cooled by the earth before they meet the sun.</p></div>
        <div className="material-grid" data-reveal>
          <div><span>01</span><b>Honoured stone</b><p>Book-matched travertine / sand honed</p></div><div><span>02</span><b>Living bronze</b><p>Hand patinated / unsealed finish</p></div><div><span>03</span><b>Passive shadow</b><p>Deep reveals / thermal mass</p></div><div><span>04</span><b>Private water</b><p>86 ft / solar tempered</p></div>
        </div>
      </section>

      <section className="plan-section" aria-label="Property plan">
        <div className="plan-heading" data-reveal><p>04 / Ground plane</p><h2>A life arranged<br />around <em>light.</em></h2></div>
        <div className="floorplan" data-reveal>
          <svg viewBox="0 0 1000 510" role="img" aria-label="Conceptual floor plan of ORRA House"><path className="outline" d="M45 64h480v75h324v294H542v38H180V356H45z"/><path d="M180 64v292h362V139M355 64v292M542 139v294M849 228H542M270 356v115M695 139v294"/><circle cx="698" cy="322" r="65"/><text x="73" y="112">ARRIVAL</text><text x="210" y="215">LIVING GALLERY</text><text x="582" y="202">PRIMARY SUITE</text><text x="579" y="397">COURTYARD</text><text x="212" y="430">WATERLINE</text></svg>
          <div className="north">N <i /></div>
        </div>
      </section>

      <section className="location" id="location">
        <img src="orra-exterior.webp" alt="ORRA residence and the surrounding Red Mesa canyon" loading="lazy" />
        <div className="location-content" data-reveal><p>05 / The canyon</p><h2>Far enough<br />to hear <em>nothing.</em></h2><div><span><b>18 min</b>Private airfield</span><span><b>2 h 10</b>Salt Lake City</span><span><b>∞</b>Uninterrupted sky</span></div><button type="button" onClick={() => openEnquiry('Location briefing')}>Request location briefing ↗</button></div>
      </section>

      <section className="closing"><p>A private offering / Representation by appointment</p><h2>Own the<br /><em>edge of silence.</em></h2><button type="button" onClick={() => openEnquiry('Private viewing')}>Arrange a viewing <span>↗</span></button></section>
    </main>

    <footer><a href="#top" className="wordmark"><i />ORRA</a><p>Red Mesa, Utah<br />A fictional private residence.</p><nav><a href="#residence">Residence</a><a href="#details">Details</a><a href="#location">Location</a></nav><small>© 2026 ORRA House</small></footer>

    <aside className={`enquiry ${enquiryOpen ? 'open' : ''}`} aria-hidden={!enquiryOpen} inert={!enquiryOpen ? true : undefined} aria-label="Private viewing enquiry">
      <button className="enquiry-close" type="button" onClick={() => setEnquiryOpen(false)}>Close ×</button>
      <p>Private representation / ORRA</p>
      <h2>{submitted ? 'Your introduction is on its way.' : 'Begin a private conversation.'}</h2>
      {submitted ? <div className="success"><span>Enquiry received / 01</span><p>Our private office will respond within one business day with next steps and viewing availability.</p><button type="button" onClick={() => setEnquiryOpen(false)}>Return to the residence</button></div> : <form onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
        <label>I'm interested in<select value={interest} onChange={event => setInterest(event.target.value)}><option>Private viewing</option><option>Request the dossier</option><option>Location briefing</option><option>Representation enquiry</option></select></label>
        <div className="form-row"><label>First name<input required autoComplete="given-name" /></label><label>Last name<input required autoComplete="family-name" /></label></div>
        <label>Email address<input type="email" required autoComplete="email" placeholder="name@example.com" /></label>
        <label>Preferred contact<select><option>Email</option><option>Telephone</option><option>Video introduction</option></select></label>
        <label>Private note<textarea rows="3" placeholder="Tell us how we can assist." /></label>
        <button className="enquiry-submit" type="submit">Send private enquiry ↗</button>
      </form>}
    </aside>
    {enquiryOpen && <button className="scrim" type="button" aria-label="Close enquiry" onClick={() => setEnquiryOpen(false)} />}
  </div>
}
