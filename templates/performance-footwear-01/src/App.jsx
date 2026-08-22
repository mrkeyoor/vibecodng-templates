import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import ForceChassis from './ForceChassis'

const terrains = {
  Road: { trace: '52 / 31 / 17', grip: '4.1 mm', note: 'Broad heel-to-toe rubber contact for repeatable city miles.' },
  Track: { trace: '38 / 42 / 20', grip: '2.8 mm', note: 'Reduced lug depth and a quicker forefoot transition.' },
  Mixed: { trace: '47 / 29 / 24', grip: '5.0 mm', note: 'Segmented rubber for wet paths and interrupted pavement.' },
}
const layers = [
  { name: 'Upper', code: '01', metric: '172 ventilation cells', copy: 'Zonal mono-knit opens across the toe box, then locks around the midfoot without a rigid cage.' },
  { name: 'Chassis', code: '02', metric: '7.4 N/mm flex', copy: 'A split composite plate steadies the landing and releases the medial forefoot independently.' },
  { name: 'Outsole', code: '03', metric: '68% contact rubber', copy: 'Mapped rubber follows high-wear pressure paths instead of coating the entire sole.' },
]
const editions = {
  Flow: { use: 'Daily volume', stack: '38 / 30 mm', mass: '242 g', drop: '8 mm', price: '$168', signal: 'balanced' },
  Tempo: { use: 'Intervals + race prep', stack: '36 / 29 mm', mass: '218 g', drop: '7 mm', price: '$188', signal: 'responsive' },
  Route: { use: 'Road-to-path', stack: '37 / 29 mm', mass: '258 g', drop: '8 mm', price: '$178', signal: 'stable' },
}
const questions = [
  { key: 'terrain', label: 'Where do your miles happen?', options: ['Road', 'Track', 'Mixed'] },
  { key: 'strike', label: 'Where do you usually land?', options: ['Heel', 'Midfoot', 'Forefoot'] },
  { key: 'ride', label: 'How should the shoe feel?', options: ['Cushioned', 'Balanced', 'Responsive'] },
]
const phases = {
  Touchdown: { code: '01', load: '72%', metric: 'Heel entry', note: 'The rear carrier receives load before the rocker settles.' },
  Midstance: { code: '02', load: '100%', metric: 'Full contact', note: 'Pressure spreads through the split chassis at peak support.' },
  'Toe-off': { code: '03', load: '84%', metric: 'Forefoot release', note: 'The medial wing returns energy as the heel clears.' },
}

function ShoeDiagram({ layer }) {
  return <svg className={`shoe-diagram layer-${layer.toLowerCase()}`} viewBox="0 0 760 330" role="img" aria-labelledby="shoe-diagram-title">
    <title id="shoe-diagram-title">Vector 01 sectional shoe diagram with {layer} selected</title>
    <path className="upper-line" d="M106 196c68-17 123-53 184-114 25-25 61-40 96-22l130 69c49 26 100 45 160 52 33 4 50 25 43 49-9 32-47 38-91 38H135c-51 0-74-20-69-43 4-16 17-24 40-29Z"/>
    <path className="chassis-line" d="M83 226c76 17 178 19 284 15 129-5 245-26 345-43l8 39c-126 33-230 49-340 51-118 3-218-1-298-17Z"/>
    <path className="outsole-line" d="M88 271c150 27 382 24 628-34l-8 34c-220 65-471 68-620 33-19-5-24-28 0-33Z"/>
    <g className="measure"><line x1="91" y1="314" x2="706" y2="314"/><path d="m91 306-12 8 12 8m615-16 12 8-12 8"/><text x="365" y="308">VECTOR 01 / SIZE 9 / 282 MM</text></g>
    <g className="pressure"><circle cx="178" cy="245" r="25"/><circle cx="446" cy="252" r="17"/><circle cx="626" cy="234" r="31"/></g>
  </svg>
}

