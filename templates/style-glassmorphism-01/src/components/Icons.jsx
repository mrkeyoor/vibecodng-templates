// First-party inline icon set. Stroke inherits currentColor so palettes re-theme it.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Funnel = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />
  </svg>
)

export const Pulse = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M3 12h4l2.5-6 4 12L16 12h5" />
  </svg>
)

export const Cohort = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <circle cx="9" cy="9" r="3.4" />
    <circle cx="16.5" cy="15.5" r="3.4" />
    <path d="M12 12.2 13.6 13" />
  </svg>
)

export const Bell = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16Z" />
    <path d="M10.4 21a2 2 0 0 0 3.2 0" />
  </svg>
)

export const Layers = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m4.5 12.5 7.5 4.2 7.5-4.2" />
    <path d="m4.5 16.5 7.5 4.2 7.5-4.2" />
  </svg>
)

export const Shield = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M12 3.5 19 6v6c0 4.2-3 7.3-7 8.5-4-1.2-7-4.3-7-8.5V6l7-2.5Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
)

export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" {...base} {...p}>
    <path d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
)

export const ArrowUpRight = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" {...base} {...p}>
    <path d="M6 18 18 6M9 6h9v9" />
  </svg>
)

export const Spark = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}>
    <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.4 2.4m7.2 7.2L18 18M6 18l2.4-2.4m7.2-7.2L18 6" />
  </svg>
)
