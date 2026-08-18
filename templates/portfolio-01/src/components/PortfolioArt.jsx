const flow = Array.from({ length: 18 }, (_, i) => {
  const y = 70 + i * 32
  return `M-40 ${y} C180 ${y - 90 + (i % 4) * 22} 310 ${y + 110} 520 ${y + (i % 3) * 18} S890 ${y - 100} 1240 ${y + 30}`
})

const grid = Array.from({ length: 11 }, (_, i) => 70 + i * 106)
const dots = Array.from({ length: 54 }, (_, i) => ({ x: 105 + (i % 9) * 122, y: 90 + Math.floor(i / 9) * 104, r: 5 + (i % 4) * 4 }))

export default function PortfolioArt({ kind }) {
  if (kind === 'field') return <svg className="portfolio-svg" viewBox="0 0 1200 700" role="img" aria-label="Flow field study in green and yellow">
    <rect width="1200" height="700" fill="var(--art-bg)"/>
    <g fill="none" stroke="var(--art-fg)" strokeWidth="3">{flow.map((d,i)=><path key={d} d={d} opacity={.18+i*.035}/>)}</g>
    <circle cx="882" cy="332" r="124" fill="none" stroke="var(--art-fg)" strokeWidth="2"/><circle cx="882" cy="332" r="76" fill="var(--art-fg)"/>
    <text x="72" y="92" className="art-label">FIELD STUDIES / WIND INDEX 06</text><text x="1080" y="640" className="mv">MV</text>
  </svg>
  if (kind === 'ground') return <svg className="portfolio-svg" viewBox="0 0 1200 700" role="img" aria-label="Modular climate action grid">
    <rect width="1200" height="700" fill="var(--art-bg)"/>
    <g stroke="var(--art-fg)" strokeWidth="1" opacity=".35">{grid.map(v=><path key={`x${v}`} d={`M${v} 0V700`}/>)}{grid.slice(0,7).map(v=><path key={`y${v}`} d={`M0 ${v}H1200`}/>)}</g>
    {dots.map((d,i)=><circle key={i} {...d} fill={i%5===0?'var(--art-fg)':'none'} stroke="var(--art-fg)" strokeWidth="3"/>) }
    <path d="M103 570 340 425 550 495 780 250 1087 120" fill="none" stroke="var(--art-fg)" strokeWidth="18"/>
    <text x="72" y="650" className="art-label">COMMON GROUND / 34 LOCAL ACTIONS</text><text x="1080" y="640" className="mv">MV</text>
  </svg>
  if (kind === 'hearth') return <svg className="portfolio-svg" viewBox="0 0 1200 700" role="img" aria-label="Typographic ritual poster">
    <rect width="1200" height="700" fill="var(--art-bg)"/>
    <text x="44" y="250" className="poster-word">USE</text><text x="430" y="505" className="poster-word outline">DAILY</text>
    <path d="M82 558H1118" stroke="var(--art-fg)" strokeWidth="4"/><text x="84" y="610" className="art-label">OBJECTS FOR THE LONG TABLE - HEARTH 2025</text>
    <text x="1080" y="640" className="mv">MV</text>
  </svg>
  if (kind === 'interval') return <svg className="portfolio-svg" viewBox="0 0 1200 700" role="img" aria-label="Radial interval composition">
    <rect width="1200" height="700" fill="var(--art-bg)"/>
    <g transform="translate(600 350)">{Array.from({length:28},(_,i)=><rect key={i} x="-10" y="-300" width="20" height={72+(i%5)*24} fill="var(--art-fg)" transform={`rotate(${i*12.857})`} opacity={.38+(i%4)*.18}/>)}</g>
    <circle cx="600" cy="350" r="126" fill="var(--art-bg)" stroke="var(--art-fg)" strokeWidth="4"/><text x="600" y="372" textAnchor="middle" className="interval-word">12:40</text>
    <text x="70" y="80" className="art-label">INTERVAL / A STUDY OF PAUSE</text><text x="1080" y="640" className="mv">MV</text>
  </svg>
  if (kind === 'tide') return <svg className="portfolio-svg" viewBox="0 0 1200 700" role="img" aria-label="Layered tidal data composition">
    <rect width="1200" height="700" fill="var(--art-bg)"/>
    {Array.from({length:8},(_,i)=><path key={i} d={`M0 ${160+i*56} Q190 ${40+i*68} 390 ${160+i*45} T790 ${135+i*60} T1200 ${125+i*55} V700H0Z`} fill="var(--art-fg)" opacity={.06+i*.07}/>) }
    <path d="M0 376Q210 164 430 348T820 330T1200 250" fill="none" stroke="var(--art-fg)" strokeWidth="5"/>
    <text x="72" y="105" className="tide-word">TIDE / 07</text><text x="72" y="638" className="art-label">SEVEN COASTS, ONE LIVING SYSTEM</text><text x="1080" y="640" className="mv">MV</text>
  </svg>
  return <svg className="portfolio-svg" viewBox="0 0 1200 700" role="img" aria-label="Constructive shapes for North House">
    <rect width="1200" height="700" fill="var(--art-bg)"/>
    <rect x="70" y="70" width="390" height="560" fill="var(--art-fg)"/><circle cx="742" cy="250" r="180" fill="none" stroke="var(--art-fg)" strokeWidth="78"/><path d="M545 520H1130L835 150Z" fill="var(--art-fg)" opacity=".72"/>
    <rect x="120" y="122" width="290" height="456" fill="var(--art-bg)"/><text x="145" y="205" className="north-word">N</text><text x="145" y="555" className="art-label">NORTH HOUSE / FORM 03</text>
    <text x="1080" y="640" className="mv">MV</text>
  </svg>
}
