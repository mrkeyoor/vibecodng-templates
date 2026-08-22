import {useEffect,useMemo,useRef,useState} from 'react'

const routes={
  Court:{code:'C-07',lock:'Heel lock / high',toe:'Toe freedom / medium',pivot:'Pivot bias / forefoot',copy:'Skip the top eyelet, cinch the middle pair and leave the toe box ready to change direction.',price:168,path:'M120 72 C250 118 165 178 310 220 S410 320 535 360'},
  Dance:{code:'D-11',lock:'Heel lock / medium',toe:'Toe freedom / high',pivot:'Pivot bias / centre',copy:'Parallel tension keeps the collar relaxed while the centre pivot stays free for turns.',price:174,path:'M120 72 C180 150 295 105 238 210 S380 250 535 360'},
  'All-day':{code:'A-24',lock:'Heel lock / balanced',toe:'Toe freedom / high',pivot:'Pivot bias / neutral',copy:'Even pressure from toe to collar holds a soft, repeatable fit through the whole route.',price:164,path:'M120 72 C205 116 248 166 292 218 S420 308 535 360'}
}
const colors=[
  {name:'Crossing Orange',hex:'#ff5a18',filter:'none'},
  {name:'Signal Cobalt',hex:'#2454ff',filter:'hue-rotate(112deg) saturate(1.15)'},
  {name:'Acid Relay',hex:'#baff22',filter:'hue-rotate(55deg) saturate(1.25) brightness(1.06)'}
]
const frames=[['airplay-hero.webp','Crossing'],['airplay-motion.webp','Pivot'],['airplay-night.webp','After dark']]
const asset=file=>`${import.meta.env.BASE_URL}${file}`

function ShoeMap({route,color}){
  const r=routes[route]
  return <svg className="shoe-map" viewBox="0 0 650 450" role="img" aria-labelledby="map-title map-desc">
    <title id="map-title">AIRPLAY sneaker lace route for {route}</title><desc id="map-desc">A top-view abstract shoe diagram with the active lace path and three fit zones.</desc>
    <path className="shoe-body" d="M120 28c86-2 137 52 160 105 38 87 91 124 210 174 59 25 89 61 64 92-25 32-117 24-186 17-110-11-219-24-270-57-43-27-34-87 0-134 31-43 20-92 22-197Z"/>
    <path className="midsole" d="M89 342c114 44 285 70 455 38l11 29c-162 46-367 25-471-20Z"/>
    {[150,205,260,315,370,425].map((x,i)=><g key={x}><circle cx={x} cy={98+i*46} r="12"/><circle cx={x+58} cy={101+i*46} r="12"/></g>)}
    <path className="lace-route" d={r.path} style={{stroke:color.hex}}/>
    <circle className="zone zone-a" cx="165" cy="325" r="42"/><circle className="zone zone-b" cx="335" cy="345" r="46"/><circle className="zone zone-c" cx="493" cy="360" r="38"/>
    <text x="112" y="425">HEEL LOCK</text><text x="291" y="425">PIVOT</text><text x="475" y="425">TOE</text>
  </svg>
}

