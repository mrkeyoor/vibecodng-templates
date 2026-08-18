// Source slug: hyperui-feature-grids-1
// Author repo: https://github.com/markmead/hyperui
const services = [
  ['01', 'Positioning', 'Finding the sharp idea at the center of a brand, then building language and principles around it.'],
  ['02', 'Identity systems', 'Distinctive, flexible visual worlds made to hold together from launch day through the long term.'],
  ['03', 'Digital direction', 'Websites and product moments that feel intuitive, expressive, and genuinely useful.'],
]
export default function Practice() {
  return <section id="practice" className="section practice" data-reveal-group><div className="shell practice-grid">
    <div data-reveal><p className="label">The practice</p><h2>Small studio.<br/>Deep attention.</h2></div>
    <div className="services">{services.map(([n, title, copy], i) => <article key={title} data-reveal style={{ '--order': i }}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </div></section>
}
