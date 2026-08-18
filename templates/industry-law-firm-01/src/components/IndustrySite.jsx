import { useEffect, useState } from 'react'

function RevealController() {
  useEffect(() => {
    const items = [...document.querySelectorAll('[data-reveal]')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return null
}

function IndustryArt({ kind, label }) {
  if (kind === 'law') return <svg className="hero-art" viewBox="0 0 720 760" role="img" aria-label="Abstract legal archive with balanced brass circles">
    <rect width="720" height="760" rx="40" fill="var(--bw-text)"/><path d="M110 88H610M110 672H610" stroke="var(--bw-accent)" strokeWidth="2"/><circle cx="360" cy="280" r="150" fill="none" stroke="var(--bw-accent)" strokeWidth="3"/><path d="M360 130V510M220 250H500M275 250 220 382H330L275 250Zm170 0-55 132h110l-55-132Z" fill="none" stroke="var(--bw-surface)" strokeWidth="8" strokeLinejoin="round"/><path d="M290 510H430M325 470H395" stroke="var(--bw-accent)" strokeWidth="18"/><text x="110" y="625" fill="var(--bw-surface)" fontFamily="Georgia,serif" fontSize="40">{label}</text>
  </svg>
  if (kind === 'hotel') return <svg className="hero-art" viewBox="0 0 720 760" role="img" aria-label="Illustrated boutique hotel facade among juniper branches">
    <rect width="720" height="760" rx="40" fill="color-mix(in srgb,var(--bw-accent) 20%,var(--bw-surface))"/><path d="M175 250 360 118 545 250V640H175Z" fill="var(--bw-text)"/><path d="M220 300H500M220 420H500" stroke="var(--bw-surface)" strokeWidth="8"/><g fill="var(--bw-accent)"><rect x="230" y="325" width="75" height="70" rx="35"/><rect x="415" y="325" width="75" height="70" rx="35"/><rect x="230" y="455" width="75" height="70" rx="35"/><rect x="415" y="455" width="75" height="70" rx="35"/></g><path d="M320 640V515Q360 470 400 515V640" fill="var(--bw-surface)"/><g fill="none" stroke="var(--bw-accent)" strokeWidth="10" strokeLinecap="round"><path d="M80 680Q90 430 210 220M640 680Q620 430 525 215"/><path d="M105 540 55 485M120 475l-60-32M145 400l-55-50M595 540l65-55M580 460l75-25M560 390l62-55"/></g><text x="360" y="705" textAnchor="middle" fill="var(--bw-text)" fontFamily="Georgia,serif" fontSize="34">{label}</text>
  </svg>
  if (kind === 'construction') return <svg className="hero-art" viewBox="0 0 720 760" role="img" aria-label="Architectural construction grid with a bold structural frame">
    <rect width="720" height="760" rx="40" fill="var(--bw-text)"/><g stroke="var(--bw-surface)" strokeWidth="1" opacity=".16">{Array.from({length:10},(_,i)=><path key={`v${i}`} d={`M${70+i*65} 60V700`}/>)}{Array.from({length:10},(_,i)=><path key={`h${i}`} d={`M50 ${90+i*62}H670`}/>)}</g><path d="M130 620V255L360 125l230 130v365M130 410H590M250 620V305M470 620V305" fill="none" stroke="var(--bw-accent)" strokeWidth="24" strokeLinejoin="round"/><path d="m160 620 200-210 200 210" fill="none" stroke="var(--bw-surface)" strokeWidth="8"/><text x="360" y="690" textAnchor="middle" fill="var(--bw-surface)" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="30" letterSpacing="6">{label}</text>
  </svg>
  return <svg className="hero-art" viewBox="0 0 720 760" role="img" aria-label="River channels flowing toward a clean water well">
    <rect width="720" height="760" rx="40" fill="color-mix(in srgb,var(--bw-accent) 12%,var(--bw-surface))"/><circle cx="360" cy="335" r="145" fill="var(--bw-accent)" opacity=".14"/><path d="M65 120C190 190 130 300 285 340S480 305 655 125M65 230C195 285 190 420 320 435s210-90 335-35M65 530c140-75 220 45 330 28s150-95 260-65" fill="none" stroke="var(--bw-accent)" strokeWidth="18" strokeLinecap="round"/><path d="M285 350h150v205H285z" fill="var(--bw-text)"/><path d="M265 350h190l-95-90Z" fill="var(--bw-text)"/><circle cx="360" cy="447" r="40" fill="var(--bw-surface)"/><path d="M360 411c-22 31-30 44-30 58a30 30 0 0 0 60 0c0-14-8-27-30-58Z" fill="var(--bw-accent)"/><text x="360" y="675" textAnchor="middle" fill="var(--bw-text)" fontFamily="Georgia,serif" fontSize="34">{label}</text>
  </svg>
}

// Source slug: hyperui-headers-4
// Author repo: https://github.com/markmead/hyperui
function Header({ profile }) {
  const [open, setOpen] = useState(false)
  const links = [['Services', '#services'], [profile.proofLabel, '#proof'], [profile.featureLabel, '#feature'], ['Contact', '#contact']]
  return <header className="site-header"><div className="shell nav-row"><a className="brand" href="#top" aria-label={`${profile.name} home`}><span>{profile.monogram}</span><strong>{profile.name}<small>{profile.category}</small></strong></a><nav className="desktop-nav" aria-label="Primary navigation">{links.map(([text, href]) => <a key={href} href={href}>{text}</a>)}</nav><a className="nav-cta desktop-cta" href="#contact">{profile.headerCta}</a><button className="menu" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button></div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([text, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{text}</a>)}<a href="#contact" onClick={() => setOpen(false)}>{profile.headerCta}</a></nav>}</header>
}

// Source slug: meraki-hero-side-image
// Author repo: https://github.com/merakiui/merakiui
function Hero({ profile }) { return <section id="top" className="hero shell"><div className="hero-copy" data-reveal><p className="eyebrow">{profile.eyebrow}</p><h1>{profile.headline}</h1><p className="hero-lede">{profile.lede}</p><div className="button-row"><a className="button" href="#contact">{profile.primaryCta} <span>↗</span></a><a className="text-link" href="#services">Explore {profile.serviceNoun} <span>↓</span></a></div><div className="trust-note"><strong>{profile.trustTitle}</strong><span>{profile.trustCopy}</span></div></div><div className="art-wrap" data-reveal><IndustryArt kind={profile.artKind} label={profile.artLabel}/><span className="art-tag">{profile.artTag}</span></div></section> }

// Source slug: hyperui-feature-grids-2
// Author repo: https://github.com/markmead/hyperui
function Services({ profile }) { return <section id="services" className="section paper"><div className="shell"><div className="section-intro" data-reveal><p className="eyebrow">{profile.servicesEyebrow}</p><h2>{profile.servicesTitle}</h2><p>{profile.servicesIntro}</p></div><div className="service-grid">{profile.services.map((item, index) => <article key={item.title} data-reveal><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p><strong>{item.meta}</strong></article>)}</div></div></section> }

// Source slug: meraki-testimonials-full-page-cards
// Author repo: https://github.com/merakiui/merakiui
function Proof({ profile }) { return <section id="proof" className="section proof"><div className="shell"><div className="proof-head" data-reveal><p className="eyebrow">{profile.proofEyebrow}</p><h2>{profile.proofTitle}</h2><p>{profile.proofIntro}</p></div><div className="stat-grid">{profile.stats.map((item) => <article key={item.label} data-reveal><strong>{item.value}</strong><span>{item.label}</span></article>)}</div><blockquote data-reveal>“{profile.quote}”<footer><strong>{profile.quoteName}</strong><span>{profile.quoteRole}</span></footer></blockquote></div></section> }

// Source slug: tripled-gallery-grid-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
function Feature({ profile }) { return <section id="feature" className="section feature"><div className="shell feature-grid"><div data-reveal><p className="eyebrow">{profile.featureEyebrow}</p><h2>{profile.featureTitle}</h2><p className="feature-copy">{profile.featureCopy}</p><a className="text-link" href="#contact">{profile.featureCta} <span>↗</span></a></div><div className="feature-card" data-reveal><div className="feature-card-head"><span>{profile.featureCardLabel}</span><strong>{profile.featureCardMeta}</strong></div>{profile.featureItems.map((item, index) => <div className="feature-row" key={item.title}><span>0{index + 1}</span><p><strong>{item.title}</strong>{item.copy}</p></div>)}</div></div></section> }

// Source slug: hyperui-contact-forms-2
// Author repo: https://github.com/markmead/hyperui
function Contact({ profile }) { return <section id="contact" className="section contact"><div className="shell contact-grid"><div data-reveal><p className="eyebrow">{profile.contactEyebrow}</p><h2>{profile.contactTitle}</h2><p>{profile.contactCopy}</p><div className="button-row"><a className="button button-light" href={`mailto:${profile.email}`}>{profile.contactCta} <span>↗</span></a><a className="text-link light-link" href={`tel:${profile.phoneHref}`}>{profile.phone}</a></div></div><aside data-reveal><span>{profile.contactCardLabel}</span><strong>{profile.address}</strong><p>{profile.hours}</p><a href={`mailto:${profile.email}`}>{profile.email}</a></aside></div></section> }

// Source slug: hyperui-footers-2
// Author repo: https://github.com/markmead/hyperui
function Footer({ profile }) { return <footer className="footer"><div className="shell footer-grid"><div className="brand footer-brand"><span>{profile.monogram}</span><strong>{profile.name}<small>{profile.category}</small></strong></div><p>{profile.footerLine}</p><nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#proof">{profile.proofLabel}</a><a href="#contact">Contact</a></nav></div><div className="shell legal"><span>© 2026 {profile.name}. Fictional business.</span><span>{profile.legalLine}</span></div></footer> }

export default function IndustrySite({ profile }) { return <div className={`site ${profile.artKind}`}><RevealController/><Header profile={profile}/><main><Hero profile={profile}/><Services profile={profile}/><Proof profile={profile}/><Feature profile={profile}/><Contact profile={profile}/></main><Footer profile={profile}/></div> }
