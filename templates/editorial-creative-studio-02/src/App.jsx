import {useEffect,useRef,useState} from 'react'

const work=[
  {n:'01',name:'Assembly',kind:'Cultural identity',image:'world-red-v2.webp',copy:'A moving identity for a new kind of public institution.',tone:'red'},
  {n:'02',name:'Sona',kind:'Object & launch',image:'world-blue-v2.webp',copy:'Turning a piece of sound technology into an object of desire.',tone:'blue'},
  {n:'03',name:'Between',kind:'Spatial language',image:'world-yellow-v2.webp',copy:'A soft system for art, architecture and the spaces between.',tone:'yellow'},
]
const services=[
  ['Strategy','Finding the sharp idea, useful tension and distinctive position that everything else can grow from.'],
  ['Identity','Verbal and visual systems that remain recognisable while changing shape across every medium.'],
  ['Digital','Websites and products where interaction, motion and technology become part of the brand.'],
  ['Campaigns','Launch concepts and image worlds designed to travel further than the first announcement.'],
]
const faqs=[
  ['Are you a large agency?','No. MOTIF is a senior creative office. The people in the first meeting remain on the work from beginning to end.'],
  ['What does a typical project cost?','Focused engagements begin around £15k. Full identity and digital programmes usually begin around £40k.'],
  ['How quickly can we start?','Usually within three to six weeks. When timing is critical, we can begin with a short paid discovery sprint.'],
  ['Can you work with our internal team?','Yes. We can lead independently or work as a compact creative unit inside your existing product or marketing team.'],
]

const Arrow=()=> <span aria-hidden="true">↗</span>

