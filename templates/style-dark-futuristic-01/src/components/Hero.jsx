// Source slugs: tailark-dusk-hero-section-3, motion-primitives-text-scramble, magicui-flickering-grid
// Author repos: https://github.com/tailark/blocks, https://github.com/ibelick/motion-primitives,
//               https://github.com/magicuidesign/magicui
// Layout skeleton from the dusk hero; scramble headline and flicker field are
// the adapted effects; the live intrusion terminal is first-party.

import { FlickerGrid, TextScramble } from './Effects.jsx'

const feed = [
  { t: '14:02:11', level: 'ok', text: 'sensor eu-fra-2 heartbeat, 4.1M pkts inspected' },
  { t: '14:02:14', level: 'ok', text: 'baseline recomputed for vpc-payments, drift 0.3%' },
  { t: '14:02:19', level: 'warn', text: 'dns tunnel signature matched on host db-relay-04' },
  { t: '14:02:19', level: 'warn', text: 'correlating with egress burst, window 90s' },
  { t: '14:02:23', level: 'crit', text: 'INTRUSION NAMED: exfil-attempt #4127, confidence 0.97' },
  { t: '14:02:23', level: 'crit', text: 'quarantine rule pushed to 3 sensors, on-call paged' },
  { t: '14:02:41', level: 'ok', text: 'host isolated, full pcap sealed for forensics' },
]

export default function Hero() {
  return (
    <section id="top" className="hero" data-reveal-group>
      <FlickerGrid className="flicker-grid" />
      <div className="shell relative grid items-center gap-14 pt-40 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:pt-48 lg:pb-32">
        <div>
          <p className="eyebrow" data-reveal style={{ '--reveal-order': 0 }}>Wire-level security monitoring</p>
          <h1 className="display mt-6 text-white" data-reveal style={{ '--reveal-order': 1 }}>
            <TextScramble text="Name the breach" />
            <br />
            <span className="text-accent"><TextScramble text="in 41 seconds." /></span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-mist" data-reveal style={{ '--reveal-order': 2 }}>
            Blacksite taps your network at the wire, holds a rolling baseline of
            normal, and turns raw packets into named, evidenced intrusions
            before your attacker finishes recon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal style={{ '--reveal-order': 3 }}>
            <a href="#cta" className="button">Request clearance</a>
            <a href="#detections" className="button button-ghost">Read a detection</a>
          </div>
          <p className="mt-8 text-[0.65rem] uppercase tracking-[0.18em] text-mist" data-reveal style={{ '--reveal-order': 4 }}>
            Self-hosted or managed / SOC 2 Type II / zero packets leave your VPC
          </p>
        </div>

        <div className="reticle" data-reveal style={{ '--reveal-order': 3 }}>
          <i /><i /><i /><i />
          <figure className="terminal m-0">
            <figcaption className="terminal-bar">
              <span>blacksite console / live feed</span>
              <span className="text-accent">armed</span>
            </figcaption>
            <div className="terminal-body" role="log" aria-label="Example intrusion timeline">
              {feed.map(({ t, level, text }) => (
                <p key={t + text} className={`term-line m-0 term-${level}`}>
                  <time>{t}</time>
                  <span className="overflow-hidden text-ellipsis">{text}</span>
                </p>
              ))}
              <p className="term-line m-0 term-ok">
                <time>14:02:44</time>
                <span>awaiting next event<span className="term-cursor" aria-hidden="true" /></span>
              </p>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
