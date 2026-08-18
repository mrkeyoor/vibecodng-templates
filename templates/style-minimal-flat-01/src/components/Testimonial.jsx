// Derived from index slug: meraki-testimonials-centered
// Author repo: https://github.com/merakiui/merakiui
// Structure kept (single centered quote with name and role beneath); avatar
// image dropped, attribution set in the template's mono kicker style.

export default function Testimonial() {
  return (
    <section className="section pt-0">
      <div className="shell">
        <div className="rule mx-auto max-w-3xl pt-14 text-center">
          <blockquote className="m-0">
            <p className="text-balance text-xl font-medium leading-8 tracking-tight sm:text-2xl sm:leading-9">
              &ldquo;I used to lose a Sunday every month to invoicing. Now it happens in the
              gap between finishing a job and making coffee. My clients pay faster
              because the invoice looks like I mean it.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-7">
            <p className="text-sm font-semibold">Nadia Rahal</p>
            <p className="mono mt-1 text-[10px] tracking-[0.14em] text-mist">FREELANCE COPYWRITER, LISBON</p>
          </figcaption>
        </div>
      </div>
    </section>
  )
}
