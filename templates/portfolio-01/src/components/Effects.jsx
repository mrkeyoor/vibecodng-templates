import { useEffect } from 'react'

// Source slug: motion-primitives-in-view
// Author repo: https://github.com/ibelick/motion-primitives
// Adapted to a dependency-free, once-only IntersectionObserver reveal.
export function RevealController() {
  useEffect(() => {
    const groups = [...document.querySelectorAll('[data-reveal-group]')]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      groups.forEach((group) => group.classList.add('is-revealed'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    groups.forEach((group) => observer.observe(group))
    return () => observer.disconnect()
  }, [])
  return null
}
