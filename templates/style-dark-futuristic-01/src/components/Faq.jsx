// Source slug: tailark-dusk-faqs-1
// Author repo: https://github.com/tailark/blocks
// Accordion structure from the dusk FAQ, rendered with native details/summary
// instead of the Radix dependency to keep the bundle flat.

const faqs = [
  {
    q: 'Does any traffic leave our network?',
    a: 'No. Sensors, the analysis engine, and the console all run inside your perimeter. Managed plans operate the same software in your cloud account; Blacksite staff get audited, time-boxed access you grant per incident. Nothing is mirrored to us.',
  },
  {
    q: 'What does a sensor cost the host it runs on?',
    a: 'Sensors run on dedicated capture hosts, not on your workloads. A single 8-core box keeps up with 2.1M events per second. On the workloads themselves Blacksite installs nothing at all.',
  },
  {
    q: 'How is this different from our SIEM?',
    a: 'A SIEM sees what your systems choose to log, and attackers turn logging off first. Blacksite watches the wire, which cannot be silenced from a compromised host. Most customers keep their SIEM and feed it our named intrusions.',
  },
  {
    q: 'Can we write our own detections?',
    a: 'Yes, and you are expected to. Rules are plain text in your repository with dry-run against recorded traffic, so you can test a rule against last week before it pages anyone.',
  },
  {
    q: 'What compliance evidence do you produce?',
    a: 'Every incident ships with a sealed, hashed packet capture and a signed timeline. Auditors get evidence, not screenshots. Blacksite itself holds SOC 2 Type II and supports FIPS-mode deployments.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="section border-t border-white/8" data-reveal-group>
      <div className="shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">05 / FAQ</p>
          <h2 className="section-title mt-4 text-white">Asked by every security lead we meet</h2>
          <p className="mt-5 max-w-xs text-sm leading-7 text-mist">
            Anything else, ask the team directly. A human answers within one
            business day.
          </p>
        </div>
        <div data-reveal style={{ '--reveal-order': 1 }}>
          {faqs.map(({ q, a }) => (
            <details key={q} className="faq-item">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
