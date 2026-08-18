// First-party footer in the shared soft-extrusion vocabulary.
export default function Footer() {
  return (
    <footer className="pb-10 pt-4">
      <div className="shell">
        <div className="neu-inset-lg rounded-[28px] px-8 py-10 sm:px-12">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="max-w-xs">
              <p className="flex items-center gap-3 text-lg font-extrabold tracking-tight">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-accent stroke-[2.4]" aria-hidden="true">
                  <path d="M3 13h4l1.8-4.5 3.3 8 2.1-3.5H21" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Pulse
              </p>
              <p className="mt-4 text-sm font-medium leading-6 text-mist">
                A wellness tracker that answers one question well: how hard should today be?
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-10 sm:grid-cols-3" aria-label="Footer">
              {[
                { heading: 'Product', items: ['Features', 'Pricing', 'Changelog'] },
                { heading: 'Company', items: ['About', 'Journal', 'Contact'] },
                { heading: 'Trust', items: ['Privacy', 'Terms', 'Data export'] },
              ].map((column) => (
                <div key={column.heading}>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-mist">{column.heading}</p>
                  <ul className="mt-4 space-y-3 text-sm font-semibold">
                    {column.items.map((item) => (
                      <li key={item}><a className="text-ink transition-colors hover:text-accent" href="#top">{item}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <p className="mt-10 border-t border-ink/10 pt-6 text-xs font-semibold text-mist">
            © 2026 Pulse Health Labs. Your readings are yours; export or delete them any time.
          </p>
        </div>
      </div>
    </footer>
  )
}
