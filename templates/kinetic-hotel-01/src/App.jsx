import { useEffect, useRef, useState } from 'react'

const rooms = [
  { name: 'Cliff Suite', note: 'Sea-facing / private terrace', price: '$680', image: 'suite.webp', className: 'wide' },
  { name: 'Stone House', note: 'Two bedrooms / plunge pool', price: '$940', image: 'exterior.webp', className: 'tall' },
  { name: 'Tide Room', note: 'Sunken lounge / horizon bath', price: '$520', image: 'pool.webp', className: '' },
]

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from, to, progress) => from + (to - from) * progress

export default function App() {
  const journeyRef = useRef(null)
  const [menu, setMenu] = useState(false)
  const [booking, setBooking] = useState(false)
  const [room, setRoom] = useState(0)
  const [guests, setGuests] = useState(2)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let frame = 0
    const root = document.documentElement
    const update = () => {
      frame = 0
      const journey = journeyRef.current
      if (!journey) return
      const distance = Math.max(1, journey.offsetHeight - innerHeight)
      const progress = clamp((scrollY - journey.offsetTop) / distance)
      const first = clamp(progress / .34)
      const second = clamp((progress - .34) / .34)
      const last = clamp((progress - .68) / .32)
      let x = mix(0, -22, first)
      let width = mix(42, 48, first)
      let height = mix(68, 75, first)
      if (progress > .34) x = mix(-22, 23, second)
      if (progress > .68) {
        x = mix(23, 0, last)
        width = mix(48, 100, last)
        height = mix(75, 100, last)
      }
      root.style.setProperty('--journey', progress.toFixed(4))
      root.style.setProperty('--exterior', (1 - clamp((progress - .2) / .15)).toFixed(4))
      root.style.setProperty('--suite', (clamp((progress - .18) / .14) * (1 - clamp((progress - .54) / .14))).toFixed(4))
      root.style.setProperty('--pool', clamp((progress - .52) / .16).toFixed(4))
      root.style.setProperty('--copy-one', (1 - clamp((progress - .14) / .09)).toFixed(4))
      root.style.setProperty('--copy-two', (clamp((progress - .25) / .08) * (1 - clamp((progress - .48) / .08))).toFixed(4))
      root.style.setProperty('--copy-three', (clamp((progress - .55) / .08) * (1 - clamp((progress - .75) / .08))).toFixed(4))
      root.style.setProperty('--copy-four', clamp((progress - .82) / .08).toFixed(4))
      root.style.setProperty('--portal-x', `${x.toFixed(2)}vw`)
      root.style.setProperty('--portal-w', `${width.toFixed(2)}vw`)
      root.style.setProperty('--portal-h', `${height.toFixed(2)}vh`)
      root.style.setProperty('--portal-r', `${mix(1.7, 0, last).toFixed(2)}rem`)
      root.style.setProperty('--page-progress', (scrollY / Math.max(1, root.scrollHeight - innerHeight)).toFixed(4))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: .16 })
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
    document.body.style.overflow = menu || booking ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menu, booking])

  const reserve = (index = room) => {
    setRoom(index)
    setSubmitted(false)
    setBooking(true)
  }

  return <div className="experience">
    <div className="page-progress" aria-hidden="true" />
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="Eira home"><span>E</span>EIRA</a>
      <nav aria-label="Primary"><a href="#rooms">Rooms</a><a href="#table">Table</a><a href="#coast">The coast</a></nav>
      <div className="nav-actions"><button type="button" onClick={() => setMenu(true)}>Menu</button><button className="reserve-pill" type="button" onClick={() => reserve()}>Reserve ↗</button></div>
    </header>

    {menu && <div className="menu-panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button type="button" onClick={() => setMenu(false)} aria-label="Close menu">Close ×</button>
      <p>At EIRA</p>
      <a href="#rooms" onClick={() => setMenu(false)}>Private rooms</a>
      <a href="#table" onClick={() => setMenu(false)}>The long table</a>
      <a href="#coast" onClick={() => setMenu(false)}>Edge of the island</a>
      <span>36° 23′ N / a fictional coast</span>
    </div>}

    <main id="top">
      <section className="journey" ref={journeyRef} aria-label="EIRA hotel story">
        <div className="stage">
          <div className="backdrop" aria-hidden="true"><img src="exterior.webp" alt="" fetchPriority="high" /></div>
          <div className="veil" aria-hidden="true" />
          <div className="scene-copy copy-one"><p>House above the tide / 01</p><h1>STAY<br /><i>WHERE</i><br />LAND LETS GO.</h1><span>Scroll to enter</span></div>
          <div className="scene-copy copy-two"><p>Your room / 02</p><h2>Silence,<br />with a view.</h2><p>Cut from local stone. Open to the salt air. A private horizon from first light to last.</p><button type="button" onClick={() => reserve(0)}>Cliff Suite — $680 ↗</button></div>
          <div className="scene-copy copy-three"><p>After sunset / 03</p><h2>The day ends<br /><i>slowly here.</i></h2><p>Twelve seats, one long table, and a menu written by the sea each morning.</p><a href="#table">Discover the table ↓</a></div>
          <div className="scene-copy copy-four"><p>EIRA / the retreat</p><h2>Arrive<br /><i>elsewhere.</i></h2><button type="button" onClick={() => reserve()}>Check availability</button></div>

          <div className="portal" aria-hidden="true">
            <img className="portal-image exterior" src="exterior.webp" alt="" fetchPriority="high" />
            <img className="portal-image suite" src="suite.webp" alt="" />
            <img className="portal-image pool" src="pool.webp" alt="" />
            <div className="portal-grain" />
            <div className="portal-label"><span>36° 23′ N</span><span>THE AEGEAN / 2026</span></div>
          </div>
          <div className="stage-counter" aria-hidden="true"><span>SCROLL</span><i /><b>01—04</b></div>
        </div>
      </section>

      <section className="manifesto" data-reveal>
        <p>A slower measure of time</p>
        <h2>Thirty-two rooms.<br />One wild edge.<br /><em>Nothing in between.</em></h2>
        <div><span>Local limestone</span><span>Season-led kitchen</span><span>Open April—October</span></div>
      </section>

      <section id="rooms" className="rooms">
        <header data-reveal><p>Sleep close to the sea</p><h2>Three ways<br />to disappear.</h2><span>01 / The rooms</span></header>
        <div className="room-grid">
          {rooms.map((item, index) => <article className={`room-card ${item.className}`} data-reveal key={item.name}>
            <button className="room-image" type="button" onClick={() => reserve(index)} aria-label={`Reserve ${item.name}`}><img src={item.image} alt={`${item.name} at EIRA`} /><span>View room ↗</span></button>
            <div><p>0{index + 1} / {item.note}</p><h3>{item.name}</h3><button type="button" onClick={() => reserve(index)}>From {item.price} / night</button></div>
          </article>)}
        </div>
      </section>

      <section id="table" className="table-story">
        <div className="table-image" data-reveal><img src="pool.webp" alt="Private sea-facing table beside the EIRA infinity pool" /></div>
        <div className="table-copy" data-reveal><p>02 / The long table</p><h2>What grew<br />here today?</h2><p>No menu survives the week. Our kitchen follows the boats, the hillside garden and the people who know this coast by heart.</p><dl><div><dt>08:00</dt><dd>Breakfast under the olive trees</dd></div><div><dt>13:30</dt><dd>Cold lunch at the water</dd></div><div><dt>20:10</dt><dd>Twelve seats at sunset</dd></div></dl><a href="#reserve" onClick={(event) => { event.preventDefault(); reserve() }}>Request a table ↗</a></div>
      </section>

      <section id="coast" className="coast">
        <div className="coast-copy" data-reveal><p>03 / Beyond the house</p><h2>No itinerary.<br /><i>Only instinct.</i></h2></div>
        <div className="coast-list">
          {['Swim the blue cave before breakfast', 'Sail west until the island disappears', 'Walk the old stone path at dusk', 'Stay still and hear the tide turn'].map((item, index) => <div data-reveal key={item}><span>0{index + 1}</span><p>{item}</p><b>↗</b></div>)}
        </div>
      </section>

      <section className="finale"><img src="exterior.webp" alt="EIRA cliffside retreat illuminated at blue hour" /><div data-reveal><p>Your place above the tide</p><h2>Make room<br /><i>for nowhere.</i></h2><button type="button" onClick={() => reserve()}>Find your stay ↗</button></div></section>
    </main>

    <footer><a className="brand" href="#top"><span>E</span>EIRA</a><p>House above the tide.<br />A fictional independent retreat.</p><nav><a href="#rooms">Rooms</a><a href="#table">Table</a><a href="#coast">Coast</a></nav><small>© 2026 EIRA</small></footer>

    <aside id="reserve" className={`booking ${booking ? 'open' : ''}`} aria-hidden={!booking} aria-label="Reservation enquiry">
      <button className="booking-close" type="button" onClick={() => setBooking(false)} aria-label="Close reservation">Close ×</button>
      <p>Plan your stay / EIRA</p><h2>{submitted ? 'The horizon is waiting.' : 'A room above the tide.'}</h2>
      {submitted ? <div className="confirmation"><span>Request received</span><p>We will hold your preferred dates for 24 hours and meet you in your inbox.</p><button type="button" onClick={() => setBooking(false)}>Return to EIRA</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
        <label>Room<select value={room} onChange={event => setRoom(Number(event.target.value))}>{rooms.map((item, index) => <option value={index} key={item.name}>{item.name} — {item.price}</option>)}</select></label>
        <div className="date-grid"><label>Arrival<input type="date" required /></label><label>Departure<input type="date" required /></label></div>
        <fieldset><legend>Guests</legend><button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Remove guest">−</button><output>{String(guests).padStart(2, '0')}</output><button type="button" onClick={() => setGuests(Math.min(6, guests + 1))} aria-label="Add guest">+</button></fieldset>
        <label>Email<input type="email" placeholder="you@example.com" required /></label>
        <button className="submit-booking" type="submit">Request availability ↗</button>
      </form>}
    </aside>
    {booking && <button className="scrim" type="button" onClick={() => setBooking(false)} aria-label="Close reservation overlay" />}
  </div>
}
