// Derived from index slug: hyperui-footers-3
// Author repo: https://github.com/markmead/hyperui
// Structure kept (brand block beside labeled link columns, legal line
// below); recast as a colophon under the masthead's double rule, closing
// the page the way a magazine closes an issue.

const columns = [
  { title: 'Writing', links: ['The editor', 'Footnotes', 'Versions', 'Importer'] },
  { title: 'Reading', links: ['The archive', 'Subscriptions', 'RSS', 'Gift a year'] },
  { title: 'The house', links: ['About', 'The 6%', 'Letters', 'Careers'] },
]

export default function Colophon() {
  return (
    <footer className="pb-10">
      <div className="shell">
        <div className="double-rule pt-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
            <div>
              <p className="display-face m-0 text-2xl font-semibold tracking-tight">
                Longform<span className="text-accent">.</span>
              </p>
              <p className="body-text m-0 mt-3 max-w-xs">
                A writing platform for work that takes longer than a scroll.
                Independent, subscriber-funded, allergic to feeds.
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label="Colophon">
              {columns.map((column) => (
                <div key={column.title}>
                  <p className="footer-head m-0 mb-3">{column.title}</p>
                  {column.links.map((link) => (
                    <a key={link} href="#top" className="footer-link">{link}</a>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
        <div className="folio mt-10 border-t border-rule pt-4">
          <span>&copy; 2026 Longform</span>
          <span className="hidden sm:block">Set in Fraunces &amp; Newsreader &middot; Printed on pixels</span>
          <span>Terms &middot; Privacy</span>
        </div>
      </div>
    </footer>
  )
}
