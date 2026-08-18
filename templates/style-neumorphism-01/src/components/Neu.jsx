// Adapted first-party primitives from sir-originals (mrkeyoor/sir-originals).
// Source slugs: neu-button, neu-card, neu-toggle, neu-slider, neu-progress,
// neu-stat-card, neu-pricing, neu-badge, neu-avatar, neu-input, neu-checkbox,
// neu-search-input. All read the --bw-* palette variables; shadows derive from
// the surface color so every palette re-themes the extrusion.
import { useState } from 'react'

const neuPalette = {
  '--neu-accent': 'var(--bw-accent, #175CD3)', '--neu-surface': 'var(--bw-surface, #E0E5EC)',
  '--neu-text': 'var(--bw-text, #344054)', '--neu-muted': 'var(--bw-muted, #667085)',
  '--neu-shadow-dark': 'color-mix(in srgb, var(--bw-surface, #E0E5EC) 78%, black)',
  '--neu-shadow-light': 'color-mix(in srgb, var(--bw-surface, #E0E5EC) 68%, white)',
}

// Source slug: neu-button
export function NeuButton({ children = 'Continue', type = 'button', disabled = false, as, href, className = '', ...props }) {
  const classes = `inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[var(--neu-surface)] px-6 py-3 text-sm font-bold text-[var(--neu-text)] shadow-[7px_7px_14px_var(--neu-shadow-dark),-7px_-7px_14px_var(--neu-shadow-light)] transition-[box-shadow,transform,color] duration-200 hover:text-[var(--neu-accent)] active:translate-y-px active:shadow-[inset_4px_4px_8px_var(--neu-shadow-dark),inset_-4px_-4px_8px_var(--neu-shadow-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--neu-surface)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`
  if (as === 'a') {
    return <a href={href} style={neuPalette} className={classes} {...props}>{children}</a>
  }
  return <button type={type} disabled={disabled} style={neuPalette} className={classes} {...props}>{children}</button>
}

// Source slug: neu-card
export function NeuCard({ eyebrow, title, children, footer, className = '' }) {
  return (
    <article style={neuPalette} className={`w-full rounded-[24px] bg-[var(--neu-surface)] p-7 text-[var(--neu-text)] shadow-[12px_12px_24px_var(--neu-shadow-dark),-12px_-12px_24px_var(--neu-shadow-light)] ${className}`}>
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--neu-muted)_25%,var(--neu-text))]">{eyebrow}</p> : null}
      {title ? <h3 className="text-xl font-extrabold tracking-[-0.03em] text-[var(--neu-text)]">{title}</h3> : null}
      <div className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--neu-muted)_60%,var(--neu-text))]">{children}</div>
      {footer ? <div className="mt-6 border-t border-[color-mix(in_srgb,var(--neu-muted)_35%,transparent)] pt-5">{footer}</div> : null}
    </article>
  )
}

