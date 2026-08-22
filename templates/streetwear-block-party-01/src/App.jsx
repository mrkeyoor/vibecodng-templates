import {useEffect,useMemo,useRef,useState} from 'react'

const tees=[
  {name:'Mango Noise',color:'mango',hex:'#ffc928',graphic:'Voltage',price:54},
  {name:'Cobalt Bounce',color:'cobalt',hex:'#174be8',graphic:'Cutback',price:58},
  {name:'Hot Pink Chorus',color:'pink',hex:'#ff2e86',graphic:'Echo',price:56},
  {name:'Lime High',color:'lime',hex:'#b9f227',graphic:'Signal',price:54},
  {name:'Redline Joy',color:'red',hex:'#f23b2d',graphic:'Rally',price:58},
]
const starter=[
  {tee:0,size:''},{tee:1,size:''},{tee:2,size:''}
]
const asset=name=>`${import.meta.env.BASE_URL}${name}`

export default function App(){
  const hero=useRef(null)
  const [menu,setMenu]=useState(false)
  const [story,setStory]=useState(0)
  const [active,setActive]=useState(0)
  const [crew,setCrew]=useState(starter)
  const [errors,setErrors]=useState({})
  const [issued,setIssued]=useState(false)
  const total=useMemo(()=>crew.reduce((sum,item)=>sum+tees[item.tee].price,0),[crew])
  const ready=crew.every(item=>item.size)
  const code=useMemo(()=>`LOUD-${crew.map(x=>tees[x.tee].color[0].toUpperCase()).join('')}-${crew.map(x=>x.size||'–').join('')}`,[crew])

  useEffect(()=>{
    let frame=0
    const update=()=>{
      frame=0
      const box=hero.current?.getBoundingClientRect(); if(!box)return
      const p=Math.max(0,Math.min(1,-box.top/Math.max(1,box.height-innerHeight)))
      document.documentElement.style.setProperty('--block-progress',p.toFixed(4))
    }
    const move=()=>{if(!frame)frame=requestAnimationFrame(update)}
    update();addEventListener('scroll',move,{passive:true});addEventListener('resize',move)
    return()=>{removeEventListener('scroll',move);removeEventListener('resize',move);if(frame)cancelAnimationFrame(frame)}
  },[])

  useEffect(()=>{
    const close=e=>{if(e.key==='Escape')setMenu(false)}
    addEventListener('keydown',close);return()=>removeEventListener('keydown',close)
  },[])

  function patchSlot(patch){
    setCrew(old=>old.map((item,index)=>index===active?{...item,...patch}:item))
    setIssued(false);setErrors(old=>({...old,crew:''}))
  }
  function submit(event){
    event.preventDefault();const form=new FormData(event.currentTarget);const next={}
    if(!ready)next.crew='Give every crew member a size before issuing the pass.'
    if(!String(form.get('name')||'').trim())next.name='Add the crew lead name.'
    if(!/^\S+@\S+\.\S+$/.test(String(form.get('email')||'')))next.email='Add a valid email.'
    setErrors(next);setIssued(Object.keys(next).length===0)
  }

  return <div className="site-shell">
    <a className="skip" href="#crew-builder">Skip to crew builder</a>
    <header className="flight-strip">
      <a href="#top" className="mark" aria-label="LOUDER home"><b>LOUDER</b><span>BLOCK / 01</span></a>
      <nav aria-label="Primary"><a href="#wave">01 WAVE</a><a href="#crew-builder">02 CREW</a><a href="#print-lab">03 PRINT</a></nav>
      <button data-qa-action="menu" aria-haspopup="dialog" onClick={()=>setMenu(true)}>SET LIST <i aria-hidden="true">≡</i></button>
    </header>

    <main id="top">
      <section className="block-open" ref={hero} aria-labelledby="hero-title">
        <div className="block-pin">
          <img className="hero-photo" src={asset('louder-hero.webp')} width="1600" height="1066" fetchPriority="high" alt="Six friends dancing together in colorful graphic T-shirts at a sunny city block party"/>
          <div className="color-shutter shutter-a" aria-hidden="true"/><div className="color-shutter shutter-b" aria-hidden="true"/><div className="color-shutter shutter-c" aria-hidden="true"/>
          <div className="hero-label"><span>SUMMER DROP / FICTIONAL LABEL</span><span>SUN + DIRECT FLASH</span></div>
          <div className="hero-copy"><p>THE BLOCK<br/>IS OURS.</p><h1 id="hero-title">LOUDER</h1><div><strong>Wear the colour.<br/>Bring the people.</strong><a href="#crew-builder">BUILD YOUR CREW ↓</a></div></div>
          <div className="beat-line" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i}/>)}</div>
        </div>
      </section>

      <section id="wave" className="crowd-wave" aria-labelledby="wave-title">
        <div className="wave-photo"><img src={asset('louder-jump.webp')} width="1600" height="1066" loading="lazy" alt="Five friends jumping and laughing together on a painted basketball court"/><span>NO WALLFLOWERS / 02:14 PM</span></div>
        <div className="wave-copy"><p>01 / CROWD WAVE</p><h2 id="wave-title">A TEE SHOULD<br/><em>MOVE BEFORE</em><br/>YOU DO.</h2><div className="chants"><span>JUMP IN</span><span>TURN UP</span><span>PASS JOY</span></div><p>Heavy cotton with enough room to dance. Saturated colour built to survive sun, sweat and the front row.</p></div>
      </section>

      <section className="crew-builder" id="crew-builder" aria-labelledby="crew-title">
        <header><div><p>02 / BUILD THE CREW</p><h2 id="crew-title">THREE PEOPLE.<br/>ONE LOUD SET.</h2></div><p>Pick the tee and size for each person. The block assembles live.</p></header>
        <div className="crew-stage">
          <div className="crew-visual">
            <img src={asset('louder-portrait.webp')} width="1600" height="1066" loading="lazy" alt="Three friends in lime, cobalt and red graphic T-shirts laughing together"/>
            {crew.map((item,index)=><button key={index} data-qa-action="crew-slot" aria-pressed={active===index} className={`person-hit hit-${index+1} ${tees[item.tee].color}`} onClick={()=>setActive(index)}><span>0{index+1}</span><b>{tees[item.tee].name}</b><small>{item.size||'SIZE?'}</small></button>)}
            <div className={`ready-burst ${ready?'show':''}`} role="status">CREW READY <b>✓</b></div>
          </div>
          <div className="crew-console">
            <div className="crew-tabs" role="tablist" aria-label="Choose crew member">{crew.map((item,index)=><button role="tab" aria-selected={active===index} data-qa-action="crew-slot" onClick={()=>setActive(index)} key={index}><span>0{index+1}</span><b>{tees[item.tee].name}</b><small>{item.size||'SIZE OPEN'}</small></button>)}</div>
            <div className="wrist-progress"><i style={{width:`${((active+1)/3)*100}%`}}/><span>PERSON {active+1} / 3</span></div>
            <fieldset><legend>Colour hit</legend><div className="swatches">{tees.map((tee,index)=><button type="button" data-qa-action="tee-select" aria-label={`Choose ${tee.name}`} aria-pressed={crew[active].tee===index} style={{'--swatch':tee.hex}} onClick={()=>patchSlot({tee:index})} key={tee.name}><i/><span>{tee.name}</span></button>)}</div></fieldset>
            <fieldset><legend>Fit / size</legend><div className="sizes">{['XS','S','M','L','XL'].map(size=><button type="button" data-qa-action="size-select" aria-pressed={crew[active].size===size} onClick={()=>patchSlot({size})} key={size}>{size}</button>)}</div></fieldset>
            <dl className="selected-spec"><div><dt>Graphic</dt><dd>{tees[crew[active].tee].graphic}</dd></div><div><dt>Body</dt><dd>260 GSM / box fit</dd></div><div><dt>Price</dt><dd>${tees[crew[active].tee].price}</dd></div></dl>
            <button className="next-person" data-qa-action="crew-next" onClick={()=>setActive(old=>(old+1)%3)}>{active===2?'REVIEW THE CREW':'NEXT PERSON'} <span>→</span></button>
          </div>
        </div>
      </section>

      <section className="print-lab" id="print-lab" aria-labelledby="print-title">
        <img src={asset('louder-print.webp')} width="1600" height="1066" loading="lazy" alt="Hands screen printing cobalt and hot pink ink onto a mango yellow T-shirt"/>
        <div className="print-recipe"><p>03 / PRINT LAB</p><h2 id="print-title">INK YOU<br/>CAN FEEL.</h2><ol><li><b>01</b><span>Water-based underprint</span></li><li><b>02</b><span>High-density colour pass</span></li><li><b>03</b><span>Hand-cured at 165°</span></li></ol><strong>ILLUSTRATIVE MAKE SPEC / FICTIONAL LABEL</strong></div>
      </section>

      <section className="street-chorus" aria-labelledby="chorus-title">
        <div className="chorus-title"><p>04 / STREET CHORUS</p><h2 id="chorus-title">WEAR<br/>YOUR<br/><em>VOLUME.</em></h2></div>
        <div className="chorus-photo"><img src={asset('louder-rooftop.webp')} width="1600" height="1066" loading="lazy" alt="A colorful group of friends dancing on a rooftop at golden hour"/></div>
        <div className="voice-lines"><p><span>01</span>“The colour started the conversation.”</p><p><span>02</span>“The fit stayed loose through the whole set.”</p><p><span>03</span>“We arrived as six. The block made it sixty.”</p></div>
      </section>

      <section className={`drop-pass ${issued?'issued':''}`} id="drop-pass" aria-labelledby="pass-title">
        {!issued?<><div className="pass-intro"><p>05 / DROP PASS</p><h2 id="pass-title">PUT THE CREW<br/>ON THE LIST.</h2><p>One fictional group reservation. Three tees. No payment or live inventory is involved.</p></div><form onSubmit={submit} noValidate>
          <div className="crew-lines">{crew.map((item,index)=><div key={index}><span>0{index+1}</span><b>{tees[item.tee].name}</b><small>{item.size||'SIZE NEEDED'}</small><strong>${tees[item.tee].price}</strong></div>)}</div>
          {errors.crew&&<p className="form-error" role="alert">{errors.crew}</p>}
          <label><span>Crew lead</span><input name="name" autoComplete="name" aria-invalid={!!errors.name}/>{errors.name&&<small>{errors.name}</small>}</label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email}/>{errors.email&&<small>{errors.email}</small>}</label>
          <div className="pass-total"><span>CREW TOTAL</span><strong>${total}</strong></div>
          <button data-qa-action="pass-submit">ISSUE THE DROP PASS <span>↗</span></button>
        </form></>:<div className="issued-pass" role="status"><p>LOUDER / CREW CLEARED</p><h2 id="pass-title">THE BLOCK<br/>KNOWS YOUR<br/>NAME.</h2><strong>{code}</strong><div>{crew.map((item,index)=><p key={index}><span>0{index+1}</span>{tees[item.tee].name}<b>{item.size}</b></p>)}</div><footer><span>FICTIONAL OUTCOME<br/>NO PAYMENT TAKEN</span><b>${total}</b></footer><button data-qa-action="pass-reset" onClick={()=>{setIssued(false);setErrors({})}}>BUILD ANOTHER CREW ↺</button></div>}
      </section>
    </main>

    <footer className="site-footer"><a href="#top">LOUDER</a><p>Block party T-shirts<br/>Fictional independent label</p><p>Original AI campaign imagery<br/>No live inventory</p><a href="#top">BACK UP ↑</a></footer>
    <div className={`set-menu ${menu?'open':''}`} role="dialog" aria-modal="true" aria-label="Set list navigation" aria-hidden={!menu} inert={!menu?true:undefined}><button onClick={()=>setMenu(false)} aria-label="Close set list">CLOSE ×</button><nav>{[['01','Crowd wave','#wave'],['02','Build the crew','#crew-builder'],['03','Print lab','#print-lab'],['04','Drop pass','#drop-pass']].map(item=><a href={item[2]} onClick={()=>setMenu(false)} key={item[0]}><span>{item[0]}</span><b>{item[1]}</b><i>↘</i></a>)}</nav><p>SUMMER DROP / 2026<br/>SUN UP — SOUND UP</p></div>
    <nav className="mobile-story" aria-label="Campaign story controls"><button data-qa-action="story-prev" onClick={()=>setStory((story+2)%3)} aria-label="Previous campaign story">←</button><span>{['BLOCK OPEN','CREW UP','SUN DOWN'][story]} / 0{story+1}</span><button data-qa-action="story-next" onClick={()=>setStory((story+1)%3)} aria-label="Next campaign story">→</button></nav>
  </div>
}
