// Adapted first-party primitives from sir-originals (mrkeyoor/sir-originals).
// Source slugs: clay-button, clay-card, clay-toggle, clay-slider, clay-progress,
// clay-stat-card, clay-pricing, clay-badge, clay-avatar, clay-input,
// clay-checkbox, clay-search-input. Every fill, highlight, and shadow derives
// from the --bw-* palette variables, so one palette re-themes the whole page.
import { useState } from 'react'

const clayPalette = {
  '--clay-accent': 'var(--bw-accent, #A78BFA)', '--clay-surface': 'var(--bw-surface, #FFF4FB)',
  '--clay-text': 'var(--bw-text, #31245C)', '--clay-muted': 'var(--bw-muted, #716381)',
  '--clay-pastel': 'color-mix(in srgb, var(--bw-accent, #A78BFA) 26%, var(--bw-surface, #FFF4FB))',
  '--clay-highlight': 'color-mix(in srgb, var(--bw-surface, #FFF4FB) 62%, white)',
  '--clay-shadow': 'color-mix(in srgb, var(--bw-accent, #A78BFA) 24%, black)',
}

// Source slug: clay-button
export function ClayButton({ children = 'Create magic', type = 'button', disabled = false, tone = 'violet', as, href, className = '', ...props }) {
  const tones = {
    violet: 'bg-[color-mix(in_srgb,var(--clay-accent)_58%,var(--clay-surface))]',
    coral: 'bg-[color-mix(in_srgb,var(--clay-accent)_40%,var(--clay-surface))]',
    mint: 'bg-[color-mix(in_srgb,var(--clay-accent)_24%,var(--clay-surface))]',
  }
  const classes = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[22px] border-[3px] border-[var(--clay-highlight)] px-7 py-3 font-display text-sm font-extrabold tracking-wide text-[var(--clay-text)] shadow-[inset_0_5px_4px_var(--clay-highlight),inset_0_-5px_5px_var(--clay-shadow),0_12px_22px_var(--clay-shadow)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-1 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--clay-accent)]/35 disabled:cursor-not-allowed disabled:opacity-50 ${tones[tone] || tones.violet} ${className}`
  if (as === 'a') {
    return <a href={href} style={clayPalette} className={classes} {...props}>{children}</a>
  }
  return <button type={type} disabled={disabled} style={clayPalette} className={classes} {...props}>{children}</button>
}

// Source slug: clay-card
// Adaptation: the emoji corner accent now accepts any node so inline SVG
// artwork can sit in the clay chip and inherit palette variables.
export function ClayCard({ eyebrow, title, children, accent, className = '' }) {
  return (
    <article style={clayPalette} className={`relative w-full overflow-hidden rounded-[36px] border-[4px] border-[var(--clay-highlight)] bg-[var(--clay-pastel)] p-8 text-[var(--clay-text)] shadow-[inset_0_7px_6px_var(--clay-highlight),inset_0_-9px_9px_var(--clay-shadow),0_22px_40px_var(--clay-shadow)] ${className}`}>
      {accent ? <span className="absolute -right-5 -top-7 grid h-28 w-28 rotate-12 place-items-center rounded-[38px] bg-[color-mix(in_srgb,var(--clay-accent)_38%,var(--clay-surface))] shadow-[inset_0_6px_5px_var(--clay-highlight),inset_0_-7px_7px_var(--clay-shadow),0_12px_20px_var(--clay-shadow)]" aria-hidden="true">{accent}</span> : null}
      {eyebrow ? <p className="relative text-xs font-black uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--clay-muted)_25%,var(--clay-text))]">{eyebrow}</p> : null}
      {title ? <h3 className={`relative mt-3 font-display text-2xl font-extrabold leading-[1.1] tracking-[-0.02em] ${accent ? 'pr-20' : ''}`}>{title}</h3> : null}
      <div className="relative mt-4 text-sm font-semibold leading-6 text-[color-mix(in_srgb,var(--clay-muted)_45%,var(--clay-text))]">{children}</div>
    </article>
  )
}

// Source slug: clay-toggle
export function ClayToggle({ label = 'Playful mode', checked, defaultChecked = true, onChange, disabled = false, className = '' }) {
  const [internal, setInternal] = useState(defaultChecked)
  const active = checked ?? internal
  const change = (event) => {
    if (checked === undefined) setInternal(event.target.checked)
    onChange?.(event.target.checked, event)
  }
  return (
    <label style={clayPalette} className={`inline-flex cursor-pointer items-center gap-3 text-sm font-black text-[var(--clay-text)] ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
      <input type="checkbox" className="peer sr-only" checked={active} onChange={change} disabled={disabled} />
      <span className="relative h-10 w-[4.5rem] shrink-0 rounded-[24px] border-[3px] border-[var(--clay-highlight)] bg-[var(--clay-pastel)] shadow-[inset_0_5px_5px_var(--clay-shadow),inset_0_-4px_5px_var(--clay-highlight),0_8px_15px_var(--clay-shadow)] transition-colors peer-checked:bg-[var(--clay-accent)] peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--clay-accent)]/35">
        <span className={`absolute top-1 h-6 w-6 rounded-full border-2 border-[var(--clay-highlight)] bg-[var(--clay-surface)] shadow-[inset_0_3px_3px_var(--clay-highlight),inset_0_-3px_3px_var(--clay-shadow),0_5px_8px_var(--clay-shadow)] transition-[left] duration-200 ${active ? 'left-10' : 'left-1'}`} />
      </span>
      {label}
    </label>
  )
}

