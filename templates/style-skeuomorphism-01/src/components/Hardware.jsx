// First-party hardware pieces: rotary knob, VU meter, amp switch.
// All fills derive from the --bw-* palette variables.
import { useState } from 'react'

export function Knob({ label = 'Gain', angle = 40, size = 'md', className = '' }) {
  const sizes = { sm: 'w-14', md: 'w-20', lg: 'w-24' }
  const ticks = Array.from({ length: 11 }, (_, index) => -135 + index * 27)
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className={sizes[size] || sizes.md} role="img" aria-label={`${label} knob`}>
        {ticks.map((tick) => (
          <line
            key={tick}
            x1="50" y1="6" x2="50" y2="13"
            stroke="color-mix(in srgb, var(--bw-text) 55%, transparent)"
            strokeWidth="2.5" strokeLinecap="round"
            transform={`rotate(${tick} 50 50)`}
          />
        ))}
        <circle cx="50" cy="52" r="33" fill="rgb(0 0 0 / 0.45)" />
        <circle cx="50" cy="50" r="33" fill="color-mix(in srgb, var(--bw-text) 40%, var(--bw-surface))" />
        <circle cx="50" cy="50" r="29" fill="color-mix(in srgb, var(--bw-text) 14%, var(--bw-surface))" />
        <circle cx="50" cy="50" r="29" fill="none" stroke="rgb(0 0 0 / 0.5)" strokeWidth="1" />
        <circle cx="44" cy="42" r="16" fill="color-mix(in srgb, var(--bw-text) 10%, transparent)" />
        <g transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="26" x2="50" y2="38" stroke="var(--bw-accent)" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
      <span className="engraved text-[0.7rem]">{label}</span>
    </div>
  )
}

export function VuMeter({ label = 'Practice level', className = '' }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 110" className="w-full" role="img" aria-label={`${label}: needle resting in the upper range`}>
        <rect x="2" y="2" width="196" height="106" rx="8" fill="color-mix(in srgb, var(--bw-text) 88%, var(--bw-accent))" />
        <rect x="2" y="2" width="196" height="106" rx="8" fill="none" stroke="rgb(0 0 0 / 0.35)" strokeWidth="2" />
        {Array.from({ length: 9 }, (_, index) => -48 + index * 12).map((tick, index) => (
          <line
            key={tick}
            x1="100" y1="24" x2="100" y2={index >= 6 ? '30' : '32'}
            stroke={index >= 6 ? 'var(--bw-accent)' : 'color-mix(in srgb, var(--bw-surface) 75%, transparent)'}
            strokeWidth={index >= 6 ? 4 : 2.5}
            transform={`rotate(${tick} 100 92)`}
          />
        ))}
        <text x="26" y="42" fontSize="13" fontWeight="700" fill="color-mix(in srgb, var(--bw-surface) 85%, transparent)" fontFamily="var(--font-display)">0</text>
        <text x="160" y="42" fontSize="13" fontWeight="700" fill="var(--bw-accent)" fontFamily="var(--font-display)">+10</text>
        <text x="100" y="70" fontSize="11" letterSpacing="2" textAnchor="middle" fill="color-mix(in srgb, var(--bw-surface) 70%, transparent)" fontFamily="var(--font-display)">VU</text>
        <g className="vu-needle">
          <line x1="100" y1="92" x2="100" y2="28" stroke="color-mix(in srgb, var(--bw-surface) 90%, transparent)" strokeWidth="2.5" />
        </g>
        <circle cx="100" cy="92" r="7" fill="color-mix(in srgb, var(--bw-surface) 88%, var(--bw-text))" />
        <rect x="2" y="80" width="196" height="28" rx="8" fill="color-mix(in srgb, var(--bw-surface) 30%, transparent)" />
      </svg>
    </div>
  )
}

export function AmpSwitch({ label, defaultOn = false, className = '' }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button type="button" className="amp-switch" aria-pressed={on} onClick={() => setOn(!on)}>
        <i aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </button>
      <span className="engraved text-[0.72rem]">{label}</span>
      <span className={`led ${on ? '' : 'led-off'}`} aria-hidden="true" />
    </div>
  )
}
