// Source slug: eldora-holographic-card (featured tier sheen)
// Author repo: https://github.com/karthikmudunuri/eldoraui
// Pointer-tracked holographic gradient rebuilt with CSS custom properties; static gradient under reduced motion.
import { useEffect, useRef } from 'react'

const plans = [
  {
    name: 'Solo',
    price: '$19',
    cadence: 'per month, one artist',
    blurb: 'For freelancers who bill by the finished shot, not the modeling hour.',
    rows: ['400 downloads a month', 'All formats, all LODs', 'Flat commercial license', 'Silhouette search'],
    cta: 'Start Solo',
    featured: false,
  },
  {
    name: 'Studio',
    price: '$79',
    cadence: 'per month, up to 10 seats',
    blurb: 'The whole team pulls from one library and one license. No seat audits, ever.',
    rows: ['Unlimited downloads', 'Team collections and pinning', 'Engine-specific export presets', 'Priority QA reruns on request', 'Slack-free support: email, 1 business day'],
    cta: 'Start Studio',
    featured: true,
  },
  {
    name: 'Pipeline',
    price: '$390',
    cadence: 'per month, unlimited seats',
    blurb: 'API access and on-prem caching for studios with their own asset management.',
    rows: ['Everything in Studio', 'REST + USD resolver API', 'On-prem proxy cache', 'Custom QA profile against your engine build'],
    cta: 'Talk to an engineer',
    featured: false,
  },
]

function HoloCard({ plan, order }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !plan.featured) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const move = (event) => {
      const rect = node.getBoundingClientRect()
      node.style.setProperty('--hx', `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`)
      node.style.setProperty('--hy', `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`)
    }
    node.addEventListener('pointermove', move, { passive: true })
    return () => node.removeEventListener('pointermove', move)
  }, [plan.featured])

  return (
    <article
      ref={ref}
      className={`price-card ${plan.featured ? 'price-card-featured holo' : ''}`}
      data-reveal
      style={{ '--reveal-order': order }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-semibold tracking-tight">{plan.name}</h3>
        {plan.featured && <span className="mono text-[9px] tracking-[0.2em] text-accent">MOST STUDIOS PICK THIS</span>}
      </div>
      <p className="price-value mt-6">{plan.price}</p>
      <p className="mono mt-1 text-[10px] tracking-[0.1em] text-mist">{plan.cadence.toUpperCase()}</p>
      <p className="mt-5 text-sm leading-6 text-mist">{plan.blurb}</p>
      <ul className="mt-6 flex-1 list-none p-0">
        {plan.rows.map((row) => <li key={row} className="plan-row">{row}</li>)}
      </ul>
      <a href="#cta" className={`mt-6 ${plan.featured ? 'button' : 'button button-ghost'} w-full`}>{plan.cta}</a>
    </article>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="section border-t border-white/8" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow">Pricing</div>
          <h2 className="section-title mt-4">Priced like a tool, not like a toll</h2>
          <p className="mt-4 text-[15px] leading-7 text-mist">
            Every plan includes the full 12,418-asset index and the same flat license. The tiers only change how many
            hands are in the library and how deep the pipeline hooks go.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => <HoloCard key={plan.name} plan={plan} order={index + 1} />)}
        </div>
        <p className="mono mt-6 text-[11px] tracking-[0.06em] text-mist">
          Cancel any month. Everything you downloaded stays licensed. That is what "flat" means.
        </p>
      </div>
    </section>
  )
}