// Source slug: clay-slider
export function ClaySlider({ label = 'Joy level', value = 82, min = 0, max = 100, onChange, showValue = true, className = '', ...props }) {
  const percent = Math.round(((Number(value) - min) / (max - min)) * 100)
  return (
    <label style={clayPalette} className={`block w-full text-[var(--clay-text)] ${className}`}>
      <span className="mb-4 flex items-center justify-between text-sm font-black">
        <span>{label}</span>
        {showValue ? <span className="rounded-[15px] border-2 border-[var(--clay-highlight)] bg-[color-mix(in_srgb,var(--clay-accent)_38%,var(--clay-surface))] px-3 py-1.5 shadow-[inset_0_3px_3px_var(--clay-highlight),inset_0_-3px_3px_var(--clay-shadow),0_6px_12px_var(--clay-shadow)]">{percent}%</span> : null}
      </span>
      <div className="rounded-[20px] border-[3px] border-[var(--clay-highlight)] bg-[var(--clay-pastel)] p-2 shadow-[inset_0_5px_5px_var(--clay-shadow),inset_0_-4px_4px_var(--clay-highlight),0_8px_16px_var(--clay-shadow)]">
        <input type="range" min={min} max={max} value={value} onChange={onChange} className="h-4 w-full cursor-pointer appearance-none rounded-full bg-[var(--clay-surface)] accent-[var(--clay-accent)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--clay-accent)]/30" {...props} />
      </div>
    </label>
  )
}

// Source slug: clay-progress
export function ClayProgress({ value = 64, max = 100, label = 'Progress', showValue = true, className = '' }) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)))
  const widths = ['w-0', 'w-[10%]', 'w-[20%]', 'w-[30%]', 'w-[40%]', 'w-[50%]', 'w-[60%]', 'w-[70%]', 'w-[80%]', 'w-[90%]', 'w-full']
  const widthClass = widths[Math.round(percent / 10)]
  return (
    <div style={clayPalette} className={`w-full text-[var(--clay-text)] ${className}`}>
      <div className="mb-3 flex items-center justify-between text-sm font-black"><span>{label}</span>{showValue ? <span>{percent}%</span> : null}</div>
      <div className="h-7 overflow-hidden rounded-[20px] border-[3px] border-[var(--clay-highlight)] bg-[var(--clay-pastel)] p-1.5 shadow-[inset_0_5px_5px_var(--clay-shadow),inset_0_-4px_4px_var(--clay-highlight),0_9px_16px_var(--clay-shadow)]" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <div className={`h-full rounded-full bg-[var(--clay-accent)] shadow-[inset_0_3px_3px_var(--clay-highlight),inset_0_-3px_3px_var(--clay-shadow),0_3px_6px_var(--clay-shadow)] transition-[width] duration-500 ${widthClass}`} />
      </div>
    </div>
  )
}

