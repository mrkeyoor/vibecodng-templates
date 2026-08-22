import { useEffect, useMemo, useRef, useState } from 'react'

const looks=[
  {
    id:'01',name:'Mercury Transit',image:'rift-hero.webp',position:'50% 48%',exposure:'SILVER / CHERRY',price:880,
    fit:'Volume through the shell. True at waist.',edition:'24 / 80',
    layers:[['Shell','Mercury ripstop coat'],['Base','Cherry zip jersey'],['Lower','Wide fluid trouser']]
  },
  {
    id:'02',name:'Cobalt Interval',image:'rift-duo.webp',position:'76% 48%',exposure:'COBALT / INK',price:740,
    fit:'Close column. Cropped volume above.',edition:'31 / 80',
    layers:[['Outer','Ink technical blouson'],['Base','Cobalt column knit'],['Lower','Split tailored trouser']]
  },
  {
    id:'03',name:'Afterimage Shell',image:'rift-negative.webp',position:'50% 48%',exposure:'CHERRY / COBALT',price:920,
    fit:'One size of air around the body.',edition:'16 / 60',
    layers:[['Shell','Mercury motion coat'],['Base','Cherry high-neck zip'],['Lower','Night wide trouser']]
  }
]

const asset=file=>`${import.meta.env.BASE_URL}${file}`

