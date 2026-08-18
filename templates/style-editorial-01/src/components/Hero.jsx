// First-party. The hero is a typographic poster: the headline is the artwork.

export default function Hero() {
  return (
    <section id="top" className="section pb-0" data-reveal-group>
      <div className="shell">
        <h1 className="display max-w-[11ch] text-balance" data-reveal style={{ '--reveal-order': 0 }}>
          Write like it <em>matters.</em>
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-16" data-reveal style={{ '--reveal-order': 1 }}>
          <div className="column-text deck drop-cap max-w-3xl">
            <p className="m-0">
              Longform is a writing platform for work that takes longer than a scroll.
              It gives you a quiet editor that holds still, readers who arrive on
              purpose, and not one algorithm deciding who they are. The pieces people
              still talk about were not optimized for a feed. They were written,
              slowly, by someone who had somewhere to put them. This is that
              somewhere.
            </p>
          </div>
          <div className="flex flex-col items-start justify-end gap-4">
            <a href="#subscriptions" className="button">Begin a draft, free</a>
            <a href="#essays" className="nav-link">Read what others made &darr;</a>
          </div>
        </div>
        <div className="folio mt-12 border-t border-rule pt-3" data-reveal style={{ '--reveal-order': 2 }}>
          <span>P. 01</span>
          <span className="hidden sm:block">No feed &middot; No streaks &middot; No badges</span>
          <span>Set in Fraunces &amp; Newsreader</span>
        </div>
      </div>
    </section>
  )
}