// Source slug: clay-stat-card
// Adaptation: the indexed muted label caused the recorded serious contrast
// finding; labels now mix strongly toward the text color.
export function ClayStatCard({ label = 'Happy learners', value = '0', change = '', icon, className = '' }) {
  return (
    <article style={clayPalette} className={`relative w-full overflow-hidden rounded-[34px] border-[4px] border-[var(--clay-highlight)] bg-[var(--clay-pastel)] p-7 text-[var(--clay-text)] shadow-[inset_0_7px_6px_var(--clay-highlight),inset_0_-8px_8px_var(--clay-shadow),0_20px_34px_var(--clay-shadow)] ${className}`}>
      {icon ? <span className="absolute -right-3 -top-4 grid h-20 w-20 rotate-6 place-items-center rounded-[28px] bg-[color-mix(in_srgb,var(--clay-accent)_38%,var(--clay-surface))] shadow-[inset_0_5px_4px_var(--clay-highlight),inset_0_-5px_5px_var(--clay-shadow),0_10px_16px_var(--clay-shadow)]" aria-hidden="true">{icon}</span> : null}
      <p className="text-sm font-black text-[color-mix(in_srgb,var(--clay-muted)_40%,var(--clay-text))]">{label}</p>
      <p className="mt-3 font-display text-4xl font-extrabold tracking-[-0.03em]">{value}</p>
      {change ? <span className="mt-5 inline-flex rounded-[15px] border-2 border-[var(--clay-highlight)] bg-[color-mix(in_srgb,var(--clay-accent)_44%,var(--clay-surface))] px-3 py-1.5 text-xs font-black text-[var(--clay-text)] shadow-[inset_0_3px_3px_var(--clay-highlight),inset_0_-3px_3px_var(--clay-shadow),0_6px_10px_var(--clay-shadow)]">{change}</span> : null}
    </article>
  )
}

// Source slug: clay-pricing
// Adaptation: muted description and period mix toward text for contrast.
export function ClayPricing({ name = 'Playhouse', price = '$29', period = '/month', description = '', features = [], cta = 'Join the fun', onSelect, featured = false, badge = 'Family favorite', className = '' }) {
  return (
    <article style={clayPalette} className={`relative w-full rounded-[40px] border-[4px] border-[var(--clay-highlight)] bg-[var(--clay-pastel)] p-8 text-[var(--clay-text)] shadow-[inset_0_8px_7px_var(--clay-highlight),inset_0_-10px_10px_var(--clay-shadow),0_24px_42px_var(--clay-shadow)] ${featured ? 'lg:-translate-y-3' : ''} ${className}`}>
      {featured ? <span className="absolute -right-3 -top-4 rotate-3 rounded-[18px] border-[3px] border-[var(--clay-highlight)] bg-[color-mix(in_srgb,var(--clay-accent)_40%,var(--clay-surface))] px-4 py-2 text-xs font-black text-[var(--clay-text)] shadow-[inset_0_4px_3px_var(--clay-highlight),inset_0_-4px_4px_var(--clay-shadow),0_9px_14px_var(--clay-shadow)]">{badge}</span> : null}
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--clay-muted)_45%,var(--clay-text))]">{name}</p>
      <div className="mt-4 flex items-end gap-1"><span className="font-display text-5xl font-extrabold tracking-[-0.04em]">{price}</span><span className="pb-1 text-sm font-bold text-[color-mix(in_srgb,var(--clay-muted)_45%,var(--clay-text))]">{period}</span></div>
      <p className="mt-4 text-sm font-semibold leading-6 text-[color-mix(in_srgb,var(--clay-muted)_45%,var(--clay-text))]">{description}</p>
      <ul className="my-7 space-y-3 text-sm font-bold">
        {features.map((feature) => <li key={feature} className="flex items-center gap-3"><span className="grid h-7 w-7 shrink-0 rotate-[-4deg] place-items-center rounded-[11px] bg-[var(--clay-accent)] text-[var(--clay-surface)] shadow-[inset_0_3px_3px_var(--clay-highlight),inset_0_-3px_3px_var(--clay-shadow),0_5px_9px_var(--clay-shadow)]">✓</span>{feature}</li>)}
      </ul>
      <button type="button" onClick={onSelect} className="min-h-13 w-full cursor-pointer rounded-[24px] border-[3px] border-[var(--clay-highlight)] bg-[color-mix(in_srgb,var(--clay-accent)_46%,var(--clay-surface))] px-5 py-3 font-display font-extrabold text-[var(--clay-text)] shadow-[inset_0_5px_4px_var(--clay-highlight),inset_0_-5px_5px_var(--clay-shadow),0_12px_20px_var(--clay-shadow)] transition-transform hover:-translate-y-0.5 active:translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--clay-accent)]/30">{cta}</button>
    </article>
  )
}

