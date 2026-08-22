import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
const A = (n) => `${import.meta.env.BASE_URL}${n}`;
const metals = [
    { name: "18K Yellow", color: "#d4a12c", karat: "18K", note: "Warm mirror" },
    { name: "Platinum", color: "#dce2e6", karat: "950", note: "Cool edge" },
    { name: "18K Rose", color: "#d48677", karat: "18K", note: "Blushed light" },
  ],
  stones = [
    { name: "Diamond", color: "#dffeff", brilliance: 92, shadow: 14 },
    { name: "Sapphire", color: "#283bd5", brilliance: 76, shadow: 28 },
    { name: "Garnet", color: "#a2163e", brilliance: 68, shadow: 35 },
  ],
  lights = [
    { name: "Dawn", angle: 22, color: "#94f1d1" },
    { name: "Gallery", angle: 52, color: "#f34436" },
    { name: "Candle", angle: 78, color: "#ffbd4a" },
  ],
  sizes = ["US 5", "US 6", "US 7", "US 8"];
export default function App() {
  const heroRef=useRef(null),reduce=useReducedMotion(),
    [metal, setMetal] = useState(1),
    [stone, setStone] = useState(0),
    [light, setLight] = useState(1),
    [size, setSize] = useState(""),
    [errors, setErrors] = useState({}),
    [issued, setIssued] = useState(false);
  const {scrollYProgress}=useScroll({target:heroRef,offset:["start start","end start"]}),
    jewelY=useSpring(useTransform(scrollYProgress,[0,1],[0,reduce?0:145]),{stiffness:82,damping:25}),
    lightX=useSpring(useTransform(scrollYProgress,[0,1],[-80,reduce?-80:130]),{stiffness:92,damping:27}),
    m = metals[metal],
    s = stones[stone],
    l = lights[light],
    study = useMemo(() => `${m.name} / ${s.name} / ${l.name}`, [m, s, l]),
    code = `LC-${m.karat}-${s.name[0]}-${l.angle}-${size ? size.slice(-1) : "-"}`;
  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget),
      n = {};
    if (!size) n.size = "Choose a ring size.";
    if (!String(d.get("name") || "").trim()) n.name = "Add your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email") || "")))
      n.email = "Add a valid email.";
    setErrors(n);
    setIssued(!Object.keys(n).length);
  }
  return (
    <div className="shell">
      <a className="skip" href="#table">
        Skip to light table
      </a>
      <header>
        <a className="logo" href="#top">
          LUCENT
        </a>
        <nav aria-label="Primary">
          <a href="#craft"><small>01</small> HAND WORK</a>
          <a href="#table"><small>02</small> LIGHT TABLE</a>
          <a href="#study"><small>03</small> STUDY</a>
        </nav>
        <span>
          {m.karat} / {s.name.toUpperCase()} / {l.angle}°
        </span>
      </header>
      <main id="top">
        <section ref={heroRef} className="hero">
          <motion.img
            src={A("lucent-hero.webp")}
            width="1586"
            height="992"
            fetchPriority="high"
            alt="Elongated gemstone ring on a hand crossed by mint and vermillion prism light"
            style={{y:jewelY,scale:reduce?1:1.055}}
          />
          <motion.div
            className="blade"
            style={{ "--beam": l.color, "--angle": `${l.angle}deg`,x:lightX }}
            animate={reduce?{rotate:l.angle*.25-18}:{opacity:[.45,.95,.55],rotate:[l.angle*.25-18,l.angle*.25-10,l.angle*.25-18]}}
            transition={{duration:3.8,repeat:Infinity,ease:"easeInOut"}}
          />
          <motion.div className="hero-copy" initial={reduce?false:{opacity:0,y:48}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[.16,1,.3,1]}}>
            <p>REFLECTION STUDY / 001</p>
            <h1>
              TURN
              <br />
              THE
              <br />
              <b>LIGHT.</b>
            </h1>
            <a href="#table">OPEN THE LOUPE ↓</a>
          </motion.div>
          <div className="facet-note">
            <span>MARQUISE / 3 PRONG</span>
            <strong>{study}</strong>
            <i>ILLUSTRATIVE OPTICAL STUDY</i>
          </div>
        </section>
        <section className="craft" id="craft">
          <img
            src={A("lucent-maker.webp")}
            width="1122"
            height="1402"
            loading="lazy"
            alt="Jewelry artisan setting a gemstone using a loupe and precision tool"
          />
          <div>
            <p>01 / HAND WORK</p>
            <h2>
              THE HAND
              <br />
              SETS WHAT
              <br />
              <b>LIGHT REVEALS.</b>
            </h2>
            <p>
              A three-point setting leaves the pavilion open. Less metal in the
              way; more room for light to return.
            </p>
            <ol>
              <li>
                <b>01</b>Seat cut
              </li>
              <li>
                <b>02</b>Prong tension
              </li>
              <li>
                <b>03</b>Table alignment
              </li>
            </ol>
          </div>
          <aside>
            <span>0</span>
            <i />
            <span>5</span>
            <i />
            <span>10</span>
            <i />
            <span>15 MM</span>
          </aside>
        </section>
        <section className="table" id="table" aria-labelledby="table-title">
          <header>
            <p>02 / LIGHT TABLE</p>
            <h2 id="table-title">
              MAKE THE
              <br />
              FACET
              <br />
              <b>ANSWER.</b>
            </h2>
          </header>
          <div className="worktop">
            <motion.div
              className="loupe"
              style={{
                "--metal": m.color,
                "--stone": s.color,
                "--beam": l.color,
                "--angle": `${l.angle}deg`,
              }}
              animate={{backgroundColor:stone===1?"#14162b":"#34303c"}}
            >
              <motion.div className="beam" animate={{rotate:l.angle,scaleX:1+light*.08}} transition={{type:"spring",stiffness:95,damping:18}} />
              <motion.div className="ring" animate={{rotate:stone*8,scale:1+metal*.025}} transition={{type:"spring",stiffness:90,damping:16}}>
                <i />
                <b>✦</b>
              </motion.div>
              <motion.span className="bloom" animate={reduce?{}:{scale:[.86,1.18,.9],opacity:[.45,.8,.5]}} transition={{duration:3,repeat:Infinity}} />
              <em>{l.angle}°</em>
            </motion.div>
            <div className="settings">
              <fieldset>
                <legend>Metal</legend>
                {metals.map((x, i) => (
                  <button
                    type="button"
                    data-qa-action="metal-select"
                    aria-pressed={metal === i}
                    onClick={() => setMetal(i)}
                    key={x.name}
                  >
                    <i style={{ background: x.color }} />
                    <b>{x.name}</b>
                    <span>{x.note}</span>
                  </button>
                ))}
              </fieldset>
              <fieldset>
                <legend>Center stone</legend>
                {stones.map((x, i) => (
                  <button
                    type="button"
                    data-qa-action="stone-select"
                    aria-pressed={stone === i}
                    onClick={() => setStone(i)}
                    key={x.name}
                  >
                    <i style={{ background: x.color }} />
                    <b>{x.name}</b>
                    <span>{x.brilliance}% return</span>
                  </button>
                ))}
              </fieldset>
              <fieldset>
                <legend>Light environment</legend>
                {lights.map((x, i) => (
                  <button
                    type="button"
                    data-qa-action="light-select"
                    aria-pressed={light === i}
                    onClick={() => setLight(i)}
                    key={x.name}
                  >
                    <i style={{ background: x.color }} />
                    <b>{x.name}</b>
                    <span>{x.angle}°</span>
                  </button>
                ))}
              </fieldset>
              <motion.div className="result" role="status" aria-live="polite" animate={reduce?{}:{scale:[.985,1]}} transition={{duration:.35}}>
                <p>FACET STUDY / {study}</p>
                <strong>
                  {s.name} catches {l.name.toLowerCase()} at {l.angle}°.
                </strong>
                <dl>
                  <div>
                    <dt>Brilliance</dt>
                    <dd>{Math.max(45, s.brilliance - light * 2)}%</dd>
                  </div>
                  <div>
                    <dt>Shadow</dt>
                    <dd>{s.shadow + light * 3}%</dd>
                  </div>
                  <div>
                    <dt>Metal</dt>
                    <dd>{m.karat}</dd>
                  </div>
                </dl>
              </motion.div>
              <a href="#study">ISSUE THIS STUDY ↘</a>
            </div>
          </div>
        </section>
        <section className="stone">
          <img
            src={A("lucent-stone.webp")}
            width="1536"
            height="1024"
            loading="lazy"
            alt="Top view of an elongated gemstone ring refracting mint, violet and vermillion light"
          />
          <div className="cut" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <span>TABLE</span>
          </div>
          <p>
            ONE CUT.
            <br />
            <b>
              A THOUSAND
              <br />
              RETURNS.
            </b>
          </p>
        </section>
        <section className="wear">
          <img
            src={A("lucent-wear.webp")}
            width="1122"
            height="1402"
            loading="lazy"
            alt="Model in vermillion tailoring wearing an elongated gemstone ring near the face"
          />
          <div>
            <p>03 / ON THE HAND</p>
            <h2>
              NOT JUST
              <br />
              SEEN.
              <br />
              <b>CAUGHT.</b>
            </h2>
            <p>
              The stone moves between ultraviolet shadow and mint reflection
              without leaving the gesture.
            </p>
          </div>
          <span className="float-facet">
            {s.name}
            <small>
              {l.name} / {l.angle}°
            </small>
          </span>
        </section>
        <section
          className={`study ${issued ? "issued" : ""}`}
          id="study"
          aria-labelledby="study-title"
        >
          {!issued ? (
            <>
              <div>
                <p>04 / ATELIER STUDY</p>
                <h2 id="study-title">
                  FOLD THE
                  <br />
                  LIGHT TO
                  <br />
                  <b>YOUR HAND.</b>
                </h2>
                <span>
                  Fictional study only. No appraisal, payment or order.
                </span>
              </div>
              <form onSubmit={submit} noValidate>
                <header>
                  <b>LUCENT / GEM PAPER</b>
                  <span>{study}</span>
                </header>
                <fieldset>
                  <legend>Ring size</legend>
                  <div>
                    {sizes.map((x) => (
                      <button
                        type="button"
                        data-qa-action="size-select"
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
                    <dt>Metal</dt>
                    <dd>{m.name}</dd>
                  </div>
                  <div>
                    <dt>Stone</dt>
                    <dd>{s.name}</dd>
                  </div>
                  <div>
                    <dt>Light</dt>
                    <dd>{l.name}</dd>
                  </div>
                </dl>
                <button data-qa-action="study-submit">
                  FOLD THE GEM PAPER ↗
                </button>
              </form>
            </>
          ) : (
            <div className="paper" role="status">
              <p>LUCENT / STUDY ISSUED</p>
              <h2 id="study-title">
                LIGHT,
                <br />
                HELD
                <br />
                <b>FOR YOU.</b>
              </h2>
              <strong>{code}</strong>
              <div>
                <span>
                  METAL <b>{m.name}</b>
                </span>
                <span>
                  STONE <b>{s.name}</b>
                </span>
                <span>
                  LIGHT{" "}
                  <b>
                    {l.name} / {l.angle}°
                  </b>
                </span>
                <span>
                  SIZE <b>{size}</b>
                </span>
              </div>
              <small>FICTIONAL DEMO / NO APPRAISAL OR ORDER</small>
              <button
                data-qa-action="study-reset"
                onClick={() => {
                  setIssued(false);
                  setSize("");
                  setErrors({});
                }}
              >
                TURN ANOTHER LIGHT ↺
              </button>
            </div>
          )}
        </section>
      </main>
      <footer>
        <a className="logo" href="#top">
          LUCENT
        </a>
        <p>
          Original jewelry campaign
          <br />
          Fictional contemporary atelier
        </p>
        <p>
          Illustrative optical metrics
          <br />
          No appraisal or order
        </p>
        <a href="#top">BACK TO REFLECTION ↑</a>
      </footer>
    </div>
  );
}
