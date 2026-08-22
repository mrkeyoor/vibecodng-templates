import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import VillaScene from "./VillaScene.jsx";
const rooms = [
  {
    name: "Arrival court",
    level: "L00",
    area: "86 m²",
    note: "A shaded stone threshold compresses the sea before the first reveal.",
  },
  {
    name: "Living void",
    level: "L01",
    area: "142 m²",
    note: "A six-metre volume frames the horizon without a corner column.",
  },
  {
    name: "Water court",
    level: "L01",
    area: "64 m²",
    note: "The pool crosses the plan as climate, reflected light and circulation.",
  },
  {
    name: "Roof horizon",
    level: "L02",
    area: "118 m²",
    note: "A planted upper plane becomes the last room of the house.",
  },
];
export default function App() {
  const journey = useRef(null);
  const [progress, setProgress] = useState(0),
    [period, setPeriod] = useState("Morning"),
    [interest, setInterest] = useState("Spatial sequence"),
    [error, setError] = useState(""),
    [sent, setSent] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = journey.current;
      if (
        !el ||
        innerWidth < 901 ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      setProgress(
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
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener("scroll", scroll, { passive: true });
    update();
    return () => removeEventListener("scroll", scroll);
  }, []);
  const index = Math.min(3, Math.round(progress * 3)),
    room = rooms[index];
  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      setError(
        "Add your name, a valid email, visit window and sample-project acknowledgement.",
      );
      f.querySelector(":invalid")?.focus();
      return;
    }
    setError("");
    setSent(true);
  };
  const code = useMemo(
    () => `CN-${room.level}-${period.slice(0, 2).toUpperCase()}`,
    [room, period],
  );
  return (
    <>
      <header className="site-head">
        <a href="#top" className="wordmark">
          CASA NADIR <span>36.712°N / 3.198°W</span>
        </a>
        <nav aria-label="Primary">
          <a href="#itinerary">Itinerary</a>
          <a href="#daylight">Daylight</a>
          <a href="#materials">Material</a>
        </nav>
        <a href="#visit">Private visit ↘</a>
      </header>
      <main id="top">
        <section
          className="promenade"
          ref={journey}
          aria-labelledby="hero-title"
        >
          <div className="promenade-sticky">
            <div
              className="villa-canvas"
              role="img"
              aria-label={`Three-dimensional villa at ${room.name} in ${period.toLowerCase()} light`}
            >
              <VillaScene progress={progress} period={period} />
              <div className="section-line" aria-hidden="true" />
              <span className="north">
                N<br />↑
              </span>
            </div>
            <div className="hero-title">
              <p>SINGLE RESIDENCE / ALBORAN COAST</p>
              <h1 id="hero-title">
                A HOUSE DRAWN
                <br />
                <em>AS A HORIZON.</em>
              </h1>
            </div>
            <aside className="coordinate-card" aria-live="polite">
              <span>
                {room.level} / 0{index + 1}
              </span>
              <strong>{room.name}</strong>
              <p>{room.note}</p>
              <dl>
                <div>
                  <dt>Internal</dt>
                  <dd>{room.area}</dd>
                </div>
                <div>
                  <dt>Light study</dt>
                  <dd>{period}</dd>
                </div>
              </dl>
            </aside>
            <div
              className="level-rail"
              role="group"
              aria-label="Villa coordinate"
            >
              {rooms.map((x, i) => (
                <button
                  data-qa-action="room-coordinate"
                  aria-pressed={index === i}
                  onClick={() => setProgress(i / 3)}
                  key={x.name}
                >
                  <i>0{i + 1}</i>
                  <span>{x.level}</span>
                  <b>{x.name}</b>
                </button>
              ))}
            </div>
            <div className="scroll-datum" aria-hidden="true">
              <i style={{ height: `${progress * 100}%` }} />
              <span>SECTION A—A / TRAVEL</span>
            </div>
          </div>
        </section>
        <section
          id="itinerary"
          className="itinerary"
          aria-labelledby="itinerary-title"
        >
          <header>
            <p>02 / ROOM ITINERARY</p>
            <h2 id="itinerary-title">
              FOUR COORDINATES.
              <br />
              ONE CONTINUOUS ROOM.
            </h2>
          </header>
          <div className="plan-strip">
            {rooms.map((x, i) => (
              <button
                data-qa-action="itinerary-room"
                aria-pressed={index === i}
                onClick={() => setProgress(i / 3)}
                key={x.name}
              >
                <span>{x.level}</span>
                <strong>{x.name}</strong>
                <small>{x.area}</small>
                <i style={{ width: `${42 + i * 14}%` }} />
              </button>
            ))}
          </div>
          <article>
            <span>CURRENT COORDINATE / {room.level}</span>
            <motion.div
              key={room.name}
              initial={{ opacity: 0.4, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>{room.name}</h3>
              <p>{room.note}</p>
              <dl>
                <div>
                  <dt>Sea axis</dt>
                  <dd>218° SW</dd>
                </div>
                <div>
                  <dt>Floor datum</dt>
                  <dd>+{(index * 3.2).toFixed(2)} m</dd>
                </div>
                <div>
                  <dt>Primary material</dt>
                  <dd>{index < 2 ? "Chalk concrete" : "Oxidised bronze"}</dd>
                </div>
              </dl>
            </motion.div>
          </article>
        </section>
        <figure className="villa-dusk-proof">
          <img
            src="assets/editorial/villa-dusk.webp"
            alt="White concrete coastal villa cantilevered above a reflecting pool at blue hour"
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
          />
          <figcaption>BLUE HOUR / POOL DATUM / SEA HORIZON</figcaption>
        </figure>
        <section
          id="daylight"
          className="daylight"
          aria-labelledby="daylight-title"
        >
          <div>
            <p>03 / SOLAR SECTION</p>
            <h2 id="daylight-title">
              THE SUN
              <br />
              COMPLETES THE PLAN.
            </h2>
            <div
              className="sun-control"
              role="group"
              aria-label="Daylight period"
            >
              {["Morning", "Noon", "Evening"].map((x) => (
                <button
                  data-qa-action="sun-period"
                  aria-pressed={period === x}
                  onClick={() => setPeriod(x)}
                  key={x}
                >
                  {x}
                  <span>
                    {x === "Morning"
                      ? "08:10"
                      : x === "Noon"
                        ? "13:24"
                        : "19:42"}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className={`sun-diagram ${period.toLowerCase()}`}>
            <div className="sun" />
            <div className="arc" />
            <div className="section-house" />
            <span>EAST / 072°</span>
            <span>WEST / 252°</span>
          </div>
          <aside aria-live="polite">
            <span>{period.toUpperCase()} MODEL</span>
            <strong>
              {period === "Morning" ? "31°" : period === "Noon" ? "67°" : "18°"}
            </strong>
            <p>Solar altitude</p>
            <dl>
              <div>
                <dt>Living shade</dt>
                <dd>{period === "Noon" ? "92%" : "54%"}</dd>
              </div>
              <div>
                <dt>Pool reflection</dt>
                <dd>{period === "Evening" ? "High" : "Measured"}</dd>
              </div>
              <div>
                <dt>Thermal mass</dt>
                <dd>18 h release</dd>
              </div>
            </dl>
          </aside>
        </section>
        <section
          id="materials"
          className="materials"
          aria-labelledby="materials-title"
        >
          <header>
            <p>04 / MATERIAL SECTION</p>
            <h2 id="materials-title">
              WEATHER BECOMES
              <br />
              THE FINISH.
            </h2>
          </header>
          <figure className="villa-interior-proof">
            <img
              src="assets/editorial/villa-interior.webp"
              alt="Sea-stone threshold and smoked glass framing the ocean inside a coastal villa"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <figcaption>ARRIVAL THRESHOLD / SEA STONE / SMOKED GLASS</figcaption>
          </figure>
          <div>
            {[
              ["01", "CHALK CONCRETE", "LOCAL AGGREGATE / BOARD FORMED"],
              ["02", "OXIDISED BRONZE", "VENTILATED SCREEN / LIVING PATINA"],
              ["03", "SMOKED GLASS", "LOW-IRON / SOLAR CONTROL"],
              ["04", "SEA STONE", "HONED / THERMAL MASS"],
            ].map((x, i) => (
              <article key={x[0]}>
                <span>{x[0]}</span>
                <div className={`material-sample sample-${i}`} />
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="site-ledger" aria-labelledby="site-title">
          <header>
            <p>05 / SITE LEDGER</p>
            <h2 id="site-title">
              BETWEEN SIERRA
              <br />
              AND SEA.
            </h2>
          </header>
          <div className="coast-plan">
            <i />
            <b>CASA NADIR</b>
            <span>SEA AXIS 218°</span>
          </div>
          <dl>
            {[
              ["Plot", "4,820 m²"],
              ["Internal", "612 m²"],
              ["Courtyards", "214 m²"],
              ["Bedrooms", "05"],
              ["Completion", "Illustrative / 2028"],
              ["Status", "Sample project"],
            ].map((x) => (
              <div key={x[0]}>
                <dt>{x[0]}</dt>
                <dd>{x[1]}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section id="visit" className="visit" aria-labelledby="visit-title">
          <div>
            <p>06 / PRIVATE VISIT BRIEF</p>
            <h2 id="visit-title">
              ARRIVE WITH
              <br />A QUESTION FOR THE HOUSE.
            </h2>
            <div className="interest" role="group" aria-label="Visit interest">
              {[
                "Spatial sequence",
                "Material craft",
                "Acquisition context",
              ].map((x) => (
                <button
                  data-qa-action="visit-interest"
                  aria-pressed={interest === x}
                  onClick={() => setInterest(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </div>
            <aside>
              <span>ATTACHED ITINERARY</span>
              <strong>{code}</strong>
              <p>
                {room.name} / {period} / {interest}
              </p>
            </aside>
          </div>
          {sent ? (
            <motion.div
              className="visit-success"
              role="status"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>VISIT BRIEF RECEIVED</span>
              <strong>{code}</strong>
              <h3>The section is prepared.</h3>
              <p>
                A fictional residence curator will return with an illustrative
                viewing window.
              </p>
            </motion.div>
          ) : (
            <form noValidate onSubmit={submit}>
              <label>
                Name
                <input required autoComplete="name" />
              </label>
              <label>
                Email
                <input required type="email" autoComplete="email" />
              </label>
              <label>
                Preferred window
                <select required defaultValue="">
                  <option value="" disabled>
                    Select a window
                  </option>
                  <option>September / Morning</option>
                  <option>October / Evening</option>
                  <option>Remote spatial review</option>
                </select>
              </label>
              <label className="check">
                <input required type="checkbox" />
                <span>
                  I understand Casa Nadir is a fictional sample residence and no
                  property visit is being booked.
                </span>
              </label>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <button data-qa-action="visit-submit">
                REQUEST PRIVATE VISIT ↗
              </button>
            </form>
          )}
        </section>
      </main>
      <footer>
        <a href="#top">CASA NADIR</a>
        <p>
          One fictional residence.
          <br />
          Alboran coast / 2028.
        </p>
        <span>ARCHITECTURAL SAMPLE / NOT FOR SALE</span>
        <a href="#top">SECTION A—A ↑</a>
      </footer>
    </>
  );
}
