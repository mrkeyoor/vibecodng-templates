// First-party: integrations card and both pricing cards.

import { Card } from './Effects.jsx'

const integrations = [
  { name: 'GitHub', d: 'M10 1.6a8.4 8.4 0 0 0-2.7 16.4c.4.1.6-.2.6-.4v-1.5c-2.4.5-2.9-1-2.9-1-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.7 1.3 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.9-.2-3.8-.9-3.8-4.1 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.2 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.1.2 2 .1 2.2.5.6.9 1.4.9 2.3 0 3.2-2 3.9-3.8 4.1.3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4A8.4 8.4 0 0 0 10 1.6z' },
  { name: 'Figma', d: 'M7.5 1.5h5a3 3 0 0 1 0 6 3 3 0 0 1 0 6H10v2a3 3 0 1 1-3-3 3 3 0 0 1 0-6 3 3 0 0 1 .5-5z' },
  { name: 'Linear', d: 'M2.3 12.4 7.6 17.7c-2.6-.8-4.5-2.7-5.3-5.3zM2 10.1 9.9 18a8.1 8.1 0 0 0 2.3-.4L2.4 7.8A8.1 8.1 0 0 0 2 10.1zm1-4.3 11.2 11.2c.6-.3 1.1-.7 1.6-1.2L4.2 4.2c-.5.5-.9 1-1.2 1.6zm2.6-2.9 11.5 11.5A8.1 8.1 0 0 0 5.6 2.9z' },
  { name: 'Google Drive', d: 'M7 2.5h6l5 8.7-3 5.2H5l-3-5.2L7 2.5zm1.2 2L4.4 11h4.3l3.8-6.5H8.2zm5.5 1.2L11 10.5h5.5l-2.8-4.8zM6 12.5l-1.4 2.4h9.8l1.4-2.4H6z' },
  { name: 'Zoom', d: 'M2 6.5A2.5 2.5 0 0 1 4.5 4h7A2.5 2.5 0 0 1 14 6.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-7zM15 8.6l3.6-2.4c.6-.4 1.4 0 1.4.8v6c0 .8-.8 1.2-1.4.8L15 11.4V8.6z' },
  { name: 'Stripe', d: 'M9.8 8.1c0-.6.5-.9 1.4-.9 1.2 0 2.8.4 4 1V4.6a10 10 0 0 0-4-.8C7.9 3.8 5.7 5.5 5.7 8.3c0 4.4 6 3.7 6 5.6 0 .7-.6 1-1.5 1a9.7 9.7 0 0 1-4.4-1.3v3.7c1.4.6 2.9.9 4.4.9 3.4 0 5.7-1.7 5.7-4.5 0-4.7-6.1-3.9-6.1-5.6z' },
  { name: 'Notion imports', d: 'M4 3.2 13.8 2.5c1.2-.1 1.5 0 2.2.5l3 2.1c.5.4.7.5.7 1v11.3c0 .9-.3 1.4-1.5 1.5l-11.4.7c-.9 0-1.3-.1-1.8-.7L2.7 16c-.5-.7-.7-1.2-.7-1.8V4.6c0-.7.3-1.3 2-1.4z' },
  { name: 'Calendar', d: 'M5 2.5v2M15 2.5v2M2.5 7h15M4 4.5h12A1.5 1.5 0 0 1 17.5 6v10a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 16V6A1.5 1.5 0 0 1 4 4.5z' },
]

export function IntegrationsCard() {
  return (
    <Card span="b4" order={0} className="flex flex-col gap-5">
      <p className="card-label">Plays well with the survivors</p>
      <ul className="m-0 grid w-full max-w-xs list-none grid-cols-4 gap-2 p-0">
        {integrations.map((tool) => (
          <li key={tool.name}>
            <span className="integration-cell" title={tool.name}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill={tool.name === 'Calendar' ? 'none' : 'currentColor'} stroke={tool.name === 'Calendar' ? 'currentColor' : 'none'} strokeWidth="1.4" role="img" aria-label={tool.name}>
                <path d={tool.d} />
              </svg>
            </span>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-auto text-sm leading-6 text-mist">
        Hub replaces the chat, wiki, and status tools. The ones you keep, it connects to.
      </p>
    </Card>
  )
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'for teams up to 10',
    blurb: 'The whole workspace, no timers.',
    cta: 'Start free',
    ink: false,
    items: ['Unlimited threads and docs', '90 days of searchable history', 'All integrations'],
  },
  {
    name: 'Team',
    price: '$8',
    period: 'per person, per month',
    blurb: 'For teams who want the memory to be permanent.',
    cta: 'Start 30 days free',
    ink: true,
    items: ['Everything in Free', 'Unlimited history and guests', 'Meeting notes to threads', 'SSO and admin controls'],
  },
]

export function PricingCards() {
  return (
    <>
      {plans.map((plan, index) => (
        <Card key={plan.name} span="b4" tone={plan.ink ? 'card-ink' : ''} order={index + 1} id={index === 0 ? 'pricing' : undefined} className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <h2 className="card-title m-0">{plan.name}</h2>
            {plan.ink ? <span className="mono text-[10px] tracking-[0.14em] text-accent">MOST TEAMS</span> : null}
          </div>
          <div className="price-row">
            <span className="price-value">{plan.price}</span>
            <span className={`text-xs ${plan.ink ? 'opacity-70' : 'text-mist'}`}>{plan.period}</span>
          </div>
          <p className={`m-0 text-sm leading-6 ${plan.ink ? 'opacity-80' : 'text-mist'}`}>{plan.blurb}</p>
          <ul className="plan-list">
            {plan.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <a href="#top" className={`button mt-auto w-full ${plan.ink ? '' : 'button-ink'}`}>{plan.cta}</a>
        </Card>
      ))}
    </>
  )
}
