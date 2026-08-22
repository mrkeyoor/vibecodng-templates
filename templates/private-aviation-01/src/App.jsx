import{useMemo,useState}from'react'
import GlobeRoute from'./GlobeRoute.jsx'

const airports={Farnborough:{code:'FAB',city:'London',zone:'UTC+1'},'Le Bourget':{code:'LBG',city:'Paris',zone:'UTC+2'},Teterboro:{code:'TEB',city:'New York',zone:'UTC−4'},Geneva:{code:'GVA',city:'Geneva',zone:'UTC+2'},Dubai:{code:'DWC',city:'Dubai',zone:'UTC+4'},Nice:{code:'NCE',city:'Nice',zone:'UTC+2'}}
const blocks={
  'Farnborough-Geneva':'01:28','Farnborough-Dubai':'06:42','Farnborough-Nice':'01:52',
  'Le Bourget-Geneva':'01:05','Le Bourget-Dubai':'06:18','Le Bourget-Nice':'01:22',
  'Teterboro-Geneva':'07:24','Teterboro-Dubai':'12:41','Teterboro-Nice':'07:58'
}
const fleet=[
  {name:'Vale 220',class:'Light jet',range:'2,040 nm',seats:6,bags:'6 cases',cabin:'Quiet regional access',best:'Short fields · European sectors',code:'V22'},
  {name:'Meridian 450',class:'Super midsize',range:'4,050 nm',seats:9,bags:'10 cases',cabin:'Stand-up transcontinental cabin',best:'Longer sectors · mixed schedules',code:'M45'},
  {name:'Aster 700',class:'Ultra long range',range:'7,500 nm',seats:14,bags:'18 cases',cabin:'Three-zone long-haul cabin',best:'Nonstop intercontinental',code:'A70'}
]
const standards=[['T−24','Crew duty','Roster and alternates verified against the operating window.'],['T−12','Handling','Slots, permits, transport and discreet terminal access reconfirmed.'],['T−04','Weather','Route, reserve and suitable alternates reviewed by the operator.'],['T−01','Boarding','Passenger manifest and baggage profile transferred to crew.']]
const Arrow=()=> <span aria-hidden="true">↗</span>
const Plane=()=> <svg viewBox="0 0 180 50" aria-hidden="true"><path d="M5 25h52L83 4h12L85 25h48l22-12h9l-12 12 12 12h-9l-22-12H85l10 21H83L57 25H5z"/></svg>

