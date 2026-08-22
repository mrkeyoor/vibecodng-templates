import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
const A = (n) => `${import.meta.env.BASE_URL}${n}`;
const rooms = [
    {
      name: "Studio",
      iso: 31,
      tail: "0.2 s",
      desc: "Close walls. Exact edges.",
    },
    {
      name: "Street",
      iso: 26,
      tail: "0.8 s",
      desc: "Forward energy. Moving air.",
    },
    {
      name: "Hall",
      iso: 22,
      tail: "1.7 s",
      desc: "Long reflections. Open scale.",
    },
  ],
  widths = [
    { name: "Intimate", stage: 62, r: 76 },
    { name: "Wide", stage: 84, r: 100 },
    { name: "Cinema", stage: 96, r: 125 },
  ],
  focuses = [
    { name: "Voice", presence: "2.4 kHz", color: "#9deaff" },
    { name: "Pulse", presence: "72 Hz", color: "#ff641f" },
    { name: "Air", presence: "12 kHz", color: "#baff3b" },
  ],
  finishes = ["Cobalt / Signal", "Smoke / Ice", "Bone / Vermilion"];
export default function App() {
  const heroRef=useRef(null),reduce=useReducedMotion(),
    [room, setRoom] = useState(0),
    [width, setWidth] = useState(1),
    [focus, setFocus] = useState(0),
    [finish, setFinish] = useState(""),
    [errors, setErrors] = useState({}),
    [saved, setSaved] = useState(false);
  const {scrollYProgress}=useScroll({target:heroRef,offset:["start start","end start"]}),
    portraitY=useSpring(useTransform(scrollYProgress,[0,1],[0,reduce?0:130]),{stiffness:85,damping:25}),
    waveX=useSpring(useTransform(scrollYProgress,[0,1],[0,reduce?0:90]),{stiffness:95,damping:28}),
    profile = useMemo(
      () =>
        `${rooms[room].name} / ${widths[width].name} / ${focuses[focus].name}`,
      [room, width, focus],
    ),
    code = `SN-${rooms[room].name[0]}${widths[width].name[0]}${focuses[focus].name[0]}-${finish ? finish[0] : "-"}`;
  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget),
      n = {};
    if (!finish) n.finish = "Choose a finish.";
    if (!String(d.get("name") || "").trim()) n.name = "Add your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email") || "")))
      n.email = "Add a valid email.";
    setErrors(n);
    setSaved(!Object.keys(n).length);
  }
  return (
    <div className="shell">
      <a className="skip" href="#field">
        Skip to soundfield
      </a>
      <header>
        <a className="logo" href="#top">
          SONORA°
        </a>
        <nav aria-label="Primary">
          <a href="#driver"><small>01</small> DRIVER</a>
          <a href="#field"><small>02</small> SOUNDFIELD</a>
          <a href="#passport"><small>03</small> PASSPORT</a>
        </nav>
        <span>
          FIELD / {rooms[room].name.toUpperCase()} · {widths[width].stage}°
        </span>
      </header>
      <main id="top">
        <section ref={heroRef} className="hero">
          <motion.img
            src={A("sonora-hero.webp")}
            width="1122"
            height="1402"
            fetchPriority="high"
            alt="Listener wearing cobalt and orange headphones under blue waveform light"
            style={{y:portraitY,scale:reduce?1:1.06}}
          />
          <motion.div className="hero-wave" aria-hidden="true" style={{x:waveX}}>
            {[1, 2, 3, 4, 5, 6, 7].map((x) => (
              <motion.i key={x} animate={reduce?{}:{scaleY:[.35,1,.5,.85,.35]}} transition={{duration:1.7+x*.13,repeat:Infinity,ease:"easeInOut"}} />
            ))}
          </motion.div>
          <motion.div className="hero-copy" initial={reduce?false:{opacity:0,x:-55}} animate={{opacity:1,x:0}} transition={{duration:1,ease:[.16,1,.3,1]}}>
            <p>SPATIAL STUDY / 01</p>
            <h1>
              SOUND
              <br />
              HAS A<br />
              <b>POSITION.</b>
            </h1>
            <a href="#field">ENTER THE FIELD ↓</a>
          </motion.div>
          <div className="now">
            <span>NO AUDIO PLAYBACK</span>
            <b>{profile}</b>
            <i>VISUAL LISTENING DEMO</i>
          </div>
        </section>
        <section className="driver" id="driver">
          <img
            src={A("sonora-driver.webp")}
            width="1536"
            height="1024"
            loading="lazy"
            alt="Macro view of a cobalt earcup and orange woven driver"
          />
          <div className="driver-copy">
            <p>01 / DRIVER ANATOMY</p>
            <h2>
              40 MM
              <br />
              OF CONTROLLED
              <br />
              <b>AIR.</b>
            </h2>
            <dl>
              <div>
                <dt>01</dt>
                <dd>Woven bio-cellulose diaphragm</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>Angled acoustic chamber</dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>Pressure-equalizing mesh</dd>
              </div>
            </dl>
          </div>
          <div className="target" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>40</span>
          </div>
        </section>
        <section className="field" id="field" aria-labelledby="field-title">
          <header>
            <p>02 / SOUNDFIELD INSTRUMENT</p>
            <h2 id="field-title">
              PUT EVERY
              <br />
              SOURCE IN
              <br />
              <b>ITS PLACE.</b>
            </h2>
          </header>
          <div className="instrument">
            <motion.div
              className="radar"
              style={{
                "--radius": `${widths[width].r}%`,
                "--signal": focuses[focus].color,
                "--turn": `${room * 23 + focus * 11}deg`,
              }}
              aria-label={`Visual soundfield: ${profile}`}
              animate={reduce?{}:{rotate:room*8}}
              transition={{type:"spring",stiffness:90,damping:18}}
            >
              <i className="ring r1" />
              <i className="ring r2" />
              <i className="ring r3" />
              <span className="listener">YOU</span>
              {[0, 1, 2, 3, 4].map((n) => (
                <motion.b className={`source s${n}`} key={n} animate={reduce?{}:{scale:[1,1.22,1]}} transition={{duration:1.8+n*.28,repeat:Infinity}}>
                  S{n + 1}
                </motion.b>
              ))}
              <div className="pulse" />
            </motion.div>
            <div className="mixer">
              <fieldset>
                <legend>Room response</legend>
                {rooms.map((x, i) => (
                  <button
                    type="button"
                    data-qa-action="room-select"
                    aria-pressed={room === i}
                    onClick={() => setRoom(i)}
                    key={x.name}
                  >
                    <b>{x.name}</b>
                    <span>{x.tail}</span>
                  </button>
                ))}
              </fieldset>
              <fieldset>
                <legend>Stage width</legend>
                {widths.map((x, i) => (
                  <button
                    type="button"
                    data-qa-action="width-select"
                    aria-pressed={width === i}
                    onClick={() => setWidth(i)}
                    key={x.name}
                  >
                    <b>{x.name}</b>
                    <span>{x.stage}°</span>
                  </button>
                ))}
              </fieldset>
              <fieldset>
                <legend>Sonic focus</legend>
                {focuses.map((x, i) => (
                  <button
                    type="button"
                    data-qa-action="focus-select"
                    aria-pressed={focus === i}
                    onClick={() => setFocus(i)}
                    key={x.name}
                  >
                    <i style={{ background: x.color }} />
                    <b>{x.name}</b>
                    <span>{x.presence}</span>
                  </button>
                ))}
              </fieldset>
              <motion.div className="readout" role="status" aria-live="polite" animate={reduce?{}:{scale:[.985,1]}} transition={{duration:.35}}>
                <p>LIVE FIELD / {profile}</p>
                <strong>{rooms[room].desc}</strong>
                <dl>
                  <div>
                    <dt>Stage</dt>
                    <dd>{widths[width].stage}°</dd>
                  </div>
                  <div>
                    <dt>Attenuation</dt>
                    <dd>−{rooms[room].iso} dB</dd>
                  </div>
                  <div>
                    <dt>Presence</dt>
                    <dd>{focuses[focus].presence}</dd>
                  </div>
                </dl>
              </motion.div>
              <a href="#passport">SAVE THIS FIELD ↘</a>
            </div>
          </div>
        </section>
        <section className="quiet">
          <img
            src={A("sonora-transit.webp")}
            width="1122"
            height="1402"
            loading="lazy"
            alt="Listener wearing cobalt headphones in a blue and orange transit corridor"
          />
          <div>
            <p>03 / QUIET ARCHITECTURE</p>
            <h2>
              THE CITY
              <br />
              MOVES.
              <br />
              <b>YOU DON'T.</b>
            </h2>
            <p>
              Pressure-aware cushions and a closed acoustic shell turn motion
              into a stable listening plane.
            </p>
          </div>
          <aside>
            <span>ATTENUATION</span>
            <strong>−{rooms[room].iso} dB</strong>
            <i style={{ width: `${rooms[room].iso * 2.6}%` }} />
          </aside>
        </section>
        <section className="still">
          <img
            src={A("sonora-still.webp")}
            width="1536"
            height="1024"
            loading="lazy"
            alt="Cobalt and orange headphones inside clear light ribbons"
          />
          <p>
            FORM
            <br />
            <b>
              FOLLOWS
              <br />
              THE FIELD.
            </b>
          </p>
        </section>
        <section
          className={`passport ${saved ? "saved" : ""}`}
          id="passport"
          aria-labelledby="passport-title"
        >
          {!saved ? (
            <>
              <div>
                <p>04 / LISTENING PASSPORT</p>
                <h2 id="passport-title">
                  KEEP YOUR
                  <br />
                  FIELD
                  <br />
                  <b>WITH YOU.</b>
                </h2>
                <span>
                  Fictional local save. No payment, account or audio profile is
                  created.
                </span>
              </div>
              <form onSubmit={submit} noValidate>
                <header>
                  <b>SONORA / FIELD PLAYER</b>
                  <span>{profile}</span>
                </header>
                <fieldset>
                  <legend>Headphone finish</legend>
                  {finishes.map((x) => (
                    <button
                      type="button"
                      data-qa-action="finish-select"
                      aria-pressed={finish === x}
                      onClick={() => setFinish(x)}
                      key={x}
                    >
                      {x}
                    </button>
                  ))}
                  {errors.finish && <small>{errors.finish}</small>}
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
                <div className="mini-player">
                  <i />
                  <span>
                    {profile}
                    <small>VISUAL DEMO / SILENT</small>
                  </span>
                  <b>●</b>
                </div>
                <button data-qa-action="passport-submit">
                  SAVE LISTENING PASSPORT ↗
                </button>
              </form>
            </>
          ) : (
            <div className="saved-card" role="status">
              <p>SONORA / FIELD SAVED</p>
              <h2 id="passport-title">
                YOUR
                <br />
                POSITION
                <br />
                <b>HOLDS.</b>
              </h2>
              <strong>{code}</strong>
              <dl>
                <div>
                  <dt>Field</dt>
                  <dd>{profile}</dd>
                </div>
                <div>
                  <dt>Finish</dt>
                  <dd>{finish}</dd>
                </div>
              </dl>
              <small>FICTIONAL DEMO / NO ACCOUNT CREATED</small>
              <button
                data-qa-action="passport-reset"
                onClick={() => {
                  setSaved(false);
                  setFinish("");
                  setErrors({});
                }}
              >
                TUNE ANOTHER FIELD ↺
              </button>
            </div>
          )}
        </section>
      </main>
      <footer>
        <a className="logo" href="#top">
          SONORA°
        </a>
        <p>
          Original headphone campaign
          <br />
          Fictional audio label
        </p>
        <p>
          Illustrative acoustic data
          <br />
          Silent visual demo
        </p>
        <a href="#top">BACK TO SOURCE ↑</a>
      </footer>
    </div>
  );
}
