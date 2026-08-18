// Derived from index slug: magicui-animated-circular-progress-bar
// Author repo: https://github.com/magicuidesign/magicui
// Keeps the source's SVG ring with an animated gauge and centered value;
// reimplemented with stroke-dashoffset CSS transition and an in-view,
// once-only count-up instead of the runtime dependency. Reduced motion
// renders the final value immediately.

import { useEffect, useRef, useState } from 'react'
import { Card, useReducedMotion } from './Effects.jsx'

const TARGET = 78
const R = 56
const CIRC = 2 * Math.PI * R

export default function ProgressCard() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const numberRef = useRef(null)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (reduced || !('IntersectionObserver' in window)) {
      setArmed(true)
      if (numberRef.current) numberRef.current.textContent = String(TARGET)
      return undefined
    }
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setArmed(true)
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / 1100, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        if (numberRef.current) numberRef.current.textContent = String(Math.round(TARGET * eased))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
      observer.disconnect()
    }, { threshold: 0.5 })
    observer.observe(node)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [reduced])

  return (
    <Card span="b4" order={0} className="flex flex-col items-start gap-5">
      <p className="card-label">Sprint 12 of 14</p>
      <div className="ring-wrap self-center" ref={ref} role="img" aria-label={`Sprint scope ${TARGET} percent shipped`}>
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <circle className="ring-track" cx="64" cy="64" r={R} fill="none" strokeWidth="11" />
          <circle
            className="ring-fill"
            cx="64" cy="64" r={R} fill="none" strokeWidth="11"
            strokeDasharray={CIRC}
            strokeDashoffset={armed ? CIRC * (1 - TARGET / 100) : CIRC}
          />
        </svg>
        <span className="ring-value"><span ref={numberRef}>0</span><span className="text-base text-mist">%</span></span>
      </div>
      <p className="m-0 text-sm leading-6 text-mist">
        Scope shipped, pulled straight from threads marked done. Nobody updated a spreadsheet.
      </p>
    </Card>
  )
}
