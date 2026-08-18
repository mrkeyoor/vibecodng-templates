// First-party. Once-only scroll reveals via IntersectionObserver;
// everything resolves instantly under prefers-reduced-motion.
import { useEffect, useState } from 'react'

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
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

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
