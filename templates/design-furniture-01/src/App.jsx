import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import RoomScene from './RoomScene'

const MATERIALS = [
  {
    id: 'ash',
    name: 'Charred ash',
    code: 'A7',
    batch: 'Ash batch A-07',
    lead: 12,
    surcharge: 0,
    note: 'Open-pore European ash, carbonised and waxed by hand.',
  },
  {
    id: 'clay',
    name: 'Clay lacquer',
    code: 'C3',
    batch: 'Lacquer batch C-03',
    lead: 14,
    surcharge: 600,
    note: 'Seven hand-rubbed oxide coats over an ash substrate.',
  },
  {
    id: 'aluminium',
    name: 'Brushed aluminium',
    code: 'M4',
    batch: 'Metal batch M-04',
    lead: 16,
    surcharge: 1200,
    note: 'Directional satin brushing with a clear mineral seal.',
  },
]

const SPANS = [160, 200, 240]
const WALLS = [260, 320, 380]
const SPAN_PRICE = { 160: 0, 200: 800, 240: 1600 }

const OBJECTS = [
  {
    code: 'O-01',
    name: 'Sill 01',
    kind: 'Low lounge chair',
    dimensions: '86 × 74 × 70 cm',
    edition: '32 numbered pieces',
    material: 'Saddle leather / darkened steel',
    price: '€4,800',
    note: 'A suspended leather plane held at four deliberate points.',
    image: 'sill-01-room.webp',
  },
  {
    code: 'O-02',
    name: 'Ledge 02',
    kind: 'Console / room edge',
    dimensions: '160–240 × 42 × 78 cm',
    edition: '24 per finish',
    material: 'Ash / lacquer / aluminium',
    price: 'From €6,800',
    note: 'One long surface, one weighted return, one precise interruption.',
    shape: 'ledge',
  },
  {
    code: 'O-03',
    name: 'Arc Bench 03',
    kind: 'Entry bench',
    dimensions: '140 × 48 × 46 cm',
    edition: '18 numbered pieces',
    material: 'Bent ash / woven flax',
    price: '€5,600',
    note: 'A shallow bow that leaves the wall and circulation line visible.',
    shape: 'bench',
  },
  {
    code: 'O-04',
    name: 'Fold Light 04',
    kind: 'Floor object / light',
    dimensions: '34 × 28 × 142 cm',
    edition: '40 numbered pieces',
    material: 'Folded aluminium / linen',
    price: '€2,900',
    note: 'A narrow reflected wash rather than a visible lamp shade.',
    shape: 'light',
  },
]

const STEPS = [
  ['01', 'Cut', 'Ash boards are selected by grain direction, then cut oversized to rest.'],
  ['02', 'Register', 'Metal and timber meet against one reference edge; every tolerance returns to it.'],
  ['03', 'Finish', 'Oil, lacquer, or brushing is built in thin passes and signed by the finisher.'],
  ['04', 'Number', 'The completed object receives its edition stamp, placement code, and archive sheet.'],
]

const formatEuro = (value) => `€${value.toLocaleString('en-IE')}`

function RegistrationMark({ className = '' }) {
  return <span className={`registration-mark ${className}`} aria-hidden="true"><i /><b /></span>
}

