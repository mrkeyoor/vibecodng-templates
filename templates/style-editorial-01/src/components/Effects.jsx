// First-party. Once-only reveal per section group on an IntersectionObserver.
// Sections carry data-reveal-group; children stagger via --reveal-order.
// Under prefers-reduced-motion everything renders revealed immediately.

import { useEffect } from 'react'

export function RevealController() {
  useEffect(() => {
    const groups = [...document.querySelectorAll('[data-reveal-group]')]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' })

    groups.forEach((group) => observer.observe(group))
    return () => observer.disconnect()
  }, [])

  return null
}
