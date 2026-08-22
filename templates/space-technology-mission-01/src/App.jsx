import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import SpaceScene from "./SpaceScene.jsx";
const events = [
  {
    name: "Ignition",
    met: "T+00:00",
    code: "LV / ASCENT",
    note: "Launch vehicle clears the atmosphere with spacecraft systems inhibited.",
  },
  {
    name: "Separation",
    met: "T+09:42",
    code: "SC / FREE",
    note: "The bus separates, acquires sun and begins autonomous commissioning.",
  },
  {
    name: "Array deploy",
    met: "T+11:08",
    code: "PWR / NOMINAL",
    note: "Copper-cell wings unfold and power margin becomes positive.",
  },
  {
    name: "Imaging pass",
    met: "T+2D 04H",
    code: "PAY / ACTIVE",
    note: "Payload opens its first 18-kilometre observation swath.",
  },
];
export default function App() {
  const sequence = useRef(null);
  const [event, setEvent] = useState(0),
    [orbit, setOrbit] = useState("Sun-synchronous 525 km"),
    [payload, setPayload] = useState("Multispectral 8-band"),
    [priority, setPriority] = useState("Revisit frequency"),
    [error, setError] = useState(""),
    [sent, setSent] = useState(false);
  useEffect(() => {
    let f = 0;
    const update = () => {
      f = 0;
      const el = sequence.current;
      if (
        !el ||
        innerWidth < 901 ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      setEvent(
        Math.max(
          0,
          Math.min(
            1,
            (scrollY - el.offsetTop) / (el.offsetHeight - innerHeight),
          ),
        ),
      );
    };
    const scroll = () => {
      if (!f) f = requestAnimationFrame(update);
    };
    addEventListener("scroll", scroll, { passive: true });
    update();
    return () => removeEventListener("scroll", scroll);
  }, []);
  const index = Math.min(3, Math.round(event * 3)),
    current = events[index],
    mission = useMemo(
      () =>
        `AO-${orbit.includes("525") ? "SSO" : "LEO"}-${payload.includes("8") ? "MS8" : "TH1"}`,
      [orbit, payload],
    );
  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      setError(
        "Add your name, organisation, valid email and illustrative-concept acknowledgement.",
      );
      f.querySelector(":invalid")?.focus();
      return;
    }
    setError("");
    setSent(true);
  };
  return (
    <>
      <header className="mast">
        <a href="#top">APERTURE / ORBITAL</a>
        <p>
          <i /> MISSION SYSTEMS ONLINE
        </p>
        <nav aria-label="Primary">
          <a href="#coverage">Coverage</a>
          <a href="#platform">Platform</a>
          <a href="#concept">Concept</a>
        </nav>
        <a href="#concept">Start concept ↘</a>
      </header>
      <main id="top">
        <section
          className="sequence"
          ref={sequence}
          aria-labelledby="hero-title"
        >
          <div className="sequence-sticky">
            <div
              className="space-view"
              role="img"
              aria-label={`Three-dimensional spacecraft mission event: ${current.name}`}
            >
              <SpaceScene event={event} />
              <div className="reticle" aria-hidden="true" />
            </div>
            <div className="mission-title">
              <p>AO–1 EARTH OBSERVATION PLATFORM</p>
              <h1 id="hero-title">
                FROM HARDWARE
                <br />
                TO A WORKING
                <br />
                <em>POINT OF VIEW.</em>
              </h1>
            </div>
            <aside className="event-readout" aria-live="polite">
              <span>MISSION ELAPSED TIME</span>
              <strong>{current.met}</strong>
              <b>{current.code}</b>
              <h2>{current.name}</h2>
              <p>{current.note}</p>
            </aside>
            <div className="event-rail" role="group" aria-label="Mission event">
              {events.map((x, i) => (
                <button
                  data-qa-action="mission-event"
                  aria-pressed={index === i}
                  onClick={() => setEvent(i / 3)}
                  key={x.name}
                >
                  <span>0{i + 1}</span>
                  <strong>{x.name}</strong>
                  <small>{x.met}</small>
                </button>
              ))}
            </div>
            <div className="systems">
              <span>
                EPS <b>NOMINAL</b>
              </span>
              <span>
                ADCS <b>LOCKED</b>
              </span>
              <span>
                COMMS <b>AOS +04</b>
              </span>
              <span>
                THERMAL <b>22.4°C</b>
              </span>
            </div>
          </div>
        </section>
        <figure className="orbit-proof">
          <img
            src="assets/editorial/space-orbit.webp"
            alt="Fictional Earth-observation spacecraft imaging above the blue atmospheric limb"
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
          />
          <figcaption>IMAGING PASS / FICTIONAL PLATFORM / AO—1</figcaption>
        </figure>
        <section
          id="coverage"
          className="coverage"
          aria-labelledby="coverage-title"
        >
          <header>
            <p>02 / COVERAGE PASS</p>
            <h2 id="coverage-title">
              AN ORBIT BECOMES
              <br />A REPEATABLE VIEW.
            </h2>
          </header>
          <div className="ground-strip">
            <div className="continents" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="orbit-line">
              <b style={{ left: `${12 + index * 23}%` }} />
            </div>
            <span>PASS 042 / DESCENDING</span>
            <span>18 KM SWATH / 0.9 M GSD</span>
          </div>
          <aside>
            <strong>{index === 3 ? "ACTIVE" : "STANDBY"}</strong>
            <p>Illustrative imaging state</p>
            <dl>
              <div>
                <dt>Revisit</dt>
                <dd>1.8 days</dd>
              </div>
              <div>
                <dt>Downlink</dt>
                <dd>2.4 Gbps</dd>
              </div>
              <div>
                <dt>Cloud model</dt>
                <dd>Priority queue</dd>
              </div>
            </dl>
          </aside>
        </section>
        <section
          id="platform"
          className="platform"
          aria-labelledby="platform-title"
        >
          <header>
            <p>03 / PAYLOAD BUS</p>
            <h2 id="platform-title">
              A SMALL BUS.
              <br />A PRECISE ENVELOPE.
            </h2>
          </header>
          <div className="exploded-bus">
            <div className="module solar">SOLAR / 1.8 KW</div>
            <div className="module payload">PAYLOAD / 42 KG</div>
            <div className="module core">BUS / 148 KG</div>
            <div className="module comms">X-BAND / 2.4 GBPS</div>
          </div>
          <dl>
            <div>
              <dt>Dry mass</dt>
              <dd>148 kg</dd>
            </div>
            <div>
              <dt>Payload power</dt>
              <dd>620 W peak</dd>
            </div>
            <div>
              <dt>Pointing</dt>
              <dd>&lt;0.02°</dd>
            </div>
            <div>
              <dt>Design life</dt>
              <dd>5 years</dd>
            </div>
          </dl>
        </section>
        <section className="network" aria-labelledby="network-title">
          <header>
            <p>04 / GROUND NETWORK</p>
            <h2 id="network-title">
              THE MISSION CONTINUES
              <br />
              BELOW THE HORIZON.
            </h2>
          </header>
          <figure className="control-proof">
            <img
              src="assets/editorial/mission-control.webp"
              alt="Mission operator at illuminated consoles during a night ground-station handoff"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <figcaption>GROUND HANDOFF / NIGHT SHIFT / FICTIONAL OPERATIONS</figcaption>
          </figure>
          <div className="station-line">
            {[
              ["SVA", "Svalbard", "AOS 04:12"],
              ["MTR", "Matera", "AOS 11:48"],
              ["PUN", "Punta Arenas", "AOS 19:06"],
              ["PER", "Perth", "AOS 27:31"],
            ].map((x, i) => (
              <article key={x[0]}>
                <span>0{i + 1}</span>
                <strong>{x[0]}</strong>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
                <i />
              </article>
            ))}
          </div>
        </section>
        <section className="programme" aria-labelledby="programme-title">
          <header>
            <p>05 / PROGRAMME CLOCK</p>
            <h2 id="programme-title">
              EVIDENCE AT
              <br />
              MISSION SPEED.
            </h2>
          </header>
          <div>
            {[
              ["Concept review", "04 weeks", "18%"],
              ["Payload accommodation", "10 weeks", "32%"],
              ["Integration + test", "22 weeks", "64%"],
              ["Launch + commission", "08 weeks", "100%"],
            ].map((x) => (
              <article key={x[0]}>
                <span>{x[0]}</span>
                <b>{x[1]}</b>
                <i style={{ width: x[2] }} />
              </article>
            ))}
          </div>
          <p>
            Illustrative sequence only. Actual mission schedules depend on
            payload maturity, licensing and launch availability.
          </p>
        </section>
        <section
          id="concept"
          className="concept"
          aria-labelledby="concept-title"
        >
          <div>
            <p>06 / CONCEPT UPLINK</p>
            <h2 id="concept-title">
              DEFINE THE VIEW
              <br />
              BEFORE THE VEHICLE.
            </h2>
            <div className="concept-fields">
              <label>
                Orbit
                <select
                  data-qa-action="concept-orbit"
                  value={orbit}
                  onChange={(e) => setOrbit(e.target.value)}
                >
                  <option>Sun-synchronous 525 km</option>
                  <option>Low inclination 450 km</option>
                </select>
              </label>
              <label>
                Payload
                <select
                  data-qa-action="concept-payload"
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                >
                  <option>Multispectral 8-band</option>
                  <option>Thermal infrared</option>
                </select>
              </label>
              <div role="group" aria-label="Mission priority">
                {[
                  "Revisit frequency",
                  "Ground resolution",
                  "Downlink latency",
                ].map((x) => (
                  <button
                    data-qa-action="concept-priority"
                    aria-pressed={priority === x}
                    onClick={() => setPriority(x)}
                    key={x}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <aside>
              <span>CONCEPT PACKET</span>
              <strong>{mission}</strong>
              <p>
                {orbit} / {payload} / {priority}
              </p>
            </aside>
          </div>
          {sent ? (
            <motion.div
              className="uplink-success"
              role="status"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>PACKET RECEIVED</span>
              <strong>{mission}</strong>
              <h3>Concept review is in the queue.</h3>
              <p>
                A fictional mission architect will respond with illustrative
                next steps.
              </p>
            </motion.div>
          ) : (
            <form noValidate onSubmit={submit}>
              <label>
                Name
                <input required autoComplete="name" />
              </label>
              <label>
                Organisation
                <input required autoComplete="organization" />
              </label>
              <label>
                Email
                <input required type="email" autoComplete="email" />
              </label>
              <label className="check">
                <input required type="checkbox" />
                <span>
                  I understand all mission data and this concept request are
                  fictional template content.
                </span>
              </label>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <button data-qa-action="concept-submit">
                UPLINK CONCEPT PACKET ↗
              </button>
            </form>
          )}
        </section>
      </main>
      <footer>
        <a href="#top">APERTURE / ORBITAL</a>
        <p>
          Fictional mission platform.
          <br />
          No live spacecraft data.
        </p>
        <span>AO–1 / SAMPLE PROGRAMME / 2028</span>
        <a href="#top">RETURN TO T+00 ↑</a>
      </footer>
    </>
  );
}