// Source slug: clay-badge
export function ClayBadge({ children = 'New', icon = '✦', tone = 'peach', className = '' }) {
  const tones = {
    peach: 'bg-[color-mix(in_srgb,var(--clay-accent)_38%,var(--clay-surface))]',
    berry: 'bg-[color-mix(in_srgb,var(--clay-accent)_26%,var(--clay-surface))]',
    mint: 'bg-[color-mix(in_srgb,var(--clay-accent)_50%,var(--clay-surface))]',
  }
  return <span style={clayPalette} className={`inline-flex items-center gap-2 rounded-[18px] border-[3px] border-[var(--clay-highlight)] px-4 py-2 text-xs font-black text-[var(--clay-text)] shadow-[inset_0_4px_3px_var(--clay-highlight),inset_0_-4px_4px_var(--clay-shadow),0_8px_14px_var(--clay-shadow)] ${tones[tone] || tones.peach} ${className}`}><span aria-hidden="true">{icon}</span>{children}</span>
}

// Source slug: clay-avatar
// Adaptation: the indexed aria-label on a plain span produced the recorded
// aria-prohibited-attr finding; the accessible name now lives on the wrapper
// via role="img" and the initials are presentational.
export function ClayAvatar({ src, alt = '', initials = 'PB', size = 'md', color = 'violet', className = '' }) {
  const sizes = { sm: 'h-11 w-11 text-xs', md: 'h-[4.5rem] w-[4.5rem] text-lg', lg: 'h-28 w-28 text-2xl' }
  const colors = { violet: 'bg-[color-mix(in_srgb,var(--clay-accent)_34%,var(--clay-surface))]', peach: 'bg-[color-mix(in_srgb,var(--clay-accent)_46%,var(--clay-surface))]', mint: 'bg-[color-mix(in_srgb,var(--clay-accent)_58%,var(--clay-surface))]' }
  return (
    <div style={clayPalette} role="img" aria-label={alt || initials} className={`relative inline-flex shrink-0 rounded-[30%] border-[4px] border-[var(--clay-highlight)] bg-[color-mix(in_srgb,var(--clay-accent)_18%,var(--clay-surface))] p-2 text-[var(--clay-text)] shadow-[inset_0_5px_4px_var(--clay-highlight),inset_0_-5px_5px_var(--clay-shadow),0_14px_24px_var(--clay-shadow)] ${className}`}>
      <div aria-hidden="true" className={`grid place-items-center overflow-hidden rounded-[26%] border-2 border-[var(--clay-highlight)] font-black shadow-[inset_0_4px_4px_var(--clay-highlight),inset_0_-4px_4px_var(--clay-shadow)] ${sizes[size] || sizes.md} ${colors[color] || colors.violet}`}>
        {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <span>{initials}</span>}
      </div>
    </div>
  )
}

