import{useMemo,useState}from'react'
import CompositingTimeline from'./CompositingTimeline.jsx'

const shots=[
  {id:'A01',title:'Arrival',time:'00:00:08:12',image:'still-arrival.webp',alt:'A lone figure enters a rain-dark brutalist signal observatory',note:'Hold the architecture. Let the character arrive small.',lens:'40 mm',layer:'Practical set + sky extension'},
  {id:'A14',title:'Signal',time:'00:00:41:03',image:'still-signal.webp',alt:'Concentric milk-glass signal rings glow inside a concrete chamber',note:'The source feels built, heavy and almost possible.',lens:'28 mm',layer:'Practical light + environment composite'},
  {id:'B07',title:'Crossing',time:'00:01:19:18',image:'still-crossing.webp',alt:'A figure runs across a wet concrete bridge beneath a luminous observatory',note:'Urgency comes from distance, not camera shake.',lens:'32 mm',layer:'Wet-down + structure extension'}
]
const promptSets=[
  {key:'format',legend:'What are we making?',options:['Brand film','Title sequence','Short narrative']},
  {key:'tone',legend:'What should remain after the cut?',options:['Quiet tension','Physical wonder','Kinetic unease']},
  {key:'need',legend:'Where should we enter?',options:['Direction + production','VFX + finishing','Full assembly']}
]
const ledger=[
  ['Development','Treatment · visual language · previs','02—04 weeks'],
  ['Production','Directing · live action · virtual production','Scope-led'],
  ['Image craft','VFX supervision · compositing · CG','Shot-led'],
  ['Finish','Edit · grade · titles · delivery','01—03 weeks']
]
const Arrow=()=> <span aria-hidden="true">↗</span>

