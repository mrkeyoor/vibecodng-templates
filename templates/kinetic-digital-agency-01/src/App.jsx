import { useEffect, useMemo, useRef, useState } from 'react'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from, to, progress) => from + (to - from) * progress

const cases = [
  { name:'NO/STATIC', type:'Category creation · Culture', image:'world-red.webp', tone:'red', result:'+412%', label:'branded search', copy:'We turned an invisible audio platform into a public argument about who gets heard.' },
  { name:'DEEP/END', type:'Global launch · Technology', image:'world-blue.webp', tone:'blue', result:'8.7×', label:'launch velocity', copy:'One product truth, forty-six market signals, and a launch system that learned in public.' },
  { name:'SUN/ROOM', type:'Repositioning · Hospitality', image:'world-yellow.webp', tone:'yellow', result:'−38%', label:'cost per booking', copy:'We stopped selling rooms and started owning the three hours everyone wanted to feel.' },
]

const goals = [
  { id:'fame', label:'Build fame', multiplier:1.25, roas:3.2 },
  { id:'demand', label:'Create demand', multiplier:1.65, roas:4.1 },
  { id:'launch', label:'Launch fast', multiplier:1.4, roas:3.7 },
]

const channelList = ['Search','Social','Creators','Cinema']

export default function App() {
  const journeyRef = useRef(null)
  const [menu, setMenu] = useState(false)
  const [brief, setBrief] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [phase, setPhase] = useState(0)
  const [caseIndex, setCaseIndex] = useState(0)
  const [goal, setGoal] = useState('demand')
  const [budget, setBudget] = useState(40)
  const [intensity, setIntensity] = useState(2)
  const [channels, setChannels] = useState(['Search','Social','Creators'])

  const activeGoal = goals.find(item => item.id === goal)
  const projection = useMemo(() => {
    const channelFactor = .72 + channels.length * .19
    return {
      reach: Math.round(budget * 91000 * channelFactor * (1 + intensity * .12)),
      actions: Math.round(budget * 14.5 * activeGoal.multiplier * channelFactor),
      roas: (activeGoal.roas + channels.length * .18 + intensity * .22).toFixed(1),
    }
  }, [activeGoal, budget, channels, intensity])

  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    let lastPhase = -1
    const update = () => {
      frame = 0
      const story = journeyRef.current
      const total = Math.max(1, root.scrollHeight - innerHeight)
      root.style.setProperty('--page', (scrollY / total).toFixed(4))
      if (!story) return
      const progress = clamp((scrollY - story.offsetTop) / Math.max(1, story.offsetHeight - innerHeight))
      const a = clamp(progress / .31)
      const b = clamp((progress - .31) / .35)
      const c = clamp((progress - .66) / .34)
      let x = mix(0, -27, a), y = mix(0, 5, a), r = mix(0, -19, a), s = mix(1, .72, a)
      if (progress > .31) { x = mix(-27, 28, b); y = mix(5, -7, b); r = mix(-19, 22, b); s = mix(.72, .86, b) }
      if (progress > .66) { x = mix(28, 0, c); y = mix(-7, 8, c); r = mix(22, 0, c); s = mix(.86, .68, c) }
      root.style.setProperty('--journey', progress.toFixed(4))
      root.style.setProperty('--red-scene', (1 - clamp((progress - .2) / .18)).toFixed(4))
      root.style.setProperty('--blue-scene', (clamp((progress - .17) / .18) * (1 - clamp((progress - .55) / .18))).toFixed(4))
      root.style.setProperty('--yellow-scene', clamp((progress - .57) / .2).toFixed(4))
      root.style.setProperty('--copy-a', (1 - clamp((progress - .16) / .1)).toFixed(4))
      root.style.setProperty('--copy-b', (clamp((progress - .25) / .08) * (1 - clamp((progress - .56) / .09))).toFixed(4))
      root.style.setProperty('--copy-c', clamp((progress - .68) / .08).toFixed(4))
      root.style.setProperty('--engine-x', `${x.toFixed(2)}vw`)
      root.style.setProperty('--engine-y', `${y.toFixed(2)}vh`)
      root.style.setProperty('--engine-r', `${r.toFixed(2)}deg`)
      root.style.setProperty('--engine-s', s.toFixed(4))
      root.style.setProperty('--shutter', `${(6 + progress * 88).toFixed(2)}%`)
      const nextPhase = progress < .28 ? 0 : progress < .64 ? 1 : 2
      if (nextPhase !== lastPhase) { lastPhase = nextPhase; setPhase(nextPhase) }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting)), { threshold:.14 })
    document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node))
    update()
    addEventListener('scroll', onScroll, { passive:true })
    addEventListener('resize', onScroll)
    return () => { observer.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menu || brief ? 'hidden' : ''
    const onKey = event => { if (event.key === 'Escape') { setMenu(false); setBrief(false) } }
    addEventListener('keydown', onKey)
    return () => { document.body.style.overflow=''; removeEventListener('keydown', onKey) }
  }, [menu, brief])

  const openBrief = () => { setSubmitted(false); setBrief(true) }
  const toggleChannel = channel => setChannels(current => current.includes(channel) ? current.filter(item => item !== channel) : [...current, channel])
  const activeCase = cases[caseIndex]

  return <div className="experience">
    <div className="page-progress" aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Primary Three home"><i /><span>PRIMARY</span><b>/3</b></a>
      <nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#lab">Campaign lab</a><a href="#capabilities">Capabilities</a></nav>
      <div className="top-actions"><button type="button" onClick={() => setMenu(true)}>Index</button><button className="brief-button" type="button" onClick={openBrief}>Start a signal ↗</button></div>
    </header>

    {menu && <div className="menu" role="dialog" aria-modal="true" aria-label="Site index">
      <button type="button" onClick={() => setMenu(false)}>Close ×</button><p>PRIMARY/3 / INDEX</p>
      <nav><a href="#work" onClick={() => setMenu(false)}>01 — Proof</a><a href="#lab" onClick={() => setMenu(false)}>02 — Campaign machine</a><a href="#capabilities" onClick={() => setMenu(false)}>03 — What we move</a></nav>
      <div><span>DELHI</span><span>LONDON</span><span>EVERY FEED</span></div>
    </div>}

    <main id="top">
      <section className="journey" ref={journeyRef} aria-label="PRIMARY/3 campaign signal journey">
        <div className="stage">
          <div className="world world-red" aria-hidden="true"><img src="world-red.webp" alt="" fetchPriority="high" /></div>
          <div className="world world-blue" aria-hidden="true"><img src="world-blue.webp" alt="" /></div>
          <div className="world world-yellow" aria-hidden="true"><img src="world-yellow.webp" alt="" /></div>
          <div className="world-wash" aria-hidden="true" />
          <div className="shutter shutter-a" aria-hidden="true" /><div className="shutter shutter-b" aria-hidden="true" />
          <div className="scan-grid" aria-hidden="true" /><div className="grain" aria-hidden="true" />
          <div className="signal-orb orb-one" aria-hidden="true" /><div className="signal-orb orb-two" aria-hidden="true" /><div className="signal-orb orb-three" aria-hidden="true" />

          <article className="stage-copy copy-a">
            <p><span>01</span> Digital growth / without beige</p>
            <h1>DON'T<br />FIT <i>THE</i><br />FEED.</h1>
            <div><p>We make brands impossible to scroll past—and harder to forget after the screen goes dark.</p><button type="button" onClick={openBrief}>Interrupt the pattern ↗</button></div>
          </article>
          <article className="stage-copy copy-b">
            <p><span>02</span> Attention architecture</p><h2>Built to<br /><i>break habit.</i></h2>
            <p>Culture first. Data underneath. Every color, frame and placement engineered to create a second look.</p>
            <dl><div><dt>03</dt><dd>primary forces</dd></div><div><dt>01</dt><dd>sharp position</dd></div><div><dt>∞</dt><dd>possible signals</dd></div></dl>
          </article>
          <article className="stage-copy copy-c">
            <p><span>03</span> Compounding signal</p><h2>Make the<br /><i>algorithm</i><br />remember.</h2>
            <p>One campaign becomes a learning system: every response sharpens the next creative decision.</p>
          </article>

          <div className="engine" aria-hidden="true"><div className="engine-glow" /><img src="signal-engine.webp" alt="" /></div>
          <div className="engine-echo echo-left" aria-hidden="true"><img src="signal-engine.webp" alt="" /></div>
          <div className="engine-echo echo-right" aria-hidden="true"><img src="signal-engine.webp" alt="" /></div>
          <div className="stage-data" aria-label={`Campaign phase ${phase + 1} of 3`}><span>LIVE SIGNAL</span><b>{['DISTINCTIVENESS','VELOCITY','COMPOUNDING'][phase]}</b><i /><em>0{phase + 1} / 03</em></div>
        </div>
      </section>

      <section className="manifesto" data-reveal><p>Not full service / full consequence</p><h2>We don't fill<br />the content calendar.<br /><i>We change what it can do.</i></h2><div><span>POSITION</span><span>CAMPAIGN</span><span>MEDIA</span><span>MEASUREMENT</span></div></section>

      <section id="work" className={`work tone-${activeCase.tone}`}>
        <header data-reveal><p>01 / Selected interference</p><h2>Proof that<br /><i>stays loud.</i></h2><span>Three signals / three markets</span></header>
        <div className="case-stage" data-reveal><img src={activeCase.image} alt={`${activeCase.name} campaign world`} /><div className="case-overlay" /><div className="case-copy"><p>{activeCase.type}</p><h3>{activeCase.name}</h3><span>{activeCase.copy}</span></div><div className="case-result"><strong>{activeCase.result}</strong><span>{activeCase.label}</span></div></div>
        <div className="case-tabs" role="group" aria-label="Case studies">{cases.map((item,index)=><button key={item.name} type="button" className={caseIndex===index?'active':''} aria-pressed={caseIndex===index} onClick={()=>setCaseIndex(index)}><span>0{index+1}</span><b>{item.name}</b><em>↗</em></button>)}</div>
      </section>

      <section id="lab" className="lab">
        <header data-reveal><p>02 / Campaign machine</p><h2>Build a<br /><i>live signal.</i></h2><span>Directional model / not a media quote</span></header>
        <div className="lab-grid">
          <div className="lab-controls" data-reveal>
            <fieldset><legend>01 / What must move?</legend><div className="goal-buttons">{goals.map(item=><button key={item.id} type="button" className={goal===item.id?'active':''} aria-pressed={goal===item.id} onClick={()=>setGoal(item.id)}>{item.label}</button>)}</div></fieldset>
            <fieldset><legend>02 / Working media / ${budget}k</legend><input aria-label="Working media budget in thousands" type="range" min="10" max="100" step="5" value={budget} onChange={event=>setBudget(Number(event.target.value))} /><div className="range-label"><span>$10K</span><span>$100K</span></div></fieldset>
            <fieldset><legend>03 / Creative intensity</legend><div className="intensity">{[1,2,3].map(value=><button key={value} type="button" className={intensity===value?'active':''} aria-pressed={intensity===value} onClick={()=>setIntensity(value)}><i style={{height:`${value*33}%`}} />0{value}</button>)}</div></fieldset>
            <fieldset><legend>04 / Signal mix</legend><div className="channels">{channelList.map(channel=><button key={channel} type="button" className={channels.includes(channel)?'active':''} aria-pressed={channels.includes(channel)} onClick={()=>toggleChannel(channel)}>{channel}<span>{channels.includes(channel)?'ON':'OFF'}</span></button>)}</div></fieldset>
          </div>
          <div className="projection" data-reveal>
            <div className="projection-orbit" aria-hidden="true"><img src="signal-engine.webp" alt="" /></div>
            <p>PROJECTED / 90 DAYS</p><h3>{activeGoal.label}</h3>
            <div className="projection-grid"><article><strong>{(projection.reach/1000000).toFixed(1)}M</strong><span>qualified reach</span></article><article><strong>{projection.actions.toLocaleString()}</strong><span>high-intent actions</span></article><article><strong>{projection.roas}×</strong><span>modelled return</span></article></div>
            <small>Model responds to your objective, budget, intensity and active channel mix. Directional only.</small>
            <button type="button" onClick={openBrief}>Turn this into a brief ↗</button>
          </div>
        </div>
      </section>

      <section id="capabilities" className="capabilities">
        <header data-reveal><p>03 / What we move</p><h2>One studio.<br /><i>Three forces.</i></h2></header>
        <div className="cap-grid">
          <article className="cap-red" data-reveal><span>R / 01</span><h3>Position</h3><p>Category tension, cultural role, verbal identity, launch narrative.</p><b>MAKE IT MEAN SOMETHING.</b></article>
          <article className="cap-blue" data-reveal><span>B / 02</span><h3>System</h3><p>Campaign worlds, motion grammar, creator formats, media architecture.</p><b>MAKE IT TRAVEL.</b></article>
          <article className="cap-yellow" data-reveal><span>Y / 03</span><h3>Growth</h3><p>Experiment design, channel learning, demand capture, live optimisation.</p><b>MAKE IT COMPOUND.</b></article>
        </div>
      </section>

      <section className="finale"><img src="campaign-world.webp" alt="Red, blue and yellow campaign universe" /><div className="finale-wash" /><div data-reveal><p>Next signal / yours</p><h2>BE<br />THE<br /><i>INTERRUPTION.</i></h2><button type="button" onClick={openBrief}>Start a project ↗</button></div></section>
      <section className="ticker" aria-label="PRIMARY/3 closing"><div aria-hidden="true"><span>MAKE NOISE / CREATE DEMAND /</span><span>MAKE NOISE / CREATE DEMAND /</span></div><p>Digital marketing for brands that refuse to become background.</p><a href="#top">Back to signal ↑</a></section>
    </main>

    <footer><a className="brand" href="#top"><i /><span>PRIMARY</span><b>/3</b></a><p>Independent digital growth studio.<br />Delhi / London / Everywhere.</p><nav><a href="#work">Work</a><a href="#lab">Lab</a><a href="#capabilities">Capabilities</a></nav><small>© 2026 PRIMARY/3</small></footer>

    {brief && <><button className="scrim" type="button" aria-label="Close project brief" onClick={()=>setBrief(false)} /><aside className="drawer" role="dialog" aria-modal="true" aria-label="Start a project">
      <button className="drawer-close" type="button" onClick={()=>setBrief(false)}>Close ×</button><p>PRIMARY/3 / NEW SIGNAL</p><h2>{submitted?'Signal received.':'What should become impossible to ignore?'}</h2>
      {submitted?<div className="success"><span>BRIEF / RECEIVED</span><p>We will review the ambition, not just the deliverables, and respond within two working days.</p><button type="button" onClick={()=>setBrief(false)}>Return to the signal</button></div>:<form onSubmit={event=>{event.preventDefault();setSubmitted(true)}}>
        <div className="field-pair"><label>Name<input type="text" required autoComplete="name" placeholder="Your name" /></label><label>Work email<input type="email" required autoComplete="email" placeholder="you@company.com" /></label></div>
        <label>What needs to move?<select value={goal} onChange={event=>setGoal(event.target.value)}>{goals.map(item=><option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <label>Company / brand<input type="text" required placeholder="Brand name" /></label>
        <label>The sharp version of the problem<textarea rows="4" required placeholder="What is changing, stuck, launching or being ignored?" /></label>
        <label className="consent"><input type="checkbox" required /><span>I agree to be contacted about this project.</span></label>
        <button className="submit" type="submit">Send the signal ↗</button>
      </form>}
    </aside></>}
  </div>
}
