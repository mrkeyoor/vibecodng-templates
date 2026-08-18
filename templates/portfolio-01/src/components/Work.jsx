// Source slug: hyperui-blog-cards-2
// Author repo: https://github.com/markmead/hyperui
import PortfolioArt from './PortfolioArt.jsx'
const projects = [
  { n: '01', client: 'Field Studies', type: 'Identity + editorial', year: '2026', title: 'A field journal for the curious', className: 'field' },
  { n: '02', client: 'Common Ground', type: 'Strategy + digital', year: '2025', title: 'Making local climate action feel possible', className: 'ground' },
  { n: '03', client: 'Hearth', type: 'Product + packaging', year: '2025', title: 'Daily rituals, designed to last', className: 'hearth' },
  { n: '04', client: 'Interval', type: 'Culture + campaign', year: '2025', title: 'Making room for a meaningful pause', className: 'interval' },
  { n: '05', client: 'Tide Index', type: 'Data + publication', year: '2024', title: 'Coastal change, made visible', className: 'tide' },
  { n: '06', client: 'North House', type: 'Place + identity', year: '2024', title: 'A new landmark for making', className: 'north' },
]
export default function Work() {
  return <section id="work" className="section work" data-reveal-group><div className="shell">
    <div className="section-head" data-reveal><p>Selected work</p><p>Six recent collaborations</p></div>
    <div className="project-list">{projects.map((p, i) => <article className="project" key={p.client} data-reveal style={{ '--order': i }}>
      <div className={`project-art ${p.className}`}><PortfolioArt kind={p.className}/><i>{p.client}</i></div>
      <div className="project-meta"><span>{p.n}</span><div><strong>{p.client}</strong><small>{p.type}</small></div><h2>{p.title}</h2><span>{p.year} ↗</span></div>
    </article>)}</div>
  </div></section>
}
