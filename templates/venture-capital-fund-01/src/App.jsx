import {useEffect,useRef,useState} from 'react'

const thesis=[
  {n:'01',label:'Matter',title:'Rebuild the physical world.',copy:'We back teams turning atoms into leverage: materials, energy systems and climate infrastructure designed for planetary scale.',signal:'Materials · Energy · Climate'},
  {n:'02',label:'Machines',title:'Give industry new hands.',copy:'Robotics and applied intelligence will make critical work safer, more precise and radically more abundant.',signal:'Robotics · Compute · Industry'},
  {n:'03',label:'Life',title:'Program the living world.',copy:'Biology is becoming an engineering discipline. We invest where better tools create better outcomes for people and planet.',signal:'Biology · Health · Food'},
  {n:'04',label:'Systems',title:'Make complexity useful.',copy:'The next category leaders will turn dense infrastructure into simple, trusted products that compound with every user.',signal:'Software · Networks · Security'}
]

const companies=[
  {name:'Morrow',sector:'Climate',stage:'Seed',img:'climate-material.webp',copy:'Mineral-grown packaging without petrochemicals.'},
  {name:'Kin Unit',sector:'Intelligence',stage:'Series A',img:'robotics.webp',copy:'Adaptive robotics for high-variance assembly.'},
  {name:'Serein Bio',sector:'Biology',stage:'Seed',img:'biology.webp',copy:'Programmable proteins for resilient nutrition.'},
  {name:'Axiom Heat',sector:'Climate',stage:'Series A',img:'hero-field.webp',copy:'Industrial heat, electrified from first principles.'},
  {name:'Loop Works',sector:'Intelligence',stage:'Pre-seed',img:'robotics.webp',copy:'A spatial operating system for physical teams.'},
  {name:'Common Cell',sector:'Biology',stage:'Seed',img:'biology.webp',copy:'Faster discovery through living model systems.'}
]

const Arrow=()=> <span aria-hidden="true">↗</span>