export default function App(){
  const heroRef=useRef(null)
  const [look,setLook]=useState(0)
  const [size,setSize]=useState('')
  const [errors,setErrors]=useState({})
  const [held,setHeld]=useState(false)
  const selected=looks[look]
  const holdCode=useMemo(()=>`RF-${selected.id}-${size||'--'}-${String(147+look*37).padStart(3,'0')}`,[selected,size,look])

  useEffect(()=>{
    let frame=0
    const update=()=>{
      frame=0
      const box=heroRef.current?.getBoundingClientRect()
      if(!box)return
      const range=Math.max(1,heroRef.current.offsetHeight-innerHeight)
      const p=Math.max(0,Math.min(1,-box.top/range))
      const root=document.documentElement
      root.style.setProperty('--reveal',`${(48-p*48).toFixed(2)}%`)
      root.style.setProperty('--film-shift',`${(-p*96).toFixed(1)}px`)
      root.style.setProperty('--ghost',`${(.16+p*.42).toFixed(2)}`)
    }
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)}
    update();addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll)
    return()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);if(frame)cancelAnimationFrame(frame)}
  },[])

  function chooseLook(index){setLook(index);setSize('');setHeld(false);setErrors({})}
  function step(delta){chooseLook((look+delta+looks.length)%looks.length)}
  function submit(event){
    event.preventDefault()
    const data=new FormData(event.currentTarget)
    const next={}
    if(!size)next.size='Choose a size to hold this look.'
    if(!String(data.get('name')||'').trim())next.name='Add a contact name.'
    if(!/^\S+@\S+\.\S+$/.test(String(data.get('email')||'')))next.email='Add a valid email.'
    setErrors(next)
    setHeld(Object.keys(next).length===0)
  }

  return <div className="rift-shell">
    <a className="skip-link" href="#contact-run">Skip to contact run</a>
    <header className="film-nav">
      <a className="rift-mark" href="#top" aria-label="RIFT home"><span>R</span><b>RIFT</b></a>
      <nav aria-label="Primary">
        <a href="#contact-run"><i>01</i><span>TAKES</span></a>
        <a href="#style-frame"><i>02</i><span>STYLE</span></a>
        <a href="#material"><i>03</i><span>MAKE</span></a>
        <a href="#hold"><i>04</i><span>HOLD</span></a>
      </nav>
      <a className="nav-hold" href="#hold">HOLD<br/>A LOOK ↘</a>
    </header>

    <main id="top">
      <section className="develop" ref={heroRef} aria-labelledby="hero-title">
        <div className="develop-sticky">
          <img className="hero-base" src={asset('rift-hero.webp')} width="1586" height="992" fetchPriority="high" alt="Model in a silver ripstop shell coat standing between cobalt and dark cherry studio light"/>
          <img className="hero-exposure" src={asset('rift-negative.webp')} width="1550" height="1015" alt="The same model turning as the silver coat moves through cobalt and red projection"/>
          <div className="shutter shutter-top" aria-hidden="true"/><div className="shutter shutter-bottom" aria-hidden="true"/>
          <div className="film-edge edge-left" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i}/>)}</div>
          <div className="film-edge edge-right" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i}/>)}</div>
          <div className="hero-docket"><span>FRAME / 01A</span><span>1/125 — F8</span><span>RIFT / DROP 01</span></div>
          <div className="hero-copy">
            <p>READY-TO-WEAR / FICTIONAL CAMPAIGN</p>
            <h1 id="hero-title">RIFT</h1>
            <div><strong>Developed<br/>in motion.</strong><span>Three looks cut between<br/>silver, cobalt and after-dark.</span></div>
          </div>
          <a className="enter-run" href="#contact-run"><span>RUN THE CONTACT</span><b>↓</b></a>
          <p className="exposure-note">Scroll to expose<br/>Frame 01B</p>
        </div>
      </section>

      <section className="contact-run" id="contact-run" aria-labelledby="contact-title">
        <header><p>01 / CONTACT RUN</p><h2 id="contact-title">THREE TAKES.<br/><em>ONE DROP.</em></h2><span>Direct flash / London<br/>21:48 — 23:16</span></header>
        <div className="contact-bed">
          {looks.map((item,index)=><button className={`proof proof-${index+1}${look===index?' active':''}`} data-qa-action="frame-select" aria-pressed={look===index} onClick={()=>chooseLook(index)} key={item.id}>
            <img src={asset(item.image)} width="1586" height="992" loading="lazy" alt="" style={{objectPosition:item.position}}/>
            <span>TAKE {item.id}</span><small>{item.exposure}</small>
          </button>)}
          <div className="contact-holes" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i}/>)}</div>
        </div>
        <div className="frame-step"><button data-qa-action="frame-step" onClick={()=>step(-1)} aria-label="Previous contact frame">← PREV</button><span aria-live="polite">DEVELOPING TAKE {selected.id} / {selected.name}</span><button data-qa-action="frame-step" onClick={()=>step(1)} aria-label="Next contact frame">NEXT →</button></div>
      </section>

      <section className="style-frame" id="style-frame" aria-labelledby="style-title">
        <div className="style-image" key={selected.id}>
          <img src={asset(selected.image)} width="1586" height="992" alt={`${selected.name}, a fictional RIFT ready-to-wear look`} style={{objectPosition:selected.position}}/>
          <span>TAKE {selected.id} / DEVELOPED</span>
        </div>
        <div className="style-docket">
          <p>02 / STYLE THE FRAME</p><h2 id="style-title">{selected.name}</h2>
          <div className="look-tabs" role="group" aria-label="Choose campaign take">{looks.map((item,index)=><button data-qa-action="frame-select" aria-pressed={look===index} onClick={()=>chooseLook(index)} key={item.id}>{item.id}</button>)}</div>
          <dl>{selected.layers.map(([term,value])=><div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
          <div className="fit-note"><span>FIT NOTE</span><strong>{selected.fit}</strong></div>
          <div className="price-line"><span>FULL LOOK</span><b>${selected.price}</b><small>ED. {selected.edition}</small></div>
          <a href="#hold">HOLD THIS CUT <span>↘</span></a>
        </div>
      </section>

      <section className="material" id="material" aria-labelledby="material-title">
        <img src={asset('rift-material.webp')} width="1586" height="992" loading="lazy" alt="Macro detail of silver ripstop, waterproof zip, cherry bartack and cobalt piping"/>
        <div className="seam-line" aria-hidden="true"><i/><b/></div>
        <div className="material-title"><p>03 / MATERIAL EXPOSURE</p><h2 id="material-title">LIGHT<br/>FINDS<br/>THE SEAM.</h2></div>
        <dl><div><dt>FACE</dt><dd>Silver ripstop / 92 g</dd></div><div><dt>SEAL</dt><dd>12 mm waterproof tape</dd></div><div><dt>TRACE</dt><dd>Cobalt reflective piping</dd></div><div><dt>MARK</dt><dd>Cherry bartack / 28 stitch</dd></div></dl>
      </section>

      <section className="street" aria-labelledby="street-title">
        <img src={asset('rift-street.webp')} width="1586" height="992" loading="lazy" alt="Model in the silver RIFT shell moving through a wet concrete passage at night"/>
        <div className="street-grade" aria-hidden="true"/>
        <div className="street-copy"><p>04 / STREET PROOF</p><h2 id="street-title">THE FRAME<br/>LEAVES<br/>THE STUDIO.</h2></div>
        <div className="street-transcript"><span>21:48 / FLASH READY</span><span>21:49 / SHELL MOVING</span><span>21:49 / REFLECTION CAUGHT</span><span>21:50 / TAKE HELD</span></div>
      </section>

      <section className={`hold-stage${held?' held':''}`} id="hold" aria-labelledby="hold-title">
        <div className="hold-portrait"><img src={asset(selected.image)} alt="" width="1586" height="992" style={{objectPosition:selected.position}}/><span>TAKE {selected.id}</span></div>
        <div className="claim-paper">
          <header><span>RIFT / CLAIM TAG</span><b>{holdCode}</b></header>
          {!held?<form onSubmit={submit} noValidate>
            <p>05 / NUMBERED LOOK HOLD</p><h2 id="hold-title">Cut secured.<br/>Size the body.</h2>
            <fieldset><legend>Select size</legend><div>{['XS','S','M','L'].map(value=><button data-qa-action="size-select" type="button" aria-pressed={size===value} onClick={()=>{setSize(value);setErrors(old=>({...old,size:''}))}} key={value}>{value}</button>)}</div>{errors.size&&<small>{errors.size}</small>}</fieldset>
            <div className="hold-fields"><label><span>Contact name</span><input name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name?'hold-name-error':undefined}/>{errors.name&&<small id="hold-name-error">{errors.name}</small>}</label><label><span>Email</span><input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email?'hold-email-error':undefined}/>{errors.email&&<small id="hold-email-error">{errors.email}</small>}</label></div>
            <div className="hold-summary"><span>{selected.name}</span><b>{size||'SIZE —'}</b><strong>${selected.price}</strong></div>
            <button className="issue-tag" data-qa-action="hold-submit">ISSUE THE CLAIM TAG ↗</button>
          </form>:<div className="claim-result" role="status">
            <p>LOOK HELD / FICTIONAL OUTCOME</p><h2 id="hold-title">Frame<br/>claimed.</h2><strong>{holdCode}</strong><dl><div><dt>Look</dt><dd>{selected.name}</dd></div><div><dt>Size</dt><dd>{size}</dd></div><div><dt>Edition</dt><dd>{selected.edition}</dd></div><div><dt>Value</dt><dd>${selected.price}</dd></div></dl><span>No payment taken. This is a template demonstration.</span><button data-qa-action="hold-reset" onClick={()=>{setHeld(false);setSize('');setErrors({})}}>CUT ANOTHER FRAME ↺</button>
          </div>}
        </div>
      </section>
    </main>
    <footer><a href="#top">RIFT / DROP 01</a><span>Fictional independent label<br/>London — Online</span><span>Original campaign imagery<br/>No live inventory claims</span><a href="#top">BACK TO FRAME 01 ↑</a></footer>
  </div>
}
