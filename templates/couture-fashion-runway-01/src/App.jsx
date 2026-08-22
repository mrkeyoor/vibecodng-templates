import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import PatternStage from "./PatternStage.jsx";
const looks = [
  ["01", "BIAS COLUMN", "Cobalt silk / hand fall"],
  ["02", "SCULPTED GODÉT", "Vermilion faille / volume"],
  ["03", "QUIET ARMOUR", "Ivory gazar / structure"],
];
export default function App() {
  const table = useRef(null);
  const [progress, setProgress] = useState(0),
    [look, setLook] = useState(0),
    [textile, setTextile] = useState("Cobalt"),
    [volume, setVolume] = useState("Controlled"),
    [finish, setFinish] = useState("Raw edge"),
    [error, setError] = useState(""),
    [sent, setSent] = useState(false);
  useEffect(() => {
    let f = 0;
    const update = () => {
      f = 0;
      const el = table.current;
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
      if (!f) f = requestAnimationFrame(update);
    };
    addEventListener("scroll", scroll, { passive: true });
    update();
    return () => removeEventListener("scroll", scroll);
  }, []);
  const state =
      progress < 0.3
        ? "FLAT PATTERN"
        : progress < 0.74
          ? "PINNED TOILE"
          : "FINISHED LOOK",
    code = useMemo(
      () =>
        `MF-L${String(look + 1).padStart(2, "0")}-${textile.slice(0, 2).toUpperCase()}-${volume.charAt(0)}`,
      [look, textile, volume],
    );
  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      setError(
        "Add your name, valid email, fitting city and fictional-house acknowledgement.",
      );
      f.querySelector(":invalid")?.focus();
      return;
    }
    setError("");
    setSent(true);
  };
  return (
    <>
      <header className="header">
        <a href="#top">
          MAISON FOLD <span>COLLECTION / 01</span>
        </a>
        <nav aria-label="Primary">
          <a href="#runway">Runway</a>
          <a href="#textile">Textile</a>
          <a href="#fitting">Fitting</a>
        </nav>
        <a href="#fitting">Private toile ↘</a>
      </header>
      <main id="top">
        <section
          className="pattern-table"
          ref={table}
          aria-labelledby="hero-title"
        >
          <div className="pattern-sticky">
            <div className="table-grid" aria-hidden="true" />
            <div className="pattern-view">
              <PatternStage progress={progress} textile={textile} />
            </div>
            <div className="title">
              <p>LOOK 07 / 214 ATELIER HOURS</p>
              <h1 id="hero-title">
                CUT FLAT.
                <br />
                WORN
                <br />
                <em>IN MOTION.</em>
              </h1>
            </div>
            <aside className="assembly" aria-live="polite">
              <span>
                ASSEMBLY /{" "}
                {Math.round(progress * 100)
                  .toString()
                  .padStart(3, "0")}
              </span>
              <strong>{state}</strong>
              <p>
                {progress < 0.3
                  ? "Four paper pieces hold the grain, dart and intended volume."
                  : progress < 0.74
                    ? "The toile tests balance around the living body."
                    : "Silk, seam and hand fall resolve as one numbered look."}
              </p>
            </aside>
            <div
              className="assembly-controls"
              role="group"
              aria-label="Pattern assembly"
            >
              {[
                ["Flat", 0],
                ["Drape", 0.56],
                ["Finished", 1],
              ].map(([x, v]) => (
                <button
                  data-qa-action="pattern-state"
                  aria-pressed={Math.abs(progress - v) < 0.15}
                  onClick={() => setProgress(v)}
                  key={x}
                >
                  {x}
                  <span>{String(Math.round(v * 100)).padStart(3, "0")}</span>
                </button>
              ))}
            </div>
            <div className="cut-ruler" aria-hidden="true">
              {Array.from({ length: 13 }, (_, i) => (
                <i key={i}>
                  <span>{i * 10}</span>
                </i>
              ))}
            </div>
          </div>
        </section>
        <section id="runway" className="runway" aria-labelledby="runway-title">
          <header>
            <p>02 / RUNWAY CUT</p>
            <h2 id="runway-title">
              THREE LOOKS.
              <br />
              THREE WAYS TO HOLD AIR.
            </h2>
          </header>
          <div className={`runway-stage look-${look}`}>
            <img
              src="assets/editorial/couture-runway.webp"
              alt="Model walking in an original sculptural cobalt couture gown on a black runway"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <div className="spotlight" />
            <div className="runway-figure">
              <i />
              <b />
            </div>
            <motion.div
              key={look}
              initial={{ opacity: 0.3, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span>LOOK {looks[look][0]}</span>
              <strong>{looks[look][1]}</strong>
              <p>{looks[look][2]}</p>
            </motion.div>
          </div>
          <div className="look-strip">
            <button
              data-qa-action="look-prev"
              aria-label="Previous runway look"
              onClick={() => setLook((look + 2) % 3)}
            >
              ←
            </button>
            {looks.map((x, i) => (
              <button
                data-qa-action="look-select"
                aria-pressed={look === i}
                onClick={() => setLook(i)}
                key={x[0]}
              >
                <span>{x[0]}</span>
                <strong>{x[1]}</strong>
                <small>00:{18 + i * 7}</small>
              </button>
            ))}
            <button
              data-qa-action="look-next"
              aria-label="Next runway look"
              onClick={() => setLook((look + 1) % 3)}
            >
              →
            </button>
          </div>
        </section>
        <section
          id="textile"
          className="textiles"
          aria-labelledby="textile-title"
        >
          <header>
            <p>03 / TEXTILE LIBRARY</p>
            <h2 id="textile-title">
              MATERIAL DECIDES
              <br />
              HOW VOLUME FALLS.
            </h2>
          </header>
          <div>
            {[
              ["Cobalt", "Silk crêpe", "74 g/m²", "Fluid / cool hand"],
              ["Vermilion", "Silk faille", "138 g/m²", "Crisp / directional"],
              ["Ivory", "Silk gazar", "112 g/m²", "Translucent / structural"],
            ].map((x, i) => (
              <button
                data-qa-action="textile-select"
                aria-pressed={textile === x[0]}
                onClick={() => setTextile(x[0])}
                key={x[0]}
              >
                <span>0{i + 1}</span>
                <i className={`cloth cloth-${i}`} />
                <strong>{x[1]}</strong>
                <small>{x[2]}</small>
                <p>{x[3]}</p>
              </button>
            ))}
          </div>
        </section>
        <section className="construction" aria-labelledby="construction-title">
          <div>
            <p>04 / CONSTRUCTION LEDGER</p>
            <h2 id="construction-title">
              THE INSIDE IS
              <br />
              THE FIRST FITTING.
            </h2>
            <p>
              Every internal decision directs how the garment moves: hand-set
              canvas, suspended lining and a hem balanced while the client
              walks.
            </p>
          </div>
          <figure className="atelier-proof">
            <img
              src="assets/editorial/couture-atelier.webp"
              alt="Atelier hands pinning cobalt silk to an ivory pattern with red basting thread"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <figcaption>HANDWORK / RED BASTE / COBALT SILK</figcaption>
          </figure>
          <div className="seam-map">
            <svg
              viewBox="0 0 420 640"
              role="img"
              aria-label="Couture seam construction map"
            >
              <path d="M148 52C80 132 95 250 130 310L72 594H348L290 310C325 250 340 132 272 52 250 90 230 105 210 108 190 105 170 90 148 52Z" />
              <path d="M210 108V588M130 310C170 330 250 330 290 310M110 220C170 250 250 250 310 220" />
            </svg>
            {[
              ["01", "DART / 18 H"],
              ["02", "CORSET / 46 H"],
              ["03", "GODÉT / 34 H"],
              ["04", "HAND HEM / 28 H"],
            ].map((x) => (
              <span key={x[0]}>
                {x[0]}
                <b>{x[1]}</b>
              </span>
            ))}
          </div>
          <aside>
            <strong>214</strong>
            <span>ATELIER HOURS</span>
            <dl>
              <div>
                <dt>Toile fittings</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Hand operations</dt>
                <dd>1,840</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>12—16 weeks</dd>
              </div>
            </dl>
          </aside>
        </section>
        <section className="compose" aria-labelledby="compose-title">
          <header>
            <p>05 / LOOK COMPOSITION</p>
            <h2 id="compose-title">
              SET THE LINE.
              <br />
              LEAVE ROOM TO MOVE.
            </h2>
          </header>
          <div className="selectors">
            <fieldset>
              <legend>Volume</legend>
              {["Controlled", "Architectural", "Released"].map((x) => (
                <button
                  data-qa-action="volume-select"
                  aria-pressed={volume === x}
                  onClick={() => setVolume(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </fieldset>
            <fieldset>
              <legend>Finish</legend>
              {["Raw edge", "Hand bound", "Embroidered"].map((x) => (
                <button
                  data-qa-action="finish-select"
                  aria-pressed={finish === x}
                  onClick={() => setFinish(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </fieldset>
          </div>
          <aside className="look-board" aria-live="polite">
            <header>
              <span>MAISON FOLD / PRIVATE LOOK</span>
              <strong>{code}</strong>
            </header>
            <div className={`board-figure ${textile.toLowerCase()}`}>
              <i />
              <b />
            </div>
            <dl>
              <div>
                <dt>Runway source</dt>
                <dd>{looks[look][1]}</dd>
              </div>
              <div>
                <dt>Textile</dt>
                <dd>{textile} silk</dd>
              </div>
              <div>
                <dt>Volume</dt>
                <dd>{volume}</dd>
              </div>
              <div>
                <dt>Finish</dt>
                <dd>{finish}</dd>
              </div>
              <div>
                <dt>Atelier context</dt>
                <dd>214—268 hours</dd>
              </div>
            </dl>
          </aside>
        </section>
        <section
          id="fitting"
          className="fitting"
          aria-labelledby="fitting-title"
        >
          <div>
            <p>06 / FITTING DOSSIER</p>
            <h2 id="fitting-title">
              THE LOOK BEGINS
              <br />
              WITH YOUR POSTURE.
            </h2>
            <aside>
              <span>ATTACHED LOOK</span>
              <strong>{code}</strong>
              <p>
                {textile} / {volume} / {finish}
              </p>
            </aside>
          </div>
          {sent ? (
            <motion.div
              className="fitting-success"
              role="status"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>FITTING DOSSIER RECORDED</span>
              <strong>{code}</strong>
              <h3>Your toile is on the table.</h3>
              <p>
                A fictional atelier liaison will return with an illustrative
                fitting window.
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
                Fitting city
                <select required defaultValue="">
                  <option value="" disabled>
                    Select city
                  </option>
                  <option>Paris</option>
                  <option>London</option>
                  <option>Remote introduction</option>
                </select>
              </label>
              <label className="check">
                <input required type="checkbox" />
                <span>
                  I understand Maison Fold is a fictional couture template and
                  no garment is being commissioned.
                </span>
              </label>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <button data-qa-action="fitting-submit">
                REQUEST PRIVATE FITTING ↗
              </button>
            </form>
          )}
        </section>
      </main>
      <footer>
        <a href="#top">MAISON FOLD</a>
        <p>
          Fictional couture house.
          <br />
          Collection / 01.
        </p>
        <span>LOOK 07 / SAMPLE ATELIER / 2026</span>
        <a href="#top">RETURN TO PATTERN ↑</a>
      </footer>
    </>
  );
}
