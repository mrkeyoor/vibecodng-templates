import{useEffect,useRef,useState}from'react'
import{motion}from'framer-motion'

const layers=[
  {id:'architecture',label:'Architecture',code:'EXT',note:'Concrete extension + distant volume'},
  {id:'atmosphere',label:'Atmosphere',code:'ATM',note:'Rain density + depth separation'},
  {id:'signal',label:'Signal light',code:'LGT',note:'Interactive glow + wet reflection'},
  {id:'grade',label:'Final grade',code:'CLR',note:'Oxide shadows + projector white'}
]

export default function CompositingTimeline(){
  const canvas=useRef(null)
  const[frame,setFrame]=useState(72)
  const[active,setActive]=useState(()=>new Set(layers.map(layer=>layer.id)))
  const[loaded,setLoaded]=useState(0)
  const ready=useRef([])
  useEffect(()=>{
    const paths=['still-arrival.webp','still-signal.webp','still-crossing.webp']
    ready.current=paths.map(src=>{const image=new Image();image.src=src;return image})
    ready.current.forEach(image=>image.addEventListener('load',()=>setLoaded(value=>value+1)))
  },[])
  useEffect(()=>{
    const el=canvas.current,ctx=el?.getContext('2d');if(!ctx)return
    const [arrival,signal,crossing]=ready.current
    const base=frame<96?signal:crossing
    const drawCover=image=>{if(!image?.complete||!image.naturalWidth)return false;const scale=Math.max(el.width/image.naturalWidth,el.height/image.naturalHeight),w=image.naturalWidth*scale,h=image.naturalHeight*scale;ctx.drawImage(image,(el.width-w)/2,(el.height-h)/2,w,h);return true}
    ctx.clearRect(0,0,el.width,el.height);ctx.fillStyle='#090a09';ctx.fillRect(0,0,el.width,el.height)
    if(!drawCover(base))drawCover(arrival)
    if(active.has('architecture')&&arrival?.complete){ctx.save();ctx.globalAlpha=.14+(frame/144)*.14;ctx.globalCompositeOperation='screen';drawCover(arrival);ctx.restore()}
    if(active.has('signal')){const glow=ctx.createRadialGradient(el.width*.55,el.height*.43,20,el.width*.55,el.height*.43,el.width*.42);glow.addColorStop(0,'rgba(255,218,166,.22)');glow.addColorStop(.46,'rgba(225,72,50,.10)');glow.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,el.width,el.height)}
    if(active.has('atmosphere')){ctx.save();ctx.strokeStyle='rgba(225,238,230,.18)';ctx.lineWidth=1;for(let x=-80;x<el.width+80;x+=34){const shift=(frame*7+x)%110;ctx.beginPath();ctx.moveTo(x+shift*.25,-10);ctx.lineTo(x-45+shift*.25,el.height+10);ctx.stroke()}ctx.restore()}
    if(active.has('grade')){const grade=ctx.createLinearGradient(0,0,el.width,el.height);grade.addColorStop(0,'rgba(12,20,22,.32)');grade.addColorStop(.55,'rgba(0,0,0,0)');grade.addColorStop(1,'rgba(118,28,18,.34)');ctx.fillStyle=grade;ctx.fillRect(0,0,el.width,el.height)}
    ctx.strokeStyle='rgba(255,255,255,.38)';ctx.strokeRect(38,26,el.width-76,el.height-52)
  },[frame,active,loaded])
  const toggle=id=>setActive(current=>{const next=new Set(current);next.has(id)?next.delete(id):next.add(id);return next})
  const step=delta=>setFrame(value=>Math.max(0,Math.min(143,value+delta)))
  return <section className="composite-lab" aria-labelledby="composite-title">
    <header className="composite-intro"><div><p className="eyebrow">03 / Live compositing timeline</p><h2 id="composite-title">Don’t describe the finish.<br/><em>Build the frame.</em></h2></div><p>Scrub a 144-frame shot and switch the image stack on or off. Every control resolves directly in the monitor—an honest miniature of a finishing room.</p></header>
    <div className="composite-suite">
      <div className="composite-monitor">
        <canvas ref={canvas} width="1280" height="720" aria-label={`Composite preview at frame ${String(frame).padStart(3,'0')}`}/>
        <div className="composite-hud" aria-hidden="true"><span>SHOT A14 / COMP v023</span><span>F {String(frame).padStart(3,'0')} / 143</span></div>
        <motion.div className="frame-readout" animate={{opacity:[.72,1],y:[4,0]}} transition={{duration:.18}}><small>ACTIVE FRAME</small><strong>{String(frame).padStart(3,'0')}</strong></motion.div>
      </div>
      <aside className="layer-stack">
        <header><span>IMAGE STACK</span><b>{active.size} / 04 LIVE</b></header>
        {layers.map((layer,index)=><button key={layer.id} data-qa-action="composite-layer" aria-pressed={active.has(layer.id)} onClick={()=>toggle(layer.id)}><span>{String(index+1).padStart(2,'0')}</span><i>{layer.code}</i><strong>{layer.label}</strong><small>{layer.note}</small><b>{active.has(layer.id)?'ON':'OFF'}</b></button>)}
      </aside>
      <div className="timeline-console">
        <div className="timeline-actions"><button data-qa-action="composite-step" aria-label="Step back twelve frames" onClick={()=>step(-12)}>−12</button><button data-qa-action="composite-step" aria-label="Step forward twelve frames" onClick={()=>step(12)}>+12</button></div>
        <label><span>FRAME 000</span><input data-qa-action="composite-frame" type="range" min="0" max="143" value={frame} onChange={event=>setFrame(Number(event.target.value))}/><span>143 END</span></label>
        <div className="timeline-marks" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <p aria-live="polite">{frame<48?'Plate alignment / camera solve':frame<96?'Signal bloom / atmosphere pass':'Final grade / delivery look'}</p>
      </div>
    </div>
  </section>
}
