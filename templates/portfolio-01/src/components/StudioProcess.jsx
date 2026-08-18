const moments = [
  {src:'photos/studio.webp', alt:'Sketchbooks, paper samples, and color swatches arranged across Mira Vale’s studio table', step:'01 / Frame', caption:'Starting with the question, then giving the idea room to take shape.'},
  {src:'photos/print.webp', alt:'A collection of geometric art prints in navy, rust, cream, and sage', step:'02 / Build', caption:'Testing a visual language across a living set of formats.'},
  {src:'photos/detail.webp', alt:'Close-up of blue, green, and rose pigments brushed across textured paper', step:'03 / Refine', caption:'Following the material details until the whole system feels inevitable.'},
]

export default function StudioProcess() {
  return <section id="about" className="section process" data-reveal-group><div className="shell">
    <header className="process-head" data-reveal><p className="label">Inside the studio</p><h2>Ideas become systems<br/><em>through making.</em></h2><p>Sketches, material tests, and working prototypes keep strategy close to the hand. Each stage is a chance to find what feels true—and remove what doesn’t.</p></header>
    <div className="process-grid">{moments.map((moment, i) => <figure className="process-card" key={moment.src} data-reveal style={{'--order':i}}><img src={`${import.meta.env.BASE_URL}${moment.src}`} alt={moment.alt} loading="lazy" decoding="async"/><figcaption><span>{moment.step}</span><p>{moment.caption}</p></figcaption></figure>)}</div>
  </div></section>
}
