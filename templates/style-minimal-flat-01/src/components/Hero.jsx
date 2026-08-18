// Derived from index slug: tailark-mist-hero-section-5
// Author repo: https://github.com/tailark/blocks
// Structure kept (centered heading, one-line subcopy, primary + quiet action,
// framed product visual below); gradient frame replaced with a flat invoice
// document, because the document is the product.

const lineItems = [
  { desc: 'Brand identity, phase two', qty: '1', amount: '2,400.00' },
  { desc: 'Design reviews, April', qty: '4', amount: '640.00' },
  { desc: 'Print handoff files', qty: '1', amount: '180.00' },
]

export default function Hero() {
  return (
    <section id="top" className="section pb-0">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker hero-enter" style={{ '--enter-order': 0 }}>Invoicing for freelancers</p>
          <h1 className="display mt-5 text-balance hero-enter" style={{ '--enter-order': 1 }}>
            Send the invoice.<br />Get back to the work.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[0.9375rem] leading-7 text-mist hero-enter" style={{ '--enter-order': 2 }}>
            Ledger is the whole job in one page: write an invoice in under a minute,
            send it as a link, and watch it move from sent to paid. Nothing else to learn.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row hero-enter" style={{ '--enter-order': 3 }}>
            <a href="#pricing" className="button w-full sm:w-auto">Start invoicing free</a>
            <a href="#how" className="button button-quiet w-full sm:w-auto">See how it works</a>
          </div>
          <p className="mt-4 text-xs text-mist hero-enter" style={{ '--enter-order': 4 }}>
            No card required. Your first three invoices are free, forever.
          </p>
        </div>

        <div className="invoice-doc mx-auto mt-14 max-w-2xl p-6 sm:p-9 hero-enter" style={{ '--enter-order': 5 }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mono text-[10px] tracking-[0.14em] text-mist">INVOICE N. 0047</p>
              <p className="mt-2 text-sm font-semibold">Mara Ellison, Graphic Design</p>
              <p className="mt-1 text-xs text-mist">For: Fielding &amp; Co.</p>
            </div>
            <span className="paid-mark">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1.5 5.2 4 7.7 8.5 2.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              PAID APR 18
            </span>
          </div>
          <div className="mt-7">
            <div className="invoice-row border-t-0 pt-0 text-[11px] uppercase tracking-[0.1em] text-mist">
              <span>Description</span><span>Amount</span>
            </div>
            {lineItems.map((item) => (
              <div key={item.desc} className="invoice-row">
                <span>{item.desc}</span>
                <span className="tnum">{item.amount}</span>
              </div>
            ))}
            <div className="invoice-row items-baseline font-semibold">
              <span>Total due</span>
              <span className="tnum text-lg text-accent">$3,220.00</span>
            </div>
          </div>
          <p className="mt-5 text-[11px] leading-5 text-mist">
            Paid by bank transfer. Ledger matched the deposit and closed this invoice automatically.
          </p>
        </div>
      </div>
    </section>
  )
}
