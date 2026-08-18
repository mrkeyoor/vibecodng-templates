import { useEffect, useState } from 'react'

// Source slug: motion-primitives-in-view
// Author repo: https://github.com/ibelick/motion-primitives
// Adapted to IntersectionObserver; once-only reveals; honors reduced motion.
// The 90ms+ stagger inside each group follows motion-primitives-animated-group
// (same author repo), driven by the --reveal-order custom property in CSS.
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
