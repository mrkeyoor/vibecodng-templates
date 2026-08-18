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

// Source slug: motion-primitives-text-scramble
// Author repo: https://github.com/ibelick/motion-primitives
// Reimplemented without the motion dependency: one scramble pass on mount,
// then the text settles and never animates again. Skipped entirely under
// prefers-reduced-motion.
export function TextScramble({ text, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = text
      return undefined
    }

    const glyphs = '#$%&/=?_<>[]{}0147'
    const duration = 700
    const start = performance.now()
    let frame = 0

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const settled = Math.floor(text.length * progress)
      let out = text.slice(0, settled)
      for (let i = settled; i < text.length; i += 1) {
        out += text[i] === ' ' ? ' ' : glyphs[Math.floor(Math.random() * glyphs.length)]
      }
      node.textContent = out
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [text])

  return <span ref={ref} className={className} aria-label={text}>{text}</span>
}

// Source slug: motion-primitives-animated-number
// Author repo: https://github.com/ibelick/motion-primitives
// Spring count-up reduced to a single eased in-view pass with no runtime dependency.
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

// Source slug: magicui-flickering-grid
// Author repo: https://github.com/magicuidesign/magicui
// The indexed component repaints every frame forever. This adaptation draws the
// grid once, then flickers a small batch of cells on a 240ms interval, and only
// while the canvas is actually in the viewport. Static under reduced motion.
export function FlickerGrid({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const size = 3
    const gap = 9
    let cols = 0
    let rows = 0
    let opacities = []

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--bw-text').trim() || '#e9edef'

    const paintCell = (i) => {
      const x = (i % cols) * gap
      const y = Math.floor(i / cols) * gap
      ctx.clearRect(x, y, size, size)
      ctx.globalAlpha = opacities[i]
      ctx.fillStyle = accent
      ctx.fillRect(x, y, size, size)
      ctx.globalAlpha = 1
    }

    const layout = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      cols = Math.ceil(rect.width / gap)
      rows = Math.ceil(rect.height / gap)
      opacities = Array.from({ length: cols * rows }, () => Math.random() * 0.14)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < opacities.length; i += 1) paintCell(i)
    }

    layout()
    window.addEventListener('resize', layout)

    let interval = 0
    if (!reduced && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !interval) {
          interval = window.setInterval(() => {
            const batch = Math.floor(opacities.length * 0.02)
            for (let n = 0; n < batch; n += 1) {
              const i = Math.floor(Math.random() * opacities.length)
              opacities[i] = Math.random() * 0.14
              paintCell(i)
            }
          }, 240)
        } else if (!entry.isIntersecting && interval) {
          window.clearInterval(interval)
          interval = 0
        }
      })
      observer.observe(canvas)
      return () => {
        observer.disconnect()
        window.clearInterval(interval)
        window.removeEventListener('resize', layout)
      }
    }

    return () => window.removeEventListener('resize', layout)
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
