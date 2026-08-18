// Source slug: hyperui-faq-1
// Author repo: https://github.com/markmead/hyperui

import { Plus } from './Icons.jsx'

const items = [
  ['Does Boardwatch replace our issue tracker?', 'No. Your team keeps working in GitHub, Linear, and PagerDuty. Boardwatch is the operating layer that connects those systems and highlights material change.'],
  ['How does Boardwatch access our data?', 'Connections start in read-only mode and request only the scopes needed to assemble delivery signals. Workspace admins can review and revoke every connection.'],
  ['Is this an individual developer score?', 'Never. Boardwatch measures flow through the delivery system-review age, blocked work, scope change, and release health. It does not rank people or track keystrokes.'],
  ['What happens after the 14-day trial?', 'Choose Team or Studio to keep the workspace active. If you do nothing, collection stops and your connected tools remain untouched.'],
  ['Can we define our own watch signals?', 'Studio workspaces can tune thresholds by team and workflow. Boardwatch also records why a signal fired, so teams can calibrate it over time.'],
]

export default function Faq() {
  return (
    <section id="faq" className="section border-b border-white/8" data-reveal-group>
      <div className="shell grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow">The fine print</div>
          <h2 className="section-title mt-6">Questions,<br />answered plainly.</h2>
          <p className="mt-6 max-w-sm text-sm leading-6 text-mist">Need a security review or a data-flow diagram? Write to <a className="text-white underline decoration-accent/50 underline-offset-4" href="mailto:security@boardwatch.dev">security@boardwatch.dev</a>.</p>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10" data-reveal style={{ '--reveal-order': 1 }}>
          {items.map(([question, answer], index) => (
            <details key={question} className="faq-item group" open={index === 0}>
              <summary>
                <span>{question}</span>
                <Plus className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
