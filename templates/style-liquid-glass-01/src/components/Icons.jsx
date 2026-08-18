// First-party inline icon set. Inherits currentColor.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Wallet = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <rect x="3" y="6" width="18" height="13" rx="3" />
    <path d="M3 10h18M16 14.5h1.5" />
  </svg>
)

export const Coffee = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" />
    <path d="M16 10h2a2.5 2.5 0 0 1 0 5h-2M8 5.5c0-1 .8-1 .8-2M11.5 5.5c0-1 .8-1 .8-2" />
  </svg>
)

export const Home = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="m4 11 8-7 8 7v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z" />
    <path d="M10 21v-6h4v6" />
  </svg>
)

export const Leaf = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M6 18C6 10 12 5 20 4c0 9-4 15-12 15" />
    <path d="M6 20c2-5 5-8 9-10" />
  </svg>
)

export const Rule = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M4 7h10M4 12h16M4 17h7" />
    <circle cx="17.5" cy="7" r="2" />
    <circle cx="14.5" cy="17" r="2" />
  </svg>
)

export const Forecast = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M3 18c3 0 3-8 6-8s3 5 6 5 3-9 6-9" />
    <path d="M3 21h18" strokeDasharray="2.5 3" />
  </svg>
)

export const Lens = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5M8.5 9.2a3.4 3.4 0 0 1 2.4-1.4" />
  </svg>
)

export const Vault = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="M12 8.4V7M12 17v-1.4M15.6 12H17M7 12h1.4" />
  </svg>
)

export const Star = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none" {...p}>
    <path d="m12 2.8 2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.6l-5.6 3.2 1.3-6.2L3 9.3l6.3-.7L12 2.8Z" />
  </svg>
)

export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" {...base} {...p}>
    <path d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
)

export const Plus = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Sparkle = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}>
    <path d="M12 4v5m0 6v5M4 12h5m6 0h5" />
    <path d="m7.5 7.5 2 2m5 5 2 2m-9 0 2-2m5-5 2-2" opacity="0.6" />
  </svg>
)
