import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
const A = (n) => `${import.meta.env.BASE_URL}${n}`;
const banks = {
  top: [
    { name: "Bergamot", color: "#cde800", air: "bright cut" },
    { name: "Juniper", color: "#68e1d1", air: "cold lift" },
    { name: "Pink pepper", color: "#ff766c", air: "electric spark" },
  ],
  heart: [
    { name: "Iris", color: "#a67be8", air: "velvet shadow" },
    { name: "Black tea", color: "#c47345", air: "dry steam" },
    { name: "Apricot", color: "#ffad66", air: "soft pulse" },
  ],
  base: [
    { name: "Labdanum", color: "#6f264e", air: "amber gravity" },
    { name: "Cedar", color: "#8b5a3a", air: "clean grain" },
    { name: "Skin musk", color: "#e5c6b8", air: "quiet heat" },
  ],
};
const hours = [
  { n: "00", v: 92 },
  { n: "01", v: 88 },
  { n: "03", v: 74 },
  { n: "06", v: 55 },
  { n: "09", v: 38 },
  { n: "12", v: 24 },
];
export default function App() {
  const heroRef=useRef(null), reduce=useReducedMotion(),
    [top, setTop] = useState(0),
    [heart, setHeart] = useState(0),
    [base, setBase] = useState(0),
    [sample, setSample] = useState(""),
    [errors, setErrors] = useState({}),
    [issued, setIssued] = useState(false);
  const {scrollYProgress}=useScroll({target:heroRef,offset:["start start","end start"]}),
    bottleY=useSpring(useTransform(scrollYProgress,[0,1],[0,reduce?0:155]),{stiffness:80,damping:24}),
    cloudY=useSpring(useTransform(scrollYProgress,[0,1],[0,reduce?0:-90]),{stiffness:70,damping:26}),
    notes = {
      top: banks.top[top],
      heart: banks.heart[heart],
      base: banks.base[base],
    },
    formula = useMemo(
      () => `${notes.top.name} · ${notes.heart.name} · ${notes.base.name}`,
      [notes.top, notes.heart, notes.base],
    ),
    code = `SG-${notes.top.name[0]}${notes.heart.name[0]}${notes.base.name[0]}-${sample || "--"}`;
  function send(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget),
      n = {};
    if (!sample) n.sample = "Choose a blotter size.";
    if (!String(d.get("name") || "").trim()) n.name = "Add your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email") || "")))
      n.email = "Add a valid email.";
    setErrors(n);
    setIssued(!Object.keys(n).length);
  }
  return (
    <div className="shell">
      <a className="skip" href="#composer">
        Skip to accord composer
      </a>
      <header className="mast">
        <a href="#top" className="wordmark">
          SILLAGE
        </a>
        <nav aria-label="Primary">
          <a href="#materials"><small>01</small> MATERIALS</a>
          <a href="#composer"><small>02</small> COMPOSE</a>
          <a href="#blotter"><small>03</small> BLOTTER</a>
        </nav>
        <span>
          FORMULA / {notes.top.name[0]}
          {notes.heart.name[0]}
          {notes.base.name[0]}
        </span>
      </header>
      <main id="top">
        <section ref={heroRef} className="hero">
          <motion.img
            src={A("sillage-hero.webp")}
            width="1122"
            height="1402"
            fetchPriority="high"
            alt="Plum glass perfume bottle floating inside coral and chartreuse vapor"
            style={{y:bottleY,scale:reduce?1:1.06}}
          />
          <motion.div className="vapor v1" style={{ "--cloud": notes.top.color,y:cloudY }} animate={reduce?{}:{x:[0,24,-10,0],scale:[1,1.08,.96,1]}} transition={{duration:9,repeat:Infinity,ease:"easeInOut"}} />
          <motion.div className="vapor v2" style={{ "--cloud": notes.heart.color,y:cloudY }} animate={reduce?{}:{x:[0,-20,14,0],scale:[1,.94,1.1,1]}} transition={{duration:11,repeat:Infinity,ease:"easeInOut"}} />
          <motion.div className="vapor v3" style={{ "--cloud": notes.base.color,y:cloudY }} animate={reduce?{}:{rotate:[0,5,-4,0]}} transition={{duration:13,repeat:Infinity,ease:"easeInOut"}} />
          <motion.div className="hero-type" initial={reduce?false:{opacity:0,y:55}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[.16,1,.3,1]}}>
            <p>OLFACTIVE STUDY / 001</p>
            <h1>
              THE AIR
              <br />
              REMEMBERS
              <br />
              <i>YOU.</i>
            </h1>
            <a href="#composer">COMPOSE THE INVISIBLE ↓</a>
          </motion.div>
          <ol className="hero-notes">
            <li>
              <b>TOP</b>
              {notes.top.name}
            </li>
            <li>
              <b>HEART</b>
              {notes.heart.name}
            </li>
            <li>
              <b>BASE</b>
              {notes.base.name}
            </li>
          </ol>
        </section>
        <section className="materials" id="materials">
          <div className="materials-title">
            <p>01 / RAW MATERIALS</p>
            <h2>
              BRIGHT.
              <br />
              <i>VELVET.</i>
              <br />
              DARK.
            </h2>
          </div>
          <figure>
            <img
              src={A("sillage-botanicals.webp")}
              width="1536"
              height="1024"
              loading="lazy"
              alt="Wet bergamot, purple iris and dark labdanum resin"
            />
            <figcaption>
              <span>BERGAMOT / VOLATILE</span>
              <span>IRIS / TEXTURAL</span>
              <span>LABDANUM / FIXATIVE</span>
            </figcaption>
          </figure>
          <p className="materials-copy">
            Three materials. Not a pyramid—a conversation that changes
            temperature on skin.
          </p>
        </section>
        <section
          className="composer"
          id="composer"
          aria-labelledby="composer-title"
        >
          <header>
            <p>02 / ACCORD CHAMBER</p>
            <h2 id="composer-title">
              BUILD WHAT
              <br />
              THE ROOM
              <br />
              <i>KEEPS.</i>
            </h2>
          </header>
          <div className="bench">
            <div className="vessel" aria-hidden="true">
              <motion.div
                className="liquid top"
                style={{ background: notes.top.color }}
                animate={{height:`${26+top*5}%`}}
              />
              <motion.div
                className="liquid heart"
                style={{ background: notes.heart.color }}
                animate={{height:`${30+heart*4}%`}}
              />
              <motion.div
                className="liquid base"
                style={{ background: notes.base.color }}
                animate={{height:`${34+base*3}%`}}
              />
              <span>SILLAGE</span>
            </div>
            <div className="ledger">
              {Object.entries(banks).map(([layer, items]) => (
                <fieldset key={layer}>
                  <legend>
                    <b>{layer}</b>
                    <span>{notes[layer].air}</span>
                  </legend>
                  {items.map((n, i) => (
                    <button
                      type="button"
                      data-qa-action={`${layer}-note`}
                      aria-pressed={{ top, heart, base }[layer] === i}
                      onClick={() =>
                        ({ top: setTop, heart: setHeart, base: setBase })[
                          layer
                        ](i)
                      }
                      key={n.name}
                    >
                      <i style={{ background: n.color }} />
                      <span>{n.name}</span>
                      <small>{n.air}</small>
                    </button>
                  ))}
                </fieldset>
              ))}
              <motion.div className="formula" role="status" aria-live="polite" animate={reduce?{}:{scale:[.985,1]}} transition={{duration:.35}}>
                <p>FORMULA IN AIR</p>
                <strong>{formula}</strong>
                <dl>
                  <div>
                    <dt>Diffusion</dt>
                    <dd>{74 + top * 3 - heart}%</dd>
                  </div>
                  <div>
                    <dt>Skin hour</dt>
                    <dd>{10 + base}H</dd>
                  </div>
                  <div>
                    <dt>Trail</dt>
                    <dd>{["Luminous", "Close", "Electric"][heart]}</dd>
                  </div>
                </dl>
              </motion.div>
              <a href="#blotter">ISSUE THIS ACCORD ↘</a>
            </div>
          </div>
        </section>
        <section className="skin">
          <img
            src={A("sillage-model.webp")}
            width="1122"
            height="1402"
            loading="lazy"
            alt="Model in violet tailoring holding a plum perfume bottle"
          />
          <div className="skin-copy">
            <p>03 / SKIN HOUR</p>
            <h2>
              FIRST
              <br />
              THE ROOM.
              <br />
              <i>THEN YOU.</i>
            </h2>
            <p>
              {notes.top.name} opens in a {notes.top.air}. {notes.heart.name}{" "}
              leaves a {notes.heart.air}. {notes.base.name} stays as{" "}
              {notes.base.air}.
            </p>
          </div>
          <div
            className="curve"
            aria-label="Illustrative twelve hour fragrance diffusion"
          >
            <span>DIFFUSION / 12H</span>
            {hours.map((h) => (
              <div key={h.n}>
                <b>{h.n}</b>
                <i
                  style={{
                    width: `${h.v}%`,
                    background: `linear-gradient(90deg,${notes.top.color},${notes.heart.color},${notes.base.color})`,
                  }}
                />
                <em>{h.v}%</em>
              </div>
            ))}
          </div>
        </section>
        <section className="still">
          <img
            src={A("sillage-still.webp")}
            width="1536"
            height="1024"
            loading="lazy"
            alt="Plum fragrance bottle with chartreuse, coral and lilac scent blotters"
          />
          <blockquote>
            “A scent should arrive before language and leave after the light.”
          </blockquote>
        </section>
        <section
          className={`blotter ${issued ? "issued" : ""}`}
          id="blotter"
          aria-labelledby="blotter-title"
        >
          {!issued ? (
            <>
              <div className="blotter-intro">
                <p>04 / BLOTTER ISSUE</p>
                <h2 id="blotter-title">
                  TAKE THE
                  <br />
                  AIR WITH
                  <br />
                  <i>YOU.</i>
                </h2>
                <span>
                  Fictional sample flow. No payment or real fulfillment.
                </span>
              </div>
              <form onSubmit={send} noValidate>
                <header>
                  <b>SILLAGE / SAMPLE DESK</b>
                  <span>{formula}</span>
                </header>
                <fieldset>
                  <legend>Blotter format</legend>
                  <div>
                    {["2ML", "5ML", "CARD"].map((x) => (
                      <button
                        type="button"
                        data-qa-action="sample-select"
                        aria-pressed={sample === x}
                        onClick={() => setSample(x)}
                        key={x}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                  {errors.sample && <small>{errors.sample}</small>}
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
                <div className="strip">
                  <span style={{ background: notes.top.color }} />
                  <span style={{ background: notes.heart.color }} />
                  <span style={{ background: notes.base.color }} />
                </div>
                <button data-qa-action="blotter-submit">
                  FOLD THE SAMPLE ↗
                </button>
              </form>
            </>
          ) : (
            <div className="envelope" role="status">
              <p>SILLAGE / BLOTTER ISSUED</p>
              <h2 id="blotter-title">
                THE AIR
                <br />
                IS NOW
                <br />
                <i>YOURS.</i>
              </h2>
              <strong>{code}</strong>
              <p>{formula}</p>
              <small>FICTIONAL DEMO / NO ORDER PLACED</small>
              <button
                data-qa-action="blotter-reset"
                onClick={() => {
                  setIssued(false);
                  setSample("");
                  setErrors({});
                }}
              >
                COMPOSE ANOTHER ↺
              </button>
            </div>
          )}
        </section>
      </main>
      <footer>
        <a className="wordmark" href="#top">
          SILLAGE
        </a>
        <p>
          Original fragrance campaign
          <br />
          Fictional independent house
        </p>
        <p>
          Illustrative note evolution
          <br />
          No sample fulfillment
        </p>
        <a href="#top">BACK TO FIRST BREATH ↑</a>
      </footer>
    </div>
  );
}
