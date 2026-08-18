export function ArrowUpRight({ className = 'size-4' }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17 17 7M8 7h9v9" /></svg>
}

export function ArrowRight({ className = 'size-4' }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M14 7l5 5-5 5" /></svg>
}

export function Check({ className = 'size-4' }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6" /></svg>
}

export function Plus({ className = 'size-5' }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14" /></svg>
}

export function Mark({ className = 'size-8' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="7" stroke="currentColor" strokeWidth="2" />
      <path d="M9 10h8.5a5.5 5.5 0 0 1 0 11H9V10Z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 16h9" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function Pulse({ className = 'size-5' }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12h4l2.3-6 4.2 12 2.2-6H21" /></svg>
}

export function Branch({ className = 'size-5' }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="6" cy="5" r="2"/><circle cx="18" cy="7" r="2"/><circle cx="6" cy="19" r="2"/><path d="M6 7v10M8 9c4 0 3-2 8-2" /></svg>
}

export function Shield({ className = 'size-5' }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 5 6v5c0 4.6 2.8 8.2 7 10 4.2-1.8 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5" /></svg>
}
