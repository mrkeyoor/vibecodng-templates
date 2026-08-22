import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import CalibreScene from "./CalibreScene.jsx";
const cases = [
    ["Rhodium steel", "€24,800"],
    ["Warm titanium", "€26,200"],
    ["Black ceramic", "€27,600"],
  ],
  straps = ["Ink alligator", "Graphite textile", "Rhodium bracelet"];
export default function App() {
  const bench = useRef(null);
  const [open, setOpen] = useState(0),
    [wind, setWind] = useState(18),
    [caseIndex, setCaseIndex] = useState(0),
    [strap, setStrap] = useState(straps[0]),
    [error, setError] = useState(""),
    [sent, setSent] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = bench.current;
      if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const p = Math.max(
        0,
        Math.min(1, (scrollY - el.offsetTop) / (el.offsetHeight - innerHeight)),
      );
      setOpen(Number((p * 1.1).toFixed(3)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => removeEventListener("scroll", onScroll);
  }, []);
  const calibreState =
    open < 0.28 ? "ASSEMBLED" : open < 0.72 ? "TRAIN EXPOSED" : "FULLY OPEN";
  const ref = useMemo(
    () => `AV-26-${String(caseIndex + 1).padStart(2, "0")}${strap.charAt(0)}`,
    [caseIndex, strap],
  );
  const submit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setError(
        "Add your name, a valid email and acknowledge the fictional allocation.",
      );
      form.querySelector(":invalid")?.focus();
      return;
    }
    setError("");
    setSent(true);
  };
  return (
    <>
      <header className="rail">
        <a href="#top" className="brand">
          <b>AV</b>
          <span>
            ASTER VALE
            <br />
            CALIBRE ATELIER
          </span>
        </a>
        <nav aria-label="Primary">
          <a href="#anatomy">Anatomy</a>
          <a href="#certificate">Certificate</a>
          <a href="#configure">Configure</a>
        </nav>
        <a href="#configure">Allocation 01/60 ↘</a>
      </header>
      <main id="top">
        <section className="bench" ref={bench} aria-labelledby="hero-title">
          <div className="bench-sticky">
            <div className="bench-copy">
              <p>CALIBRE AV–01 / INDEPENDENT HOROLOGY</p>
              <h1 id="hero-title">
                A WATCH THAT
                <br />
                <em>OPENS ITS REASON.</em>
              </h1>
              <div className="bench-note">
                <span>01</span>
                <p>
                  Scroll through the calibre or use the bench controls. Every
                  bridge moves on the same axis it was assembled.
                </p>
              </div>
            </div>
            <div
              className="calibre-view"
              role="img"
              aria-label={`Three-dimensional mechanical watch calibre, ${calibreState.toLowerCase()}`}
            >
              <CalibreScene open={open} wind={wind} />
              <div className="loupe-ring" aria-hidden="true" />
              <div className="calibre-hud">
                <span>
                  DEPTH{" "}
                  {Math.round(open * 100)
                    .toString()
                    .padStart(3, "0")}
                </span>
                <strong>{calibreState}</strong>
                <span>CROWN {wind}°</span>
              </div>
            </div>
            <div className="bench-controls">
              <div role="group" aria-label="Calibre assembly depth">
                {[
                  ["Assembled", 0],
                  ["Train", 0.52],
                  ["Open", 1],
                ].map(([label, value]) => (
                  <button
                    data-qa-action="calibre-state"
                    aria-pressed={Math.abs(open - value) < 0.12}
                    onClick={() => setOpen(value)}
                    key={label}
                  >
                    {label}
                    <i>{value === 0 ? "00" : value === 1 ? "100" : "052"}</i>
                  </button>
                ))}
              </div>
              <button
                data-qa-action="crown-step"
                onClick={() => setWind((value) => value + 12)}
              >
                WIND CROWN <span>+12° ↻</span>
              </button>
            </div>
            <div className="depth-ruler" aria-hidden="true">
              {Array.from({ length: 11 }, (_, i) => (
                <i key={i}>
                  <span>{String(i * 10).padStart(3, "0")}</span>
                </i>
              ))}
            </div>
          </div>
        </section>
        <section
          id="anatomy"
          className="anatomy"
          aria-labelledby="anatomy-title"
        >
          <header>
            <p>02 / FUNCTIONAL TRAIN</p>
            <h2 id="anatomy-title">
              NOT ORNAMENT.
              <br />
              ARCHITECTURE.
            </h2>
          </header>
          <div>
            {[
              ["01", "BARREL", "72 hours stored across twin mainsprings."],
              [
                "02",
                "TRAIN",
                "Four wheels reduce force into measured release.",
              ],
              ["03", "ESCAPEMENT", "21,600 controlled impulses every hour."],
            ].map((x) => (
              <article key={x[0]}>
                <span>{x[0]}</span>
                <div className="gear-mark" aria-hidden="true" />
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
                <b>AV–{x[0]} / VISIBLE</b>
              </article>
            ))}
          </div>
        </section>
        <section className="finishing" aria-labelledby="finish-title">
          <div className="macro">
            <img
              src="assets/editorial/watch-macro.webp"
              alt="Watchmaker tool finishing a rhodium movement bridge beside a ruby bearing"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <span>12× LOUPE / BRIDGE 04</span>
          </div>
          <div>
            <p>03 / HAND FINISHING</p>
            <h2 id="finish-title">
              LIGHT IS THE
              <br />
              <em>FINAL MEASUREMENT.</em>
            </h2>
            <p>
              Black-polished steel reveals no texture until it catches the bench
              lamp. Each internal angle is cut by hand because a machine cannot
              leave a sharp inward point.
            </p>
            <dl>
              <div>
                <dt>Anglage</dt>
                <dd>Hand-drawn / 0.35 mm</dd>
              </div>
              <div>
                <dt>Jewels</dt>
                <dd>33 synthetic ruby bearings</dd>
              </div>
              <div>
                <dt>Assembly</dt>
                <dd>One watchmaker / one movement</dd>
              </div>
            </dl>
          </div>
        </section>
        <section
          id="certificate"
          className="certificate"
          aria-labelledby="certificate-title"
        >
          <header>
            <p>04 / SIX-POSITION RATE</p>
            <h2 id="certificate-title">
              A PULSE WITH
              <br />A PAPER TRAIL.
            </h2>
            <span>Illustrative sample measurements</span>
          </header>
          <div className="rate-chart">
            <svg
              viewBox="0 0 800 280"
              role="img"
              aria-label="Illustrative six-position daily rate chart"
            >
              <path d="M0 144 C90 60 130 220 222 128 S370 95 438 148 590 200 800 106" />
              <line x1="0" y1="140" x2="800" y2="140" />
            </svg>
            <strong>+1.8</strong>
            <span>SEC / DAY</span>
          </div>
          <div
            className="rate-ledger"
            tabIndex="0"
            aria-label="Six-position timing measurements"
          >
            {[
              ["DU", "+1.2", "298°"],
              ["DD", "+2.0", "294°"],
              ["CU", "+1.5", "291°"],
              ["CD", "+2.2", "288°"],
              ["CL", "+1.9", "292°"],
              ["CR", "+2.1", "289°"],
            ].map((x) => (
              <div key={x[0]}>
                <b>{x[0]}</b>
                <span>{x[1]} s/d</span>
                <span>{x[2]}</span>
              </div>
            ))}
          </div>
        </section>
        <section
          id="configure"
          className="configure"
          aria-labelledby="configure-title"
        >
          <header>
            <p>05 / COLLECTOR TRAY</p>
            <h2 id="configure-title">
              SPECIFY YOUR
              <br />
              NUMBERED PIECE.
            </h2>
          </header>
          <figure className="wrist-campaign">
            <img
              src="assets/editorial/watch-wrist.webp"
              alt="Unbranded mechanical watch worn beneath a dark tailored cuff"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <figcaption>COLLECTOR SCALE / CUFF CLEARANCE / CROWN ACCESS</figcaption>
          </figure>
          <div className="material-tray">
            <fieldset>
              <legend>Case temperature</legend>
              {cases.map((x, i) => (
                <button
                  type="button"
                  data-qa-action="material-choice"
                  aria-pressed={caseIndex === i}
                  onClick={() => setCaseIndex(i)}
                  key={x[0]}
                >
                  <i className={`case-swatch swatch-${i}`} />
                  <span>
                    {x[0]}
                    <small>{x[1]}</small>
                  </span>
                </button>
              ))}
            </fieldset>
            <fieldset>
              <legend>Strap architecture</legend>
              {straps.map((x) => (
                <button
                  type="button"
                  data-qa-action="strap-choice"
                  aria-pressed={strap === x}
                  onClick={() => setStrap(x)}
                  key={x}
                >
                  <i className="strap-swatch" />
                  <span>
                    {x}
                    <small>Hand fitted / included</small>
                  </span>
                </button>
              ))}
            </fieldset>
          </div>
          <aside className="spec-slip" aria-live="polite">
            <header>
              <span>ASTER VALE / ALLOCATION</span>
              <strong>{ref}</strong>
            </header>
            <div className="mini-watch" aria-hidden="true">
              <i />
              <b />
            </div>
            <dl>
              <div>
                <dt>Calibre</dt>
                <dd>AV–01 manual</dd>
              </div>
              <div>
                <dt>Case</dt>
                <dd>{cases[caseIndex][0]}</dd>
              </div>
              <div>
                <dt>Strap</dt>
                <dd>{strap}</dd>
              </div>
              <div>
                <dt>Edition</dt>
                <dd>01 / 60 pieces</dd>
              </div>
              <div>
                <dt>Indicative</dt>
                <dd>{cases[caseIndex][1]}</dd>
              </div>
            </dl>
          </aside>
          <div className="allocation">
            {sent ? (
              <motion.div
                className="success"
                role="status"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>ALLOCATION RECORDED</span>
                <strong>{ref}</strong>
                <h3>Your calibre is on the bench.</h3>
                <p>
                  A fictional collector liaison will respond with an
                  illustrative private-viewing window.
                </p>
              </motion.div>
            ) : (
              <form noValidate onSubmit={submit}>
                <p>06 / PRIVATE HANDOFF</p>
                <label>
                  Name
                  <input required autoComplete="name" />
                </label>
                <label>
                  Email
                  <input required type="email" autoComplete="email" />
                </label>
                <label className="check">
                  <input required type="checkbox" />
                  <span>
                    I understand this is a fictional atelier template and no
                    watch is being reserved.
                  </span>
                </label>
                {error && (
                  <p className="error" role="alert">
                    {error}
                  </p>
                )}
                <button data-qa-action="config-submit">
                  REQUEST ALLOCATION <span>↗</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <footer>
        <a href="#top" className="brand">
          <b>AV</b>
          <span>ASTER VALE</span>
        </a>
        <p>
          Fictional independent mechanics.
          <br />
          Sixty numbered pieces.
        </p>
        <span>GENEVA / SAMPLE ATELIER / 2026</span>
        <a href="#top">RETURN TO BENCH ↑</a>
      </footer>
    </>
  );
}
