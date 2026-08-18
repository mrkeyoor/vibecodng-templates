import { useEffect, useState } from 'react'

function Reveals(){useEffect(()=>{const nodes=[...document.querySelectorAll('[data-reveal]')];if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window)){nodes.forEach(n=>n.classList.add('visible'));return}const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.1});nodes.forEach(n=>o.observe(n));return()=>o.disconnect()},[]);return null}

// Source slug: hyperui-headers-4
// Author repo: https://github.com/markmead/hyperui
function Nav(){const[open,setOpen]=useState(false);return <header className="nav"><div className="shell nav-inner"><a className="wordmark" href="#top">ISO <i>STUDIO</i><span>Wedding + editorial photography</span></a><nav className="desktop"><a href="#stories">Stories</a><a href="#approach">Approach</a><a href="#collections">Collections</a><a className="nav-cta" href="#contact">Check your date</a></nav><button className="menu" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open?'Close':'Menu'}</button></div>{open&&<nav className="mobile"><a href="#stories">Stories</a><a href="#collections">Collections</a><a href="#contact">Check your date</a></nav>}</header>}

function PhotoArt({kind,title}){if(kind==='vows')return <svg viewBox="0 0 1200 760" role="img" aria-label="Abstract wedding ceremony beneath sculptural arches"><rect width="1200" height="760" fill="#25231f"/><circle cx="600" cy="310" r="240" fill="var(--bw-accent)" opacity=".62"/><path d="M210 680V350q0-230 220-230t220 230v330M550 680V390q0-190 190-190t190 190v290" fill="none" stroke="var(--bw-surface)" strokeWidth="55"/><circle cx="534" cy="488" r="35" fill="var(--bw-surface)"/><circle cx="660" cy="488" r="35" fill="var(--bw-surface)"/><path d="M500 680V550q34-40 68 0v130M626 680V550q34-40 68 0v130" fill="var(--bw-surface)"/><text x="58" y="70" fill="var(--bw-surface)" fontFamily="Arial" fontSize="18" letterSpacing="5">{title}</text></svg>;if(kind==='coast')return <svg viewBox="0 0 1200 760" role="img" aria-label="Editorial coastal portrait study"><rect width="1200" height="760" fill="#b7c5c0"/><path d="M0 510Q220 330 430 465t390-15 380-100v410H0Z" fill="#344e4c"/><circle cx="850" cy="190" r="120" fill="var(--bw-accent)"/><path d="M380 620q20-280 175-280t175 280" fill="#e9dfd2"/><circle cx="555" cy="270" r="100" fill="#3c302b"/><path d="M500 310q55 70 110 0" fill="none" stroke="#e9dfd2" strokeWidth="22"/><text x="60" y="690" fill="#f6efe7" fontFamily="Georgia" fontStyle="italic" fontSize="42">{title}</text></svg>;return <svg viewBox="0 0 1200 760" role="img" aria-label="Editorial still life with flowers and silver forms"><rect width="1200" height="760" fill="#d8cec0"/><ellipse cx="600" cy="625" rx="430" ry="55" fill="#8d8176" opacity=".35"/><path d="M460 620V315h280v305Z" fill="#24221f"/><circle cx="600" cy="310" r="150" fill="none" stroke="var(--bw-accent)" strokeWidth="44"/><g stroke="#55634e" strokeWidth="12"><path d="M590 310 450 120M610 300 740 110M575 280 550 70"/></g><g fill="var(--bw-accent)"><circle cx="444" cy="115" r="48"/><circle cx="742" cy="108" r="58"/><circle cx="548" cy="65" r="42"/></g><text x="70" y="690" fill="#24221f" fontFamily="Arial" fontWeight="700" fontSize="21" letterSpacing="7">{title}</text></svg>}

// Source slug: magicui-highlighter
// Author repo: https://github.com/magicuidesign/magicui
function Hero(){return <section id="top" className="hero"><div className="shell hero-grid"><p className="eyebrow" data-reveal>Photographs with feeling, form, and room to breathe.</p><h1 data-reveal>Honest celebrations.<br/><em>Editorial eyes.</em></h1><p className="intro" data-reveal>Iso Studio is the wedding and editorial practice of Anika Rao and Dev Malik, photographing in India and wherever good stories take us.</p><a href="#stories" className="round-link" aria-label="View recent stories">↓</a></div></section>}

