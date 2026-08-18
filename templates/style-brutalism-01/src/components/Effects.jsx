import { useEffect } from 'react'

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
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' })

    groups.forEach((group) => observer.observe(group))
    return () => observer.disconnect()
  }, [])

  return null
}
