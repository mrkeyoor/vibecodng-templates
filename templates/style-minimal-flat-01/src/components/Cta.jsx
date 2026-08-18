// Derived from index slug: meraki-cta-simple
// Author repo: https://github.com/merakiui/merakiui
// Structure kept (centered heading, one supporting line, single button);
// tinted background panel removed so the section is carried by whitespace.

export default function Cta() {
  return (
    <section className="section pt-0">
      <div className="shell">
        <div className="rule mx-auto max-w-2xl pt-16 text-center">
          <h2 className="section-title text-balance">The next invoice you send could take a minute.</h2>
          <p className="mt-4 text-[0.9375rem] leading-7 text-mist">
            Three invoices a month are free forever. That is enough to know.
          </p>
          <a href="#top" className="button mt-8">Start invoicing free</a>
        </div>
      </div>
    </section>
  )
}
