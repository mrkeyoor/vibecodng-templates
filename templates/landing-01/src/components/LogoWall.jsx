// Source slugs: hyperui-logo-wall-3, magicui-marquee
// Author repos: https://github.com/markmead/hyperui, https://github.com/magicuidesign/magicui

import { Marquee } from './Effects.jsx'

const companies = [
  ['NORTHSTAR', '✦'],
  ['APERTURE', '◫'],
  ['WAVELENGTH', '≈'],
  ['KESTREL', '⌁'],
  ['TANDEM', '∥'],
]

export default function LogoWall() {
  return (
    <section className="border-b border-white/8" aria-labelledby="customers-heading" data-reveal-group>
      <div className="shell py-12 sm:py-16">
        <h2 id="customers-heading" className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-mist" data-reveal style={{ '--reveal-order': 0 }}>Used to run the weekly engineering review at</h2>
        <div className="logo-marquee mt-8" data-reveal style={{ '--reveal-order': 1 }}>
          <Marquee>
          {companies.map(([name, symbol]) => (
            <div key={name} className="logo-item flex h-20 items-center justify-center gap-2 px-8 text-white/60 transition-colors hover:text-white">
              <span className="text-accent/70" aria-hidden="true">{symbol}</span>
              <span className="text-[11px] font-semibold tracking-[0.12em]">{name}</span>
            </div>
          ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