export default function App(){
  const hero=useRef(null)
  const [progress,setProgress]=useState(0)
  const [activeThesis,setActiveThesis]=useState(0)
  const [filter,setFilter]=useState('All')
  const [menu,setMenu]=useState(false)
  const [founder,setFounder]=useState(false)
  const [lp,setLp]=useState(false)
  const [step,setStep]=useState(1)
  const [sent,setSent]=useState(false)
  const [brief,setBrief]=useState({company:'',email:'',stage:'Pre-seed',sentence:''})

  useEffect(()=>{const scroll=()=>{if(!hero.current)return;const r=hero.current.getBoundingClientRect();setProgress(Math.max(0,Math.min(1,-r.top/(r.height-innerHeight))))};scroll();addEventListener('scroll',scroll,{passive:true});return()=>removeEventListener('scroll',scroll)},[])
  useEffect(()=>{document.body.classList.toggle('locked',menu||founder||lp)},[menu,founder,lp])
  useEffect(()=>{const escape=e=>{if(e.key==='Escape'){setMenu(false);setFounder(false);setLp(false)}};addEventListener('keydown',escape);return()=>removeEventListener('keydown',escape)},[])
  const closeFounder=()=>{setFounder(false);setTimeout(()=>{setStep(1);setSent(false)},350)}

  return <main>
    <header className="nav">
      <a className="brand" href="#top"><i>M</i> Matter<br/>& Means</a>
      <p>Venture partners<br/>London · New York</p>
      <div><button onClick={()=>setLp(true)}>For LPs</button><button className="pitch" onClick={()=>setFounder(true)}>Pitch us</button><button onClick={()=>setMenu(true)}>Menu <b>+</b></button></div>
    </header>
    <div className="dealbar"><span>FUND III · LIVE</span><span>FIRST CHEQUE £250K—£8M</span><span>PRE-SEED / A</span><button onClick={()=>setFounder(true)}>SUBMIT SIGNAL →</button></div>

    <section id="top" className="hero" ref={hero}>
      <div className="hero-pin">
        <img src="hero-field.webp" alt="Amber material field suspended in a dark architectural room" style={{transform:`scale(${1+progress*.13}) translateX(${progress*-2}%)`}}/>
        <div className="shade"/>
        <div className="hero-copy" style={{transform:`translateY(${progress*-14}vh)`,opacity:1-progress*.78}}>
          <p>Fund III · $180m<br/>Now investing</p>
          <h1>BACK THE<br/><em>UNLIKELY.</em></h1>
          <button onClick={()=>setFounder(true)}>Start a conversation <Arrow/></button>
        </div>
        <div className="orbit" style={{transform:`rotate(${progress*135}deg)`}}><i/><i/><span>01—04</span></div>
        <footer><span>Pre-seed → Series A</span><a href="#thesis">Our point of view ↓</a><span>{String(Math.round(progress*100)).padStart(2,'0')}%</span></footer>
      </div>
    </section>

    <section className="manifesto pad">
      <p className="kicker">The mandate · 01</p>
      <h2>THE FUTURE ISN'T<br/>PREDICTED. IT IS<br/><em>MADE MATERIAL.</em></h2>
      <div className="manifesto-note"><p>We partner early with technical founders building the systems civilization will rely on next.</p><span>£250k—£8m<br/>First cheques</span></div>
    </section>

    <section id="thesis" className="thesis pad">
      <header><p className="kicker">What we believe · 02</p><h2>FOUR FIELDS<br/>OF CHANGE.</h2></header>
      <div className="thesis-body">
        <nav aria-label="Investment thesis fields">{thesis.map((item,i)=><button key={item.label} className={activeThesis===i?'active':''} onClick={()=>setActiveThesis(i)}><small>{item.n}</small>{item.label}<span>→</span></button>)}</nav>
        <article key={activeThesis}><span className="signal">{thesis[activeThesis].signal}</span><h3>{thesis[activeThesis].title}</h3><p>{thesis[activeThesis].copy}</p><div className="thesis-index" aria-hidden="true">{thesis[activeThesis].n}<i>/04</i></div></article>
      </div>
    </section>

    <section className="proof">
      <div><strong>27</strong><span>Companies<br/>backed</span></div><div><strong>61%</strong><span>Technical<br/>founders</span></div><div><strong>14</strong><span>Countries<br/>in portfolio</span></div><div><strong>2019</strong><span>First fund<br/>vintage</span></div>
    </section>

    <section id="portfolio" className="portfolio pad">
      <header><p className="kicker">Selected companies · 03</p><h2>BUILT FOR<br/><em>THE LONG ARC.</em></h2><div>{['All','Climate','Biology','Intelligence'].map(x=><button key={x} className={filter===x?'active':''} onClick={()=>setFilter(x)}>{x}</button>)}</div></header>
      <div className="ledger-head" aria-hidden="true"><span>ID / COMPANY</span><span>SECTOR</span><span>STAGE</span><span>THESIS SIGNAL</span><span>OPEN</span></div><div className="company-grid">{companies.filter(x=>filter==='All'||x.sector===filter).map((company,i)=><article key={company.name}>
        <div className="company-media"><img src={company.img} alt={`${company.name} — ${company.sector} portfolio visual`}/><span>{String(i+1).padStart(2,'0')}</span></div>
        <div className="company-copy"><small>{company.sector} · {company.stage}</small><h3>{company.name}</h3><p>{company.copy}</p><button onClick={()=>setFounder(true)} aria-label={`Discuss ${company.name}`}>↗</button></div>
      </article>)}</div>
    </section>

    <section className="founder-call pad">
      <p className="kicker">Founders · 04</p><div><h2>TOO EARLY<br/>IS OFTEN<br/><em>RIGHT ON TIME.</em></h2><aside><p>Sharp insight. Strange first prototype. A market that does not exist yet. That is enough to begin.</p><button onClick={()=>setFounder(true)}>Tell us what you're building <Arrow/></button></aside></div>
    </section>

    <section className="insights pad">
      <header><p className="kicker">Field notes · 05</p><h2>THINKING<br/>IN PUBLIC.</h2></header>
      <div>{[
        ['08 MIN','The age of material intelligence','Why the boundary between software and atoms is disappearing.'],
        ['11 MIN','Industrial abundance, carefully','A framework for backing scale without ignoring consequence.'],
        ['06 MIN','The founder-market myth','Obsession matters. But earned insight matters more.']
      ].map((x,i)=><article key={x[1]}><span>0{i+1}</span><small>{x[0]}</small><h3>{x[1]}</h3><p>{x[2]}</p><a href="#top" aria-label={`Read ${x[1]}`}>Read note <Arrow/></a></article>)}</div>
    </section>

    <footer className="footer pad"><div><p>Partner with us before<br/>the answer is obvious.</p><button onClick={()=>setFounder(true)}>Pitch Matter & Means <Arrow/></button></div><h2>MATTER<br/><em>& MEANS</em></h2><nav><span>London · New York</span><span>© 2026 M&M</span><button onClick={()=>setLp(true)}>LP login / contact</button><a href="#top">Back to top ↑</a></nav></footer>

    <div className={`menu ${menu?'open':''}`} aria-hidden={!menu} inert={!menu?true:undefined}><button className="close" onClick={()=>setMenu(false)}>Close ×</button><nav>{[['Thesis','#thesis'],['Portfolio','#portfolio'],['Founders','.founder-call'],['Notes','.insights']].map((x,i)=><a key={x[0]} href={x[1]} onClick={()=>setMenu(false)}><small>0{i+1}</small>{x[0]}<Arrow/></a>)}</nav></div>

    <aside className={`drawer founder-drawer ${founder?'open':''}`} aria-hidden={!founder} inert={!founder?true:undefined}>
      <button className="close" onClick={closeFounder}>Close ×</button>
      {sent?<div className="success"><span>↗</span><h2>IN THE<br/>ROOM.</h2><p>Thanks, {brief.company}. A partner will read this—not a scoring model.</p><button onClick={closeFounder}>Done</button></div>:<form onSubmit={e=>{e.preventDefault();if(step===1)setStep(2);else setSent(true)}}>
        <p className="kicker">Founder introduction · {step}/2</p>
        {step===1?<><h2>START WITH<br/>THE SIGNAL.</h2><label>Company name<input required value={brief.company} onChange={e=>setBrief({...brief,company:e.target.value})}/></label><label>Your email<input type="email" required value={brief.email} onChange={e=>setBrief({...brief,email:e.target.value})}/></label><label>Stage<select value={brief.stage} onChange={e=>setBrief({...brief,stage:e.target.value})}><option>Idea</option><option>Pre-seed</option><option>Seed</option><option>Series A</option></select></label></>:<><h2>ONE SENTENCE.<br/>NO THEATRE.</h2><label>What becomes possible if you win?<textarea required rows="6" value={brief.sentence} onChange={e=>setBrief({...brief,sentence:e.target.value})}/></label><div className="summary"><span>{brief.company}</span><span>{brief.stage}</span></div></>}
        <div className="form-actions">{step===2&&<button type="button" onClick={()=>setStep(1)}>← Back</button>}<button>{step===1?'Continue':'Send to a partner'} <Arrow/></button></div>
      </form>}
    </aside>

    <aside className={`drawer lp-drawer ${lp?'open':''}`} aria-hidden={!lp} inert={!lp?true:undefined}><button className="close" onClick={()=>setLp(false)}>Close ×</button><p className="kicker">Limited partners</p><h2>PATIENT<br/>CAPITAL,<br/><em>ACTIVE MIND.</em></h2><p>Request our latest fund letter, portfolio construction memo and partnership overview.</p><form onSubmit={e=>{e.preventDefault();setLp(false)}}><label>Work email<input required type="email"/></label><button>Request the memo <Arrow/></button></form></aside>
  </main>
}
