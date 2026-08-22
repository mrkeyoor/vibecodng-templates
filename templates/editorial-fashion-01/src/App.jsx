import { useEffect, useRef, useState } from 'react'

const products = [
  { id: '01', name: 'Veil Tailored Set', price: '$620', image: 'campaign-one.webp', position: '50% 48%', note: 'Ivory / Wool crepe' },
  { id: '02', name: 'Axis Drape Dress', price: '$480', image: 'campaign-two.webp', position: '50% 60%', note: 'Graphite / Silk wool' },
  { id: '03', name: 'Contour Coat', price: '$740', image: 'campaign-three.webp', position: '52% 58%', note: 'Chalk / Brushed wool' },
]

function Arrow({ left = false }) {
  return <span aria-hidden="true">{left ? '←' : '↗'}</span>
}

function App() {
  const openingRef = useRef(null)
  const lookbookRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selected, setSelected] = useState(products[0])
  const [size, setSize] = useState('')
  const [bagCount, setBagCount] = useState(0)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let frame = 0
    const update = () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = document.documentElement
      if (reduced) {
        root.style.setProperty('--opening-progress', '.55')
        root.style.setProperty('--lookbook-progress', '0')
        return
      }
      const opening = openingRef.current?.getBoundingClientRect()
      const lookbook = lookbookRef.current?.getBoundingClientRect()
      if (opening) {
        const range = Math.max(1, opening.height - innerHeight)
        root.style.setProperty('--opening-progress', Math.max(0, Math.min(1, -opening.top / range)).toFixed(4))
      }
      if (lookbook) {
        const range = Math.max(1, lookbook.height - innerHeight)
        root.style.setProperty('--lookbook-progress', Math.max(0, Math.min(1, -lookbook.top / range)).toFixed(4))
      }
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) }
  }, [])

  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') { setMenuOpen(false); setDrawerOpen(false) } }
    addEventListener('keydown', close)
    document.body.classList.toggle('locked', menuOpen || drawerOpen)
    return () => { removeEventListener('keydown', close); document.body.classList.remove('locked') }
  }, [menuOpen, drawerOpen])

  const openProduct = (product) => {
    setSelected(product)
    setSize('')
    setNotice('')
    setDrawerOpen(true)
  }

  const addToBag = () => {
    if (!size) { setNotice('Choose your size first.'); return }
    setBagCount((count) => count + 1)
    setNotice(`${selected.name}, size ${size}, added.`)
  }

  return <div className="site-shell">
    <a className="skip-link" href="#collection">Skip to collection</a>
    <header className="topbar">
      <button className="text-button" onClick={() => setMenuOpen(true)} aria-haspopup="dialog">Menu</button>
      <a className="wordmark" href="#top" aria-label="NOMA home">NOMA</a>
      <button className="text-button bag" onClick={() => setDrawerOpen(true)} aria-haspopup="dialog">Bag <span>{String(bagCount).padStart(2, '0')}</span></button>
    </header>

    <main id="top">
      <section className="opening" ref={openingRef} aria-labelledby="campaign-title">
        <div className="opening-sticky">
          <div className="opening-image"><img src="campaign-one.webp" alt="Model in ivory tailoring walking through monumental limestone architecture" /></div>
          <p className="edition">Collection 01<br />Coastal forms</p>
          <h1 id="campaign-title" className="hero-title" aria-label="Form in motion">
            <span>FORM</span><span>IN</span><span>MOTION</span>
          </h1>
          <div className="hero-index" aria-hidden="true"><b>01</b><i></i><span>03</span></div>
          <p className="hero-note">A study in volume,<br />weather and restraint.</p>
          <a className="circle-link" href="#collection" aria-label="Explore the collection"><span>Explore</span><Arrow /></a>
        </div>
      </section>

      <section className="manifesto" aria-labelledby="manifesto-title">
        <p className="eyebrow">NOMA / Autumn 2026</p>
        <h2 id="manifesto-title">Clothes that hold<br />space around the body.</h2>
        <div className="manifesto-foot">
          <p>Cut in natural fibres. Built with quiet geometry. Designed to move from stillness into weather.</p>
          <span>Made in limited runs<br />01—80 pieces</span>
        </div>
      </section>

      <section id="collection" className="lookbook" ref={lookbookRef} aria-labelledby="lookbook-title">
        <div className="lookbook-sticky">
          <div className="lookbook-head">
            <p className="eyebrow">The lookbook</p>
            <h2 id="lookbook-title">Three forms.<br />One horizon.</h2>
            <p>Scroll to move through Collection 01</p>
          </div>
          <div className="lookbook-track">
            {products.map((product, index) => <article className={`look look-${index + 1}`} key={product.id}>
              <button className="look-image" onClick={() => openProduct(product)} aria-label={`Quick shop ${product.name}`}>
                <img src={product.image} style={{ objectPosition: product.position }} alt={`${product.name} from the NOMA coastal campaign`} />
                <span className="hotspot">+</span>
              </button>
              <div className="look-meta">
                <span>Look {product.id}</span>
                <h3>{product.name}</h3>
                <p>{product.note}</p>
                <button onClick={() => openProduct(product)}>Quick shop <Arrow /></button>
              </div>
            </article>)}
          </div>
          <div className="progress-line"><span /></div>
        </div>
      </section>

      <section className="material" aria-label="Collection material story">
        <div className="material-image"><img src="campaign-two.webp" alt="Graphite draped dress and ivory silk scarf framed by limestone walls" /></div>
        <div className="material-copy">
          <p className="eyebrow">Material / 02</p>
          <h2>The shape begins<br />with the cloth.</h2>
          <p>Dense wool finds its line. Silk catches the smallest current. Every seam is placed for the garment in motion.</p>
          <dl>
            <div><dt>Origin</dt><dd>Biella, Italy</dd></div>
            <div><dt>Composition</dt><dd>92% wool / 8% silk</dd></div>
            <div><dt>Finish</dt><dd>Hand pressed</dd></div>
          </dl>
        </div>
      </section>

      <section className="product-grid" aria-labelledby="shop-title">
        <div className="grid-title"><p className="eyebrow">Shop Collection 01</p><h2 id="shop-title">Objects for<br />everyday ritual.</h2></div>
        {products.map((product) => <article className="product-card" key={product.id}>
          <button className="product-photo" onClick={() => openProduct(product)} aria-label={`View ${product.name}`}>
            <img src={product.image} style={{ objectPosition: product.position }} alt="" />
            <span>View piece <Arrow /></span>
          </button>
          <div><h3>{product.name}</h3><p>{product.price}</p></div>
        </article>)}
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <img src="campaign-three.webp" alt="Model in a chalk coat walking across monumental stone steps by the sea" />
        <div className="closing-copy"><p className="eyebrow">NOMA Journal / 01</p><h2 id="closing-title">Between stone<br />and weather.</h2><a href="#collection">Read the story <Arrow /></a></div>
      </section>
    </main>

    <footer>
      <a className="footer-mark" href="#top">NOMA</a>
      <div><p>Quiet forms for a moving world.</p><p>London · Copenhagen · Online</p></div>
      <nav aria-label="Footer"><a href="#collection">Collection</a><a href="#shop-title">Shop</a><a href="mailto:studio@example.com">Contact</a></nav>
      <small>© 2026 NOMA / Fictional editorial concept</small>
    </footer>

    <div className="menu-panel" aria-hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Main menu">
      <button className="panel-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">Close ×</button>
      <nav><a onClick={() => setMenuOpen(false)} href="#collection">Collection <span>01</span></a><a onClick={() => setMenuOpen(false)} href="#shop-title">New forms <span>02</span></a><a onClick={() => setMenuOpen(false)} href="#closing-title">Journal <span>03</span></a></nav>
      <p>NOMA / London · Copenhagen</p>
    </div>
    <button className={`scrim ${menuOpen || drawerOpen ? 'shown' : ''}`} onClick={() => { setMenuOpen(false); setDrawerOpen(false) }} aria-label="Close overlay" tabIndex={menuOpen || drawerOpen ? 0 : -1} />

    <aside className="drawer" aria-hidden={!drawerOpen} aria-label="Quick shop" role="dialog" aria-modal="true">
      <div className="drawer-top"><p>Quick shop / {selected.id}</p><button onClick={() => setDrawerOpen(false)} aria-label="Close quick shop">Close ×</button></div>
      <div className="drawer-image"><img src={selected.image} style={{ objectPosition: selected.position }} alt={selected.name} /></div>
      <div className="drawer-info"><p className="eyebrow">Collection 01</p><h2>{selected.name}</h2><p className="price">{selected.price}</p><p className="description">Cut to create shape without restriction. Fully lined, finished by hand and produced in a numbered run.</p>
        <fieldset><legend>Select size</legend><div className="sizes">{['XS', 'S', 'M', 'L'].map((item) => <button type="button" aria-pressed={size === item} onClick={() => { setSize(item); setNotice('') }} key={item}>{item}</button>)}</div></fieldset>
        <div className="size-row"><button onClick={() => setNotice('Measure around the fullest part of your chest. XS 82cm · S 88cm · M 94cm · L 100cm.')}>Size guide</button><span>Limited run / Made to order</span></div>
        <button className="add-button" onClick={addToBag}>Add to bag <span>{selected.price}</span></button>
        <p className="notice" role="status">{notice}</p>
      </div>
    </aside>
  </div>
}

export default App
