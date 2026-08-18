// First-party inline icon set. Inherits currentColor.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Outline = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M5 5h14M5 10h9M8 15h11M8 20h7" />
    <path d="M5 15v5" opacity="0.5" />
  </svg>
)

export const Tone = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M4 16c2.8 0 2.8-8 5.6-8s2.8 6 5.6 6 2.8-4 5.8-4" />
    <path d="M4 20h16" strokeDasharray="2.5 3" />
  </svg>
)

export const Cite = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M6 17c-1.8 0-3-1.3-3-3.2C3 10 5.5 7.6 9 7v2.4c-1.7.4-2.7 1.4-2.9 2.8H7c1.4 0 2.4 1 2.4 2.4S8.4 17 7 17H6Zm9 0c-1.8 0-3-1.3-3-3.2 0-3.8 2.5-6.2 6-6.8v2.4c-1.7.4-2.7 1.4-2.9 2.8H16c1.4 0 2.4 1 2.4 2.4S17.4 17 16 17h-1Z" />
  </svg>
)

export const Rewrite = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M4 20h4L20.5 7.5a2.1 2.1 0 0 0-3-3L5 17l-1 3Z" />
    <path d="m14 6 3 3" />
  </svg>
)

export const Doc = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M6 3h8l4 4v14H6V3Z" />
    <path d="M14 3v4h4M9 12h6M9 16h6" />
  </svg>
)

export const Team = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c.7-3 2.8-4.7 5.5-4.7s4.8 1.7 5.5 4.7" />
    <path d="M15.5 5.8a3.2 3.2 0 0 1 0 5.4M17.8 14.9c1.5.7 2.4 2.3 2.8 4.6" />
  </svg>
)

export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" {...base} {...p}>
    <path d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
)

export const Sparkle = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}>
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.4l-1.8-5.8-5.7-1.8L10.2 9 12 3.5Z" />
    <path d="M19 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" opacity="0.7" />
  </svg>
)
