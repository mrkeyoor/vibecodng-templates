// Derived from index slug: meraki-feature-simple
// Author repo: https://github.com/merakiui/merakiui
// Structure kept (two-column list of icon, bold title, short paragraph);
// filled icon badges replaced with 1px line glyphs on the accent color.

function Glyph({ children }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--bw-accent)" strokeWidth="1.25" aria-hidden="true">
      {children}
    </svg>
  )
}

const features = [
  {
    title: 'One page per invoice',
    body: 'Client, line items, total. Ledger fills in what it already knows, so a repeat invoice takes four keystrokes and a click.',
    glyph: <><rect x="4" y="2.5" width="14" height="17" /><path d="M7.5 7h7M7.5 10.5h7M7.5 14h4" /></>,
  },
  {
    title: 'Send it as a link',
    body: 'No PDFs lost in attachments. Clients open a clean page, see what they owe, and pay from the same screen.',
    glyph: <><path d="M9 13l4-4" /><path d="M7.5 10.5 5 13a3.2 3.2 0 0 0 4.5 4.5l2.5-2.5M14.5 11.5 17 9a3.2 3.2 0 0 0-4.5-4.5L10 7" /></>,
  },
  {
    title: 'Paid means paid',
    body: 'Bank deposits match themselves to open invoices. When money lands, the invoice closes and you get one quiet notification.',
    glyph: <><circle cx="11" cy="11" r="8.5" /><path d="M7 11.5l2.8 2.8L15 8.5" /></>,
  },
  {
    title: 'Late fees, handled politely',
    body: 'Reminders go out on your schedule, written like you wrote them. Firm on day thirty, never rude on day three.',
    glyph: <><circle cx="11" cy="11" r="8.5" /><path d="M11 6.5V11l3 2.5" /></>,
  },
  {
    title: 'Taxes without the shoebox',
    body: 'Every invoice is already categorized. Export a quarter in one file your accountant will actually thank you for.',
    glyph: <><path d="M4 18.5h14" /><path d="M6 18.5V9.5M11 18.5v-13M16 18.5V12" /></>,
  },
  {
    title: 'Your numbers, plainly',
    body: 'Outstanding, overdue, and earned this year sit on one screen. No dashboards to configure, no charts you did not ask for.',
    glyph: <><rect x="3.5" y="4.5" width="15" height="13" /><path d="M3.5 9h15M8.5 9v8.5" /></>,
  },
]

export default function Features() {
  return (
    <section id="how" className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="kicker">What Ledger does</p>
          <h2 className="section-title mt-4">Everything an invoice needs. Nothing an invoice does not.</h2>
        </div>
        <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="feature-item">
              <Glyph>{feature.glyph}</Glyph>
              <h3 className="mt-4">{feature.title}</h3>
              <p>{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