// Source slug: hyperui-blog-cards-2
// Author repo: https://github.com/markmead/hyperui
const stories=[{kind:'vows',title:'MIRA + ARJUN / JAIPUR',place:'Samode Palace, Jaipur',type:'Three-day wedding',date:'February 2026'},{kind:'coast',title:'SALT / ISSUE 08',place:'Varkala coast',type:'Fashion editorial',date:'January 2026'},{kind:'still',title:'AFTERGLOW / OBJECT STUDY',place:'Iso daylight studio',type:'Beauty editorial',date:'November 2025'}]
function Stories(){return <section id="stories" className="section stories"><div className="shell"><div className="section-head"><span>Selected stories</span><span>Wedding + editorial</span></div>{stories.map((s,i)=><article className="story" key={s.title} data-reveal><div className={`story-art art-${s.kind}`}><PhotoArt kind={s.kind} title={s.title}/><span>0{i+1}</span></div><div className="story-meta"><strong>{s.place}</strong><span>{s.type}</span><span>{s.date}</span></div></article>)}</div></section>}

// Source slug: hyperui-feature-grids-1
// Author repo: https://github.com/markmead/hyperui
function Approach(){return <section id="approach" className="section approach"><div className="shell approach-grid"><div data-reveal><p className="label">Our approach</p><h2>Present when it matters.<br/>Quiet when it does not.</h2></div><div className="steps">{[['01','Observe','We learn the people, pace, and details that make the day yours.'],['02','Direct lightly','A little structure when useful, then space for real gestures and real weather.'],['03','Edit with care','A coherent story in true colour, with rhythm, atmosphere, and the frames you felt.']].map(x=><article key={x[0]} data-reveal><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></div></section>}

// Source slug: meraki-pricing-side-by-side
// Author repo: https://github.com/merakiui/merakiui
function Collections(){return <section id="collections" className="section collections"><div className="shell"><p className="label">Collections and rates</p><div className="collection-grid"><article data-reveal><span>Weddings</span><h2>Full story</h2><strong>From ₹2,85,000</strong><p>Up to ten hours, two photographers, planning call, 600+ edited photographs, online gallery, and a 30-print linen box.</p><a href="#contact">Request the wedding guide ↗</a></article><article data-reveal><span>Editorial</span><h2>Commission</h2><strong>From ₹65,000/day</strong><p>Creative treatment, one photographer, lighting kit, tethered review, colour finish, and publication-ready delivery.</p><a href="#contact">Share a brief ↗</a></article></div></div></section>}

// Source slug: meraki-testimonials-centered
// Author repo: https://github.com/merakiui/merakiui
function Quote(){return <section className="section quote"><div className="shell" data-reveal><span>“</span><blockquote>They photographed the wild parts and the quiet parts with the same tenderness. The gallery feels exactly like the weekend felt.</blockquote><p><strong>Naina Kapur</strong> · Jaipur wedding client</p></div></section>}

// Source slug: hyperui-ctas-2
// Author repo: https://github.com/markmead/hyperui
function Contact(){return <section id="contact" className="section contact"><div className="shell" data-reveal><p>Tell us what you are making or celebrating.</p><a href="mailto:hello@isostudio.example">hello@isostudio.example <span>↗</span></a><small>Based in Mumbai · Available worldwide · 2026 wedding dates open</small></div></section>}

// Source slug: hyperui-footers-2
// Author repo: https://github.com/markmead/hyperui
function Footer(){return <footer><div className="shell footer-grid"><strong>ISO <i>STUDIO</i></strong><p>Wedding and editorial photography<br/>Mumbai, India</p><nav><a href="#stories">Stories</a><a href="#collections">Rates</a><a href="#contact">Contact</a></nav><p>© 2026 Iso Studio<br/>Fictional photography practice</p></div></footer>}

export default function App(){return <><Reveals/><Nav/><main><Hero/><Stories/><Approach/><Collections/><Quote/><Contact/></main><Footer/></>}