// Source slug: neu-toggle
export function NeuToggle({ label = 'Quiet mode', checked, defaultChecked = false, onChange, disabled = false, className = '' }) {
  const [internal, setInternal] = useState(defaultChecked)
  const active = checked ?? internal
  const toggle = () => {
    if (disabled) return
    const next = !active
    if (checked === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <label style={neuPalette} className={`inline-flex cursor-pointer items-center gap-3 text-sm font-bold text-[var(--neu-text)] ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
      <input className="peer sr-only" type="checkbox" checked={active} onChange={toggle} disabled={disabled} />
      <span className="relative h-8 w-14 shrink-0 rounded-full bg-[var(--neu-surface)] shadow-[inset_4px_4px_8px_var(--neu-shadow-dark),inset_-4px_-4px_8px_var(--neu-shadow-light)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--neu-accent)]">
        <span className={`absolute top-1 h-6 w-6 rounded-full transition-[left,background-color,box-shadow] duration-200 ${active ? 'left-7 bg-[var(--neu-accent)] shadow-[3px_3px_6px_var(--neu-shadow-dark),-2px_-2px_5px_var(--neu-shadow-light)]' : 'left-1 bg-[var(--neu-surface)] shadow-[3px_3px_6px_var(--neu-shadow-dark),-3px_-3px_6px_var(--neu-shadow-light)]'}`} />
      </span>
      {label}
    </label>
  )
}

// Source slug: neu-slider
export function NeuSlider({ label = 'Focus level', value = 68, min = 0, max = 100, onChange, showValue = true, unit = '%', className = '', ...props }) {
  const percent = Math.round(((Number(value) - min) / (max - min)) * 100)
  return (
    <label style={neuPalette} className={`block w-full text-[var(--neu-text)] ${className}`}>
      <span className="mb-3 flex items-center justify-between text-sm font-bold">
        <span>{label}</span>
        {showValue ? <span className="rounded-[10px] bg-[var(--neu-surface)] px-2.5 py-1 text-xs shadow-[3px_3px_6px_var(--neu-shadow-dark),-3px_-3px_6px_var(--neu-shadow-light)]">{unit === '%' ? `${percent}%` : `${value}${unit}`}</span> : null}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="h-3 w-full cursor-pointer appearance-none rounded-full bg-[var(--neu-surface)] shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)] accent-[var(--neu-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]"
        {...props}
      />
    </label>
  )
}

// Source slug: neu-progress
export function NeuProgress({ value = 72, max = 100, label = 'Progress', showValue = true, className = '' }) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)))
  const widths = ['w-0', 'w-[10%]', 'w-[20%]', 'w-[30%]', 'w-[40%]', 'w-[50%]', 'w-[60%]', 'w-[70%]', 'w-[80%]', 'w-[90%]', 'w-full']
  const widthClass = widths[Math.round(percent / 10)]
  return (
    <div style={neuPalette} className={`w-full text-[var(--neu-text)] ${className}`}>
      <div className="mb-3 flex justify-between text-sm font-bold">
        <span>{label}</span>
        {showValue ? <span>{percent}%</span> : null}
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-[var(--neu-surface)] p-1 shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)]" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <div className={`h-full rounded-full bg-[var(--neu-accent)] shadow-[2px_2px_4px_var(--neu-shadow-dark)] transition-[width] duration-500 ${widthClass}`} />
      </div>
    </div>
  )
}

// Source slug: neu-stat-card
// Adaptation: the indexed muted caption caused the recorded serious contrast
// finding; here the caption uses a text-leaning mix that clears 4.5:1.
export function NeuStatCard({ label = 'Metric', value = '0', change = '', trend = 'up', icon, className = '' }) {
  return (
    <article style={neuPalette} className={`w-full rounded-[22px] bg-[var(--neu-surface)] p-6 text-[var(--neu-text)] shadow-[10px_10px_20px_var(--neu-shadow-dark),-10px_-10px_20px_var(--neu-shadow-light)] ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[color-mix(in_srgb,var(--neu-muted)_65%,var(--neu-text))]">{label}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[var(--neu-text)]">{value}</p>
        </div>
        {icon ? <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] text-[var(--neu-accent)] shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)]">{icon}</div> : null}
      </div>
      {change ? <p className="mt-5 inline-flex rounded-full px-3 py-1 text-xs font-bold text-[var(--neu-accent)] shadow-[3px_3px_6px_var(--neu-shadow-dark),-3px_-3px_6px_var(--neu-shadow-light)]">{trend === 'down' ? '−' : ''}{change} <span className="ml-1 font-semibold text-[color-mix(in_srgb,var(--neu-muted)_55%,var(--neu-text))]">this month</span></p> : null}
    </article>
  )
}

// Source slug: neu-pricing
export function NeuPricing({ name = 'Studio', price = '$24', period = '/month', description = '', features = [], cta = 'Start free', onSelect, featured = false, className = '' }) {
  return (
    <article style={neuPalette} className={`relative w-full rounded-[28px] bg-[var(--neu-surface)] p-8 text-[var(--neu-text)] shadow-[14px_14px_28px_var(--neu-shadow-dark),-14px_-14px_28px_var(--neu-shadow-light)] ${featured ? 'ring-2 ring-[var(--neu-accent)]' : ''} ${className}`}>
      {featured ? <span className="absolute -top-3 left-8 rounded-full bg-[var(--neu-accent)] px-3 py-1 text-xs font-bold text-[var(--neu-surface)] shadow-[3px_3px_7px_var(--neu-shadow-dark)]">Most popular</span> : null}
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--neu-muted)_60%,var(--neu-text))]">{name}</p>
      <div className="mt-4 flex items-end gap-1"><span className="text-5xl font-extrabold tracking-[-0.06em] text-[var(--neu-text)]">{price}</span><span className="pb-1 text-sm font-semibold text-[color-mix(in_srgb,var(--neu-muted)_60%,var(--neu-text))]">{period}</span></div>
      <p className="mt-4 text-sm leading-6 text-[color-mix(in_srgb,var(--neu-muted)_60%,var(--neu-text))]">{description}</p>
      <ul className="my-7 space-y-3 text-sm font-semibold">
        {features.map((feature) => <li key={feature} className="flex items-center gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[var(--neu-accent)] shadow-[inset_2px_2px_4px_var(--neu-shadow-dark),inset_-2px_-2px_4px_var(--neu-shadow-light)]">✓</span>{feature}</li>)}
      </ul>
      <button type="button" onClick={onSelect} className="min-h-11 w-full cursor-pointer rounded-[14px] bg-[var(--neu-surface)] px-5 font-bold text-[var(--neu-accent)] shadow-[7px_7px_14px_var(--neu-shadow-dark),-7px_-7px_14px_var(--neu-shadow-light)] transition-shadow active:shadow-[inset_4px_4px_8px_var(--neu-shadow-dark),inset_-4px_-4px_8px_var(--neu-shadow-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]">{cta}</button>
    </article>
  )
}

