import { useEffect, useRef, useState } from 'react'

// Source slug: motion-primitives-in-view (cross-style entry, spatial index)
// Author repo: https://github.com/ibelick/motion-primitives
// Adapted to IntersectionObserver; once-only reveals; honors reduced motion.
export function RevealController() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isStatic = new URLSearchParams(window.location.search).has('static')
    const groups = [...document.querySelectorAll('[data-reveal-group]')]

    if (isStatic) document.documentElement.classList.add('no-anim')

    if (reduced || isStatic || !('IntersectionObserver' in window)) {
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

// Source slug: motion-primitives-tilt
// Author repo: https://github.com/ibelick/motion-primitives
// Pointer-driven perspective tilt rebuilt on CSS custom properties, no runtime dependency.
export function useTilt(maxDeg = 6) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const move = (event) => {
      const rect = node.getBoundingClientRect()
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      node.style.setProperty('--tx', (nx * maxDeg * 2).toFixed(2))
      node.style.setProperty('--ty', (ny * -maxDeg * 2).toFixed(2))
    }
    const leave = () => {
      node.style.setProperty('--tx', '0')
      node.style.setProperty('--ty', '0')
    }

    node.addEventListener('pointermove', move, { passive: true })
    node.addEventListener('pointerleave', leave)
    return () => {
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', leave)
    }
  }, [maxDeg])

  return ref
}

// Source slug: motion-primitives-magnetic
// Author repo: https://github.com/ibelick/motion-primitives
// Magnetic pull toward the pointer inside an activation zone, springs back on leave.
export function Magnetic({ children, strength = 0.28 }) {
  const zone = useRef(null)

  useEffect(() => {
    const node = zone.current
    const target = node?.firstElementChild
    if (!node || !target) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const move = (event) => {
      const rect = node.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      target.style.setProperty('--mx', (dx * strength).toFixed(1))
      target.style.setProperty('--my', (dy * strength).toFixed(1))
    }
    const leave = () => {
      target.style.setProperty('--mx', '0')
      target.style.setProperty('--my', '0')
    }

    node.addEventListener('pointermove', move, { passive: true })
    node.addEventListener('pointerleave', leave)
    return () => {
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', leave)
    }
  }, [strength])

  return <span ref={zone} className="magnet-zone p-3 -m-3">{children}</span>
}