export default function App(){
  const hero=useRef(null)
  const [progress,setProgress]=useState(0)
  const [mobileFrame,setMobileFrame]=useState(0)
  const [route,setRoute]=useState('Court')
  const [color,setColor]=useState(0)
  const [size,setSize]=useState('')
  const [errors,setErrors]=useState({})
  const [issued,setIssued]=useState(false)
  const code=useMemo(()=>`AP-${routes[route].code}-${colors[color].name.split(' ')[0].slice(0,2).toUpperCase()}-${size||'--'}`,[route,color,size])

  useEffect(()=>{let f=0;const update=()=>{f=0;const b=hero.current?.getBoundingClientRect();if(!b)return;setProgress(Math.max(0,Math.min(1,-b.top/Math.max(1,b.height-innerHeight))))};const move=()=>{if(!f)f=requestAnimationFrame(update)};update();addEventListener('scroll',move,{passive:true});addEventListener('resize',move);return()=>{removeEventListener('scroll',move);removeEventListener('resize',move);if(f)cancelAnimationFrame(f)}},[])
  function submit(e){e.preventDefault();const f=new FormData(e.currentTarget);const next={};if(!size)next.size='Choose a size for the box label.';if(!String(f.get('name')||'').trim())next.name='Add a name.';if(!/^\S+@\S+\.\S+$/.test(String(f.get('email')||'')))next.email='Add a valid email.';setErrors(next);setIssued(!Object.keys(next).length)}
  const active=routes[route],activeColor=colors[color]

  return <div className="site">
    <a className="skip" href="#lace-route">Skip to lace route</a>
    <header className="route-rail"><a href="#top" className="brand" aria-label="AIRPLAY home">AIR/<b>PLAY</b></a><nav aria-label="Primary"><a href="#footfall">01 FOOTFALL</a><a href="#lace-route">02 LACE ROUTE</a><a href="#ticket">03 FIRST STEP</a></nav><div><span>{active.code}</span><b>{activeColor.name}</b></div></header>
    <main id="top">
      <section className="crossing" ref={hero} aria-labelledby="hero-title">
        <div className="crossing-pin">
          <div className="desktop-exposures" aria-hidden="true"><img src={asset('airplay-hero.webp')} style={{transform:`scale(${1.06-progress*.04}) translateX(${progress*-2}%)`}}/><img src={asset('airplay-motion.webp')} style={{transform:`translateY(${(1-progress)*100}%)`}}/><img src={asset('airplay-night.webp')} style={{transform:`translateY(${(1-progress)*-100}%)`}}/></div>
          <img className="mobile-hero" src={asset(frames[mobileFrame][0])} width="1600" height="1066" fetchPriority="high" alt="Friends moving through a wet city crossing in vivid AIRPLAY sneakers"/>
          <div className="crossing-grade"/>
          <div className="hero-copy"><p>DROP 01 / FICTIONAL SNEAKER LABEL</p><h1 id="hero-title">EVERY STEP<br/><span>STARTS</span><br/>SOMETHING.</h1><div><b>AIRPLAY / ROUTE ONE</b><a href="#lace-route">LACE YOUR ROUTE ↓</a></div></div>
          <div className="road-coordinates"><span>40.742° N</span><i/><b>{String(Math.round(progress*100)).padStart(3,'0')} / 100</b></div>
          <div className="mobile-box-control"><button data-qa-action="frame-prev" aria-label="Previous unboxing frame" onClick={()=>setMobileFrame((mobileFrame+2)%3)}>←</button><span>{frames[mobileFrame][1]} / 0{mobileFrame+1}</span><button data-qa-action="frame-next" aria-label="Next unboxing frame" onClick={()=>setMobileFrame((mobileFrame+1)%3)}>→</button></div>
        </div>
      </section>

      <section className="footfall" id="footfall" aria-labelledby="footfall-title"><header><p>01 / FOOTFALL REEL</p><h2 id="footfall-title">THE CITY<br/>MOVES BACK.</h2><span>DIRECT FLASH<br/>WET COURT / 22:16</span></header><div className="reel-frame"><img src={asset('airplay-motion.webp')} width="1600" height="1066" loading="lazy" alt="Two friends pivoting on a wet basketball court in orange and cobalt sneakers"/><div className="step-strip"><span>01 LAND</span><i/><span>02 TURN</span><i/><span>03 RELEASE</span></div></div><aside><strong>COURT / DANCE / ALL-DAY</strong><p>One silhouette, tuned by how you move and how you lace it.</p></aside></section>

      <section className="lace-bench" id="lace-route" aria-labelledby="lace-title"><header><p>02 / LACE THE ROUTE</p><h2 id="lace-title">MAKE THE FIT<br/>FOLLOW YOU.</h2><span>Choose a movement. Watch the pressure path redraw.</span></header><div className="lace-grid"><div className={`map-stage ${route.toLowerCase().replace('-','')}`}><ShoeMap route={route} color={activeColor}/><div className="route-stamp"><span>ROUTE READY</span><b>{active.code}</b></div></div><div className="route-console"><fieldset><legend>Where does the pair move?</legend>{Object.keys(routes).map(name=><button type="button" data-qa-action="route-select" aria-pressed={route===name} onClick={()=>{setRoute(name);setIssued(false)}} key={name}><span>{routes[name].code}</span><b>{name}</b><i>{route===name?'●':'○'}</i></button>)}</fieldset><fieldset><legend>Choose the colour hit</legend><div className="colorways">{colors.map((c,i)=><button type="button" data-qa-action="color-select" aria-label={`Choose ${c.name}`} aria-pressed={color===i} onClick={()=>{setColor(i);setIssued(false)}} style={{'--c':c.hex}} key={c.name}><i/><span>{c.name}</span></button>)}</div></fieldset><div className="route-result" aria-live="polite"><p>{route} route / {active.code}</p><strong>{active.copy}</strong><dl><div><dt>Lock</dt><dd>{active.lock}</dd></div><div><dt>Toe</dt><dd>{active.toe}</dd></div><div><dt>Pivot</dt><dd>{active.pivot}</dd></div></dl></div><a href="#colorway-wall">SEE THE PAIR <span>↘</span></a></div></div></section>

      <section className="sole-scan" aria-labelledby="sole-title"><img src={asset('airplay-sole.webp')} width="1600" height="1066" loading="lazy" alt="Macro view of the AIRPLAY translucent segmented outsole and circular pivot zone"/><div className="sole-copy"><p>03 / SOLE SCAN</p><h2 id="sole-title">GRIP.<br/>PIVOT.<br/>GO AGAIN.</h2><dl><div><dt>01</dt><dd>Segmented heel pods</dd></div><div><dt>02</dt><dd>360° centre pivot</dd></div><div><dt>03</dt><dd>Translucent street rubber</dd></div></dl><small>ILLUSTRATIVE MATERIAL SPEC / FICTIONAL PRODUCT</small></div></section>

      <section className="colorway-wall" id="colorway-wall" aria-labelledby="color-title"><header><p>04 / COLOURWAY WALL</p><h2 id="color-title">PICK YOUR<br/>STREET SIGNAL.</h2></header><div className="box-stack"><div className="box box-one"/><div className="box box-two"/><img src={asset('airplay-pair.webp')} style={{filter:activeColor.filter}} width="1600" height="1066" loading="lazy" alt={`AIRPLAY Route One sneaker pair in ${activeColor.name}`}/><div className="box-label"><span>AIRPLAY / ROUTE ONE</span><b>{activeColor.name}</b><small>{route} lace / ${active.price}</small></div></div><div className="wall-controls">{colors.map((c,i)=><button data-qa-action="color-select" aria-pressed={color===i} onClick={()=>setColor(i)} key={c.name}><span style={{background:c.hex}}/><b>0{i+1}</b>{c.name}</button>)}</div></section>

      <section className="night-run" aria-label="AIRPLAY after-dark campaign"><img src={asset('airplay-night.webp')} width="1600" height="1066" loading="lazy" alt="Three friends running across a reflective city crossing in vivid AIRPLAY sneakers"/><p>NO FINISH LINE.<br/><b>JUST THE NEXT LIGHT.</b></p><span>AFTER DARK / 23:04</span></section>

      <section className={`ticket ${issued?'complete':''}`} id="ticket" aria-labelledby="ticket-title">{!issued?<><div className="ticket-copy"><p>05 / FIRST-STEP TICKET</p><h2 id="ticket-title">BOX THE<br/>NEXT MOVE.</h2><p>A fictional local reservation. No payment, delivery or live stock request is made.</p><div className="ticket-pair"><img src={asset('airplay-pair.webp')} alt="" style={{filter:activeColor.filter}}/><span>{activeColor.name}<br/>{route} route</span></div></div><form onSubmit={submit} noValidate><header><span>AIRPLAY / BOX LABEL</span><b>{active.code}</b></header><fieldset><legend>Size</legend><div>{['US 7','US 8','US 9','US 10','US 11'].map(v=><button type="button" data-qa-action="size-select" aria-pressed={size===v} onClick={()=>{setSize(v);setErrors(e=>({...e,size:''}))}} key={v}>{v}</button>)}</div>{errors.size&&<small>{errors.size}</small>}</fieldset><label><span>Name</span><input name="name" autoComplete="name" aria-invalid={!!errors.name}/>{errors.name&&<small>{errors.name}</small>}</label><label><span>Email</span><input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email}/>{errors.email&&<small>{errors.email}</small>}</label><dl><div><dt>Pair</dt><dd>Route One</dd></div><div><dt>Lace</dt><dd>{route}</dd></div><div><dt>Colour</dt><dd>{activeColor.name}</dd></div><div><dt>Total</dt><dd>${active.price}</dd></div></dl><button data-qa-action="ticket-submit">ISSUE FIRST-STEP TICKET ↗</button></form></>:<div className="ticket-issued" role="status"><p>AIRPLAY / STEP CLEARED</p><h2 id="ticket-title">YOUR NEXT<br/>MOVE IS<br/>BOXED.</h2><strong>{code}</strong><dl><div><dt>Route</dt><dd>{route} / {active.code}</dd></div><div><dt>Colour</dt><dd>{activeColor.name}</dd></div><div><dt>Size</dt><dd>{size}</dd></div><div><dt>Value</dt><dd>${active.price}</dd></div></dl><small>FICTIONAL DEMO OUTCOME / NO PAYMENT TAKEN</small><button data-qa-action="ticket-reset" onClick={()=>{setIssued(false);setSize('');setErrors({})}}>LACE ANOTHER ROUTE ↺</button></div>}</section>
    </main>
    <footer><a href="#top" className="brand">AIR/<b>PLAY</b></a><p>Route One / Fictional sneaker label<br/>Original campaign imagery</p><p>Illustrative fit guidance<br/>No live inventory</p><a href="#top">BACK TO CROSSING ↑</a></footer>
  </div>
}
