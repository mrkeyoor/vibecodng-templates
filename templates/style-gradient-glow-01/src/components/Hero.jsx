// Source slugs: tripled-glowy-waves-hero-shadcnui, magicui-animated-gradient-text
// Author repos: https://github.com/moumen-soliman/uitripled, https://github.com/magicuidesign/magicui
// Wave-glow hero rebuilt with static radial fields and an inline SVG wave;
// the gradient headline sweeps once on reveal. The payout card is first-party.

const payouts = [
  { initials: 'MK', tint: 'linear-gradient(135deg, var(--bw-accent), var(--glow-warm))', name: 'Mira, ceramicist', line: 'Glaze workshop, 214 seats', amount: '+$3,210' },
  { initials: 'DO', tint: 'linear-gradient(135deg, var(--glow-warm), var(--glow-cool))', name: 'Dev, newsletter', line: '96 new members this week', amount: '+$864' },
  { initials: 'AS', tint: 'linear-gradient(135deg, var(--glow-cool), var(--bw-accent))', name: 'Asha, illustrator', line: 'Brush pack, 1,102 sales', amount: '+$7,930' },
]

export default function Hero() {
  return (
    <section id="top" className="hero" data-reveal-group>
      <div className="shell relative grid items-center gap-14 pt-36 pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:pt-44 lg:pb-36">
        <div>
          <p className="eyebrow" data-reveal style={{ '--reveal-order': 0 }}>Creator monetization, one link</p>
          <h1 className="display mt-6 text-white" data-reveal style={{ '--reveal-order': 1 }}>
            Get paid for the work<br />
            <em className="gradient-text">you already love.</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-mist" data-reveal style={{ '--reveal-order': 2 }}>
            Memberships, tips, and digital products behind a single link.
            Bloom handles checkout, taxes, and payouts, and you keep 92% of
            every sale. No monthly fee until you earn.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ '--reveal-order': 3 }}>
            <a href="#pricing" className="button">Claim your link</a>
            <a href="#creators" className="button button-ghost">See creator stories</a>
          </div>
          <p className="mt-7 text-xs text-mist" data-reveal style={{ '--reveal-order': 4 }}>
            bloom.page/<span className="text-white">yourname</span> is probably still free.
          </p>
        </div>

        <div className="pay-card" data-reveal style={{ '--reveal-order': 3 }}>
          <p className="m-0 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-mist">
            This week on Bloom
            <span className="text-white">$2.4M paid out</span>
          </p>
          <div className="mt-3">
            {payouts.map(({ initials, tint, name, line, amount }) => (
              <div key={name} className="pay-row">
                <span className="pay-badge" style={{ background: tint }}>{initials}</span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-white">{name}</span>
                  <span className="block truncate text-xs text-mist">{line}</span>
                </span>
                <strong className="ml-auto text-sm text-white">{amount}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg className="hero-waves" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 90 C 240 40 480 120 720 80 S 1200 30 1440 70 V 120 H 0 Z" fill="color-mix(in srgb, var(--bw-accent) 7%, transparent)" />
        <path d="M0 104 C 260 70 520 118 780 96 S 1240 60 1440 92 V 120 H 0 Z" fill="color-mix(in srgb, var(--glow-cool) 9%, transparent)" />
      </svg>
    </section>
  )
}