function ObjectSilhouette({ material, compact = false }) {
  return <div className={`object-silhouette material-${material.id}${compact ? ' compact' : ''}`} aria-hidden="true">
    <span className="object-top" />
    <span className="object-return" />
    <span className="object-leg" />
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [materialId, setMaterialId] = useState('ash')
  const [span, setSpan] = useState(200)
  const [wall, setWall] = useState(320)
  const [mobileStep, setMobileStep] = useState(1)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [reservationDone, setReservationDone] = useState(false)
  const [formErrors, setFormErrors] = useState([])
  const [selectedObject, setSelectedObject] = useState(0)
  const [joined, setJoined] = useState(false)
  const [roomView, setRoomView] = useState('Elevation')
  const [roomPosition, setRoomPosition] = useState(0)
  const menuTriggerRef = useRef(null)
  const menuDialogRef = useRef(null)
  const reserveTriggerRef = useRef(null)
  const reservationRef = useRef(null)

  const material = MATERIALS.find((item) => item.id === materialId)
  const clearance = Math.max(0, Math.round((wall - span) / 2))
  const fits = clearance >= 30
  const price = 6800 + SPAN_PRICE[span] + material.surcharge
  const deposit = Math.round(price * 0.2)
  const edition = material.id === 'ash' ? '07 / 24' : material.id === 'clay' ? '11 / 24' : '04 / 24'
  const placementCode = `VL-02-${span}-${material.code}`
  const planWidth = `${Math.min(90, Math.max(42, (span / wall) * 100))}%`
  const dossier = OBJECTS[selectedObject]

  const closeMenu = () => {
    setMenuOpen(false)
    menuTriggerRef.current?.focus()
  }

  useEffect(() => {
    if (!menuOpen) return undefined
    document.body.classList.add('menu-locked')
    const dialog = menuDialogRef.current
    const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled])')]
    focusable[0]?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') closeMenu()
      if (event.key !== 'Tab' || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-locked')
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const openReservation = () => {
    if (!fits) return
    setReservationOpen(true)
    setReservationDone(false)
    setFormErrors([])
    window.setTimeout(() => {
      reservationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      reservationRef.current?.querySelector('input')?.focus()
    }, 0)
  }

  const submitReservation = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const errors = []
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const location = String(form.get('location') || '').trim()
    if (!name) errors.push('Enter your name.')
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Enter a valid email address.')
    if (!location) errors.push('Enter the project city or location.')
    if (form.get('acknowledgement') !== 'yes') errors.push('Acknowledge that this is a demonstration reservation.')
    setFormErrors(errors)
    if (errors.length) return
    setReservationDone(true)
  }

  const resetReservation = () => {
    setReservationOpen(false)
    setReservationDone(false)
    setFormErrors([])
    window.setTimeout(() => reserveTriggerRef.current?.focus(), 0)
  }

  const planDescription = useMemo(
    () => `${span} centimetre Ledge 02 in ${material.name} on a ${wall} centimetre wall, leaving ${clearance} centimetres each side. ${fits ? 'Recommended clearance met.' : 'Recommended clearance not met.'}`,
    [span, material, wall, clearance, fits],
  )

  return <div className={`site material-${material.id}`}>
    <a className="skip-link" href="#composer">Skip to room composer</a>

    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Vellum Objects home"><span>VELLUM</span><small>OBJECTS / EDITIONS</small></a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#objects">Objects</a>
        <a href="#composer">Place</a>
        <a href="#materials">Materials</a>
        <a href="#making">Making</a>
      </nav>
      <p className="header-edition">Open edition <strong>02 / 24</strong></p>
      <button
        ref={menuTriggerRef}
        className="index-button"
        type="button"
        aria-haspopup="dialog"
        onClick={() => setMenuOpen(true)}
        data-qa-action="catalog-index"
      >Index <span aria-hidden="true">+</span></button>
    </header>

    <main>
      <section id="top" className="hero" aria-labelledby="object-title">
        <div className="hero-docket">
          <p className="kicker">Object docket / O-02</p>
          <h1 id="object-title">Ledge 02</h1>
          <p className="hero-intro">A room edge drawn as one long surface, one weighted return, and one precise interruption.</p>
          <dl className="hero-specs">
            <div><dt>Span</dt><dd>160 / 200 / 240 cm</dd></div>
            <div><dt>Depth</dt><dd>42 cm</dd></div>
            <div><dt>Edition</dt><dd>24 per finish</dd></div>
            <div><dt>From</dt><dd>€6,800</dd></div>
          </dl>
          <a className="text-action" href="#composer">Compose for your room <span aria-hidden="true">↘</span></a>
        </div>

        <figure className="hero-stage">
          <img src="ledge-02-studio.webp" width="1440" height="960" alt="Ledge 02 charred-ash console with an asymmetric timber return and brushed-aluminium support" fetchPriority="high" />
          <figcaption><span>Studio elevation</span><span>200 × 42 × 78 cm</span></figcaption>
          <div className="dimension dimension-x" aria-hidden="true"><span>2000</span></div>
          <div className="dimension dimension-y" aria-hidden="true"><span>780</span></div>
          <RegistrationMark className="mark-a" />
          <RegistrationMark className="mark-b" />
        </figure>

        <div className="mobile-wallet" aria-label="Current swatch wallet">
          <p><span>Swatch wallet / O-02</span><strong>{edition}</strong></p>
          <h1 className="mobile-object-title">Ledge 02</h1>
          <div className="wallet-object"><ObjectSilhouette material={material} compact /><span>{material.name}<br />{span} cm span</span></div>
          <div className="wallet-swatches" role="group" aria-label="Save a finish to the swatch wallet">
            {MATERIALS.map((item) => <button
              key={item.id}
              type="button"
              className={`swatch swatch-${item.id}${item.id === material.id ? ' selected' : ''}`}
              aria-label={`Save ${item.name} to swatch wallet`}
              aria-pressed={item.id === material.id}
              onClick={() => setMaterialId(item.id)}
              data-qa-action="select-material"
            ><span>{item.code}</span></button>)}
          </div>
          <a className="mobile-place-action" href="#composer">Place in your room <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="composer" className={`composer mobile-step-${mobileStep}`} aria-labelledby="composer-title">
        <header className="section-label">
          <p>Room composer / live plan</p>
          <span>Measurements in centimetres</span>
        </header>
        <div className="composer-heading">
          <div><span className="section-number">02</span><h2 id="composer-title">Register the object<br />to a real wall.</h2></div>
          <p>Select a finish and span, then compare it with the clear wall width. The plan reports fit, edition, lead window, price, and reservation deposit.</p>
        </div>

        <nav className="mobile-stepper" aria-label="Placement steps">
          {['Swatch', 'Span', 'Place'].map((label, index) => <button
            type="button"
            key={label}
            aria-pressed={mobileStep === index + 1}
            aria-label={`Step ${index + 1}, ${label.toLowerCase()}`}
            onClick={() => setMobileStep(index + 1)}
            data-qa-action="mobile-step"
          ><span>0{index + 1}</span>{label}</button>)}
        </nav>

        <div className="composer-grid">
          <div className="control-rail">
            <fieldset className="control-block step-block step-1">
              <legend><span>01</span> Finish batch</legend>
              <div className="material-options">
                {MATERIALS.map((item) => <button
                  key={item.id}
                  type="button"
                  className={item.id === material.id ? 'active' : ''}
                  aria-pressed={item.id === material.id}
                  aria-label={`Select ${item.name}`}
                  onClick={() => setMaterialId(item.id)}
                  data-qa-action="select-material"
                >
                  <i className={`material-chip chip-${item.id}`} aria-hidden="true" />
                  <span><strong>{item.name}</strong><small>{item.batch}</small></span>
                  <b>{item.id === material.id ? 'Set' : '+'}</b>
                </button>)}
              </div>
              <p className="control-note">{material.note}</p>
            </fieldset>

            <fieldset className="control-block step-block step-2">
              <legend><span>02</span> Object span</legend>
              <div className="span-options">
                {SPANS.map((value) => <button
                  key={value}
                  type="button"
                  className={span === value ? 'active' : ''}
                  aria-pressed={span === value}
                  aria-label={`Select ${value} centimetre span`}
                  onClick={() => setSpan(value)}
                  data-qa-action="select-span"
                ><strong>{value}</strong><small>cm</small></button>)}
              </div>
            </fieldset>

            <div className="control-block step-block step-3 wall-control">
              <label htmlFor="wall-width"><span><b>03</b> Clear wall width</span>
                <select id="wall-width" value={wall} onChange={(event) => setWall(Number(event.target.value))} data-qa-action="select-wall">
                  {WALLS.map((value) => <option key={value} value={value}>{value} cm</option>)}
                </select>
              </label>
              <small>Measure between skirting returns, door architraves, or other fixed interruptions.</small>
            </div>
          </div>

          <div className="plan-panel">
            <div className="plan-head"><span>Spatial register R-02</span><span>{wall} cm wall / {span} cm object</span></div>
            <RoomScene materialId={material.id} span={span} wall={wall} position={roomPosition} view={roomView} />
            <div className="spatial-controls">
              <fieldset><legend>Viewpoint</legend>{['Elevation','Corner','Plan'].map(name=><button type="button" key={name} aria-pressed={roomView===name} onClick={()=>setRoomView(name)} data-qa-action="room-view">{name}</button>)}</fieldset>
              <fieldset><legend>Place on wall</legend>{[['Left',-1],['Centre',0],['Right',1]].map(([name,value])=><button type="button" key={name} aria-pressed={roomPosition===value} onClick={()=>setRoomPosition(value)} data-qa-action="room-position">{name}</button>)}</fieldset>
            </div>
            <AnimatePresence mode="wait"><motion.p className="plan-caption" key={planDescription+roomView+roomPosition} initial={{y:8}} animate={{y:0}} exit={{y:-6}} transition={{duration:.22}}>{planDescription} Current camera: {roomView.toLowerCase()}. Simple geometric guidance only.</motion.p></AnimatePresence>
          </div>

          <div className={`placement-output${fits ? ' fit' : ' caution'}`} role="status" aria-live="polite" aria-label="Placement result">
            <p className="result-flag"><span aria-hidden="true">{fits ? '✓' : '!'}</span>{fits ? 'Placement registered' : 'Clearance review'}</p>
            <h3>{clearance} cm each side</h3>
            <p>{fits ? 'The selected plan meets our 30 cm recommended side clearance.' : 'Choose a smaller span or wider wall before reserving this edition.'}</p>
            <dl>
              <div><dt>Object</dt><dd>Ledge 02 / {span} cm</dd></div>
              <div><dt>Finish</dt><dd>{material.name}</dd></div>
              <div><dt>Edition</dt><dd>{edition}</dd></div>
              <div><dt>Lead window</dt><dd>{material.lead}–{material.lead + 2} weeks</dd></div>
              <div><dt>Plan code</dt><dd>{placementCode}</dd></div>
            </dl>
            <div className="price-register"><span>Total <strong>{formatEuro(price)}</strong></span><span>20% reservation <strong>{formatEuro(deposit)}</strong></span></div>
            <button
              ref={reserveTriggerRef}
              className="reserve-button"
              type="button"
              disabled={!fits}
              onClick={openReservation}
              data-qa-action="open-reservation"
            >Reserve this edition <span aria-hidden="true">→</span></button>
          </div>
        </div>

        {reservationOpen && <section ref={reservationRef} className="reservation-record" aria-labelledby="reservation-title">
          {!reservationDone ? <>
            <div className="reservation-summary">
              <p>Reservation record / {placementCode}</p>
              <h3 id="reservation-title">Hold edition {edition}.</h3>
              <p>This demonstration records the configured object locally. No payment or external request is made.</p>
              <dl><div><dt>Object</dt><dd>Ledge 02 / {span} cm</dd></div><div><dt>Finish</dt><dd>{material.name}</dd></div><div><dt>Deposit</dt><dd>{formatEuro(deposit)}</dd></div></dl>
            </div>
            <form className="reservation-form" aria-label="Reserve configured edition" noValidate onSubmit={submitReservation}>
              {formErrors.length > 0 && <div className="form-errors" role="alert" aria-label="Check reservation details"><strong>Check the record</strong><ul>{formErrors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
              <label>Full name<input name="name" autoComplete="name" /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" /></label>
              <label>Project city or location<input name="location" autoComplete="address-level2" /></label>
              <label className="acknowledgement"><input name="acknowledgement" type="checkbox" value="yes" /><span>I understand this is a fictional demonstration reservation, not a purchase.</span></label>
              <div className="form-actions"><button type="button" onClick={resetReservation}>Cancel</button><button className="submit-reservation" type="submit" data-qa-action="reservation-submit">Record reservation <span aria-hidden="true">→</span></button></div>
            </form>
          </> : <div className="reservation-success" role="status" aria-live="polite" aria-label="Reservation recorded">
            <p>Record complete / {placementCode}</p>
            <span className="success-mark" aria-hidden="true">✓</span>
            <h3 id="reservation-title">Edition {edition}<br />is registered to your plan.</h3>
            <p>Ledge 02 · {span} cm · {material.name}<br />{clearance} cm side clearance · {formatEuro(deposit)} demonstration deposit</p>
            <button type="button" onClick={resetReservation}>Return to plan <span aria-hidden="true">↑</span></button>
          </div>}
        </section>}
      </section>

      <section id="objects" className="objects" aria-labelledby="objects-title">
        <header className="section-label"><p>Numbered object ledger</p><span>Edition cycle / 2026–27</span></header>
        <div className="objects-heading"><div><span className="section-number">03</span><h2 id="objects-title">Four objects.<br />Four room conditions.</h2></div><p>Not a catalogue grid. Each row records function, envelope, material family, and available run.</p></div>
        <div className="object-ledger">
          <div className="ledger-head" aria-hidden="true"><span>ID / Object</span><span>Function</span><span>Envelope</span><span>Edition</span><span>Open</span></div>
          {OBJECTS.map((item, index) => <button
            type="button"
            key={item.code}
            className={selectedObject === index ? 'active' : ''}
            aria-pressed={selectedObject === index}
            aria-label={`View dossier for ${item.name}`}
            onClick={() => setSelectedObject(index)}
            data-qa-action="select-object"
          ><span><small>{item.code}</small><strong>{item.name}</strong></span><span>{item.kind}</span><span>{item.dimensions}</span><span>{item.edition}</span><b aria-hidden="true">{selectedObject === index ? '—' : '+'}</b></button>)}
        </div>
        <div className="object-dossier" role="status" aria-live="polite" aria-label="Object dossier">
          <div className="dossier-visual">
            {dossier.image ? <img src={dossier.image} width="1440" height="960" alt="Sill 01 saddle-leather lounge chair in a quiet plaster room" /> : <div className={`abstract-object shape-${dossier.shape}`} aria-label={`${dossier.name} plan silhouette`} role="img"><span /><i /><b /></div>}
            <span>{dossier.code} / selected</span>
          </div>
          <div className="dossier-copy"><p>{dossier.kind}</p><h3>{dossier.name}</h3><p>{dossier.note}</p><dl><div><dt>Envelope</dt><dd>{dossier.dimensions}</dd></div><div><dt>Edition</dt><dd>{dossier.edition}</dd></div><div><dt>Material</dt><dd>{dossier.material}</dd></div><div><dt>Price</dt><dd>{dossier.price}</dd></div></dl></div>
        </div>
      </section>

      <section id="materials" className="materials" aria-labelledby="materials-title">
        <div className="material-image"><img src="material-junction.webp" width="1440" height="960" alt="Macro junction of charred ash, brushed aluminium, and clay-red lacquer" /><span>Junction J-02 / 1.4 mm return</span></div>
        <div className="material-copy"><p className="kicker">Material junction / J-02</p><h2 id="materials-title">Three surfaces meet.<br />None pretend to be another.</h2><p>The ash stays open enough to read. Aluminium keeps its directional brush. Lacquer holds the minute edge variation left by hand rubbing.</p><dl><div><dt>Charred ash</dt><dd>FSC-certified European ash / wax sealed</dd></div><div><dt>Aluminium</dt><dd>62% recycled billet / clear mineral seal</dd></div><div><dt>Clay lacquer</dt><dd>Water-borne system / seven thin coats</dd></div></dl><a href="#composer">Return to swatches <span aria-hidden="true">↑</span></a></div>
      </section>

      <section id="making" className="making" aria-labelledby="making-title">
        <header className="section-label"><p>Making register</p><span>12–18 week lead window</span></header>
        <div className="making-heading"><span className="section-number">04</span><h2 id="making-title">A sequence with<br />one reference edge.</h2><p>Every Ledge moves through the same four records. The maker signs each stage before the next begins.</p></div>
        <ol className="making-line">{STEPS.map(([number, title, copy], index) => <li key={number} style={{ '--step-offset': `${index * 1.6}rem` }}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><small>{index === 3 ? 'Archive stamp' : `${index * 4 + 2}–${index * 4 + 5} days`}</small></li>)}</ol>
      </section>

      <section className="provenance" aria-labelledby="provenance-title">
        <div className="certificate">
          <RegistrationMark className="cert-mark" />
          <p>Vellum Objects / edition certificate</p>
          <h2 id="provenance-title">The object carries<br />its own record.</h2>
          <dl><div><dt>Object</dt><dd>Ledge 02</dd></div><div><dt>Edition</dt><dd>07 / 24</dd></div><div><dt>Maker mark</dt><dd>RM / LF</dd></div><div><dt>Archive</dt><dd>VL.O2.2026</dd></div></dl>
          <small>Fictional certificate shown for template demonstration.</small>
        </div>
        <div className="edition-notches" aria-label="Edition availability diagram"><p>Edition / Charred ash</p>{Array.from({ length: 24 }, (_, index) => <span key={index} className={index < 7 ? 'placed' : index === 7 ? 'current' : ''}><i>{String(index + 1).padStart(2, '0')}</i></span>)}</div>
      </section>

      <section className="studio-notes" aria-labelledby="notes-title">
        <div><p className="kicker">Studio notes / occasional</p><h2 id="notes-title">New objects,<br />finish trials, open editions.</h2><p>One useful note when a prototype enters the room or a finish batch opens.</p></div>
        {joined ? <p className="joined-note" role="status">Your address is registered for the next studio note.</p> : <form onSubmit={(event) => { event.preventDefault(); setJoined(true) }}><label>Email address<input required type="email" placeholder="collector@example.com" /></label><button type="submit">Register for notes <span aria-hidden="true">→</span></button></form>}
      </section>
    </main>

    <footer className="site-footer">
      <a className="footer-wordmark" href="#top">VELLUM <span>OBJECTS</span></a>
      <p>Numbered furniture editions<br />Fictional bureau / Antwerp</p>
      <nav aria-label="Footer navigation"><a href="#objects">Object ledger</a><a href="#materials">Material register</a><a href="#making">Making</a><a href="#top">Return ↑</a></nav>
      <small>© 2026 Vellum Objects<br />Template demonstration only</small>
    </footer>

    {menuOpen && <div className="folio-overlay" role="dialog" aria-modal="true" aria-labelledby="folio-title" ref={menuDialogRef}>
      <div className="folio-head"><p>Vellum / folio index</p><button type="button" onClick={closeMenu}>Close <span aria-hidden="true">×</span></button></div>
      <div className="folio-body">
        <div><span>Current object</span><strong>O-02 / Ledge 02</strong><small>Open edition / {edition}</small></div>
        <nav aria-label="Folio destinations" id="folio-title">
          {[['01', 'Objects', '#objects'], ['02', 'Room composer', '#composer'], ['03', 'Materials', '#materials'], ['04', 'Making register', '#making']].map(([number, label, href]) => <a key={href} href={href} onClick={closeMenu}><span>{number}</span>{label}<b aria-hidden="true">↘</b></a>)}
        </nav>
        <p>Antwerp / by appointment<br />studio@vellum-objects.example</p>
      </div>
    </div>}
  </div>
}

export default App