export default function App(){
 const[origin,setOrigin]=useState('Farnborough'),[destination,setDestination]=useState('Geneva'),[party,setParty]=useState(4),[range,setRange]=useState('Regional'),[priority,setPriority]=useState('Earliest departure'),[step,setStep]=useState(0),[cleared,setCleared]=useState(false),[fleetIndex,setFleetIndex]=useState(1),[error,setError]=useState(''),[sent,setSent]=useState(false)
 const recommendation=useMemo(()=>range==='Intercontinental'||party>9?2:range==='Continental'||party>6||priority==='Cabin continuity'?1:0,[range,party,priority])
 const block=blocks[`${origin}-${destination}`]||'Operator review'
 const routeCode=`${airports[origin].code} → ${airports[destination].code}`
 const clear=()=>{setCleared(true);setFleetIndex(recommendation);setStep(4)}
 const next=()=>step<3?setStep(s=>s+1):clear()
 const selectFleet=i=>setFleetIndex((i+fleet.length)%fleet.length)
 const submit=e=>{e.preventDefault();const f=e.currentTarget;if(!f.checkValidity()){setError('Complete your name, valid email, preferred date and charter acknowledgement.');f.querySelector(':invalid')?.focus();return}setError('');setSent(true)}
 return <>
  <aside className="ops-strip" aria-label="Operations status"><span><i/> Dispatch desk online</span><span>London 08:40</span><span>New York 03:40</span><span>Dubai 11:40</span></aside>
  <header className="site-header"><a href="#top" className="brand" aria-label="Northline Aviation home"><b>N/</b><span>NORTHLINE<br/>AVIATION</span></a><nav aria-label="Primary"><a href="#dispatch">Dispatch</a><a href="#fleet">Fleet</a><a href="#standard">Standard</a></nav><a className="enquire" href="#enquire">Request aircraft <Arrow/></a></header>
  <main id="top">
   <section className="hero" aria-labelledby="hero-title">
    <div className="route-board" aria-label="Illustrative route plot"><header><span>FLIGHT DOSSIER / LIVE</span><strong>{routeCode}</strong></header><div className="map"><span className="node origin">{airports[origin].code}<i/></span><span className="route-line"/><Plane/><span className="node destination">{airports[destination].code}<i/></span></div><dl><div><dt>Illustrative block</dt><dd>{block}</dd></div><div><dt>Party</dt><dd>{party} travellers</dd></div><div><dt>Status</dt><dd>{cleared?'Dossier cleared':'Awaiting profile'}</dd></div></dl></div>
    <div className="hero-copy"><p className="eyebrow">Private charter / one accountable desk</p><h1 id="hero-title">The shortest distance is a <span>clear decision.</span></h1><p>Aircraft, crew and handling shaped around the route—not a catalogue of promises.</p><a className="primary" href="#dispatch">Clear a flight dossier <Arrow/></a></div>
    <figure><img src="aircraft-apron.webp" width="1587" height="991" fetchPriority="high" alt="Unbranded long-range business jet on a quiet coastal airport apron"/><figcaption>Sample aircraft portrait / availability subject to operator confirmation</figcaption></figure>
   </section>

   <section id="dispatch" className="dispatch" aria-labelledby="dispatch-title">
    <header><p className="eyebrow">01 / Dispatch table</p><h2 id="dispatch-title">Build the route before choosing the aircraft.</h2><p>Four operational decisions create an illustrative starting point. Final suitability depends on runway, weather, payload, permits and operator approval.</p></header>
    <div className="dispatch-workspace">
     <div className="fields">
      <p className="mobile-progress">Field {Math.min(step+1,4)} / 04</p>
      <fieldset className={step===0?'current':''}><legend><small>01</small> Route</legend><label>Origin<select data-qa-action="route-origin" value={origin} onChange={e=>{setOrigin(e.target.value);setCleared(false)}}>{['Farnborough','Le Bourget','Teterboro'].map(x=><option key={x}>{x}</option>)}</select></label><label>Destination<select data-qa-action="route-destination" value={destination} onChange={e=>{setDestination(e.target.value);setCleared(false)}}>{['Geneva','Dubai','Nice'].map(x=><option key={x}>{x}</option>)}</select></label></fieldset>
      <fieldset className={step===1?'current':''}><legend><small>02</small> Party</legend><div>{[2,4,8,12].map(x=><button type="button" data-qa-action="party-size" aria-pressed={party===x} onClick={()=>{setParty(x);setCleared(false)}} key={x}>{String(x).padStart(2,'0')} travellers</button>)}</div></fieldset>
      <fieldset className={step===2?'current':''}><legend><small>03</small> Operating range</legend><div>{['Regional','Continental','Intercontinental'].map(x=><button type="button" data-qa-action="range-profile" aria-pressed={range===x} onClick={()=>{setRange(x);setCleared(false)}} key={x}>{x}</button>)}</div></fieldset>
      <fieldset className={step===3?'current':''}><legend><small>04</small> Priority</legend><div>{['Earliest departure','Nonstop preference','Cabin continuity'].map(x=><button type="button" data-qa-action="flight-priority" aria-pressed={priority===x} onClick={()=>{setPriority(x);setCleared(false)}} key={x}>{x}</button>)}</div></fieldset>
      <div className="field-nav">{step>0&&<button onClick={()=>setStep(s=>s-1)}>Back</button>}<button data-qa-action="dispatch-next" onClick={next}>{step===3?'Clear dossier':'Next field'} <Arrow/></button></div>
      <button className="desktop-clear" data-qa-action="clear-dossier" onClick={clear}>Run dispatch match <Arrow/></button>
     </div>
     <aside className={`dossier ${cleared?'cleared':''}`} aria-live="polite"><header><span>NL / FLIGHT DOSSIER</span><strong>{routeCode}</strong></header>{cleared?<><span className="clear-stamp">CLEARED<br/><small>STARTING POINT</small></span><div className="boarding-route"><b>{airports[origin].code}</b><span><Plane/></span><b>{airports[destination].code}</b></div><dl><div><dt>Recommended class</dt><dd>{fleet[recommendation].class}</dd></div><div><dt>Reference aircraft</dt><dd>{fleet[recommendation].name}</dd></div><div><dt>Party / priority</dt><dd>{party} / {priority}</dd></div><div><dt>Illustrative block</dt><dd>{block}</dd></div><div><dt>Range context</dt><dd>{fleet[recommendation].range}</dd></div></dl><button onClick={()=>document.getElementById('enquire')?.scrollIntoView({behavior:'smooth'})}>Transfer to enquiry <Arrow/></button><small>Not an operational release or guarantee. Aircraft and routing require operator confirmation.</small></>:<><div className="wallet-empty"><Plane/><p>Your cleared route and aircraft starting point will appear here.</p></div></>}</aside>
    </div>
   </section>

   <GlobeRoute origin={origin} destination={destination} onDestination={value=>{setDestination(value);setCleared(false)}}/>

   <section id="fleet" className="fleet" aria-labelledby="fleet-title"><header><p className="eyebrow">02 / Fleet logic</p><h2 id="fleet-title">Choose by mission, not silhouette.</h2></header><div className="fleet-stage"><div className="aircraft-visual"><Plane/></div><article><p>{fleet[fleetIndex].class}</p><h3>{fleet[fleetIndex].name}</h3><dl><div><dt>Range</dt><dd>{fleet[fleetIndex].range}</dd></div><div><dt>Seats</dt><dd>Up to {fleet[fleetIndex].seats}</dd></div><div><dt>Baggage</dt><dd>{fleet[fleetIndex].bags}</dd></div><div><dt>Cabin role</dt><dd>{fleet[fleetIndex].cabin}</dd></div></dl><strong>{fleet[fleetIndex].best}</strong></article></div><div className="fleet-controls"><button data-qa-action="fleet-prev" aria-label="Previous aircraft" onClick={()=>selectFleet(fleetIndex-1)}>←</button>{fleet.map((x,i)=><button data-qa-action="fleet-select" aria-pressed={fleetIndex===i} onClick={()=>setFleetIndex(i)} key={x.name}><small>0{i+1}</small><span>{x.name}</span><b>{x.range}</b></button>)}<button data-qa-action="fleet-next" aria-label="Next aircraft" onClick={()=>selectFleet(fleetIndex+1)}>→</button></div></section>

   <section className="cabin" aria-labelledby="cabin-title"><figure><img src="cabin-daylight.webp" width="1586" height="992" alt="Quiet daylight business-jet cabin with ivory seats and centered aisle"/></figure><div><p className="eyebrow">03 / Cabin protocol</p><h2 id="cabin-title">Private means prepared.</h2><p>Preferences travel as an operating note: working layout, dietary needs, ground transfer and the moments that should remain uninterrupted.</p><ol><li><span>01</span>One named flight manager</li><li><span>02</span>Manifest handled discreetly</li><li><span>03</span>Cabin configured before arrival</li></ol></div></section>

   <section id="standard" className="standard" aria-labelledby="standard-title"><header><p className="eyebrow">04 / Operating standard</p><h2 id="standard-title">The quiet work happens before boarding.</h2></header><div>{standards.map(x=><article key={x[0]}><time>{x[0]}</time><h3>{x[1]}</h3><p>{x[2]}</p><i aria-hidden="true"/></article>)}</div><p className="standard-note">Actual operational control remains with the licensed air operator and flight crew.</p></section>

   <section id="enquire" className="handoff" aria-labelledby="handoff-title"><div><p className="eyebrow">05 / Operations handoff</p><h2 id="handoff-title">Put a real route on the desk.</h2><p>A flight manager will verify availability, operating feasibility and a tailored quotation.</p>{cleared&&<aside><span>Attached dossier</span><strong>{routeCode}</strong><p>{fleet[recommendation].name} / {party} travellers / {priority}</p></aside>}</div>{sent?<div className="success" role="status"><span>REQUEST RECEIVED</span><strong>NL–2608</strong><h3>Your route is with dispatch.</h3><p>A flight manager will reply with a verified starting point. No aircraft is held until confirmed in writing.</p></div>:<form noValidate onSubmit={submit}><label>Name<input required autoComplete="name"/></label><label>Email<input required type="email" autoComplete="email"/></label><label>Preferred departure date<input required type="date"/></label><label>Context for the flight<textarea required rows="4"/></label><label className="check"><input required type="checkbox"/><span>I understand this is illustrative and all aircraft, routing and operations require confirmation.</span></label>{error&&<p role="alert" className="error">{error}</p>}<button className="primary" data-qa-action="enquiry-submit">Send to flight manager <Arrow/></button></form>}</section>
  </main>
  <footer><a href="#top">NORTHLINE / AVIATION</a><span>Illustrative charter operator</span><span>London · Geneva · New York</span><a href="#top">Top ↑</a></footer>
 </>
}