export default function App(){
  const [progress,setProgress]=useState(0)
  const [menu,setMenu]=useState(false)
  const [reel,setReel]=useState(false)
  const [booking,setBooking]=useState(false)
  const [sent,setSent]=useState(false)
  const [service,setService]=useState(0)
  const [faq,setFaq]=useState(0)
  const [mode,setMode]=useState('project')
  const [quote,setQuote]=useState(0)
  const hero=useRef(null)

  useEffect(()=>{const update=()=>{if(!hero.current)return;const r=hero.current.getBoundingClientRect();setProgress(Math.max(0,Math.min(1,-r.top/(r.height-innerHeight))))};update();addEventListener('scroll',update,{passive:true});return()=>removeEventListener('scroll',update)},[])
  useEffect(()=>{document.body.classList.toggle('locked',menu||reel||booking)},[menu,reel,booking])
  useEffect(()=>{const esc=e=>{if(e.key==='Escape'){setMenu(false);setReel(false);setBooking(false)}};addEventListener('keydown',esc);return()=>removeEventListener('keydown',esc)},[])
  const portal=Math.min(1,progress*1.28)
  const openBooking=()=>{setBooking(true);setSent(false)}

  return <main>
    <header className="nav"><a className="logo" href="#top">MOTIF<sup>®</sup></a><div className="nav-note"><span>Independent creative office</span><span>London · Worldwide</span></div><button className="menu-button" onClick={()=>setMenu(true)}>Menu <i/></button></header>

    <section id="top" ref={hero} className="hero">
      <div className="hero-pin">
        <div className="hero-type" style={{opacity:1-portal*.76,transform:`translateY(${progress*-8}vh) scale(${1-progress*.12})`}}><h1>Make room</h1><em>for the</em><h1>unexpected.</h1></div>
        <div className="portal" style={{width:`${28+portal*68}vw`,height:`${54+portal*42}vh`,borderRadius:`${Math.max(1.5,18-portal*17)}rem`}}>
          <img src="hero-engine-v2.webp" alt="Kinetic sculpture made from cobalt glass, metal, paper and red spheres" style={{transform:`translateY(${progress*-4}%) scale(${1+progress*.12}) rotate(${progress*4-2}deg)`}}/>
          <div className="portal-message" style={{opacity:Math.max(0,(progress-.68)*3.5),transform:`translateY(${(1-progress)*8}rem)`}}><span>Ideas deserve<br/>a physical force.</span><button onClick={()=>setReel(true)}>Play studio reel <b>▶</b></button></div>
        </div>
        <div className="hero-tag tag-a" style={{transform:`translate(${progress*-22}vw,${progress*16}vh) rotate(${-6-progress*6}deg)`,opacity:1-progress*1.25}}>Strategy<br/>with a pulse.</div>
        <div className="hero-tag tag-b" style={{transform:`translate(${progress*22}vw,${progress*-13}vh) rotate(${5+progress*5}deg)`,opacity:1-progress*1.25}}>Design<br/>with consequence.</div>
        <div className="hero-bottom"><p>MOTIF is an independent creative office building identities, digital worlds and unforgettable launches.</p><a href="#work">Selected work ↓</a><span>Scroll · {String(Math.round(progress*100)).padStart(2,'0')}</span></div>
      </div>
    </section>

    <section className="intro pad">
      <p className="kicker">What we do · 01</p>
      <div className="intro-space"><p>We help ambitious people make a leap—<br/>from familiar to <em>felt.</em></p><button className="reel-orbit" onClick={()=>setReel(true)}><i>▶</i><span>Watch the reel · Watch the reel · </span></button></div>
      <div className="intro-copy"><p>Across strategy, identity, digital and campaign, we make systems that are useful enough to last and unusual enough to matter.</p><button onClick={openBooking}>Start a conversation <Arrow/></button></div>
    </section>

    <section id="work" className="work pad">
      <div className="work-head"><p className="kicker">Selected work · 02</p><h2>Three ideas.<br/><em>Three worlds.</em></h2><span>2024—26</span></div>
      <div className="work-list">{work.map((item,i)=><article className={`case case-${i+1}`} key={item.name}>
        <div className={`case-media ${item.tone}`}><img src={item.image} alt={`${item.name} — ${item.kind}`}/><span>{item.n}</span><button onClick={openBooking} aria-label={`Enquire about work like ${item.name}`}><Arrow/></button></div>
        <div className="case-info"><div><small>{item.kind}</small><h3>{item.name}</h3></div><p>{item.copy}</p></div>
      </article>)}</div>
      <button className="all-work" onClick={()=>setReel(true)}>See all work <Arrow/></button>
    </section>

    <section id="services" className="practice pad">
      <div className="practice-head"><p className="kicker">Practice · 03</p><p>Different questions.<br/>One connected studio.</p></div>
      <div className="service-list">{services.map((s,i)=><article className={service===i?'active':''} key={s[0]}>
        <button onClick={()=>setService(i)} aria-expanded={service===i}><span>0{i+1}</span><h3>{s[0]}</h3><i>{service===i?'−':'+'}</i></button>
        <div className="service-answer"><p>{s[1]}</p><button onClick={openBooking}>Discuss {s[0]} <Arrow/></button></div>
      </article>)}</div>
    </section>

    <section className="process pad">
      <p className="kicker">How we move · 04</p>
      <div className="process-hero"><h2>Clear enough<br/>to trust.<br/><em>Open enough<br/>to surprise.</em></h2><div className="process-object"><img src="hero-engine-v2.webp" alt=""/></div></div>
      <div className="process-steps">{[['01','See','Listen hard, question the obvious and find the real opportunity.'],['02','Shape','Make the idea visible early, then push it until it has its own gravity.'],['03','Release','Build the system, equip the team and send the work into the world.']].map(s=><article key={s[0]}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></article>)}</div>
    </section>

    <section className="quotes pad">
      <div className="quote-stack">{[
        ['They made us feel braver without ever making the work feel reckless.','Mara Venn · Assembly'],
        ['MOTIF found the single thought that changed how our entire product made sense.','Tom Vale · Sona'],
        ['Every decision felt inevitable—but nothing looked like what we expected.','Aiko Ren · Between']
      ].map((q,i)=><article key={q[0]} className={quote===i?'active':''} style={{'--r':`${(i-1)*4}deg`}}><blockquote>“{q[0]}”</blockquote><p>{q[1]}</p></article>)}</div>
      <div className="quote-control"><span>{String(quote+1).padStart(2,'0')} / 03</span><button onClick={()=>setQuote((quote+2)%3)}>←</button><button onClick={()=>setQuote((quote+1)%3)}>→</button></div>
    </section>

    <section id="plans" className="plans pad">
      <div className="plans-head"><p className="kicker">Ways to work · 05</p><div className="switch"><button className={mode==='project'?'active':''} onClick={()=>setMode('project')}>Project</button><button className={mode==='partner'?'active':''} onClick={()=>setMode('partner')}>Partner</button></div></div>
      <div className="plan-feature"><span>{mode==='project'?'A defined leap':'Continuous momentum'}</span><h2>{mode==='project'?'Make something matter.':'Keep the edge sharp.'}</h2><p>{mode==='project'?'A focused programme for a new identity, digital experience or major launch. Senior attention throughout, with a clear scope and finish line.':'An embedded senior creative team for organisations in motion. Rolling priorities, rapid prototypes and a consistent point of view.'}</p><div><b>{mode==='project'?'From £25k · 6–14 weeks':'From £12k/mo · 3 month minimum'}</b><button onClick={openBooking}>Check availability <Arrow/></button></div></div>
    </section>

    <section id="faq" className="faq pad"><div><p className="kicker">Practical things · 06</p><h2>Before<br/>we begin.</h2></div><div className="faq-list">{faqs.map((f,i)=><article key={f[0]}><button onClick={()=>setFaq(faq===i?-1:i)} aria-expanded={faq===i}><span>{f[0]}</span><i>{faq===i?'−':'+'}</i></button><div className={faq===i?'faq-answer open':'faq-answer'}><p>{f[1]}</p></div></article>)}</div></section>

    <footer className="footer pad"><div className="footer-row"><p>There is always<br/>another way.</p><button onClick={openBooking}>Find it together <Arrow/></button></div><button className="mail" onClick={()=>navigator.clipboard?.writeText('hello@motif.studio')}>hello@motif.studio</button><div className="footer-meta"><span>© MOTIF 2026</span><span>London · Working everywhere</span><a href="#top">Back to top ↑</a></div></footer>

    <div className={`menu ${menu?'open':''}`} aria-hidden={!menu} inert={!menu?true:undefined}><button className="x" onClick={()=>setMenu(false)}>Close ×</button><nav>{[['Work','#work'],['Practice','#services'],['Ways to work','#plans'],['Questions','#faq']].map((n,i)=><a key={n[0]} href={n[1]} onClick={()=>setMenu(false)}><small>0{i+1}</small><span>{n[0]}</span><Arrow/></a>)}</nav><p>hello@motif.studio<br/>London · Worldwide</p></div>

    <div className={`reel ${reel?'open':''}`} role="dialog" aria-modal="true" aria-label="MOTIF studio reel" aria-hidden={!reel} inert={!reel?true:undefined}><button className="x" onClick={()=>setReel(false)}>Close ×</button><div className="reel-track"><div className="reel-frame one"><img src="world-red-v2.webp" alt="Assembly project world"/></div><div className="reel-frame two"><img src="world-blue-v2.webp" alt="Sona project world"/></div><div className="reel-frame three"><img src="world-yellow-v2.webp" alt="Between project world"/></div><h2>Ideas<br/><em>in motion.</em></h2></div><p className="reel-note">Studio reel · 00:24 · Playing</p></div>

    <aside className={`booking ${booking?'open':''}`} aria-hidden={!booking} inert={!booking?true:undefined}><button className="x" onClick={()=>setBooking(false)}>Close ×</button>{sent?<div className="sent"><span>✓</span><h2>Something<br/>started.</h2><p>Thank you. We will be in touch within two working days.</p><button onClick={()=>setBooking(false)}>Return to studio</button></div>:<form onSubmit={e=>{e.preventDefault();setSent(true)}}><p className="kicker">Start a conversation</p><h2>What could<br/>this become?</h2><label>Name<input required name="name" placeholder="Your name"/></label><label>Email<input required type="email" name="email" placeholder="you@company.com"/></label><label>The interesting part<textarea required name="brief" placeholder="Tell us what is changing."/></label><button type="submit">Send enquiry <Arrow/></button></form>}</aside>
  </main>
}