export default function App(){
  const [terrain,setTerrain]=useState('Road')
  const [strike,setStrike]=useState('Midfoot')
  const [ride,setRide]=useState('Balanced')
  const [step,setStep]=useState(0)
  const [calibrated,setCalibrated]=useState(false)
  const [layer,setLayer]=useState(0)
  const [edition,setEdition]=useState('Flow')
  const [formError,setFormError]=useState('')
  const [reserved,setReserved]=useState(false)
  const [rigLayer,setRigLayer]=useState('All')
  const [phase,setPhase]=useState('Midstance')
  const [exploded,setExploded]=useState(false)
  const [rotation,setRotation]=useState(-0.48)

  const recommendation=useMemo(()=>{
    if(terrain==='Mixed') return 'Route'
    if(terrain==='Track'||ride==='Responsive'||strike==='Forefoot') return 'Tempo'
    return 'Flow'
  },[terrain,strike,ride])
  const values={terrain,strike,ride}
  const setters={terrain:setTerrain,strike:setStrike,ride:setRide}
  const calibrate=()=>{setEdition(recommendation);setCalibrated(true)}
  const mobileNext=()=>step<2?setStep(step+1):calibrate()
  const selectLayer=(i)=>setLayer(i)
  const nextLayer=(d)=>setLayer((layer+d+layers.length)%layers.length)
  const submit=e=>{e.preventDefault();const f=new FormData(e.currentTarget);if(!f.get('name')||!/^\S+@\S+\.\S+$/.test(String(f.get('email')))||!f.get('size')){setFormError('Enter your name, a valid email and preferred size.');return}setFormError('');setReserved(true)}
  const phaseNames=Object.keys(phases)
  const shiftPhase=direction=>setPhase(current=>phaseNames[(phaseNames.indexOf(current)+direction+phaseNames.length)%phaseNames.length])

  return <>
    <div className="signal-bar" role="region" aria-label="Product notice"><span>VECTOR LAB / 01</span><span>Illustrative performance data</span><span>Shipping worldwide</span></div>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Vector home">V<span>∕</span>01</a>
      <nav aria-label="Primary navigation"><a href="#lab">Lab</a><a href="#editions">Editions</a><a href="#build">Build</a></nav>
      <a className="header-cta" href="#fit">Find your fit <span>↘</span></a>
    </header>
    <main id="top">
      <section className="rig-hero" aria-labelledby="hero-title">
        <div className="rig-copy">
          <p className="eyebrow">Road system / live chassis</p>
          <h1 id="hero-title">See where<br/>the run <span>moves.</span></h1>
          <p>Rotate, separate and phase the Vector 01. Every control changes the product model and its illustrative force path.</p>
          <div className="rig-actions">
            <button data-qa-action="rig-explode" aria-pressed={exploded} onClick={()=>setExploded(value=>!value)}>{exploded?'Assemble chassis':'Separate chassis'} <span>↗</span></button>
            <a href="#lab">Calibrate my ride ↓</a>
          </div>
          <dl className="rig-specs"><div><dt>Sample</dt><dd>US 9 / 242 g</dd></div><div><dt>Stack</dt><dd>38 / 30 mm</dd></div><div><dt>Model</dt><dd>V01–B</dd></div></dl>
        </div>
        <div className="rig-stage">
          <ForceChassis exploded={exploded} activeLayer={rigLayer} phase={phase} rotation={rotation} onRotate={setRotation}/>
          <div className="rig-rotate" aria-label="Model rotation controls">
            <button data-qa-action="rig-rotate-left" aria-label="Rotate model left" onClick={()=>setRotation(value=>value-.42)}>←</button>
            <button data-qa-action="rig-reset" onClick={()=>{setRotation(-.48);setExploded(false);setRigLayer('All');setPhase('Midstance')}}>Reset view</button>
            <button data-qa-action="rig-rotate-right" aria-label="Rotate model right" onClick={()=>setRotation(value=>value+.42)}>→</button>
          </div>
        </div>
        <aside className="rig-console" aria-label="Force chassis controls">
          <div className="console-head"><span>Stride phase</span><b>LIVE / {phases[phase].code}</b></div>
          <div className="phase-tabs">{phaseNames.map(name=><button key={name} data-qa-action="rig-phase" aria-pressed={phase===name} onClick={()=>setPhase(name)}><small>{phases[name].code}</small>{name}</button>)}</div>
          <div className="mobile-phase-stepper"><button aria-label="Previous stride phase" onClick={()=>shiftPhase(-1)}>←</button><span>{phase}</span><button aria-label="Next stride phase" data-qa-action="rig-phase-next" onClick={()=>shiftPhase(1)}>→</button></div>
          <AnimatePresence mode="wait"><motion.div className="phase-readout" key={phase} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.24}}>
            <span>{phases[phase].metric}</span><strong>{phases[phase].load}</strong><p>{phases[phase].note}</p>
          </motion.div></AnimatePresence>
          <div className="layer-tabs" aria-label="Construction layers">{['All','Upper','Carrier','Outsole'].map((name,index)=><button key={name} data-qa-action="rig-layer" aria-pressed={rigLayer===name} onClick={()=>{setRigLayer(name);if(name!=='All')setExploded(true)}}><small>0{index}</small>{name}</button>)}</div>
        </aside>
      </section>

      <section className="lab-section" id="lab" aria-labelledby="lab-title">
        <header className="section-head"><p className="eyebrow">01 / Performance lab</p><h2 id="lab-title">Build a gait dossier.</h2><p>Three inputs. One explainable starting point. This demo is product guidance, not a medical gait assessment.</p></header>
        <div className="lab-bench">
          <div className="instrument-view calibration-proof">
            <div className="instrument-top"><span>Material proof / {layers[layer].code}</span><strong>{layers[layer].name}</strong></div>
            <figure><img src="vector-01-lab.webp" width="1600" height="1066" alt="Vector 01 running shoe on a laboratory test platform" fetchPriority="high"/><figcaption>Physical specimen / V01–B</figcaption></figure>
            <AnimatePresence mode="wait"><motion.div className="layer-readout" key={layers[layer].name} initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}} exit={{opacity:0,x:18}} transition={{duration:.22}}><span>{layers[layer].metric}</span><p>{layers[layer].copy}</p></motion.div></AnimatePresence>
            <div className="layer-controls" aria-label="Shoe anatomy layers">{layers.map((x,i)=><button key={x.name} data-qa-action="anatomy-layer" aria-pressed={layer===i} onClick={()=>selectLayer(i)}><small>{x.code}</small>{x.name}</button>)}</div>
            <div className="mobile-layer-controls"><button aria-label="Previous anatomy layer" data-qa-action="anatomy-previous" onClick={()=>nextLayer(-1)}>←</button><span>{layers[layer].code} / 03 · {layers[layer].name}</span><button aria-label="Next anatomy layer" data-qa-action="anatomy-next" onClick={()=>nextLayer(1)}>→</button></div>
          </div>
          <div className="calibrator">
            <div className="calibrator-title"><span>Input console</span><strong>{calibrated?'Calibrated':'Awaiting input'}</strong></div>
            <div className="desktop-questions">{questions.map((q,i)=><fieldset key={q.key}><legend><small>0{i+1}</small>{q.label}</legend>{q.options.map(o=><button key={o} type="button" data-qa-action={`select-${q.key}`} aria-pressed={values[q.key]===o} onClick={()=>{setters[q.key](o);setCalibrated(false)}}>{o}</button>)}</fieldset>)}<button className="calibrate-button" data-qa-action="calibrate" onClick={calibrate}>Calibrate my ride <span>↗</span></button></div>
            <div className="mobile-questions"><p>Question {step+1} / 3</p><fieldset><legend>{questions[step].label}</legend>{questions[step].options.map(o=><button key={o} type="button" data-qa-action={`mobile-${questions[step].key}`} aria-pressed={values[questions[step].key]===o} onClick={()=>{setters[questions[step].key](o);setCalibrated(false)}}>{o}<span>{values[questions[step].key]===o?'●':'○'}</span></button>)}</fieldset><div><button onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0}>Back</button><button data-qa-action="mobile-next" onClick={mobileNext}>{step===2?'Calibrate':'Next'} →</button></div></div>
            <div className={`result ${calibrated?'ready':''}`} aria-live="polite"><p>{calibrated?'Recommendation / ready':'Live input / preview'}</p><div><strong>VECTOR {calibrated?recommendation.toUpperCase():'—'}</strong><span>{calibrated?editions[recommendation].signal:'Complete three inputs'}</span></div>{calibrated&&<><dl><div><dt>Surface</dt><dd>{terrain}</dd></div><div><dt>Strike</dt><dd>{strike}</dd></div><div><dt>Ride</dt><dd>{ride}</dd></div></dl><p>{recommendation==='Route'?'Mixed surfaces prioritize mapped traction and lateral stability.':recommendation==='Tempo'?'Your quicker ride inputs favor lower mass and a firmer forefoot response.':'Your inputs point to the balanced daily chassis for repeatable volume.'}</p><a href="#fit">Continue with {recommendation} ↘</a></>}</div>
          </div>
        </div>
      </section>

      <section className="evidence" aria-labelledby="evidence-title"><div><p className="eyebrow">02 / Road file</p><h2 id="evidence-title">Pressure leaves a trace.</h2><p>{terrains[terrain].note}</p></div><div className="trace"><span>Rear / mid / fore</span><strong>{terrains[terrain].trace}</strong><i/><small>Illustrative pressure distribution</small></div><div className="terrain-switch" aria-label="Surface evidence">{Object.keys(terrains).map(x=><button data-qa-action="terrain-evidence" aria-pressed={terrain===x} onClick={()=>setTerrain(x)} key={x}>{x}<small>{terrains[x].grip}</small></button>)}</div></section>

      <section className="editions" id="editions" aria-labelledby="editions-title"><header className="section-head"><p className="eyebrow">03 / Editions</p><h2 id="editions-title">Same last. Three intentions.</h2><p>Select an edition to promote it into your reservation ticket.</p></header><div className="edition-grid">{Object.entries(editions).map(([name,x],i)=><article className={edition===name?'selected':''} key={name}><header><span>0{i+1}</span><h3>{name}</h3><button data-qa-action="edition-select" aria-pressed={edition===name} onClick={()=>setEdition(name)}>{edition===name?'Selected':'Select'} <span>↗</span></button></header><p>{x.use}</p><dl><div><dt>Stack</dt><dd>{x.stack}</dd></div><div><dt>Mass</dt><dd>{x.mass}</dd></div><div><dt>Drop</dt><dd>{x.drop}</dd></div></dl><strong>{x.price}</strong></article>)}</div><div className="mobile-edition-ticket"><span>Field ticket / selected</span><strong>VECTOR {edition.toUpperCase()}</strong><p>{editions[edition].use} · {editions[edition].mass} · {editions[edition].stack}</p></div></section>

      <section className="build-section" id="build" aria-labelledby="build-title"><div className="build-title"><p className="eyebrow">04 / Build register</p><h2 id="build-title">Less shoe where the foot needs freedom.<br/><span>More system where force needs a path.</span></h2></div><ol><li><span>01</span><strong>Air-mapped mono-knit</strong><p>Ventilation follows thermal zones; denser yarn wraps the midfoot.</p></li><li><span>02</span><strong>Split composite wing</strong><p>Guidance without a full rigid plate across the entire forefoot.</p></li><li><span>03</span><strong>Two-part foam bed</strong><p>Soft landing geometry sits above a firmer, stable carrier.</p></li><li><span>04</span><strong>Pressure-mapped rubber</strong><p>Coverage where the test outsole records repeat abrasion.</p></li></ol></section>

      <section className="fit-section" id="fit" aria-labelledby="fit-title"><div className="fit-handoff"><p className="eyebrow">05 / Fit reservation</p><h2 id="fit-title">Take the calibration into your first run.</h2><p>Selected edition</p><strong>VECTOR {edition.toUpperCase()}</strong><dl><div><dt>Use</dt><dd>{editions[edition].use}</dd></div><div><dt>Stack</dt><dd>{editions[edition].stack}</dd></div><div><dt>Price</dt><dd>{editions[edition].price}</dd></div></dl><small>Fit guidance is a starting point. Foot shape, socks and personal preference still matter.</small></div>{reserved?<div className="confirmation" role="status"><span>FIT FILE / V01–628</span><h3>Pair held for 24 hours.</h3><p>Your local demo reservation for Vector {edition} is ready. No payment or external request was made.</p><button onClick={()=>setReserved(false)}>Start another reservation</button></div>:<form noValidate onSubmit={submit}><label>Runner name<input name="name" autoComplete="name"/></label><label>Email<input name="email" type="email" autoComplete="email"/></label><label>Preferred size<select name="size" defaultValue=""><option value="">Select size</option><option>US 8</option><option>US 9</option><option>US 10</option><option>US 11</option></select></label>{formError&&<p className="error" role="alert">{formError}</p>}<button className="reserve" data-qa-action="reserve-submit">Reserve {edition} <span>↗</span></button><small>Demo form — nothing is submitted.</small></form>}</section>
    </main>
    <footer><a className="brand" href="#top">V<span>∕</span>01</a><p>Performance, calibrated.</p><div><a href="#lab">Lab</a><a href="#fit">Fit</a><span>© 2027 Vector Lab</span></div></footer>
  </>
}
