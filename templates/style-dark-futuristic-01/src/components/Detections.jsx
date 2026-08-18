// First-party section. The rule file and incident readout are original
// Blacksite artwork: plain markup plus the shared reticle and terminal styles.

export default function Detections() {
  return (
    <section id="detections" className="section border-t border-white/8" data-reveal-group>
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">02 / Detections</p>
          <h2 className="section-title mt-4 text-white">A detection you can read, diff, and blame</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-mist">
            This is the entire rule that caught the exfil attempt in the demo
            above. No vendor DSL locked in a web console: it lives in git next
            to your infrastructure, reviewed like any other change.
          </p>
          <ul className="mt-7 space-y-3 p-0" style={{ listStyle: 'none' }}>
            <li className="spec-row">278 rules ship in the standard pack, all editable</li>
            <li className="spec-row">Dry-run any rule against 14 days of recorded traffic</li>
            <li className="spec-row">Confidence scores come from your baseline, not a vendor average</li>
          </ul>
        </div>
        <div className="reticle" data-reveal style={{ '--reveal-order': 1 }}>
          <i /><i /><i /><i />
          <pre className="rule-block m-0" aria-label="Example detection rule">
            <code>
              <span className="c"># rules/exfil/dns-tunnel.bsl</span>{'\n'}
              <span className="k">detection</span> <span className="s">"dns-tunnel-egress"</span> {'{'}{'\n'}
              {'  '}<span className="k">watch</span>     dns.query <span className="k">where</span> entropy(name) &gt; 4.2{'\n'}
              {'  '}<span className="k">join</span>      egress.bytes <span className="k">over</span> 90s{'\n'}
              {'  '}<span className="k">require</span>   deviation &gt; 6x baseline(host, hour){'\n'}
              {'  '}<span className="k">severity</span>  critical{'\n'}
              {'  '}<span className="k">respond</span>   quarantine(host), page(oncall){'\n'}
              {'  '}<span className="k">evidence</span>  pcap(-120s, +300s) <span className="k">sealed</span>{'\n'}
              {'}'}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
