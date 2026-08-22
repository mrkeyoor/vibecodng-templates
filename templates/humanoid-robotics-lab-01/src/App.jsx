import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import RobotScene from './RobotScene.jsx'

const tasks = {
  tote:{label:'Carry',detail:'12 kg tote / mapped aisle',cycle:44},
  inspect:{label:'Inspect',detail:'Gauge face / close vision',cycle:29},
  kit:{label:'Kit',detail:'Eight parts / sequenced bins',cycle:51}
}
const cues = [
  {id:'teach',verb:'WAKE',number:'01',line:'Find the floor. Register the room.'},
  {id:'perceive',verb:'LOOK',number:'02',line:'Separate object, person and path.'},
  {id:'execute',verb:'REACH',number:'03',line:'Move with force that can yield.'},
  {id:'verify',verb:'PROVE',number:'04',line:'Replay the cycle. Sign the stop.'}
]
const sensorData={
  vision:{label:'Vision',value:'18 m',copy:'Context before motion.'},
  depth:{label:'Depth',value:'±12 mm',copy:'Space before reach.'},
  force:{label:'Force',value:'0.7 N',copy:'Contact before grip.'}
}
const asset=file=>`${import.meta.env.BASE_URL}${file}`

export default function App(){
  const [task,setTask]=useState('tote')
  const [phase,setPhase]=useState('teach')
  const [sensor,setSensor]=useState('vision')
  const [floor,setFloor]=useState('Mapped aisle')
  const [object,setObject]=useState('12 kg tote')
  const [shift,setShift]=useState('One shift')
  const [errors,setErrors]=useState({})
  const [sent,setSent]=useState(false)
  const [wide,setWide]=useState(()=>typeof window!=='undefined'&&window.matchMedia('(min-width: 621px)').matches)
  const [heroVisible,setHeroVisible]=useState(true)
  const heroRef=useRef(null)
  const activeCue=cues.find(item=>item.id===phase)
  const activeTask=tasks[task]
  const readiness=useMemo(()=>82+(floor==='Fixed cell'?7:0)+(object==='Inspection tool'?3:0)-(shift==='Continuous'?4:0),[floor,object,shift])
  const ticket=`AX-${task.slice(0,2).toUpperCase()}-${readiness}`

  useEffect(()=>{
    let frame=0
    const update=()=>{
      frame=0
      const hero=heroRef.current
      const range=Math.max(1,hero?.offsetHeight||innerHeight)
      const p=Math.min(1,Math.max(0,scrollY/range))
      document.documentElement.style.setProperty('--scroll-score',p.toFixed(4))
    }
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)}
    update();addEventListener('scroll',scroll,{passive:true})
    return()=>{removeEventListener('scroll',scroll);if(frame)cancelAnimationFrame(frame)}
  },[])

  useEffect(()=>{
    const query=window.matchMedia('(min-width: 621px)')
    const sync=()=>setWide(query.matches)
    query.addEventListener('change',sync)
    const observer=new IntersectionObserver(([entry])=>setHeroVisible(entry.isIntersecting),{rootMargin:'160px 0px'})
    if(heroRef.current)observer.observe(heroRef.current)
    return()=>{query.removeEventListener('change',sync);observer.disconnect()}
  },[])

  function submit(event){
    event.preventDefault();const data=new FormData(event.currentTarget);const next={}
    if(!String(data.get('name')||'').trim())next.name='Add a contact name.'
    if(!/^\S+@\S+\.\S+$/.test(String(data.get('email')||'')))next.email='Add a valid work email.'
    setErrors(next);setSent(Object.keys(next).length===0)
  }

  return <div className="kinetic-shell">
    <a className="skip" href="#main">Skip to movement score</a>
    <header className="kinetic-nav">
      <a className="kinetic-brand" href="#top" aria-label="Axiom home"><i>AX</i><span>AXIOM / BODY LAB</span></a>
      <nav aria-label="Primary"><a href="#score">Score</a><a href="#field">Field</a><a href="#stop">Stop</a></nav>
      <span className="nav-state"><b/>BODY ONLINE / {activeCue.number}</span>
      <a data-qa-action="jump-evaluation" className="nav-ticket" href="#evaluation">First shift ↘</a>
    </header>

    <main id="main">
      <section ref={heroRef} className={`wake-stage cue-${phase}`} id="top" aria-labelledby="hero-title">
        <div className="wake-grid" aria-hidden="true"/>
        <p className="wake-kicker">EMBODIED AUTONOMY / MOVEMENT SCORE 01</p>
        <h1 id="hero-title"><span>WORK</span><span>HAS A</span><em>BODY.</em></h1>
        <div className="wake-canvas">
          {wide&&heroVisible?<RobotScene phase={phase} task={task} world="orange"/>:null}
          <div className={`mobile-robot-fallback pose-${phase} task-${task}`} aria-hidden="true"><i className="bot-head"/><i className="bot-torso"/><i className="bot-pelvis"/><i className="bot-arm bot-arm-left"/><i className="bot-arm bot-arm-right"/><i className="bot-leg bot-leg-left"/><i className="bot-leg bot-leg-right"/><i className="bot-target"/><i className="bot-scan"/></div>
        </div>
        <AnimatePresence mode="wait"><motion.div className="active-verb" key={phase} initial={{y:20}} animate={{y:0}} exit={{y:-20}}><span>{activeCue.number}</span><b>{activeCue.verb}</b><small>{activeCue.line}</small></motion.div></AnimatePresence>
        <div className="wake-tools">
          <div className="task-switch" role="group" aria-label="Choose work"><span>DIRECT THE BODY</span>{Object.entries(tasks).map(([id,item])=><button data-qa-action="task-select" key={id} aria-pressed={task===id} onClick={()=>{setTask(id);setPhase('teach')}}><b>{item.label}</b><small>{item.detail}</small></button>)}</div>
          <div className="cue-switch" role="group" aria-label="Movement cue">{cues.map(item=><button data-qa-action="cue-select" key={item.id} aria-pressed={phase===item.id} aria-label={`Cue ${item.verb}`} onClick={()=>setPhase(item.id)}><span>{item.number}</span><b>{item.verb}</b></button>)}</div>
        </div>
        <p className="wake-note">Illustrative machine / no live performance claims</p>
      </section>

      <section className="score" id="score" aria-labelledby="score-title">
        <div className="score-word" aria-hidden="true">{activeCue.verb}</div>
        <header><p>01 / MOVEMENT SCORE</p><h2 id="score-title">Four cues.<br/>One useful body.</h2><span>{activeTask.label} / {phase==='verify'?activeTask.cycle-3:activeTask.cycle}.8 sec</span></header>
        <ol>{cues.map(item=><li key={item.id} className={phase===item.id?'active':''}><button data-qa-action="cue-select" onClick={()=>setPhase(item.id)} aria-current={phase===item.id?'step':undefined}><span>{item.number}</span><b>{item.verb}</b><small>{item.line}</small></button></li>)}</ol>
        <div className="score-pulse" aria-live="polite"><span>NOW</span><b>{activeCue.verb} / {activeTask.label}</b><small>{phase==='verify'?'SIMULATED CYCLE SIGNED':'CUE WAITING'}</small></div>
      </section>

      <section className="scale-scene" aria-labelledby="scale-title">
        <img src={asset('robotics-calibration.webp')} width="1600" height="960" fetchPriority="high" alt="Humanoid robot in a fictional calibration bay with two observers"/>
        <div className="scale-curtain"><p>02 / HUMAN SCALE</p><h2 id="scale-title">IT<br/>STANDS<br/>HERE.</h2><span>1.74 m / composite + aluminium</span></div>
        <p className="scale-caption">Not an interface pretending to be a body.<br/>A body learning the room.</p>
      </section>

      <section className={`sense sense-${sensor}`} aria-labelledby="sense-title">
        <div className="sense-orbit" aria-hidden="true"><i/><i/><i/><b/></div>
        <div className="sense-copy"><p>03 / SENSE FIELD</p><h2 id="sense-title">THE ROOM<br/>LOOKS BACK.</h2><div role="tablist" aria-label="Sensor channel">{Object.entries(sensorData).map(([id,item])=><button role="tab" data-qa-action="sensor-select" aria-selected={sensor===id} key={id} onClick={()=>setSensor(id)}>{item.label}</button>)}</div><motion.div role="tabpanel" key={sensor} initial={{opacity:.2,x:18}} animate={{opacity:1,x:0}}><strong>{sensorData[sensor].value}</strong><span>{sensorData[sensor].copy}</span></motion.div></div>
      </section>

      <section className="field-scene" id="field" aria-labelledby="field-title">
        <img src={asset('robotics-workcell.webp')} width="1600" height="960" alt="Fictional humanoid carrying a tote through an industrial aisle"/>
        <div className="field-title"><p>04 / OUTSIDE WORLD</p><h2 id="field-title">TAKE<br/>THE FLOOR.</h2></div>
        <div className="field-transcript"><span>08:42 / PATH OPEN</span><span>08:43 / BODY MOVING</span><span>08:44 / HUMAN YIELDS</span><span>08:45 / PLACE SIGNED</span></div>
      </section>

      <section className="touch-scene" aria-labelledby="touch-title">
        <div><p>05 / TOUCH</p><h2 id="touch-title">Force should<br/>have manners.</h2><span>0.7 N minimum illustrated contact</span></div>
        <img src={asset('robotics-gripper.webp')} width="1600" height="960" alt="Macro view of an articulated robotic hand touching a calibration cylinder"/>
      </section>

      <section className="stop-scene" id="stop" aria-labelledby="stop-title">
        <p>06 / THE STOPPING RITUAL</p><h2 id="stop-title"><span>SEE.</span><span>YIELD.</span><em>STOP.</em></h2>
        <div className="stop-distance"><i/><div><small>APPROACH</small><b>1.2 m/s</b></div><div><small>REACTION</small><b>84 ms</b></div><div><small>STOP</small><b>0.31 m</b></div></div>
        <p className="stop-note">The best movement ends exactly where it should.</p>
      </section>

      <section className="shift-stage" id="evaluation" aria-labelledby="shift-title">
        <header><p>07 / FIRST SHIFT</p><h2 id="shift-title">Score the room.<br/>Tear off the ticket.</h2></header>
        <form onSubmit={submit} noValidate>
          <fieldset><legend>Floor</legend>{['Mapped aisle','Fixed cell','Mixed human zone'].map(v=><label key={v}><input data-qa-action="profile-floor" type="radio" name="floor" checked={floor===v} onChange={()=>setFloor(v)}/><span>{v}</span></label>)}</fieldset>
          <fieldset><legend>Object</legend>{['12 kg tote','Inspection tool','Parts kit'].map(v=><label key={v}><input data-qa-action="profile-object" type="radio" name="object" checked={object===v} onChange={()=>setObject(v)}/><span>{v}</span></label>)}</fieldset>
          <fieldset><legend>Rhythm</legend>{['One shift','Two shifts','Continuous'].map(v=><label key={v}><input data-qa-action="profile-shift" type="radio" name="shift" checked={shift===v} onChange={()=>setShift(v)}/><span>{v}</span></label>)}</fieldset>
          <div className="shift-contact"><label><span>Contact name</span><input name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name?'name-error':undefined}/>{errors.name&&<small id="name-error">{errors.name}</small>}</label><label><span>Work email</span><input type="email" name="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email?'email-error':undefined}/>{errors.email&&<small id="email-error">{errors.email}</small>}</label></div>
          <button className="log-shift" data-qa-action="evaluation-submit">Log the first shift ↗</button>
        </form>
        <aside className="shift-ticket" aria-live="polite"><div><span>AXIOM / FIRST SHIFT</span><b>{ticket}</b></div><strong>{readiness}<small>/100</small></strong><p>ILLUSTRATIVE READINESS</p><dl><div><dt>Floor</dt><dd>{floor}</dd></div><div><dt>Object</dt><dd>{object}</dd></div><div><dt>Rhythm</dt><dd>{shift}</dd></div><div><dt>Stop mode</dt><dd>{floor==='Mixed human zone'?'Collaborative':'Guarded'}</dd></div></dl>{sent?<motion.section role="status" initial={{scale:.9,rotate:-3}} animate={{scale:1,rotate:-3}}><b>FIELD NOTE LOGGED</b><span>{ticket}</span></motion.section>:<small>Complete the score to stamp this fictional field note.</small>}</aside>
      </section>
    </main>
    <footer><a href="#top">AXIOM / BODY LAB</a><p>A body for work. A stop for people.</p><a href="#top">Wake again ↑</a></footer>
  </div>
}
