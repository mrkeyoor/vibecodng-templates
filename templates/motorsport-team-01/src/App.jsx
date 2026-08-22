import { useMemo, useState } from "react";
import TelemetryLab from "./TelemetryLab.jsx";

const compounds = {
  Soft: { life: 18, pace: "−0.42", risk: "High wear" },
  Medium: { life: 29, pace: "−0.18", risk: "Balanced" },
  Hard: { life: 41, pace: "+0.08", risk: "Low wear" },
};
const prompts = [
  {
    key: "compound",
    label: "Compound available?",
    options: ["Soft", "Medium", "Hard"],
  },
  { key: "lap", label: "Target pit window?", options: ["18", "24", "31"] },
  { key: "weather", label: "Track condition?", options: ["Dry", "Drizzle"] },
  { key: "traffic", label: "Rejoin traffic?", options: ["Clear", "Pack"] },
];
const radios = {
  Strategy: [
    "CAR 07 — mode STRAT six.",
    "Copy. Gap behind 3.8.",
    "Box window opens lap 23.",
  ],
  Driver: [
    "Front is starting to wash at nine.",
    "Understood. Adjust diff entry plus one.",
    "Balance update logged.",
  ],
  Garage: [
    "Front-right loss is within model.",
    "Blankets set for medium.",
    "Crew ready at five seconds.",
  ],
};
const results = [
  ["01", "São Vista", "P02", "+4.228"],
  ["02", "Mare Nord", "P01", "1:32:18"],
  ["03", "Kanto Ring", "P04", "+11.804"],
  ["04", "Arden Vale", "P02", "+2.116"],
];

function Track({ pitLap, weather }) {
  return (
    <svg
      className="track"
      viewBox="0 0 700 360"
      role="img"
      aria-labelledby="track-title"
    >
      <title id="track-title">
        Circuit strategy trace with pit call on lap {pitLap}
      </title>
      <path
        className="circuit"
        d="M112 185C46 95 150 37 256 73c64 22 72 89 136 65 75-28 114-93 196-54 82 40 68 143-2 178-62 30-123-18-179 2-80 29-151 78-228 36-47-26-26-75-67-115Z"
      />
      <path className="sector s1" d="M112 185C46 95 150 37 256 73" />
      <path
        className="sector s2"
        d="M256 73c64 22 72 89 136 65 75-28 114-93 196-54"
      />
      <path
        className="sector s3"
        d="M588 84c82 40 68 143-2 178-62 30-123-18-179 2-80 29-151 78-228 36-47-26-26-75-67-115"
      />
      <circle cx="392" cy="138" r="10" />
      <text x="414" y="132">
        BOX / L{pitLap}
      </text>
      <text x="414" y="153">
        {weather.toUpperCase()} CROSSOVER
      </text>
      <g>
        <text x="78" y="340">
          S1 / 31.422
        </text>
        <text x="292" y="340">
          S2 / 27.086
        </text>
        <text x="518" y="340">
          S3 / 22.611
        </text>
      </g>
    </svg>
  );
}

