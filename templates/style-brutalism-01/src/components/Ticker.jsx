// Adapted pattern: neobrutalism-marquee
// Author repo: https://github.com/ekmas/neobrutalism-components
// Looping strip is CSS-only; under reduced motion the loop stops and the duplicate set is removed from view.

const items = [
  'NO AI COPILOT',
  'NO BLOCK PARTY',
  'NO SURPRISE INVOICE',
  'NO VENDOR LOCK',
  'CONTENT TYPES',
  'ROLES',
  'ONE API',
  'THAT IS THE PRODUCT',
]

function Set({ hidden }) {
  return (
    <div className="ticker-set" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item}>{item} <b aria-hidden="true"> ■</b></span>
      ))}
    </div>
  )
}

export default function Ticker() {
  return (
    <div className="ticker" aria-label="Slab in eight statements">
      <div className="ticker-track">
        <Set />
        <Set hidden />
      </div>
    </div>
  )
}
