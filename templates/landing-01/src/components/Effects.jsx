import { Children, useEffect, useId, useRef, useState } from 'react'

// Source slug: motion-primitives-in-view
// Author repo: https://github.com/ibelick/motion-primitives
// Adapted to IntersectionObserver to avoid a runtime dependency and honor reduced motion.
export function RevealController() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const groups = [...document.querySelectorAll('[data-reveal-group]')]

    if (reduced || !('IntersectionObserver' in window)) {
      groups.forEach((group) => group.classList.add('is-revealed'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })

    groups.forEach((group) => observer.observe(group))
    return () => observer.disconnect()
  }, [])

  return null
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

// Source slug: magicui-number-ticker
// Author repo: https://github.com/magicuidesign/magicui
// Keeps the indexed in-view, once-only count-up and locale formatting behavior.
export function NumberTicker({ value, decimalPlaces = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const format = (number) => Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(number)
    const showFinal = () => { node.textContent = format(value) }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      showFinal()
      return undefined
    }

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const duration = 900
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        const current = value * eased
        node.textContent = format(decimalPlaces ? current : Math.round(current))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
      observer.disconnect()
    }, { threshold: 0.6 })

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [decimalPlaces, value])

  return <span ref={ref} className="tabular-nums">0</span>
}

// Source slug: magicui-marquee
// Author repo: https://github.com/magicuidesign/magicui
export function Marquee({ children }) {
  const items = Children.toArray(children)
  return (
    <div className="marquee" aria-label="Customer logos">
      <div className="marquee-track">
        <div className="marquee-set">{items}</div>
        <div className="marquee-set" aria-hidden="true">{items}</div>
      </div>
    </div>
  )
}

// Source slug: magicui-border-beam
// Author repo: https://github.com/magicuidesign/magicui
// The indexed perpetual beam is deliberately reduced to one pass on reveal.
export function BorderBeam() {
  return <span className="border-beam" aria-hidden="true"><i /></span>
}

// Source slug: magicui-dot-pattern
// Author repo: https://github.com/magicuidesign/magicui
// Static SVG pattern variant (glow disabled) for low-motion decorative surfaces.
export function DotPattern({ className = '' }) {
  const id = useId().replaceAll(':', '')
  return (
    <svg className={`dot-pattern ${className}`} aria-hidden="true">
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
