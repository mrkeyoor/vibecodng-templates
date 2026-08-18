// First-party FAQ with native disclosure elements.
import { Plus } from './Icons.jsx'

const faqs = [
  {
    q: 'Can Meridian move my money without asking?',
    a: 'No. Connections are read-only by default. Auto-save rules are the single exception, they only run between your own accounts, only after you write and confirm the rule, and a pause switch sits on top of every one.',
  },
  {
    q: 'Which banks can I connect?',
    a: 'Around 12,300 institutions across the US, UK, and EU, covering checking, credit cards, mortgages, and most brokerages. If yours is missing you can track it manually and vote for a connector.',
  },
  {
    q: 'What happens to my data?',
    a: 'Credentials never touch our servers, connections run through regulated open banking providers. Transaction data is encrypted at rest, never sold, and never used for advertising. Export or delete everything from settings whenever you like.',
  },
  {
    q: 'Does the free plan expire?',
    a: 'No. Glance is free permanently, including unlimited linked accounts. Flow and Horizon add the automation layer, and both start with a 30-day trial that does not require a card.',
  },
  {
    q: 'Can I share Meridian with a partner?',
    a: 'Flow lets two people share goals while keeping separate ledgers. Horizon covers up to five family members with private views and a shared household picture.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="section pt-0" data-reveal-group>
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title mt-6 text-balance">Fair questions about your money</h2>
          <p className="mt-5 max-w-sm text-base leading-7 text-mist">
            The short version: your accounts stay yours, your data stays yours, and every
            automation has an off switch.
          </p>
        </div>
        <div className="liquid px-6 sm:px-8" data-reveal style={{ '--reveal-order': 1 }}>
          {faqs.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                {item.q}
                <Plus aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