export default function App() {
  const [compound, setCompound] = useState("Medium"),
    [lap, setLap] = useState("24"),
    [weather, setWeather] = useState("Dry"),
    [traffic, setTraffic] = useState("Clear"),
    [called, setCalled] = useState(false),
    [step, setStep] = useState(0),
    [channel, setChannel] = useState("Strategy"),
    [tier, setTier] = useState("Member"),
    [error, setError] = useState(""),
    [sent, setSent] = useState(false);
  const set = {
    compound: setCompound,
    lap: setLap,
    weather: setWeather,
    traffic: setTraffic,
  };
  const val = { compound, lap, weather, traffic };
  const outcome = useMemo(() => {
    if (weather === "Drizzle")
      return {
        tyre: "INTERMEDIATE",
        box: Math.max(16, +lap - 2),
        delta: "−6.8 s",
        position: traffic === "Clear" ? "P03" : "P05",
        risk: "Crossover call",
      };
    const d =
      (+lap - 24) * 0.12 +
      (compound === "Soft" ? -0.38 : compound === "Hard" ? 0.21 : 0) +
      (traffic === "Pack" ? 1.1 : -0.3);
    return {
      tyre: compound.toUpperCase(),
      box: +lap,
      delta: `${d >= 0 ? "+" : ""}${d.toFixed(2)} s`,
      position: traffic === "Clear" ? "P02" : "P04",
      risk: compounds[compound].risk,
    };
  }, [compound, lap, weather, traffic]);
  const call = () => setCalled(true);
  const next = () => (step < 3 ? setStep(step + 1) : call());
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (
      !f.get("name") ||
      !/^\S+@\S+\.\S+$/.test(String(f.get("email"))) ||
      !f.get("country")
    ) {
      setError("Enter your name, a valid email and home country.");
      return;
    }
    setError("");
    setSent(true);
  };
  return (
    <>
      <header className="mast">
        <a href="#top" className="mark" aria-label="Apex Works home">
          A<span>▲</span>W
        </a>
        <p>
          RACE CONTROL <b>● SESSION LIVE</b>
        </p>
        <nav aria-label="Primary">
          <a href="#strategy">Strategy</a>
          <a href="#team">Team</a>
          <a href="#season">Season</a>
        </nav>
        <a href="#paddock">Paddock ↘</a>
      </header>
      <main id="top">
        <section className="broadcast" aria-labelledby="hero-title">
          <img
            src="apex-race-control.webp"
            width="1600"
            height="1066"
            alt="Apex Works race car passing the pit wall at dusk"
            fetchPriority="high"
          />
          <div className="broadcast-shade" />
          <div className="hero-copy">
            <p>ROUND 08 / ARDEN VALE / LAP 22</p>
            <h1 id="hero-title">
              THE PIT WALL
              <br />
              <span>CALLS THE RACE.</span>
            </h1>
            <a href="#strategy">Open strategy channel ↓</a>
          </div>
          <aside className="timing" aria-label="Current fictional timing">
            <header>
              <span>POS</span>
              <span>DRIVER</span>
              <span>GAP</span>
            </header>
            {[
              ["01", "N. ROE", "LEADER"],
              ["02", "M. VALE", "+1.842"],
              ["03", "I. SEN", "+4.095"],
              ["04", "K. ORT", "+5.611"],
            ].map((r, i) => (
              <div className={i === 1 ? "ours" : ""} key={r[0]}>
                <b>{r[0]}</b>
                <span>{r[1]}</span>
                <span>{r[2]}</span>
              </div>
            ))}
          </aside>
          <div className="radio">
            <span>RADIO / CAR 07</span>
            <p>
              “Balance is coming back.
              <br />
              Tell me the window.”
            </p>
            <small>22:41:08 / DRIVER</small>
          </div>
          <div className="ticker">
            <span>TRACK 32.1°C</span>
            <span>AIR 19.4°C</span>
            <span>WIND SW 8 KM/H</span>
            <span>DEMO TELEMETRY</span>
          </div>
        </section>

        <section
          className="strategy"
          id="strategy"
          aria-labelledby="strategy-title"
        >
          <header>
            <p>01 / PIT WALL MODEL</p>
            <h2 id="strategy-title">
              MAKE THE CALL
              <br />
              BEFORE THE GAP CLOSES.
            </h2>
            <small>Fictional strategy projection. Not live race data.</small>
          </header>
          <div className="strategy-wall">
            <div className="desktop-console">
              {prompts.map((q, i) => (
                <fieldset key={q.key}>
                  <legend>
                    0{i + 1} / {q.label}
                  </legend>
                  {q.options.map((o) => (
                    <button
                      type="button"
                      data-qa-action={`strategy-${q.key}`}
                      aria-pressed={val[q.key] === o}
                      onClick={() => {
                        set[q.key](o);
                        setCalled(false);
                      }}
                      key={o}
                    >
                      {q.key === "lap" ? `LAP ${o}` : o}
                    </button>
                  ))}
                </fieldset>
              ))}
              <button
                className="call-button"
                data-qa-action="strategy-call"
                onClick={call}
              >
                CALL STRATEGY <span>↗</span>
              </button>
            </div>
            <div className="mobile-console">
              <p>ENGINEER / PROMPT {step + 1} OF 4</p>
              <fieldset>
                <legend>{prompts[step].label}</legend>
                {prompts[step].options.map((o) => (
                  <button
                    type="button"
                    data-qa-action={`mobile-${prompts[step].key}`}
                    aria-pressed={val[prompts[step].key] === o}
                    onClick={() => {
                      set[prompts[step].key](o);
                      setCalled(false);
                    }}
                    key={o}
                  >
                    {prompts[step].key === "lap" ? `LAP ${o}` : o}
                    <span>
                      {val[prompts[step].key] === o ? "SELECTED" : "SELECT"}
                    </span>
                  </button>
                ))}
              </fieldset>
              <div>
                <button
                  disabled={step === 0}
                  onClick={() => setStep(Math.max(0, step - 1))}
                >
                  ← BACK
                </button>
                <button data-qa-action="radio-next" onClick={next}>
                  {step === 3 ? "CALL" : "NEXT"} →
                </button>
              </div>
            </div>
            <div className="circuit-model">
              <Track pitLap={lap} weather={weather} />
              <div
                className={`strategy-ticket ${called ? "called" : ""}`}
                aria-live="polite"
              >
                <span>
                  {called
                    ? "PIT WALL / CALL CONFIRMED"
                    : "PIT WALL / MODEL READY"}
                </span>
                <strong>
                  {called ? `BOX LAP ${outcome.box}` : "AWAITING CALL"}
                </strong>
                <b>{called ? outcome.tyre : "—"}</b>
                {called && (
                  <dl>
                    <div>
                      <dt>Projected delta</dt>
                      <dd>{outcome.delta}</dd>
                    </div>
                    <div>
                      <dt>Rejoin</dt>
                      <dd>{outcome.position}</dd>
                    </div>
                    <div>
                      <dt>Risk</dt>
                      <dd>{outcome.risk}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>
          </div>
        </section>

        <TelemetryLab />

        <section className="phase" aria-labelledby="phase-title">
          <div>
            <p>02 / CIRCUIT PHASE</p>
            <h2 id="phase-title">A LAP IS THREE DIFFERENT PROBLEMS.</h2>
          </div>
          {[
            ["S1", "LOAD", "Fast direction change", "31.422"],
            ["S2", "RELEASE", "Traction and rear temperature", "27.086"],
            ["S3", "COMMIT", "Braking stability into the line", "22.611"],
          ].map((x, i) => (
            <article key={x[0]}>
              <span>
                {x[0]} / 0{i + 1}
              </span>
              <strong>{x[1]}</strong>
              <p>{x[2]}</p>
              <b>{x[3]}</b>
              <i style={{ width: `${78 + i * 7}%` }} />
            </article>
          ))}
        </section>

        <section className="team" id="team" aria-labelledby="team-title">
          <div className="team-statement">
            <p>03 / TEAM CHANNEL</p>
            <h2 id="team-title">
              TWENTY VOICES.
              <br />
              ONE DECISION.
            </h2>
            <blockquote>
              “We do not chase certainty. We create enough clarity to commit.”
            </blockquote>
          </div>
          <div className="channel">
            <nav aria-label="Radio channel">
              {Object.keys(radios).map((x) => (
                <button
                  data-qa-action="radio-channel"
                  aria-pressed={channel === x}
                  onClick={() => setChannel(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </nav>
            <div className="transcript" aria-live="polite">
              {radios[channel].map((x, i) => (
                <p key={x}>
                  <span>
                    {["ENG", "CAR 07", "PIT"][i]} / {`22:4${i}:0${i}`}
                  </span>
                  {x}
                </p>
              ))}
            </div>
            <dl>
              <div>
                <dt>Race engineering</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>Performance</dt>
                <dd>06</dd>
              </div>
              <div>
                <dt>Garage</dt>
                <dd>18</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="season" id="season" aria-labelledby="season-title">
          <header>
            <p>04 / 2027 CLASSIFICATION</p>
            <h2 id="season-title">
              POINTS ARE THE RECEIPT.
              <br />
              PROCESS IS THE WORK.
            </h2>
            <strong>284</strong>
            <span>TEAM POINTS / P02</span>
          </header>
          <div className="result-ledger">
            {results.map((r) => (
              <div key={r[0]}>
                <span>R{r[0]}</span>
                <strong>{r[1]}</strong>
                <b>{r[2]}</b>
                <small>{r[3]}</small>
              </div>
            ))}
          </div>
        </section>

        <section
          className="paddock"
          id="paddock"
          aria-labelledby="paddock-title"
        >
          <div className="paddock-copy">
            <p>05 / PADDOCK ACCESS</p>
            <h2 id="paddock-title">
              FOLLOW THE WORK,
              <br />
              NOT ONLY THE FLAG.
            </h2>
            <div className="tiers" aria-label="Membership level">
              {["Radio", "Member", "Partner"].map((x, i) => (
                <button
                  data-qa-action="tier-select"
                  aria-pressed={tier === x}
                  onClick={() => setTier(x)}
                  key={x}
                >
                  <span>0{i + 1}</span>
                  <strong>{x}</strong>
                  <small>
                    {
                      [
                        "Race-weekend briefings",
                        "Briefings + factory notes",
                        "Hosted paddock programme",
                      ][i]
                    }
                  </small>
                </button>
              ))}
            </div>
          </div>
          {sent ? (
            <div className="confirmed" role="status">
              <span>CREDENTIAL / AW–2708</span>
              <h3>CHANNEL OPEN.</h3>
              <p>
                Your {tier} interest is logged locally for this demonstration.
                No external request was sent.
              </p>
              <button onClick={() => setSent(false)}>NEW REQUEST</button>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <p>REQUEST / {tier.toUpperCase()}</p>
              <label>
                Full name
                <input name="name" autoComplete="name" />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" />
              </label>
              <label>
                Home country
                <input name="country" autoComplete="country-name" />
              </label>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <button className="submit" data-qa-action="paddock-submit">
                REQUEST {tier.toUpperCase()} ACCESS ↗
              </button>
              <small>Demo only. No network request is made.</small>
            </form>
          )}
        </section>
      </main>
      <footer>
        <a href="#top" className="mark">
          A<span>▲</span>W
        </a>
        <p>PRECISION UNDER PRESSURE.</p>
        <div>
          <a href="#strategy">Strategy</a>
          <a href="#season">Season</a>
          <span>APEX WORKS / 2027</span>
        </div>
      </footer>
    </>
  );
}
