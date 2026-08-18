// Source slug: tripled-feature-cards-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
const cards=[
  {tag:'01 / Discover',title:'Find the useful signal',copy:'We map the decisions, data, and constraints that reveal where AI can create durable advantage.',icon:'✦',wide:true},
  {tag:'02 / Build',title:'Prototype to production',copy:'Senior product, design, and ML talent in one tight team.',icon:'↗'},
  {tag:'03 / Operate',title:'Keep it accountable',copy:'Observability, evaluation, and human review built into the system.',icon:'◎'},
]
export default function Capabilities(){return <section id="capabilities" className="section capabilities" data-reveal-group><div className="shell"><div className="section-title" data-reveal><span>WHAT WE DO</span><h2>From uncertain idea<br/>to <em>working intelligence.</em></h2></div><div className="bento">{cards.map((c,i)=><article className={c.wide?'wide':''} key={c.title} data-reveal style={{'--order':i}}><div className="card-glow"/><span>{c.tag}</span><i>{c.icon}</i><div><h3>{c.title}</h3><p>{c.copy}</p></div></article>)}</div></div></section>}
