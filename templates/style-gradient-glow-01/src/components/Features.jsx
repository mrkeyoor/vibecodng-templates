// Source slug: magicui-magic-card
// Author repo: https://github.com/magicuidesign/magicui
// Six magic cards whose radial glow follows the cursor on hover only.
// Copy, icons, and grid are first-party.

import { usePointerGlow } from './Effects.jsx'

const features = [
  {
    title: 'Memberships that feel personal',
    body: 'Tiers, member-only posts, and a warm welcome flow. Your people subscribe in two taps with Apple Pay or card.',
    glyph: <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.8-3.2 2.8-5 5.5-5s4.7 1.8 5.5 5" /><path d="M16 8.5c1.8.4 3 1.6 3.6 3.5" /></>,
  },
  {
    title: 'Digital products, zero setup',
    body: 'Presets, PDFs, courses, brush packs. Upload the file, set a price, and the checkout page designs itself.',
    glyph: <><rect x="4" y="4" width="16" height="12" rx="2" /><path d="M12 20v-4M8 20h8" /></>,
  },
  {
    title: 'Tips with a thank-you built in',
    body: 'One-tap tips during streams or after posts, each answered with an automatic voice note or doodle from you.',
    glyph: <path d="M12 20s-7-4.5-7-9.5a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10.5c0 5-7 9.5-7 9.5Z" />,
  },
  {
    title: 'Payouts in two days, not thirty',
    body: 'Earnings land in your bank within 48 hours in 42 countries. No minimum balance, no payout fee.',
    glyph: <><path d="M4 17l5-5 4 3 7-8" /><path d="M15 7h5v5" /></>,
  },
  {
    title: 'Taxes handled for you',
    body: 'Bloom is the merchant of record. VAT, GST, and sales tax are collected and filed so you never see a form.',
    glyph: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  },
  {
    title: 'Your audience stays yours',
    body: 'Export members, emails, and sales any day, in one click. Leaving is easy, which is why nobody does.',
    glyph: <><path d="M12 4v10" /><path d="M8 10l4 4 4-4" /><path d="M5 20h14" /></>,
  },
]

function FeatureCard({ title, body, glyph, order }) {
  const ref = usePointerGlow()
  return (
    <article ref={ref} className="magic-card" data-reveal style={{ '--reveal-order': order }}>
      <span className="feature-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {glyph}
        </svg>
      </span>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2.5 text-sm leading-6.5 text-mist">{body}</p>
    </article>
  )
}

export default function Features() {
  return (
    <section id="features" className="section" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Everything after the applause</p>
          <h2 className="section-title mt-5 text-white">
            The business side, <em className="gradient-text">handled softly</em>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-mist">
            You make the thing. Bloom does the checkout, the taxes, the
            delivery, and the thank-you notes.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} order={index + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
