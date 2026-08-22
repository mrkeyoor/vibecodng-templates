import {useEffect,useMemo,useRef,useState} from 'react'

const priorities={
  Energy:{title:'Steadier energy',focus:['Sleep timing','Metabolic context','Recovery load'],prep:'Bring a typical week, current medication list and recent results.'},
  Strength:{title:'Capability over time',focus:['Movement quality','Lean tissue','Bone context'],prep:'Bring your movement history, injuries and the activities you want to retain.'},
  Sleep:{title:'More restorative sleep',focus:['Circadian rhythm','Sleep continuity','Recovery signals'],prep:'Bring two weeks of sleep notes and any prior sleep assessment.'},
  Metabolic:{title:'Metabolic clarity',focus:['Glucose context','Lipid transport','Nutrition pattern'],prep:'Bring recent blood work and a realistic picture of how you eat.'}
}
const contexts={
  Metabolic:{intro:'Patterns are interpreted together, never as a single verdict.',rows:[['Lived signal','Energy after meals'],['Selected measure','Glucose and lipid context'],['Clinical question','What is useful to change now?']]},
  Recovery:{intro:'Recovery data becomes useful only beside workload and experience.',rows:[['Lived signal','Sleep and soreness'],['Selected measure','Rhythm and autonomic context'],['Clinical question','Is demand matching capacity?']]},
  Structure:{intro:'Capability matters more than a leaderboard or one body score.',rows:[['Lived signal','Movement confidence'],['Selected measure','Strength and bone context'],['Clinical question','What should be protected?']]},
  Systems:{intro:'History and symptoms determine which measures deserve attention.',rows:[['Lived signal','Symptoms and history'],['Selected measure','Clinician-selected panel'],['Clinical question','What needs coordination?']]}
}
const pathways=[
  {name:'Baseline',length:'30 days',reviews:'1 physician review',measure:'Core contextual panel',support:'Written starting plan',price:950},
  {name:'Continuum',length:'6 months',reviews:'3 clinical reviews',measure:'Expanded, if appropriate',support:'Care coordination',price:2600},
  {name:'Concierge',length:'12 months',reviews:'Quarterly physician care',measure:'Longitudinal, selected',support:'Priority coordination',price:7200}
]
const cadence=[
  {day:'01',label:'Listen',title:'The long first conversation',copy:'History, priorities, existing care and what a useful year would feel like come before a test list.'},
  {day:'14',label:'Context',title:'Build the baseline',copy:'Appropriate measures are reviewed together. More data is not automatically better data.'},
  {day:'30',label:'Focus',title:'Choose the few',copy:'A clinician turns the useful findings into a short, realistic starting plan.'},
  {day:'90',label:'Review',title:'Read the change',copy:'Follow-up looks for meaningful patterns, practical friction and the next appropriate decision.'}
]
const faqs=[
  ['Is this a replacement for my doctor?','No. North / Now complements appropriate primary and specialist care. With your consent, we can coordinate relevant information.'],
  ['Do you promise a longer life?','No. We focus on established health factors, careful monitoring and practical healthspan goals. Outcomes vary.'],
  ['Will I receive every test shown?','No. A qualified clinician recommends only what is appropriate after reviewing your history, goals and existing care.'],
  ['What if I need urgent help?','This site and its consultation form are not urgent or emergency care. Contact your local emergency service or appropriate clinician.']
]
const Arrow=()=> <span aria-hidden="true">↗</span>
const Mark=()=> <svg className="mark" viewBox="0 0 32 36" aria-hidden="true"><path d="M2 1h21l7 7v27H2z"/><path d="M23 1v8h7M9 14h14M9 20h14M9 26h9"/></svg>

