// Adapted pattern: neobrutalism-accordion
// Author repo: https://github.com/ekmas/neobrutalism-components
// Rebuilt on native <details>/<summary>; no Radix, no JS state, keyboard support for free.

const faqs = [
  {
    q: 'Where is the AI?',
    a: 'Not here. If you want a model to draft your content, call one from your own stack and POST the result to Slab. A CMS that writes your content for you has opinions about your content. Ours does not.',
  },
  {
    q: 'Do you have a visual page builder?',
    a: 'No, and we will not. Page builders turn content into layout soup that no second frontend can ever reuse. Slab stores structured content; your site decides what it looks like. That separation is the whole reason headless exists.',
  },
  {
    q: 'What happens when you raise prices?',
    a: 'Existing projects keep their price for 24 months, in writing, in the terms. We have raised prices once in five years and grandfathered everyone. The self-host tier cannot be re-priced because it is free and MIT-licensed.',
  },
  {
    q: 'What is on the roadmap?',
    a: 'Bug fixes, performance, and security patches. We publish a NOT-doing list instead of a roadmap: multiplayer canvas editing, AI copilots, a template marketplace, and blockchain anything are all on it, permanently.',
  },
  {
    q: 'Why should I trust the benchmark table?',
    a: 'You should not, on faith. The harness is a public repo, the raw runs are committed monthly, and the docs explain every choice, including the ones that flatter our competitors. Break the numbers and we will print your correction.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="section" data-reveal-group>
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <h2 className="section-title">Questions people actually ask</h2>
          <p className="mt-4 max-w-sm text-[15px] font-medium leading-7 text-mist">
            Compiled from real sales calls, unedited in spirit. If yours is missing, email an engineer:
            the address is on every page of the docs.
          </p>
        </div>
        <div data-reveal style={{ '--reveal-order': 1 }}>
          {faqs.map((faq, index) => (
            <details key={faq.q} className="faq-item" open={index === 0}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
