import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import BottleScene from "./BottleScene.jsx";
const groups = {
  Top: ["Bergamot", "Green fig", "Black tea"],
  Heart: ["Orris", "Saffron", "Mineral rose"],
  Base: ["Cedar", "Labdanum", "Vetiver smoke"],
};
export default function App() {
  const chamber = useRef(null);
  const [phase, setPhase] = useState(0),
    [spray, setSpray] = useState(false),
    [formula, setFormula] = useState({
      Top: "Bergamot",
      Heart: "Orris",
      Base: "Cedar",
    }),
    [curve, setCurve] = useState("Top"),
    [error, setError] = useState(""),
    [sent, setSent] = useState(false);
  useEffect(() => {
    let f = 0;
    const update = () => {
      f = 0;
      const el = chamber.current;
      if (
        !el ||
        innerWidth < 901 ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      setPhase(
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
  const active =
      phase < 0.34
        ? "RAW HEADSPACE"
        : phase < 0.72
          ? "CONCENTRATE"
          : "SEALED EXTRAIT",
    note = formula[curve],
    code = useMemo(
      () =>
        `ON-${formula.Top.slice(0, 2).toUpperCase()}${formula.Heart.slice(0, 2).toUpperCase()}${formula.Base.slice(0, 2).toUpperCase()}-28`,
      [formula],
    );
  const atomise = () => {
    setSpray(true);
    setTimeout(() => setSpray(false), 900);
  };
  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      setError(
        "Add your name, a valid email and confirm the fictional sample note.",
      );
      f.querySelector(":invalid")?.focus();
      return;
    }
    setError("");
    setSent(true);
  };
  return (
    <>
      <header className="head">
        <a href="#top" className="brand">
          ORRIS NULL <span>FORMULA 01</span>
        </a>
        <nav aria-label="Primary">
          <a href="#organ">Organ</a>
          <a href="#curve">Trail</a>
          <a href="#compose">Compose</a>
        </nav>
        <a href="#compose">Discovery batch ↘</a>
      </header>
      <main id="top">
        <section className="chamber" ref={chamber} aria-labelledby="hero-title">
          <div className="chamber-sticky">
            <div
              className="bottle"
              role="img"
              aria-label={`Three-dimensional fragrance vessel in ${active.toLowerCase()} phase`}
            >
              <BottleScene phase={phase} note={note} />
              <div
                className={`mist ${spray ? "active" : ""}`}
                aria-hidden="true"
              >
                {Array.from({ length: 18 }, (_, i) => (
                  <i style={{ "--i": i }} key={i} />
                ))}
              </div>
            </div>
            <div className="hero-copy">
              <p>EXTRAIT / 31% / BATCH 01</p>
              <h1 id="hero-title">
                SCENT IS
                <br />A FORMULA
                <br />
                <em>LEAVING THE ROOM.</em>
              </h1>
            </div>
            <aside className="phase-card" aria-live="polite">
              <span>
                DISTILLATION /{" "}
                {Math.round(phase * 100)
                  .toString()
                  .padStart(3, "0")}
              </span>
              <strong>{active}</strong>
              <p>
                {phase < 0.34
                  ? "Volatile materials remain suspended before the vessel."
                  : phase < 0.72
                    ? "The concentrate takes colour, density and a measured ratio."
                    : "Glass, atomiser and formula resolve as one finished object."}
              </p>
            </aside>
            <div
              className="phase-controls"
              role="group"
              aria-label="Distillation phase"
            >
              {[
                ["Raw", 0],
                ["Liquid", 0.54],
                ["Sealed", 1],
              ].map(([x, v]) => (
                <button
                  data-qa-action="bottle-phase"
                  aria-pressed={Math.abs(phase - v) < 0.15}
                  onClick={() => setPhase(v)}
                  key={x}
                >
                  {x}
                  <span>{String(Math.round(v * 100)).padStart(3, "0")}</span>
                </button>
              ))}
              <button data-qa-action="atomise" onClick={atomise}>
                ATOMISE <span>ONE BURST ↗</span>
              </button>
            </div>
            <div className="formula-balance" aria-hidden="true">
              <span>TOP 22</span>
              <i />
              <span>HEART 46</span>
              <i />
              <span>BASE 32</span>
            </div>
          </div>
        </section>
        <section id="organ" className="organ" aria-labelledby="organ-title">
          <header>
            <p>02 / FORMULA ORGAN</p>
            <h2 id="organ-title">
              THREE SPEEDS
              <br />
              OF DISAPPEARING.
            </h2>
          </header>
          <figure className="ingredient-proof">
            <img
              src="assets/editorial/fragrance-ingredients.webp"
              alt="Saffron, mineral rose, black tea and smoked vetiver arranged on a dark laboratory slab"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <figcaption>RAW MATERIAL FIELD / TOP—HEART—BASE</figcaption>
          </figure>
          <div>
            {Object.entries(groups).map(([group, items], g) => (
              <article key={group}>
                <span>
                  0{g + 1} / {group.toUpperCase()}
                </span>
                <div className={`organ-column height-${g}`}>
                  {items.map((item) => (
                    <button
                      data-qa-action="formula-note"
                      aria-pressed={formula[group] === item}
                      onClick={() => {
                        setFormula({ ...formula, [group]: item });
                        setCurve(group);
                      }}
                      key={item}
                    >
                      <i />
                      <strong>{item}</strong>
                      <small>
                        {group === "Top"
                          ? "00—35 min"
                          : group === "Heart"
                            ? "01—05 h"
                            : "06—18 h"}
                      </small>
                    </button>
                  ))}
                </div>
                <p>
                  {group === "Top"
                    ? "The first air: brightness, leaf and tannin."
                    : group === "Heart"
                      ? "The body: powder, heat and mineral bloom."
                      : "The trace: timber, resin and smoked root."}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="curve"
          className="evaporation"
          aria-labelledby="curve-title"
        >
          <div>
            <p>03 / EVAPORATION CURVE</p>
            <h2 id="curve-title">
              WHAT REMAINS
              <br />
              BECOMES THE NAME.
            </h2>
            <nav aria-label="Trail layer">
              {Object.keys(groups).map((x) => (
                <button
                  data-qa-action="curve-layer"
                  aria-pressed={curve === x}
                  onClick={() => setCurve(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </nav>
          </div>
          <div className={`curve-chart curve-${curve.toLowerCase()}`}>
            <svg
              viewBox="0 0 700 350"
              role="img"
              aria-label={`${curve} note illustrative evaporation curve`}
            >
              <path
                d={
                  curve === "Top"
                    ? "M0 44 C150 22 160 280 700 310"
                    : curve === "Heart"
                      ? "M0 310 C100 280 150 70 320 95 S520 270 700 292"
                      : "M0 320 C170 320 230 255 360 220 S560 170 700 150"
                }
              />
              <line x1="0" y1="310" x2="700" y2="310" />
            </svg>
            <motion.div
              key={note}
              initial={{ opacity: 0.3, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>ACTIVE MATERIAL / {curve.toUpperCase()}</span>
              <strong>{note}</strong>
              <p>
                {curve === "Top"
                  ? "Sharp lift, quick diffusion, dry green edge."
                  : curve === "Heart"
                    ? "A textured centre that expands close to skin."
                    : "Low-volatility trace with a dark mineral warmth."}
              </p>
            </motion.div>
          </div>
          <aside>
            <strong>
              {curve === "Top"
                ? "00:35"
                : curve === "Heart"
                  ? "05:20"
                  : "18:00"}
            </strong>
            <span>ILLUSTRATIVE PRESENCE</span>
            <dl>
              <div>
                <dt>Diffusion</dt>
                <dd>{curve === "Top" ? "High" : "Measured"}</dd>
              </div>
              <div>
                <dt>Substantivity</dt>
                <dd>{curve === "Base" ? "18 h" : "5 h"}</dd>
              </div>
              <div>
                <dt>Dosage</dt>
                <dd>
                  {curve === "Heart" ? "46%" : curve === "Top" ? "22%" : "32%"}
                </dd>
              </div>
            </dl>
          </aside>
        </section>
        <section className="atomiser" aria-labelledby="atomiser-title">
          <div className="vessel-section">
            <img
              src="assets/editorial/fragrance-campaign.webp"
              alt="Unbranded optical-glass extrait bottle surrounded by a suspended atomised cloud"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <span>CAMPAIGN PROOF / 50 ML / ONE BURST</span>
          </div>
          <div>
            <p>04 / GLASS + DELIVERY</p>
            <h2 id="atomiser-title">
              THE LAST INGREDIENT
              <br />
              IS PRESSURE.
            </h2>
            <p>
              A short travel actuator releases a measured cloud. Optical glass
              carries the formula without a decorative silhouette; the only
              gesture is the one that puts it into air.
            </p>
            <button data-qa-action="section-atomise" onClick={atomise}>
              TRIGGER ONE MEASURED BURST ↗
            </button>
            <dl>
              <div>
                <dt>Delivery</dt>
                <dd>78 μl / actuation</dd>
              </div>
              <div>
                <dt>Glass</dt>
                <dd>55% recycled optical stock</dd>
              </div>
              <div>
                <dt>Maceration</dt>
                <dd>8 weeks / illustrative</dd>
              </div>
            </dl>
          </div>
        </section>
        <section
          id="compose"
          className="compose"
          aria-labelledby="compose-title"
        >
          <header>
            <p>05 / DISCOVERY COMPOSITION</p>
            <h2 id="compose-title">
              BUILD A TRAIL
              <br />
              FOR YOUR OWN SKIN.
            </h2>
          </header>
          <div className="blotter-wallet">
            {Object.entries(groups).map(([group, items]) => (
              <fieldset key={group}>
                <legend>{group}</legend>
                {items.map((item) => (
                  <button
                    type="button"
                    data-qa-action="discovery-note"
                    aria-pressed={formula[group] === item}
                    onClick={() => setFormula({ ...formula, [group]: item })}
                    key={item}
                  >
                    <i />
                    <span>{item}</span>
                  </button>
                ))}
              </fieldset>
            ))}
          </div>
          <aside className="formula-label" aria-live="polite">
            <header>
              <span>ORRIS NULL / DISCOVERY</span>
              <strong>{code}</strong>
            </header>
            <div className="ratio">
              <i style={{ height: "22%" }} />
              <i style={{ height: "46%" }} />
              <i style={{ height: "32%" }} />
            </div>
            <dl>
              <div>
                <dt>Top</dt>
                <dd>{formula.Top}</dd>
              </div>
              <div>
                <dt>Heart</dt>
                <dd>{formula.Heart}</dd>
              </div>
              <div>
                <dt>Base</dt>
                <dd>{formula.Base}</dd>
              </div>
              <div>
                <dt>Concentration</dt>
                <dd>31% extrait study</dd>
              </div>
            </dl>
          </aside>
          <div className="dossier">
            {sent ? (
              <motion.div
                className="success"
                role="status"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>SAMPLE DOSSIER RECORDED</span>
                <strong>{code}</strong>
                <h3>Your formula has entered the lab.</h3>
                <p>
                  A fictional sample concierge will return with illustrative
                  batch context.
                </p>
              </motion.div>
            ) : (
              <form noValidate onSubmit={submit}>
                <p>06 / SAMPLE DOSSIER</p>
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
                    I understand this is a fictional fragrance template and no
                    physical sample will be dispatched.
                  </span>
                </label>
                {error && (
                  <p className="error" role="alert">
                    {error}
                  </p>
                )}
                <button data-qa-action="sample-submit">
                  RECORD DISCOVERY DOSSIER ↗
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <footer>
        <a href="#top">ORRIS NULL</a>
        <p>
          Formula fiction / Batch 01.
          <br />
          No physical product is offered.
        </p>
        <span>31% EXTRAIT / 50 ML / SAMPLE HOUSE</span>
        <a href="#top">RETURN TO HEADSPACE ↑</a>
      </footer>
    </>
  );
}
