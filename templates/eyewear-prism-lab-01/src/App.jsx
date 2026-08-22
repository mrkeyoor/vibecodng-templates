import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
const frames = [
  { name: "Arc", bridge: "19", temple: "145", width: "52", price: 210 },
  { name: "Orbit", bridge: "17", temple: "142", width: "55", price: 228 },
  { name: "Line", bridge: "21", temple: "147", width: "50", price: 198 },
];
const tints = [
  { name: "Solar Amber", color: "#ef9f20", trans: "18%", glare: 82 },
  { name: "Glass Cyan", color: "#22d2e5", trans: "26%", glare: 71 },
  { name: "Smoke Violet", color: "#7658c8", trans: "14%", glare: 88 },
];
const lights = {
  Noon: { boost: 8, note: "Maximum glare control for hard overhead light." },
  Sunset: {
    boost: -5,
    note: "Balanced warmth with a clearer low-light field.",
  },
  City: { boost: 2, note: "Contrast lift for reflective glass and pavement." },
};
const A = (n) => `${import.meta.env.BASE_URL}${n}`;
export default function App() {
  const heroRef = useRef(null),
    reduce = useReducedMotion(),
    [frame, setFrame] = useState(0),
    [tint, setTint] = useState(0),
    [light, setLight] = useState("Noon"),
    [eye, setEye] = useState(0),
    [size, setSize] = useState(""),
    [errors, setErrors] = useState({}),
    [done, setDone] = useState(false);
  const { scrollYProgress } = useScroll({
      target: heroRef,
      offset: ["start start", "end start"],
    }),
    portraitY = useSpring(
      useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]),
      { stiffness: 90, damping: 24 },
    ),
    lensY = useSpring(
      useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 62]),
      { stiffness: 105, damping: 28 },
    ),
    f = frames[frame],
    t = tints[tint],
    score = Math.max(0, Math.min(99, t.glare + lights[light].boost)),
    code = useMemo(
      () =>
        `PR-${f.name.slice(0, 2).toUpperCase()}-${t.name[0]}-${size || "--"}`,
      [f, t, size],
    );
  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget),
      n = {};
    if (!size) n.size = "Choose a fitted size.";
    if (!String(d.get("name") || "").trim()) n.name = "Add your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email") || "")))
      n.email = "Add a valid email.";
    setErrors(n);
    setDone(!Object.keys(n).length);
  }
  return (
    <div className="site">
      <a className="skip" href="#lab">
        Skip to spectrum lab
      </a>
      <header>
        <a href="#top" className="logo">
          PRI/SM
        </a>
        <nav aria-label="Primary">
          <a href="#walk"><small>01</small> LIGHT WALK</a>
          <a href="#lab"><small>02</small> SPECTRUM</a>
          <a href="#fit"><small>03</small> FITTED VIEW</a>
        </nav>
        <span>
          {f.width}□{f.bridge}—{f.temple} / {t.trans}
        </span>
      </header>
      <main id="top">
        <section ref={heroRef} className="hero" aria-labelledby="hero-title">
          <motion.img
            src={A("prism-hero.webp")}
            width="1600"
            height="1066"
            fetchPriority="high"
            alt="Model wearing translucent cobalt sunglasses with amber lenses in hard sunlight"
            style={{ y: portraitY, scale: reduce ? 1 : 1.06 }}
          />
          <motion.div className="lens left" style={{ "--t": t.color, y: lensY, x: eye ? -18 : 0 }} />
          <motion.div
            className="lens right"
            style={{ "--t": tints[(tint + 1) % 3].color, y: lensY, x: eye ? 18 : 0 }}
          />
          <motion.div className="bridge" style={{ y: lensY }} />
          <motion.div className="hero-copy" initial={reduce ? false : { opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, ease: [0.16, 1, .3, 1] }}>
            <p>OPTICAL STUDY / 01</p>
            <h1 id="hero-title">
              SEE
              <br />
              BOTH
              <br />
              <b>SIDES.</b>
            </h1>
            <a href="#lab">REFRAME THE LIGHT ↓</a>
          </motion.div>
          <div className="eye-control">
            <button
              data-qa-action="eye-prev"
              onClick={() => setEye((eye + 1) % 2)}
              aria-label="View left lens"
            >
              L
            </button>
            <span>{eye ? "RIGHT FIELD" : "LEFT FIELD"}</span>
            <button
              data-qa-action="eye-next"
              onClick={() => setEye((eye + 1) % 2)}
              aria-label="View right lens"
            >
              R
            </button>
          </div>
        </section>
        <section className="walk" id="walk">
          <div>
            <p>01 / LIGHT WALK</p>
            <h2>
              SUN.
              <br />
              SHADE.
              <br />
              STILL YOU.
            </h2>
            <span>
              One frame moves from hard light into shadow without losing the
              eyes.
            </span>
          </div>
          <motion.img
            src={A("prism-walk.webp")}
            width="1600"
            height="1066"
            loading="eager"
            alt="Two friends wearing colorful translucent eyewear in bright sun"
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: .2 }}
            transition={{ duration: 1.1, ease: [0.16, 1, .3, 1] }}
          />
        </section>
        <section className="lab" id="lab" aria-labelledby="lab-title">
          <header>
            <p>02 / SPECTRUM LAB</p>
            <h2 id="lab-title">
              CALIBRATE
              <br />
              THE VIEW.
            </h2>
          </header>
          <div className="lab-grid">
            <div className="viewer">
              <AnimatePresence mode="popLayout">
              <motion.img
                key={`${light}-${tint}`}
                src={A(
                  light === "City" ? "prism-city.webp" : "prism-hero.webp",
                )}
                alt="Live PRISM lens preview"
                style={{
                  filter: `sepia(.12) saturate(1.1) drop-shadow(0 0 0 ${t.color})`,
                }}
                initial={reduce ? false : { opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .5 }}
              />
              </AnimatePresence>
              <div className="glass" style={{ background: t.color }} />
              <span>
                GLARE CONTROL <b>{score}%</b>
              </span>
            </div>
            <div className="console">
              <fieldset>
                <legend>Frame geometry</legend>
                {frames.map((x, i) => (
                  <button
                    data-qa-action="frame-select"
                    type="button"
                    aria-pressed={frame === i}
                    onClick={() => setFrame(i)}
                    key={x.name}
                  >
                    <b>{x.name}</b>
                    <span>
                      {x.width}□{x.bridge}
                    </span>
                  </button>
                ))}
              </fieldset>
              <fieldset>
                <legend>Lens tint</legend>
                {tints.map((x, i) => (
                  <button
                    data-qa-action="tint-select"
                    type="button"
                    aria-pressed={tint === i}
                    onClick={() => setTint(i)}
                    key={x.name}
                  >
                    <i style={{ background: x.color }} />
                    <b>{x.name}</b>
                    <span>{x.trans}</span>
                  </button>
                ))}
              </fieldset>
              <fieldset>
                <legend>Light condition</legend>
                {Object.keys(lights).map((x) => (
                  <button
                    data-qa-action="light-select"
                    type="button"
                    aria-pressed={light === x}
                    onClick={() => setLight(x)}
                    key={x}
                  >
                    {x}
                  </button>
                ))}
              </fieldset>
              <div className="result" aria-live="polite">
                <p>
                  {f.name} / {t.name} / {light}
                </p>
                <strong>{lights[light].note}</strong>
                <dl>
                  <div>
                    <dt>Glare</dt>
                    <dd>{score}%</dd>
                  </div>
                  <div>
                    <dt>Transmission</dt>
                    <dd>{t.trans}</dd>
                  </div>
                  <div>
                    <dt>Bridge</dt>
                    <dd>{f.bridge} mm</dd>
                  </div>
                </dl>
              </div>
              <a href="#fit">FIT THIS VIEW ↘</a>
            </div>
          </div>
        </section>
        <section className="anatomy">
          <img
            src={A("prism-product.webp")}
            width="1600"
            height="1066"
            loading="lazy"
            alt="Cobalt acetate sunglasses on cyan and amber glass blocks"
          />
          <div>
            <p>03 / FRAME ANATOMY</p>
            <h2>
              COLOUR
              <br />
              WITH
              <br />A HINGE.
            </h2>
            <dl>
              <div>
                <dt>01</dt>
                <dd>8 mm polished acetate</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>Five-barrel steel hinge</dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>Hand-bevelled temple</dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="city">
          <img
            src={A("prism-city.webp")}
            width="1600"
            height="1066"
            loading="lazy"
            alt="Model in cobalt eyewear with sunset skyline reflected in the lenses"
          />
          <p>
            THE CITY
            <br />
            <b>
              FITS INSIDE
              <br />
              THE LENS.
            </b>
          </p>
        </section>
        <section
          className={`fit ${done ? "done" : ""}`}
          id="fit"
          aria-labelledby="fit-title"
        >
          {!done ? (
            <>
              <div>
                <p>04 / FITTED VIEW</p>
                <h2 id="fit-title">
                  FOLD THE
                  <br />
                  LIGHT TO
                  <br />
                  YOUR FACE.
                </h2>
                <span>
                  Fictional fitting outcome. No camera, payment or live stock is
                  used.
                </span>
              </div>
              <form onSubmit={submit} noValidate>
                <header>
                  <b>PRISM / FIT CLOTH</b>
                  <span>
                    {f.width}□{f.bridge}—{f.temple}
                  </span>
                </header>
                <fieldset>
                  <legend>Fitted size</legend>
                  <div>
                    {["S", "M", "L"].map((x) => (
                      <button
                        data-qa-action="size-select"
                        type="button"
                        aria-pressed={size === x}
                        onClick={() => setSize(x)}
                        key={x}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                  {errors.size && <small>{errors.size}</small>}
                </fieldset>
                <label>
                  Name
                  <input
                    name="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <small>{errors.name}</small>}
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <small>{errors.email}</small>}
                </label>
                <dl>
                  <div>
                    <dt>Frame</dt>
                    <dd>{f.name}</dd>
                  </div>
                  <div>
                    <dt>Lens</dt>
                    <dd>{t.name}</dd>
                  </div>
                  <div>
                    <dt>Value</dt>
                    <dd>${f.price}</dd>
                  </div>
                </dl>
                <button data-qa-action="fit-submit">
                  ISSUE FITTED VIEW ↗
                </button>
              </form>
            </>
          ) : (
            <div className="issued" role="status">
              <p>PRISM / VIEW FITTED</p>
              <h2 id="fit-title">
                LIGHT,
                <br />
                CUT TO
                <br />
                YOU.
              </h2>
              <strong>{code}</strong>
              <dl>
                <div>
                  <dt>Frame</dt>
                  <dd>{f.name}</dd>
                </div>
                <div>
                  <dt>Tint</dt>
                  <dd>{t.name}</dd>
                </div>
                <div>
                  <dt>Size</dt>
                  <dd>{size}</dd>
                </div>
                <div>
                  <dt>Value</dt>
                  <dd>${f.price}</dd>
                </div>
              </dl>
              <small>FICTIONAL DEMO / NO PAYMENT TAKEN</small>
              <button
                data-qa-action="fit-reset"
                onClick={() => {
                  setDone(false);
                  setSize("");
                  setErrors({});
                }}
              >
                REFRAME AGAIN ↺
              </button>
            </div>
          )}
        </section>
      </main>
      <footer>
        <a href="#top" className="logo">
          PRI/SM
        </a>
        <p>
          Original eyewear campaign
          <br />
          Fictional optical label
        </p>
        <p>
          Illustrative transmission data
          <br />
          No virtual try-on claim
        </p>
        <a href="#top">BACK TO LIGHT ↑</a>
      </footer>
    </div>
  );
}
