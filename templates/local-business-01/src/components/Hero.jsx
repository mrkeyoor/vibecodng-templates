// Source slug: meraki-hero-side-image
// Author repo: https://github.com/merakiui/merakiui
export default function Hero() {
  return <section id="top" className="hero shell grid min-h-[760px] items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.02fr_.98fr] lg:pt-28">
    <div data-reveal>
      <p className="kicker"><span /> Your corner, all day</p>
      <h1 className="display mt-6">A softer place<br />to land.</h1>
      <p className="mt-7 max-w-lg text-lg leading-8 text-muted">Seasonal plates, careful coffee, and the kind of welcome that remembers your name. Come for breakfast. Stay through the afternoon.</p>
      <div className="mt-9 flex flex-wrap gap-3"><a className="pill" href="#menu">See what’s cooking <span>↓</span></a><a className="text-link" href="#visit">Find your way <span>↗</span></a></div>
      <div className="mt-12 flex items-center gap-4 text-sm"><div className="avatar-stack" aria-hidden="true"><i>J</i><i>M</i><i>S</i></div><p><strong className="block">4.9 from our regulars</strong><span className="text-muted">Good coffee travels by word of mouth.</span></p></div>
    </div>
    <div className="hero-picture" data-reveal style={{ '--delay': '120ms' }}>
      <img src={`${import.meta.env.BASE_URL}photos/interior.webp`} alt="Sunlit Amber Room cafe interior with wooden tables and tall black-framed windows" fetchPriority="high" />
      <div className="open-card"><span className="pulse" /> <strong>Open today</strong><small>until 8:00 pm</small></div>
      <div className="scribble" aria-hidden="true">slow<br/>mornings</div>
    </div>
  </section>
}
