import { useEffect, useRef, useState } from 'react'

// First-party. Once-per-view reveal groups via IntersectionObserver.
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

// Source slug: motion-primitives-animated-number
// Author repo: https://github.com/ibelick/motion-primitives
// Spring count-up reduced to a single eased in-view pass, no runtime dependency.
export function CountUp({ value, decimals = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const format = (number) => Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      node.textContent = format(value)
      return undefined
    }

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const duration = 850
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        node.textContent = format(decimals ? value * eased : Math.round(value * eased))
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
  }, [decimals, value])

  return <span ref={ref} className="tabular-nums">0</span>
}

// First-party. Pointer-tilted foil: maps cursor position over the element to
// the --holo-angle custom property, so the conic sheet turns as if the foil
// were catching light. Interaction-only; no idle work; disabled under
// prefers-reduced-motion.
export function useHoloTilt(baseAngle = 210, range = 70) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const move = (event) => {
      const rect = node.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      const angle = baseAngle + (x - 0.5) * range + (y - 0.5) * (range / 2)
      node.style.setProperty('--holo-angle', `${angle}deg`)
    }
    const reset = () => node.style.removeProperty('--holo-angle')
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerleave', reset)
    return () => {
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', reset)
    }
  }, [baseAngle, range])

  return ref
}
