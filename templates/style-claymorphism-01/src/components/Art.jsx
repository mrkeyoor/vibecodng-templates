// First-party inline SVG artwork. Everything inherits the --bw-* palette
// through currentColor and color-mix, so palette swaps re-theme the garden.
export function Flower({ className = '', petals = 'var(--bw-accent)', center = 'color-mix(in srgb, var(--bw-accent) 45%, white)' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill={petals}>
        <ellipse cx="32" cy="14" rx="9" ry="12" />
        <ellipse cx="14" cy="27" rx="9" ry="12" transform="rotate(-72 14 27)" />
        <ellipse cx="21" cy="48" rx="9" ry="12" transform="rotate(-144 21 48)" />
        <ellipse cx="43" cy="48" rx="9" ry="12" transform="rotate(144 43 48)" />
        <ellipse cx="50" cy="27" rx="9" ry="12" transform="rotate(72 50 27)" />
      </g>
      <circle cx="32" cy="32" r="10" fill={center} />
    </svg>
  )
}

export function Sprout({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 58V30" stroke="color-mix(in srgb, var(--bw-text) 70%, var(--bw-accent))" strokeWidth="5" strokeLinecap="round" />
      <path d="M32 34C32 22 22 16 10 16c0 12 10 20 22 18Z" fill="color-mix(in srgb, var(--bw-accent) 55%, var(--bw-surface))" />
      <path d="M32 28c0-10 8-16 20-16 0 12-8 18-20 16Z" fill="var(--bw-accent)" />
    </svg>
  )
}

export function Star({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 6l7.6 16.9L58 24.8 44.5 37.2 48 55.4 32 46l-16 9.4 3.5-18.2L6 24.8l18.4-1.9Z" fill="var(--bw-accent)" />
    </svg>
  )
}

export function Butterfly({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M30 32C22 18 8 14 6 22c-2 9 10 16 22 14Z" fill="color-mix(in srgb, var(--bw-accent) 60%, var(--bw-surface))" />
      <path d="M34 32c8-14 22-18 24-10 2 9-10 16-22 14Z" fill="var(--bw-accent)" />
      <path d="M30 34c-10 2-18 10-14 16 4 7 12 2 16-8Z" fill="var(--bw-accent)" opacity="0.75" />
      <path d="M34 34c10 2 18 10 14 16-4 7-12 2-16-8Z" fill="color-mix(in srgb, var(--bw-accent) 60%, var(--bw-surface))" />
      <path d="M32 24v22" stroke="color-mix(in srgb, var(--bw-text) 80%, transparent)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

// A little garden bed: three flowers pop up one by one on reveal.
export function GardenRow({ className = '' }) {
  return (
    <svg viewBox="0 0 220 90" className={className} role="img" aria-label="Three garden flowers, one for each finished activity">
      <rect x="8" y="70" width="204" height="14" rx="7" fill="color-mix(in srgb, var(--bw-accent) 30%, var(--bw-surface))" />
      {[
        { x: 40, cls: 'petal-pop petal-pop-1', h: 26 },
        { x: 110, cls: 'petal-pop petal-pop-2', h: 34 },
        { x: 180, cls: 'petal-pop petal-pop-3', h: 22 },
      ].map(({ x, cls, h }) => (
        <g key={x} className={cls} style={{ transformOrigin: `${x}px 70px` }}>
          <path d={`M${x} 70V${70 - h}`} stroke="color-mix(in srgb, var(--bw-text) 60%, var(--bw-accent))" strokeWidth="4" strokeLinecap="round" />
          <g transform={`translate(${x - 14} ${70 - h - 26}) scale(0.44)`}>
            <g fill="var(--bw-accent)">
              <ellipse cx="32" cy="14" rx="9" ry="12" />
              <ellipse cx="14" cy="27" rx="9" ry="12" transform="rotate(-72 14 27)" />
              <ellipse cx="21" cy="48" rx="9" ry="12" transform="rotate(-144 21 48)" />
              <ellipse cx="43" cy="48" rx="9" ry="12" transform="rotate(144 43 48)" />
              <ellipse cx="50" cy="27" rx="9" ry="12" transform="rotate(72 50 27)" />
            </g>
            <circle cx="32" cy="32" r="10" fill="color-mix(in srgb, var(--bw-accent) 45%, white)" />
          </g>
        </g>
      ))}
    </svg>
  )
}