// Source slug: neu-badge
export function NeuBadge({ children = 'New', dot = true, className = '' }) {
  return (
    <span style={neuPalette} className={`inline-flex items-center gap-2 rounded-full bg-[var(--neu-surface)] px-3 py-1.5 text-xs font-bold text-[var(--neu-text)] shadow-[4px_4px_8px_var(--neu-shadow-dark),-4px_-4px_8px_var(--neu-shadow-light)] ${className}`}>
      {dot ? <span className="h-2 w-2 rounded-full bg-[var(--neu-accent)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--neu-accent)_30%,var(--neu-surface))]" aria-hidden="true" /> : null}
      {children}
    </span>
  )
}

// Source slug: neu-avatar
// Adaptation: the indexed aria-label on a plain span produced the recorded
// aria-prohibited-attr finding; initials are now plain presentational text
// with the accessible name on the wrapper via role="img".
export function NeuAvatar({ src, alt = '', initials = 'P', size = 'md', className = '' }) {
  const sizes = { sm: 'h-10 w-10 text-xs', md: 'h-14 w-14 text-sm', lg: 'h-20 w-20 text-lg' }
  return (
    <div style={neuPalette} role="img" aria-label={alt || initials} className={`relative inline-flex shrink-0 rounded-full bg-[var(--neu-surface)] p-1.5 shadow-[7px_7px_14px_var(--neu-shadow-dark),-7px_-7px_14px_var(--neu-shadow-light)] ${className}`}>
      <div aria-hidden="true" className={`grid place-items-center overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--neu-surface)_94%,var(--neu-text))] font-extrabold text-[var(--neu-text)] shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)] ${sizes[size] || sizes.md}`}>
        {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <span>{initials}</span>}
      </div>
    </div>
  )
}

// Source slug: neu-input
// Adaptation: placeholder color mixes toward text to clear the recorded
// contrast finding on the indexed muted placeholder.
export function NeuInput({ label = 'Email address', hint, id = 'neu-input', className = '', ...props }) {
  return (
    <label htmlFor={id} style={neuPalette} className={`block w-full text-[var(--neu-text)] ${className}`}>
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <input
        id={id}
        className="min-h-11 w-full rounded-[14px] border-0 bg-[var(--neu-surface)] px-4 py-3 text-sm text-[var(--neu-text)] shadow-[inset_5px_5px_10px_var(--neu-shadow-dark),inset_-5px_-5px_10px_var(--neu-shadow-light)] outline-none placeholder:text-[color-mix(in_srgb,var(--neu-muted)_70%,var(--neu-text))] focus:ring-2 focus:ring-[var(--neu-accent)]"
        {...props}
      />
      {hint ? <span className="mt-2 block text-xs font-semibold text-[color-mix(in_srgb,var(--neu-muted)_65%,var(--neu-text))]">{hint}</span> : null}
    </label>
  )
}

// Source slug: neu-checkbox
export function NeuCheckbox({ label = 'Done', checked, defaultChecked = false, onChange, disabled = false, className = '' }) {
  const [internal, setInternal] = useState(defaultChecked)
  const active = checked ?? internal
  const change = (event) => {
    if (checked === undefined) setInternal(event.target.checked)
    onChange?.(event.target.checked, event)
  }
  return (
    <label style={neuPalette} className={`inline-flex cursor-pointer items-center gap-3 text-sm font-semibold text-[var(--neu-text)] ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
      <input className="peer sr-only" type="checkbox" checked={active} onChange={change} disabled={disabled} />
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[8px] bg-[var(--neu-surface)] text-transparent shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)] transition-colors peer-checked:bg-[var(--neu-accent)] peer-checked:text-[var(--neu-surface)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--neu-accent)]">
        <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-[2.5]" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>
      </span>
      {label}
    </label>
  )
}

// Source slug: neu-search-input
export function NeuSearchInput({ label = 'Search', buttonLabel = 'Search', onSubmit, className = '', ...props }) {
  const submit = (event) => {
    event.preventDefault()
    onSubmit?.(new FormData(event.currentTarget).get('query'), event)
  }
  return (
    <form onSubmit={submit} role="search" style={neuPalette} className={`flex w-full items-center gap-2 rounded-[18px] bg-[var(--neu-surface)] p-2 shadow-[inset_5px_5px_10px_var(--neu-shadow-dark),inset_-5px_-5px_10px_var(--neu-shadow-light)] ${className}`}>
      <svg viewBox="0 0 24 24" className="ml-2 h-5 w-5 shrink-0 fill-none stroke-[color-mix(in_srgb,var(--neu-muted)_70%,var(--neu-text))] stroke-2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
      <label className="sr-only" htmlFor="neu-search-query">{label}</label>
      <input id="neu-search-query" name="query" className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2 text-sm text-[var(--neu-text)] outline-none placeholder:text-[color-mix(in_srgb,var(--neu-muted)_70%,var(--neu-text))]" {...props} />
      <button type="submit" className="min-h-10 cursor-pointer rounded-[12px] bg-[var(--neu-surface)] px-4 text-sm font-bold text-[var(--neu-text)] shadow-[4px_4px_8px_var(--neu-shadow-dark),-4px_-4px_8px_var(--neu-shadow-light)] active:shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]">{buttonLabel}</button>
    </form>
  )
}
