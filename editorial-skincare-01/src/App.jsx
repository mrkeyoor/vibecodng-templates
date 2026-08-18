import { useEffect, useState } from 'react'
const data={"id":"editorial-skincare-01","kind":"skincare","brand":"VERDANT","kicker":"Bioactive skin ritual","title":"Less, but\nmore alive.","description":"An art-directed botanical skincare template with atmospheric image motion, ingredient storytelling, editorial type, scroll-revealed products, ritual selection, and a functional add-to-bag flow.","theme":{"accent":"#3f6934","surface":"#e7ebdc","text":"#172115","muted":"#64705e"},"image":"/root/.codex/generated_images/01a010fd-0199-7130-b68e-8a993f9acdc6/exec-ab75c93c-8610-46bc-868d-bf7ad6536ca2.png","manifesto":"We formulate with fewer things, chosen more carefully, and leave the rest to living systems.","edition":"Serum 01 / Renewal","price":"$88","chapters":[["01","LIVING EXTRACTS","Fresh plant fractions are stabilized at low temperature to preserve active compounds."],["02","SKIN-LIKE DELIVERY","A lamellar base mirrors the structure of the barrier for calm, even absorption."],["03","THE DAILY RITUAL","Three drops after water, before oil. Morning, evening, or whenever skin asks."]]}

export default function App(){
  const [bag,setBag]=useState(0)
  const [drawer,setDrawer]=useState(false)
  const [menu,setMenu]=useState(false)
  const [edition,setEdition]=useState(0)
  useEffect(()=>{
    let frame=0
    const update=()=>{frame=0;const root=document.documentElement;const hero=Math.min(1,window.scrollY/(window.innerHeight*1.15));const total=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);root.style.setProperty('--hero-progress',hero.toFixed(4));root.style.setProperty('--page-progress',(window.scrollY/total).toFixed(4))}
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('in-view',entry.isIntersecting)),{threshold:.18})
    document.querySelectorAll('[data-reveal]').forEach(node=>observer.observe(node));update();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll)
    return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);observer.disconnect();if(frame)cancelAnimationFrame(frame)}
  },[])
  const add=()=>{setBag(v=>v+1);setDrawer(true)}
  return <div className={'editorial '+data.kind}>
    <div className="progress" aria-hidden="true"/>
    <header className="site-head"><a className="wordmark" href="#top">{data.brand}</a><nav aria-label="Primary"><a href="#story">Story</a><a href="#collection">Collection</a><a href="#notes">Journal</a></nav><div><button type="button" onClick={()=>setMenu(v=>!v)} aria-expanded={menu}>Menu</button><button type="button" onClick={()=>setDrawer(true)} aria-label={'Open bag with '+bag+' items'}>Bag <span>{String(bag).padStart(2,'0')}</span></button></div></header>
    {menu&&<nav className="menu" aria-label="Expanded menu"><a href="#story" onClick={()=>setMenu(false)}>The story</a><a href="#collection" onClick={()=>setMenu(false)}>The collection</a><a href="#notes" onClick={()=>setMenu(false)}>Field notes</a></nav>}
    <main id="top">
      <section className="hero-stage"><div className="hero-sticky"><img src="campaign.webp" alt={data.brand+' campaign product in an art-directed studio'} fetchPriority="high"/><div className="veil"/><div className="hero-copy"><p>{data.kicker}</p><h1>{data.title.split('\n').map((line,i)=><span key={line} className={'line line-'+i}>{line}</span>)}</h1><div><span>{data.edition}</span><button type="button" onClick={add}>Discover — {data.price}</button></div></div><span className="scroll-cue">Scroll to enter <i>↓</i></span><span className="frame-count">01 — 05</span></div></section>
      <section id="story" className="manifesto"><p data-reveal>Our point of view</p><h2 data-reveal>{data.manifesto}</h2><div className="manifesto-meta" data-reveal><span>Designed slowly</span><span>Made in small editions</span><span>Objects worth keeping</span></div></section>
      <section className="chapters">{data.chapters.map((chapter,index)=><article className={'chapter chapter-'+index} key={chapter[0]}><div className="chapter-media"><img src="campaign.webp" alt=""/><span>{chapter[0]}</span></div><div className="chapter-copy" data-reveal><p>{chapter[0]} / Material study</p><h2>{chapter[1]}</h2><p>{chapter[2]}</p><button type="button" onClick={()=>setEdition(index)}>Explore detail ↗</button></div></article>)}</section>
      <section className="interlude" data-reveal><span>{data.brand}</span><p>Built from the inside out.</p><i>Edition {String(edition+1).padStart(2,'0')}</i></section>
      <section id="collection" className="collection"><header data-reveal><p>Current editions</p><h2>Three expressions.<br/>One point of view.</h2><span>Drag / scroll to explore</span></header><div className="product-track">{data.chapters.map((chapter,index)=><article key={chapter[1]}><div className={'product-image crop-'+index}><img src="campaign.webp" alt=""/><span>0{index+1}</span></div><div><p>{data.brand} / {chapter[1]}</p><h3>{index===0?data.edition:chapter[1].toLowerCase().replaceAll(' ',' / ')}</h3><button type="button" onClick={add}>{index===0?data.price:'View edition'} <span>↗</span></button></div></article>)}</div></section>
      <section id="notes" className="closing"><div data-reveal><p>Field note / 08.26</p><h2>What remains<br/>when noise leaves?</h2><a href="#top">Read the journal ↗</a></div><div className="closing-image" data-reveal><img src="campaign.webp" alt="Close crop of the campaign product"/></div></section>
    </main>
    <footer><a className="wordmark" href="#top">{data.brand}</a><p>Independent objects for deliberate living.</p><nav><a href="#shipping">Shipping</a><a href="#care">Care</a><a href="#instagram">Instagram</a></nav></footer>
    <aside className={drawer?'drawer open':'drawer'} aria-hidden={!drawer}><button className="drawer-close" type="button" onClick={()=>setDrawer(false)} aria-label="Close bag">×</button><p>Bag / {String(bag).padStart(2,'0')}</p><div className="drawer-product"><img src="campaign.webp" alt="Selected product"/><div><span>{data.edition}</span><strong>{data.price}</strong><small>Complimentary delivery</small></div></div><div className="drawer-bottom"><p>Taxes calculated at checkout.</p><button type="button" disabled={!bag}>{bag?'Continue to checkout':'Your bag is empty'}</button></div></aside>{drawer&&<button className="scrim" type="button" onClick={()=>setDrawer(false)} aria-label="Close bag overlay"/>}
  </div>
}