export default function App(){
  const[shot,setShot]=useState(0),[started,setStarted]=useState(false),[step,setStep]=useState(0),[choices,setChoices]=useState({format:'Brand film',tone:'Quiet tension',need:'Full assembly'}),[assembled,setAssembled]=useState(false),[plate,setPlate]=useState('final'),[error,setError]=useState(''),[sent,setSent]=useState(false)
  const current=shots[shot]
  const code=useMemo(()=>`${choices.format.slice(0,2).toUpperCase()}-${choices.tone.slice(0,2).toUpperCase()}-26`,[choices])
  const selectShot=i=>setShot((i+shots.length)%shots.length)
  const start=()=>{setStarted(true);document.getElementById('treatment')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
  const next=()=>step<2?setStep(s=>s+1):setAssembled(true)
  const submit=e=>{e.preventDefault();const form=e.currentTarget;if(!form.checkValidity()){setError('Add your name, a valid email, project window and confirm the sample-data note.');form.querySelector(':invalid')?.focus();return}setError('');setSent(true)}
  return <>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Cutline Assembly home"><span>CA</span><b>CUTLINE<br/>ASSEMBLY</b></a>
      <p className="status"><i/> Stage 03 / grading</p>
      <nav aria-label="Primary"><a href="#reel">Reel</a><a href="#treatment">Treatment</a><a href="#craft">Craft</a></nav>
      <a className="contact-link" href="#contact">Start a production <Arrow/></a>
    </header>

    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="monitor hero-monitor">
          <img src={current.image} width="1587" height="991" fetchPriority="high" alt={current.alt}/>
          <div className="safe-area" aria-hidden="true"/>
          <span className="rec"><i/> REC 01</span><span className="timecode">{current.time}</span>
          <div className="monitor-caption"><small>{current.id} / {current.lens}</small><strong>{current.title}</strong></div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Independent film + visual effects / London</p>
          <h1 id="hero-title">We find the<br/><span>frame that holds.</span></h1>
          <p>Direction, production and image craft assembled as one working cut—from the first treatment to the final frame.</p>
          <div><button className="action" data-qa-action="start-treatment" onClick={start}>Assemble a treatment <Arrow/></button><a href="#reel">Watch the thinking ↓</a></div>
        </div>
        <aside className="shot-queue" aria-label="Current reel shots">
          <header><span>Rushes / 03</span><span>Signal study</span></header>
          {shots.map((s,i)=><button key={s.id} data-qa-action="shot-select" aria-pressed={shot===i} onClick={()=>selectShot(i)}><small>{s.id}</small><span>{s.title}</span><time>{s.time.slice(-5)}</time></button>)}
          <footer>Sample project / fictional production</footer>
        </aside>
      </section>

      <section id="reel" className="reel-section" aria-labelledby="reel-title">
        <header className="section-head"><div><p className="eyebrow">01 / Working reel</p><h2 id="reel-title">The cut is a decision.</h2></div><p>Three frames. One signal. Move through the sequence and see how production intent changes with every selection.</p></header>
        <div className="reel-stage">
          <figure className="selected-shot">
            <img src={current.image} width="1587" height="991" alt=""/>
            <figcaption><span>{current.id} · {current.title}</span><blockquote>“{current.note}”</blockquote><dl><div><dt>Lens</dt><dd>{current.lens}</dd></div><div><dt>Build</dt><dd>{current.layer}</dd></div></dl></figcaption>
          </figure>
          <div className="mobile-shot-controls"><button data-qa-action="shot-prev" aria-label="Previous shot" onClick={()=>selectShot(shot-1)}>←</button><span>Shot {shot+1} / {shots.length}</span><button data-qa-action="shot-next" aria-label="Next shot" onClick={()=>selectShot(shot+1)}>→</button></div>
          <div className="film-rail" role="group" aria-label="Reel timeline">{shots.map((s,i)=><button key={s.id} data-qa-action="timeline-frame" className={shot===i?'active':''} aria-pressed={shot===i} onClick={()=>selectShot(i)}><span className="perfs" aria-hidden="true"/><img src={s.image} width="1587" height="991" alt=""/><b>{s.id}</b><time>{s.time}</time></button>)}</div>
        </div>
      </section>

      <section id="treatment" className="treatment-section" aria-labelledby="treatment-title">
        <header className="treatment-intro"><p className="eyebrow">02 / Treatment desk</p><h2 id="treatment-title">Give the film a first shape.</h2><p>Not a quote generator. A useful first page for a conversation with a director, producer and VFX supervisor.</p></header>
        <div className={`treatment-console ${started?'started':''}`}>
          {!started?<button className="open-desk" onClick={()=>setStarted(true)}>Open the desk <Arrow/></button>:<div className="prompt-panel">
            <p>Prompt {Math.min(step+1,3)} / 03</p>
            {promptSets.map((group,i)=><fieldset key={group.key} className={step===i?'current':''}><legend>{group.legend}</legend>{group.options.map(option=><button type="button" key={option} data-qa-action={`treatment-${group.key}`} aria-pressed={choices[group.key]===option} onClick={()=>setChoices({...choices,[group.key]:option})}><span>{option}</span><i>{choices[group.key]===option?'Selected':'Choose'}</i></button>)}</fieldset>)}
            <div className="prompt-nav">{step>0&&<button onClick={()=>setStep(s=>s-1)}>Back</button>}<button data-qa-action="treatment-next" onClick={next}>{step===2?'Assemble treatment':'Next prompt'} <Arrow/></button></div>
          </div>}
          <aside className={`call-sheet ${assembled?'complete':''}`} aria-live="polite">
            <header><span>CUTLINE / TREATMENT</span><strong>{assembled?code:'— — —'}</strong></header>
            {assembled?<><div className="stamp">FIRST SHAPE</div><dl><div><dt>Format</dt><dd>{choices.format}</dd></div><div><dt>Emotional temperature</dt><dd>{choices.tone}</dd></div><div><dt>Studio entry</dt><dd>{choices.need}</dd></div><div><dt>Opening conversation</dt><dd>{choices.need==='VFX + finishing'?'VFX supervisor + producer':'Director + executive producer'}</dd></div></dl><p>Bring one reference you love, one you reject, and the constraint nobody has solved yet.</p><button onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>Carry to production desk <Arrow/></button></>:<><div className="empty-slate"><span>01</span><i/><span>24</span></div><p>Your decisions will resolve into a production-ready first page.</p></>}
          </aside>
        </div>
      </section>

      <CompositingTimeline/>

      <section id="craft" className="breakdown" aria-labelledby="breakdown-title">
        <div className="breakdown-copy"><p className="eyebrow">03 / Frame anatomy</p><h2 id="breakdown-title">Build the impossible from real light.</h2><p>The signal chamber begins as a practical source and a physical floor. We extend the architecture, retain lens behavior and grade the composite as one photographed place.</p><div className="breakdown-controls" role="group" aria-label="VFX comparison"><button data-qa-action="vfx-view" aria-pressed={plate==='plate'} onClick={()=>setPlate('plate')}>Photographed plate</button><button data-qa-action="vfx-view" aria-pressed={plate==='final'} onClick={()=>setPlate('final')}>Final composite</button></div><dl><div><dt>Practical</dt><dd>Milk-glass rings · wet floor · interactive light</dd></div><div><dt>Extension</dt><dd>Upper chamber · depth atmosphere · cable field</dd></div><div><dt>Finish</dt><dd>128 shots · ACES workflow · 4K master</dd></div></dl></div>
        <figure className={`vfx-frame ${plate}`}><img src="still-signal.webp" width="1586" height="992" alt="Signal chamber frame used to demonstrate a visual effects breakdown"/><div className="plate-mask"/><span>{plate==='plate'?'PLATE / 042':'FINAL / 128'}</span><figcaption>{plate==='plate'?'Practical source and floor photography':'Environment extension, atmosphere and final grade'}</figcaption></figure>
      </section>

      <section className="ledger" aria-labelledby="ledger-title">
        <header><p className="eyebrow">04 / Assembly model</p><h2 id="ledger-title">One room. Fewer handovers.</h2><p>Senior creative and production attention stays attached from treatment through delivery.</p></header>
        <div className="ledger-table" role="table" aria-label="Production capabilities" tabIndex="0"><div role="row" className="ledger-row labels"><span role="columnheader">Stage</span><span role="columnheader">Working scope</span><span role="columnheader">Typical window</span></div>{ledger.map((row,i)=><div role="row" className="ledger-row" key={row[0]}><span role="cell"><i>0{i+1}</i>{row[0]}</span><span role="cell">{row[1]}</span><span role="cell">{row[2]}</span></div>)}</div>
        <aside><span>Current window</span><strong>October / 01 production</strong><small>Illustrative availability for this template</small></aside>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div><p className="eyebrow">05 / Production handoff</p><h2 id="contact-title">Bring us the part that still feels unresolved.</h2><p>Share the working truth, not a polished pitch. We will return with the right first conversation.</p>{assembled&&<div className="carried-brief"><span>Attached treatment</span><strong>{code}</strong><p>{choices.format} / {choices.tone} / {choices.need}</p></div>}</div>
        {sent?<div className="success" role="status"><span>TRANSFER COMPLETE</span><strong>CA–2608</strong><h3>Your first frame is with us.</h3><p>A producer will reply within two working days with a suggested room and next step.</p></div>:<form noValidate onSubmit={submit}>
          <label>Name<input name="name" required autoComplete="name"/></label>
          <label>Email<input name="email" required type="email" autoComplete="email"/></label>
          <label>Production window<select name="window" required defaultValue=""><option value="" disabled>Select a window</option><option>Within 8 weeks</option><option>2—4 months</option><option>Exploring / no date</option></select></label>
          <label>What remains unresolved?<textarea name="note" required rows="4"/></label>
          <label className="check"><input required type="checkbox"/><span>I understand this is a fictional studio template and availability shown above is illustrative.</span></label>
          {error&&<p className="form-error" role="alert">{error}</p>}
          <button className="action" data-qa-action="contact-submit">Transfer to production <Arrow/></button>
        </form>}
      </section>
    </main>
    <footer><a href="#top">CUTLINE / ASSEMBLY</a><p>Direction · Production · VFX · Finish</p><span>Sample studio / © 2026</span><a href="#top">Return to monitor ↑</a></footer>
  </>
}
