// First-party footer: back panel of the amp.
export default function Footer() {
  return (
    <footer className="pb-10 pt-4">
      <div className="shell">
        <div className="metal-panel relative rounded-[14px] px-8 py-10 sm:px-12">
          <span className="metal-screw left-2 top-2" aria-hidden="true" />
          <span className="metal-screw right-2 top-2" aria-hidden="true" />
          <span className="metal-screw bottom-2 left-2" aria-hidden="true" />
          <span className="metal-screw bottom-2 right-2" aria-hidden="true" />
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="max-w-xs">
              <p className="font-display text-2xl tracking-[0.14em]">DECK</p>
              <p className="engraved mt-1 text-[0.7rem]">Ser. no 2026-0815 · Handle with care</p>
              <p className="mt-4 text-sm leading-6 text-mist">
                A practice rig for players who would rather play than configure.
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-10 sm:grid-cols-3" aria-label="Footer">
              {[
                { heading: 'Rig', items: ['Metronome', 'Tuner', 'Drill decks'] },
                { heading: 'Players', items: ['Guitar', 'Bass', 'Teachers'] },
                { heading: 'Fine print', items: ['Privacy', 'Terms', 'Support'] },
              ].map((column) => (
                <div key={column.heading}>
                  <p className="engraved text-[0.7rem]">{column.heading}</p>
                  <ul className="mt-4 space-y-3 text-sm">
                    {column.items.map((item) => (
                      <li key={item}><a className="text-ink transition-colors hover:text-accent" href="#top">{item}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <p className="mt-10 border-t border-white/10 pt-6 text-xs text-mist">
            © 2026 Deck Audio Practice Co. Your takes are yours; export them any time. No warranty against broken strings.
          </p>
        </div>
      </div>
    </footer>
  )
}
