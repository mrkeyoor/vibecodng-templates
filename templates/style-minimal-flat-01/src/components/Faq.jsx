// Derived from index slug: meraki-faq-collapse
// Author repo: https://github.com/merakiui/merakiui
// Structure kept (title, hairline-divided rows, plus toggle, answers set off
// by a left accent rule); reimplemented on native details/summary, no JS.

const faqs = [
  {
    q: 'How do clients pay?',
    a: 'Every invoice is a link. Clients can pay by card or bank transfer from that page, or send money the old way; Ledger watches your account and matches the deposit to the invoice either way.',
  },
  {
    q: 'What does Ledger take from each payment?',
    a: 'Nothing. You pay the flat subscription and the standard processor fee for card payments. Bank transfers cost you nothing at all, and we will always show the fee before you send.',
  },
  {
    q: 'Can I use my own invoice numbering?',
    a: 'Yes. Bring your existing sequence and format, including prefixes per client. Ledger continues from wherever your last invoice left off.',
  },
  {
    q: 'What happens if I stop paying?',
    a: 'Your account drops back to the free plan. Every invoice you ever sent stays readable and exportable, forever. We think holding your history hostage is a bad way to keep customers.',
  },
  {
    q: 'Is there a mobile app?',
    a: 'Ledger is one fast page that works on any phone browser, so there is nothing to install. Add it to your home screen and it behaves like an app, minus the update nags.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="section pt-0">
      <div className="shell">
        <div className="rule pt-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="kicker">Questions</p>
              <h2 className="section-title mt-4">Asked often, answered plainly.</h2>
            </div>
            <div>
              {faqs.map((faq, index) => (
                <details key={faq.q} className="faq-item" open={index === 0}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
