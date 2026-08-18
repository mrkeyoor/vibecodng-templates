// First-party. A magazine pull-quote spread; the type is the imagery.

export default function PullQuote() {
  return (
    <section className="section pt-0" data-reveal-group>
      <div className="shell">
        <figure className="m-0 border-y-[3px] border-ink py-14 sm:py-20" data-reveal style={{ '--reveal-order': 0 }}>
          <blockquote className="m-0 mx-auto max-w-4xl text-center">
            <p className="pull-quote m-0 text-balance">
              Nobody ever finished an essay inside an app that kept congratulating them for typing.
            </p>
          </blockquote>
          <figcaption className="folio mt-8 justify-center gap-3">
            <span>Marguerite Held</span>
            <span aria-hidden="true">&middot;</span>
            <span>Founding editor, Longform</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
