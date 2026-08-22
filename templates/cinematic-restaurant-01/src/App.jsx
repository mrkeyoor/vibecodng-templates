import { useEffect, useRef, useState } from 'react'

const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v))
const menus=[
  {time:'01',name:'First light',note:'Oyster / green almond / sea fennel'},
  {time:'02',name:'Smoke line',note:'Charred leek / shellfish broth / verbena'},
  {time:'03',name:'Low tide',note:'Wild fish / burnt citrus / coastal greens'},
  {time:'04',name:'After fire',note:'Fig leaf / cultured cream / bronze honey'}
]

export default function App(){
  const journeyRef=useRef(null)
  const [booking,setBooking]=useState(false)
  const [menu,setMenu]=useState(false)
  const [guests,setGuests]=useState(2)
  const [service,setService]=useState('20:30')
  const [sent,setSent]=useState(false)
  useEffect(()=>{let raf=0;const root=document.documentElement;const update=()=>{raf=0;const el=journeyRef.current;if(!el)return;const p=clamp((scrollY-el.offsetTop)/Math.max(1,el.offsetHeight-innerHeight));root.style.setProperty('--p',p.toFixed(4));root.style.setProperty('--interior',(1-clamp((p-.18)/.15)).toFixed(4));root.style.setProperty('--dish',(clamp((p-.16)/.14)*(1-clamp((p-.55)/.13))).toFixed(4));root.style.setProperty('--fire',clamp((p-.52)/.15).toFixed(4));root.style.setProperty('--c1',(1-clamp((p-.14)/.09)).toFixed(4));root.style.setProperty('--c2',(clamp((p-.25)/.08)*(1-clamp((p-.49)/.08))).toFixed(4));root.style.setProperty('--c3',(clamp((p-.59)/.08)*(1-clamp((p-.78)/.08))).toFixed(4));root.style.setProperty('--c4',clamp((p-.84)/.08).toFixed(4));root.style.setProperty('--plate-x',`${(-27*clamp((p-.18)/.35)+27*clamp((p-.62)/.38)).toFixed(2)}vw`);root.style.setProperty('--plate-s',(1-.17*clamp((p-.18)/.35)+.17*clamp((p-.62)/.38)).toFixed(3));root.style.setProperty('--page',(scrollY/Math.max(1,root.scrollHeight-innerHeight)).toFixed(4))};const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};const obs=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('shown',e.isIntersecting)),{threshold:.16});document.querySelectorAll('[data-reveal]').forEach(n=>obs.observe(n));update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);obs.disconnect();if(raf)cancelAnimationFrame(raf)}},[])
  useEffect(()=>{document.body.style.overflow=booking||menu?'hidden':'';return()=>{document.body.style.overflow=''}},[booking,menu])
  useEffect(()=>{const close=event=>{if(event.key==='Escape'){setMenu(false);setBooking(false)}};addEventListener('keydown',close);return()=>removeEventListener('keydown',close)},[])
  const reserve=()=>{setSent(false);setBooking(true)}
  return <div className="experience">
    <div className="progress" aria-hidden="true"/>
    <header className="nav"><a className="mark" href="#top"><i>O</i>ORA</a><nav aria-label="Primary"><a href="#menu">Menu</a><a href="#room">The room</a><a href="#philosophy">Philosophy</a></nav><div><button onClick={()=>setMenu(true)}>Menu</button><button className="book" onClick={reserve}>Reserve a table ↗</button></div></header>
    {menu&&<div className="menu-overlay" role="dialog" aria-modal="true" aria-label="ORA navigation"><button onClick={()=>setMenu(false)}>Close ×</button><p>Enter ORA</p><a href="#menu" onClick={()=>setMenu(false)}>The tasting menu</a><a href="#room" onClick={()=>setMenu(false)}>Inside the room</a><a href="#philosophy" onClick={()=>setMenu(false)}>Fire and coast</a><span>Wednesday—Sunday / 18:30—23:30</span></div>}
    <main id="top">
      <section className="journey" ref={journeyRef}><div className="stage">
        <div className="scene interior"><img src="interior.webp" alt="" fetchPriority="high"/></div><div className="scene dish"><img src="dish.webp" alt=""/></div><div className="scene fire"><img src="fire.webp" alt=""/></div><div className="shade"/>
        <div className="copy c1"><p>Fire / coast / season</p><h1>DINNER<br/>BEGINS<br/><i>BEFORE</i><br/>YOU ARRIVE.</h1><span>Scroll into service</span></div>
        <div className="copy c2"><p>Course two / smoke line</p><h2>One flame.<br/><i>No fixed menu.</i></h2><p>Every plate begins with what arrived from the water and the hillside this morning.</p><a href="#menu">Read tonight's progression ↓</a></div>
        <div className="copy c3"><p>From the pass / 20:10</p><h2>Fire edits.<br/><i>The coast decides.</i></h2><p>Salt, smoke, acidity and time. Nothing decorative. Nothing repeated tomorrow.</p></div>
        <div className="copy c4"><p>ORA / twelve seats</p><h2>Come<br/><i>hungry.</i></h2><button onClick={reserve}>Reserve the counter ↗</button></div>
        <div className="plate-window"><img src="dish.webp" alt=""/></div><div className="counter"><span>SCROLL</span><i/><b>01—04</b></div>
      </div></section>
      <section id="philosophy" className="manifesto" data-reveal><p>A menu written each afternoon</p><h2>The boats arrive.<br/>The fire is lit.<br/><i>Everything else follows.</i></h2><div><span>12 counter seats</span><span>4 nightly courses</span><span>1 changing menu</span></div></section>
      <section id="menu" className="menu-section"><header data-reveal><p>Tonight / 18 August</p><h2>Four moments,<br/><i>not four courses.</i></h2><span>€145 / guest</span></header><div className="menu-list">{menus.map((item,index)=><article data-reveal key={item.name}><span>{item.time}</span><div><p>{index===0?'Arrival':index===3?'Departure':'At the counter'}</p><h3>{item.name}</h3><small>{item.note}</small></div><b>≈</b></article>)}</div></section>
      <section className="dish-story"><div className="dish-photo" data-reveal><img src="dish.webp" alt="Charred leek and shellfish broth on handmade stoneware"/></div><div data-reveal><p>02 / Smoke line</p><h2>Leek.<br/>Shellfish.<br/><i>Verbena.</i></h2><blockquote>“A dish should taste of its place before it tastes of the chef.”</blockquote><span>Kitchen note / Day 231</span></div></section>
      <section id="room" className="room"><img src="interior.webp" alt="ORA dining counter and open kitchen at night"/><div data-reveal><p>03 / The room</p><h2>Twelve seats.<br/><i>One conversation.</i></h2><p>The counter curves around the open fire so every guest sees the same service, from first cut to last pour.</p><button onClick={reserve}>Choose your evening ↗</button></div></section>
      <section className="origin"><div data-reveal><p>04 / What arrived</p><h2>Close enough<br/>to know<br/><i>every name.</i></h2></div><div className="origin-photo" data-reveal><img src="fire.webp" alt="Coastal ingredients beside the ORA kitchen fire"/></div><div className="suppliers">{['Mara / line-caught fish','Ilias / hillside herbs','Ada / wild citrus','Nero / cultured dairy'].map((x,i)=><p key={x}><span>0{i+1}</span>{x}</p>)}</div></section>
      <section className="final"><img src="interior.webp" alt="ORA restaurant illuminated before dinner"/><div data-reveal><p>One room / one menu / one night</p><h2>Meet us<br/><i>at the fire.</i></h2><button onClick={reserve}>Reserve a table ↗</button></div></section>
    </main>
    <footer><a className="mark" href="#top"><i>O</i>ORA</a><p>Fire, coast, season.<br/>A fictional dining room.</p><nav><a href="#menu">Menu</a><a href="#room">Room</a><a href="#philosophy">Story</a></nav><small>© 2026 ORA</small></footer>
    <aside className={`reservation ${booking?'open':''}`} role="dialog" aria-modal={booking||undefined} aria-label="ORA table reservation" aria-hidden={!booking} inert={!booking?true:undefined}><button className="close" onClick={()=>setBooking(false)}>Close ×</button><p>Reserve / ORA</p><h2>{sent?'Your seat is almost warm.':'An evening at the counter.'}</h2>{sent?<div className="confirmed"><span>Request received</span><p>We will confirm your table and dietary notes by email.</p><button onClick={()=>setBooking(false)}>Return to ORA</button></div>:<form onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Date<input type="date" required/></label><label>Service<select value={service} onChange={e=>setService(e.target.value)}><option>18:30</option><option>20:30</option><option>21:45</option></select></label><fieldset><legend>Guests</legend><button type="button" aria-label="Remove guest" onClick={()=>setGuests(Math.max(1,guests-1))}>−</button><output>{String(guests).padStart(2,'0')}</output><button type="button" aria-label="Add guest" onClick={()=>setGuests(Math.min(6,guests+1))}>+</button></fieldset><label>Email<input type="email" placeholder="you@example.com" required/></label><label>Dietary notes<textarea placeholder="Tell the kitchen anything we should know"/></label><button className="submit" type="submit">Request this table ↗</button></form>}</aside>
    {booking&&<button className="scrim" onClick={()=>setBooking(false)} aria-label="Close reservation overlay"/>}
  </div>
}
