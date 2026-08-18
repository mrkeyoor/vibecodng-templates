// Source slug: hyperui-feature-grids-2
// Author repo: https://github.com/markmead/hyperui
const services = [
  ['01', 'Coffee, considered', 'Espresso dialled in every morning, hand-brewed filters, and house drinks that change with the weather.'],
  ['02', 'A small, bright kitchen', 'Eggs, grains, good bread, and produce-led plates-made to order from 8 in the morning.'],
  ['03', 'Gather around', 'Long lunches, tiny celebrations, quiet meetings. Our back room seats fourteen and is yours by arrangement.'],
]
export default function Services() { return <section id="menu" className="section border-y border-line bg-paper"><div className="shell"><div className="grid gap-8 md:grid-cols-2" data-reveal><p className="kicker"><span /> On the table</p><h2 className="section-title">Simple things,<br/><em>done with care.</em></h2></div><div className="service-grid mt-16">{services.map(([n,title,copy], i) => <article key={n} data-reveal style={{'--delay':`${i*80}ms`}}><span>{n}</span><div className="service-icon" aria-hidden="true">{['◒','✳','⌂'][i]}</div><h3>{title}</h3><p>{copy}</p><a href="#book" aria-label={`Learn about ${title}`}>More <b>↗</b></a></article>)}</div></div></section> }
