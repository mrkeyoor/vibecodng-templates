// Derived from index slug: hyperui-ctas-2
// Author repo: https://github.com/markmead/hyperui
// Structure kept (full-width band, large heading, supporting line, primary
// action); recast as an inverted ink plate with poster-scale Fraunces.

export default function Cta() {
  return (
    <section className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="bg-ink px-6 py-16 text-center text-paper sm:px-12 sm:py-24" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="folio justify-center !text-paper/60"><span>Final page</span></p>
          <h2 className="display-face mx-auto mt-6 max-w-[14ch] text-balance text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[0.98] tracking-tight">
            Begin tonight. Publish when it is <em className="italic text-accent">ready.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base italic leading-7 text-paper/70">
            A blank page is free, and it will still be yours in the morning.
          </p>
          <a href="#top" className="button mt-9 !border-paper !bg-paper !text-ink hover:!border-accent hover:!bg-accent hover:!text-white">
            Start your first draft
          </a>
        </div>
      </div>
    </section>
  )
}
