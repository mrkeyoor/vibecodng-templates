// Source slug: motion-primitives-in-view
// Author repo: https://github.com/ibelick/motion-primitives
import { useEffect } from 'react'

export default function RevealController() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { document.documentElement.classList.add('reduce-motion'); return }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && (entry.target.classList.add('is-visible'), observer.unobserve(entry.target))), { threshold: .12 })
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return null
}