export default function App(){
  const menuButton=useRef(null)
  const [menu,setMenu]=useState(false)
  const [started,setStarted]=useState(false)
  const [briefStep,setBriefStep]=useState(0)
  const [priority,setPriority]=useState('Energy')
  const [pace,setPace]=useState('Measured')
  const [setting,setSetting]=useState('London')
  const [review,setReview]=useState('Quarterly')
  const [assembled,setAssembled]=useState(false)
  const [context,setContext]=useState('Metabolic')
  const [selected,setSelected]=useState('Continuum')
  const [annual,setAnnual]=useState(false)
  const [milestone,setMilestone]=useState(0)
  const [faq,setFaq]=useState(0)
  const [formError,setFormError]=useState('')
  const [submitted,setSubmitted]=useState(false)

  const recommendation=useMemo(()=>review==='Quarterly'||pace==='Comprehensive'?'Continuum':pace==='Focused'?'Baseline':'Continuum',[review,pace])
  useEffect(()=>{if(assembled)setSelected(recommendation)},[assembled,recommendation])
  useEffect(()=>{const onKey=e=>{if(e.key==='Escape'&&menu){setMenu(false);requestAnimationFrame(()=>menuButton.current?.focus())}};addEventListener('keydown',onKey);return()=>removeEventListener('keydown',onKey)},[menu])
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})
  const begin=()=>{setStarted(true);scrollTo('brief')}
  const assemble=()=>{setAssembled(true);setBriefStep(4)}
  const mobileNext=()=>briefStep<3?setBriefStep(x=>x+1):assemble()
  const submit=e=>{
    e.preventDefault(); const form=e.currentTarget
    if(!form.checkValidity()){setFormError('Complete your name, a valid email, your goal and the care acknowledgement.');form.querySelector(':invalid')?.focus();return}
    setFormError('');setSubmitted(true)
  }
  const questionSets=[
    {legend:'What would you like more of?',value:priority,set:setPriority,options:Object.keys(priorities),qa:'brief-priority'},
    {legend:'How should we begin?',value:pace,set:setPace,options:['Focused','Measured','Comprehensive'],qa:'brief-pace'},
    {legend:'Where should the first conversation happen?',value:setting,set:setSetting,options:['London','Zürich','Virtual orientation'],qa:'brief-setting'},
    {legend:'What review rhythm feels realistic?',value:review,set:setReview,options:['At 90 days','Quarterly','Clinician-led'],qa:'brief-cadence'}
  ]

  return <>
    <aside className="service-strip" aria-label="Service status"><span>Physician-led healthspan care</span><span>London · Zürich · Virtual orientation</span><span>Next orientation · 02 Sep</span></aside>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="North Now home"><Mark/><span>NORTH<br/>/ NOW</span></a>
      <nav aria-label="Primary navigation"><a href="#brief">Starting brief</a><a href="#pathways">Pathways</a><a href="#institute">Institute</a></nav>
      <button ref={menuButton} data-qa-action="menu" className="index-button" aria-expanded={menu} aria-controls="care-index" onClick={()=>setMenu(x=>!x)}>Care index <span>{menu?'−':'+'}</span></button>
    </header>
    <div id="care-index" className={`care-index ${menu?'open':''}`} role="region" aria-label="Care index" aria-hidden={!menu} inert={!menu?true:undefined}>
      <p>Care index / 06 files</p><nav aria-label="Care file navigation">{[['01','Starting brief','#brief'],['02','Context map','#context'],['03','Care pathways','#pathways'],['04','90-day cadence','#cadence'],['05','Institute standard','#institute'],['06','Consultation handover','#consult']].map(x=><a key={x[0]} href={x[2]} onClick={()=>setMenu(false)}><small>{x[0]}</small><span>{x[1]}</span><Arrow/></a>)}</nav>
    </div>

    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="file-label">Care brief / NN–01</p><h1 id="hero-title">Begin with the person.<br/><span>Then measure what matters.</span></h1><p className="lead">A physician-led starting point for people who want more context, fewer health claims and an appropriate plan for the years ahead.</p><div className="hero-actions"><button className="primary" data-qa-action="start-brief" onClick={begin}>Start your brief <Arrow/></button><a href="#context">See our method</a></div><dl><div><dt>First consult</dt><dd>90 minutes</dd></div><div><dt>Approach</dt><dd>Context before scores</dd></div><div><dt>Boundary</dt><dd>No longevity promises</dd></div></dl></div>
        <figure className="hero-media"><img src="hero-woman.webp" width="1920" height="1080" fetchPriority="high" alt="Woman in a burgundy jacket beside a pale mineral-glass wall"/><figcaption>Portrait study / The person before the panel</figcaption></figure>
        <aside className="sample-file" aria-label="Illustrative sample brief"><header><Mark/><div><small>Illustrative file</small><strong>NN / 014</strong></div></header><p>Priority</p><strong>Capability over time</strong><p>First lens</p><strong>Lived signals + clinical context</strong><p>Review point</p><strong>Day 90</strong><footer>Not a diagnosis or medical result</footer></aside>
      </section>

      <section id="brief" className="brief-section ruled-section" aria-labelledby="brief-title">
        <header className="section-heading"><p className="file-label">01 / Starting brief</p><div><h2 id="brief-title">Build a useful first conversation.</h2><p>Four choices assemble a non-diagnostic handover. Your physician still decides what is clinically appropriate.</p></div></header>
        {!started&&<button className="brief-start" onClick={()=>setStarted(true)}>Open care passport <Arrow/></button>}
        <div className={`brief-workspace ${started?'started':''}`}>
          <div className="question-board">
            <div className="mobile-progress" aria-live="polite">Question {Math.min(briefStep+1,4)} of 4</div>
            {questionSets.map((q,i)=><fieldset key={q.legend} className={briefStep===i?'current':''} data-step={i+1}><legend><small>0{i+1}</small>{q.legend}</legend><div>{q.options.map(option=><button type="button" data-qa-action={q.qa} className={q.value===option?'selected':''} aria-pressed={q.value===option} onClick={()=>q.set(option)} key={option}><span>{option}</span><i aria-hidden="true">{q.value===option?'✓':'+'}</i></button>)}</div></fieldset>)}
            <div className="mobile-brief-controls">{briefStep>0&&<button onClick={()=>setBriefStep(x=>x-1)}>Back</button>}<button data-qa-action="brief-next" onClick={mobileNext}>{briefStep===3?'Assemble brief':'Continue'} <Arrow/></button></div>
            <button className="assemble-button primary" data-qa-action="assemble-brief" onClick={assemble}>Assemble starting brief <Arrow/></button>
          </div>
          <aside className={`brief-result ${assembled?'ready':''}`} aria-live="polite"><header><span>{assembled?'Brief assembled':'Awaiting choices'}</span><strong>NN / {priority.slice(0,2).toUpperCase()}–26</strong></header>{assembled?<><p className="human-note">“A credible start is one you can understand and return to.”</p><dl><div><dt>Priority</dt><dd>{priorities[priority].title}</dd></div><div><dt>First focus</dt><dd>{priorities[priority].focus.join(' · ')}</dd></div><div><dt>Setting</dt><dd>{setting}</dd></div><div><dt>Review</dt><dd>{review}</dd></div><div><dt>Suggested pathway</dt><dd>{recommendation}</dd></div><div><dt>Preparation</dt><dd>{priorities[priority].prep}</dd></div></dl><button onClick={()=>scrollTo('consult')}>Carry to consultation <Arrow/></button><small>Illustrative pathway match only. It is not diagnosis, risk prediction or medical advice.</small></>:<><Mark/><p>Complete the four fields to create a plain-language starting brief.</p></>}</aside>
        </div>
      </section>

      <section id="context" className="context-section" aria-labelledby="context-title">
        <figure><img src="biomarkers.webp" width="1100" height="1100" loading="lazy" alt="Connected translucent glass forms representing measures read in context"/><figcaption>Measures are connected to history, symptoms and goals.</figcaption></figure>
        <div className="context-copy"><p className="file-label">02 / Context map</p><h2 id="context-title">No marker tells the whole story.</h2><p className="context-intro">Select a lens to see how lived experience and measured evidence meet in a clinical question.</p><nav aria-label="Context lenses">{Object.keys(contexts).map(x=><button data-qa-action="context-map" aria-pressed={context===x} className={context===x?'active':''} onClick={()=>setContext(x)} key={x}>{x}</button>)}</nav><div className="context-ledger" key={context}><p>{contexts[context].intro}</p>{contexts[context].rows.map((row,i)=><div key={row[0]}><small>0{i+1}</small><span>{row[0]}</span><strong>{row[1]}</strong></div>)}<small>Illustrative framework — not a patient result.</small></div></div>
      </section>

      <section id="pathways" className="pathway-section ruled-section" aria-labelledby="pathway-title">
        <header className="section-heading"><p className="file-label">03 / Care pathways</p><div><h2 id="pathway-title">Compare care, not promises.</h2><p>Every pathway is adapted after clinical review. Inclusions describe the template service, not a universal prescription.</p></div></header>
        <div className="billing-control" aria-label="Price context"><button data-qa-action="billing-view" aria-pressed={!annual} onClick={()=>setAnnual(false)}>Starting cycle</button><button data-qa-action="billing-view" aria-pressed={annual} onClick={()=>setAnnual(true)}>Annual context</button></div>
        <div className="table-wrap" tabIndex="0" aria-label="Scrollable care pathway comparison"><table><thead><tr><th scope="col">Care file</th>{pathways.map(x=><th scope="col" key={x.name}>{x.name}<button data-qa-action="pathway-select" aria-pressed={selected===x.name} onClick={()=>setSelected(x.name)}>{selected===x.name?'Selected':'Select'}</button></th>)}</tr></thead><tbody>{[['Time','length'],['Clinical review','reviews'],['Measurements','measure'],['Support','support']].map(row=><tr key={row[0]}><th scope="row">{row[0]}</th>{pathways.map(x=><td key={x.name}>{x[row[1]]}</td>)}</tr>)}<tr><th scope="row">Indicative start</th>{pathways.map(x=><td key={x.name}>£{(annual?Math.round(x.price*1.85):x.price).toLocaleString()} <small>{annual?'annual context':'starting cycle'}</small></td>)}</tr></tbody></table></div>
        <div className="selected-summary"><span>Selected handover</span><strong>{selected}</strong><p>{pathways.find(x=>x.name===selected).support} · {setting}</p><button onClick={()=>scrollTo('consult')}>Use this pathway <Arrow/></button></div>
      </section>

      <section id="cadence" className="cadence-section" aria-labelledby="cadence-title"><header><p className="file-label">04 / First 90 days</p><h2 id="cadence-title">Care has a cadence.</h2></header><div className="cadence-board"><div className="cadence-tabs" role="tablist" aria-label="Care milestones">{cadence.map((x,i)=><button role="tab" id={`milestone-${i}`} aria-controls={`milestone-panel-${i}`} aria-selected={milestone===i} data-qa-action="cadence-step" onClick={()=>setMilestone(i)} key={x.day}><small>Day</small><strong>{x.day}</strong><span>{x.label}</span></button>)}</div><div className="cadence-panel" role="tabpanel" id={`milestone-panel-${milestone}`} aria-labelledby={`milestone-${milestone}`}><small>0{milestone+1} / 04</small><h3>{cadence[milestone].title}</h3><p>{cadence[milestone].copy}</p><span>Exact timing depends on clinical appropriateness and availability.</span></div></div></section>

      <section id="institute" className="institute-section" aria-labelledby="institute-title"><div className="institute-copy"><p className="file-label">05 / Institute standard</p><h2 id="institute-title">Rigour, at human scale.</h2><p>Long appointments, joined-up thinking and spaces designed for questions rather than throughput.</p><ol><li><span>01</span>Qualified clinical review</li><li><span>02</span>Only appropriate measurement</li><li><span>03</span>Coordination with existing care</li><li><span>04</span>Plain-language next steps</li></ol></div><figure className="room"><img src="clinic-room.webp" width="1100" height="1374" alt="Warm consultation room with desk, exam couch and curved mineral-glass wall"/><figcaption>Consultation room / London</figcaption></figure><figure className="suite"><img src="recovery-suite.webp" width="1100" height="1374" alt="Quiet recovery suite with stone bench and warm red-lit alcove"/><figcaption>Optional recovery environment / Zürich</figcaption></figure></section>

      <section id="consult" className="consult-section" aria-labelledby="consult-title"><div className="handover"><p className="file-label">06 / Consultation handover</p><h2 id="consult-title">Take the brief into a real conversation.</h2><p>This form requests an orientation only. It is not a clinical intake, medical advice or emergency channel.</p><dl><div><dt>Priority</dt><dd>{assembled?priorities[priority].title:'To discuss'}</dd></div><div><dt>Pathway</dt><dd>{selected}</dd></div><div><dt>Setting</dt><dd>{setting}</dd></div><div><dt>Next step</dt><dd>Coordinator fit call</dd></div></dl></div>{submitted?<div className="confirmation" role="status"><Mark/><p>Request received</p><h3>Reference NN-2608</h3><p>A coordinator will contact you about {selected} in {setting}. This confirmation does not establish a clinician–patient relationship.</p><button onClick={()=>setSubmitted(false)}>Make another request</button></div>:<form onSubmit={submit} noValidate><label>Full name<input name="name" autoComplete="name" required/></label><label>Email address<input name="email" type="email" autoComplete="email" required/></label><label>What would make this conversation useful?<textarea name="goal" rows="4" required/></label><label className="check"><input name="acknowledgement" type="checkbox" required/><span>I understand this request is not urgent or emergency medical care.</span></label>{formError&&<p className="form-error" role="alert">{formError}</p>}<button className="primary" data-qa-action="consultation-submit">Request orientation <Arrow/></button></form>}</section>

      <section className="faq-section" aria-labelledby="faq-title"><header><p className="file-label">Questions / Safety</p><h2 id="faq-title">Before you begin.</h2></header><div>{faqs.map((x,i)=><article key={x[0]}><h3><button data-qa-action="faq-toggle" aria-expanded={faq===i} aria-controls={`faq-${i}`} onClick={()=>setFaq(faq===i?-1:i)}><span>0{i+1} / {x[0]}</span><i aria-hidden="true">{faq===i?'−':'+'}</i></button></h3><p id={`faq-${i}`} hidden={faq!==i}>{x[1]}</p></article>)}</div></section>
    </main>
    <footer className="site-footer"><div><Mark/><strong>NORTH / NOW</strong></div><p>Template demonstration only. General information, not medical advice, diagnosis or treatment.</p><nav><a href="#top">Back to top ↑</a><span>London · Zürich</span><span>© 2026 N/N</span></nav></footer>
  </>
}
