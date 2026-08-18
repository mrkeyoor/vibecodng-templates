// First-party. Once-only card reveal on an IntersectionObserver; every card
// carries data-reveal and a --reveal-order custom property for the stagger.
// Under prefers-reduced-motion all cards render revealed with no transition.

import { useEffect, useState } from 'react'

export function RevealController() {
  useEffect(() => {
    const cards = [...document.querySelectorAll('[data-reveal]')]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || !('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-revealed'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -4% 0px' })

    cards.forEach((card) => observer.observe(card))
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

export function Card({ as: Tag = 'section', span = '', tone = '', order = 0, className = '', children, ...rest }) {
  return (
    <Tag
      className={`card ${span} ${tone} ${className}`}
      data-reveal
      style={{ '--reveal-order': order }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
