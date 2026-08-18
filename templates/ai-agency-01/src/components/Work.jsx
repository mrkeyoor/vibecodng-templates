// Source slug: tailark-mist-stats-1
// Author repo: https://github.com/tailark/blocks
import SignalArt from './SignalArt.jsx'
const work=[['Trellis Health','Clinical navigation','4.2×','faster case routing'],['Northline Energy','Field intelligence','38%','fewer repeat visits'],['ParcelWorks','Exception operations','11 hrs','saved per planner weekly']]
const art=['clinical','field','exception']
export default function Work(){return <section id="work" className="section work" data-reveal-group><div className="shell"><div className="section-title split" data-reveal><span>SELECTED SYSTEMS</span><h2>Measurable work.<br/><em>Not AI theatre.</em></h2><p>Every engagement starts with a real workflow and ends with a result your team can verify.</p></div><div className="work-grid">{work.map(([name,type,value,label],i)=><article key={name} data-reveal style={{'--order':i}}><div className="case-art"><span>0{i+1}</span><SignalArt kind={art[i]}/></div><div className="case-meta"><div><strong>{name}</strong><small>{type}</small></div><div><strong>{value}</strong><small>{label}</small></div><span>↗</span></div></article>)}</div></div></section>}