// Source slug: clay-input
export function ClayInput({ label = 'Your email', hint, id = 'clay-input', className = '', ...props }) {
  return (
    <label htmlFor={id} style={clayPalette} className={`block w-full text-[var(--clay-text)] ${className}`}>
      <span className="mb-2.5 block pl-2 text-sm font-black">{label}</span>
      <input id={id} className="min-h-13 w-full rounded-[22px] border-[3px] border-[var(--clay-highlight)] bg-[color-mix(in_srgb,var(--clay-accent)_14%,var(--clay-surface))] px-5 py-3.5 text-sm font-bold text-[var(--clay-text)] shadow-[inset_0_6px_6px_var(--clay-shadow),inset_0_-5px_5px_var(--clay-highlight),0_10px_20px_var(--clay-shadow)] outline-none placeholder:text-[color-mix(in_srgb,var(--clay-muted)_55%,var(--clay-text))] focus:ring-4 focus:ring-[var(--clay-accent)]/30" {...props} />
      {hint ? <span className="mt-2 block pl-2 text-xs font-bold text-[color-mix(in_srgb,var(--clay-muted)_45%,var(--clay-text))]">{hint}</span> : null}
    </label>
  )
}

// Source slug: clay-checkbox
export function ClayCheckbox({ label = 'Done', checked, defaultChecked = false, onChange, disabled = false, className = '' }) {
  const [internal, setInternal] = useState(defaultChecked)
  const active = checked ?? internal
  const change = (event) => {
    if (checked === undefined) setInternal(event.target.checked)
    onChange?.(event.target.checked, event)
  }
  return (
    <label style={clayPalette} className={`inline-flex cursor-pointer items-center gap-3 text-sm font-black text-[var(--clay-text)] ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
      <input type="checkbox" className="peer sr-only" checked={active} onChange={change} disabled={disabled} />
      <span className="grid h-8 w-8 shrink-0 rotate-[-3deg] place-items-center rounded-[12px] border-[3px] border-[var(--clay-highlight)] bg-[color-mix(in_srgb,var(--clay-accent)_22%,var(--clay-surface))] text-transparent shadow-[inset_0_4px_3px_var(--clay-highlight),inset_0_-4px_4px_var(--clay-shadow),0_7px_12px_var(--clay-shadow)] transition-[background-color,color,transform] peer-checked:rotate-3 peer-checked:bg-[var(--clay-accent)] peer-checked:text-[var(--clay-surface)] peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--clay-accent)]/30">
        <svg viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-[3]" aria-hidden="true"><path d="m3.5 10 4 4 9-9" /></svg>
      </span>
      {label}
    </label>
  )
}

// Source slug: clay-search-input
export function ClaySearchInput({ label = 'Search', buttonLabel = 'Go', onSubmit, className = '', ...props }) {
  const submit = (event) => {
    event.preventDefault()
    onSubmit?.(new FormData(event.currentTarget).get('query'), event)
  }
  return (
    <form onSubmit={submit} role="search" style={clayPalette} className={`flex w-full items-center gap-2 rounded-[28px] border-[4px] border-[var(--clay-highlight)] bg-[color-mix(in_srgb,var(--clay-accent)_14%,var(--clay-surface))] p-2.5 text-[var(--clay-text)] shadow-[inset_0_6px_6px_var(--clay-shadow),inset_0_-5px_5px_var(--clay-highlight),0_16px_28px_var(--clay-shadow)] ${className}`}>
      <span className="ml-2 text-xl" aria-hidden="true">⌕</span>
      <label className="sr-only" htmlFor="clay-search-query">{label}</label>
      <input id="clay-search-query" name="query" className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2.5 text-sm font-bold text-[var(--clay-text)] outline-none placeholder:text-[color-mix(in_srgb,var(--clay-muted)_55%,var(--clay-text))]" {...props} />
      <button type="submit" className="min-h-11 cursor-pointer rounded-[20px] border-[3px] border-[var(--clay-highlight)] bg-[var(--clay-accent)] px-5 text-sm font-black text-[var(--clay-surface)] shadow-[inset_0_4px_3px_var(--clay-highlight),inset_0_-4px_4px_var(--clay-shadow),0_8px_13px_var(--clay-shadow)] active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--clay-accent)]/30">{buttonLabel}</button>
    </form>
  )
}
