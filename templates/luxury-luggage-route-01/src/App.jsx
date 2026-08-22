import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
const A = (n) => `${import.meta.env.BASE_URL}${n}`;
const destinations = [
    {
      city: "Kyoto",
      code: "KIX",
      km: "9,516",
      climate: "18–25°C / rain",
      case: "Cabin 42",
      litres: 42,
      color: "#df9d18",
    },
    {
      city: "Reykjavík",
      code: "KEF",
      km: "5,720",
      climate: "4–11°C / wind",
      case: "Check 68",
      litres: 68,
      color: "#80b9ce",
    },
    {
      city: "Marrakech",
      code: "RAK",
      km: "7,287",
      climate: "21–33°C / dry",
      case: "Cabin 48",
      litres: 48,
      color: "#dc673d",
    },
  ],
  rhythms = [
    { name: "City", items: ["TAILORING", "WALKING", "TECH", "EVENING"] },
    { name: "Field", items: ["SHELL", "LAYERS", "BOOT", "CAMERA"] },
    { name: "Black tie", items: ["SUIT", "SHIRT", "SHOE", "STEAMER"] },
  ],
  days = [3, 7, 14],
  finishes = ["Oxblood / Saffron", "Night / Champagne", "Parchment / Oxblood"];
export default function App() {
  const heroRef=useRef(null),reduce=useReducedMotion(),
    [dest, setDest] = useState(0),
    [rhythm, setRhythm] = useState(0),
    [duration, setDuration] = useState(1),
    [finish, setFinish] = useState(""),
    [errors, setErrors] = useState({}),
    [issued, setIssued] = useState(false);
  const {scrollYProgress}=useScroll({target:heroRef,offset:["start start","end start"]}),
    journeyY=useSpring(useTransform(scrollYProgress,[0,1],[0,reduce?0:150]),{stiffness:82,damping:25}),
    ribbonX=useSpring(useTransform(scrollYProgress,[0,1],[0,reduce?0:110]),{stiffness:96,damping:28}),
    d = destinations[dest],
    r = rhythms[rhythm],
    n = days[duration],
    fill = Math.min(94, 38 + n * 4 + rhythm * 5 + dest * 3),
    weight = (4.2 + n * 0.55 + rhythm * 0.7).toFixed(1),
    route = useMemo(() => `LHR → ${d.code} / ${n}D / ${r.name}`, [d, n, r]);
  const code = `MR-${d.code}-${n}-${finish ? finish[0] : "-"}`;
  function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget),
      x = {};
    if (!finish) x.finish = "Choose a case finish.";
    if (!String(fd.get("name") || "").trim()) x.name = "Add your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(fd.get("email") || "")))
      x.email = "Add a valid email.";
    setErrors(x);
    setIssued(!Object.keys(x).length);
  }
  return (
    <div className="shell">
      <a className="skip" href="#route">
        Skip to route desk
      </a>
      <header>
        <a className="logo" href="#top">
          MERIDIAN
        </a>
        <nav aria-label="Primary">
          <a href="#craft"><small>01</small> SHELL</a>
          <a href="#route"><small>02</small> ROUTE</a>
          <a href="#folio"><small>03</small> FOLIO</a>
        </nav>
        <span>
          DEPART / LHR → {d.code} · {weight} KG
        </span>
      </header>
      <main id="top">
        <section ref={heroRef} className="hero">
          <motion.img
            src={A("meridian-hero.webp")}
            width="1586"
            height="992"
            fetchPriority="high"
            alt="Traveler pulling an oxblood suitcase through amber airport architecture"
            style={{y:journeyY,scale:reduce?1:1.055}}
          />
          <motion.div className="hero-copy" initial={reduce?false:{opacity:0,x:-60}} animate={{opacity:1,x:0}} transition={{duration:1,ease:[.16,1,.3,1]}}>
            <p>SECTOR 001 / DEPARTURE</p>
            <h1>
              PACK
              <br />
              THE
              <br />
              <b>ROUTE.</b>
            </h1>
            <a href="#route">OPEN ROUTE DESK ↓</a>
          </motion.div>
          <motion.div className="ribbon" aria-hidden="true" style={{x:ribbonX}}>
            <i />
            <span>LHR</span>
            <b>························</b>
            <span>{d.code}</span>
          </motion.div>
          <div className="depart">
            <span>DESTINATION</span>
            <strong>{d.city}</strong>
            <i>
              {n} DAYS / {r.name.toUpperCase()}
            </i>
          </div>
        </section>
        <section className="craft" id="craft">
          <div>
            <p>01 / SHELL CRAFT</p>
            <h2>
              BUILT TO
              <br />
              TAKE THE
              <br />
              <b>LONG WAY.</b>
            </h2>
            <p>
              Ribbed polycarbonate flexes around impact. An aluminum spine keeps
              the case square under transfer.
            </p>
          </div>
          <figure>
            <img
              src={A("meridian-shell.webp")}
              width="1536"
              height="1024"
              loading="lazy"
              alt="Macro of oxblood luggage shell, champagne aluminum corner and wheel"
            />
            <figcaption>
              <span>01 / SHELL RIB</span>
              <span>02 / CORNER CAP</span>
              <span>03 / SILENT WHEEL</span>
            </figcaption>
          </figure>
        </section>
        <section className="route" id="route" aria-labelledby="route-title">
          <header>
            <p>02 / ROUTE DESK</p>
            <h2 id="route-title">
              THE CASE
              <br />
              FOLLOWS
              <br />
              <b>THE PLAN.</b>
            </h2>
          </header>
          <div className="desk">
            <div className="map" style={{ "--route": d.color }}>
              <span className="origin">
                LHR<small>DEPART</small>
              </span>
              <i className="path p1" />
              <i className="path p2" />
              <i className="path p3" />
              <motion.b key={d.code} className="plane" initial={reduce?false:{x:-90,y:55,opacity:0}} animate={{x:dest*28,y:-dest*18,opacity:1,rotate:18}} transition={{duration:1.4,ease:[.16,1,.3,1]}}>✦</motion.b>
              <span className="destination">
                {d.code}
                <small>{d.city.toUpperCase()}</small>
              </span>
              <div className="route-stats">
                <span>
                  DISTANCE <b>{d.km} KM</b>
                </span>
                <span>
                  CLIMATE <b>{d.climate}</b>
                </span>
                <span>
                  SECTOR <b>{n} DAYS</b>
                </span>
              </div>
            </div>
            <div className="controls">
              <fieldset>
                <legend>Destination</legend>
                {destinations.map((x, i) => (
                  <button
                    type="button"
                    data-qa-action="destination-select"
                    aria-pressed={dest === i}
                    onClick={() => setDest(i)}
                    key={x.code}
                  >
                    <b>{x.code}</b>
                    <span>{x.city}</span>
                    <small>{x.km} KM</small>
                  </button>
                ))}
              </fieldset>
              <fieldset>
                <legend>Trip rhythm</legend>
                {rhythms.map((x, i) => (
                  <button
                    type="button"
                    data-qa-action="rhythm-select"
                    aria-pressed={rhythm === i}
                    onClick={() => setRhythm(i)}
                    key={x.name}
                  >
                    <b>{x.name}</b>
                    <span>{x.items.slice(0, 2).join(" / ")}</span>
                  </button>
                ))}
              </fieldset>
              <fieldset>
                <legend>Duration</legend>
                <div>
                  {days.map((x, i) => (
                    <button
                      type="button"
                      data-qa-action="duration-select"
                      aria-pressed={duration === i}
                      onClick={() => setDuration(i)}
                      key={x}
                    >
                      {x}D
                    </button>
                  ))}
                </div>
              </fieldset>
              <motion.div className="recommend" role="status" aria-live="polite" animate={reduce?{}:{scale:[.985,1]}} transition={{duration:.35}}>
                <p>PACKED ROUTE / {route}</p>
                <strong>{d.case}</strong>
                <dl>
                  <div>
                    <dt>Volume</dt>
                    <dd>{d.litres} L</dd>
                  </div>
                  <div>
                    <dt>Fill</dt>
                    <dd>{fill}%</dd>
                  </div>
                  <div>
                    <dt>Loaded</dt>
                    <dd>{weight} KG</dd>
                  </div>
                </dl>
              </motion.div>
              <a href="#folio">ISSUE ROUTE FOLIO ↘</a>
            </div>
          </div>
        </section>
        <section className="inside">
          <div className="case">
            <header>
              <span>{d.case}</span>
              <b>{fill}% FULL</b>
            </header>
            <div className="cells">
              {r.items.map((x, i) => (
                <motion.i layout
                  key={x}
                  initial={reduce?false:{scale:.85}}
                  animate={{scale:1}}
                  transition={{delay:i*.07}}
                  style={{ "--cell": `${Math.min(80, 40 + n * 2 + i * 5)}%` }}
                >
                  <span>{x}</span>
                </motion.i>
              ))}
            </div>
            <footer>
              <span>{d.litres} L</span>
              <span>{weight} KG</span>
            </footer>
          </div>
          <img
            src={A("meridian-walk.webp")}
            width="1122"
            height="1402"
            loading="lazy"
            alt="Traveler pulling oxblood luggage through cobalt and terracotta architecture"
          />
          <div className="inside-copy">
            <p>03 / INSIDE THE CASE</p>
            <h2>
              EVERY
              <br />
              CENTIMETRE
              <br />
              <b>HAS A STOP.</b>
            </h2>
          </div>
        </section>
        <section className="still">
          <img
            src={A("meridian-still.webp")}
            width="1536"
            height="1024"
            loading="lazy"
            alt="Matching oxblood cabin and check-in suitcases on parchment steps"
          />
          <div>
            <p>ONE SHELL LANGUAGE.</p>
            <h2>
              42 L<br />
              68 L<br />
              <b>100 L</b>
            </h2>
          </div>
        </section>
        <section
          className={`folio ${issued ? "issued" : ""}`}
          id="folio"
          aria-labelledby="folio-title"
        >
          {!issued ? (
            <>
              <div>
                <p>04 / BOARDING FOLIO</p>
                <h2 id="folio-title">
                  YOUR ROUTE.
                  <br />
                  YOUR CASE.
                  <br />
                  <b>ONE FOLD.</b>
                </h2>
                <span>
                  Fictional route outcome. No ticket, payment or luggage order.
                </span>
              </div>
              <form onSubmit={submit} noValidate>
                <header>
                  <b>MERIDIAN / ROUTE ISSUE</b>
                  <span>{route}</span>
                </header>
                <fieldset>
                  <legend>Case finish</legend>
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
                <dl>
                  <div>
                    <dt>Case</dt>
                    <dd>{d.case}</dd>
                  </div>
                  <div>
                    <dt>Route</dt>
                    <dd>LHR → {d.code}</dd>
                  </div>
                  <div>
                    <dt>Load</dt>
                    <dd>{weight} KG</dd>
                  </div>
                </dl>
                <button data-qa-action="folio-submit">FOLD THE ROUTE ↗</button>
              </form>
            </>
          ) : (
            <div className="pass" role="status">
              <p>MERIDIAN / FOLIO ISSUED</p>
              <h2 id="folio-title">
                CLEARED
                <br />
                TO
                <br />
                <b>PACK.</b>
              </h2>
              <strong>{code}</strong>
              <div>
                <span>
                  FROM <b>LHR</b>
                </span>
                <span>
                  TO <b>{d.code}</b>
                </span>
                <span>
                  CASE <b>{d.case}</b>
                </span>
                <span>
                  DAYS <b>{n}</b>
                </span>
              </div>
              <small>FICTIONAL DEMO / NO BOOKING OR ORDER</small>
              <button
                data-qa-action="folio-reset"
                onClick={() => {
                  setIssued(false);
                  setFinish("");
                  setErrors({});
                }}
              >
                PLAN ANOTHER ROUTE ↺
              </button>
            </div>
          )}
        </section>
      </main>
      <footer>
        <a className="logo" href="#top">
          MERIDIAN
        </a>
        <p>
          Original luggage campaign
          <br />
          Fictional travel goods house
        </p>
        <p>
          Illustrative distance and load
          <br />
          No booking or purchase
        </p>
        <a href="#top">BACK TO DEPARTURE ↑</a>
      </footer>
    </div>
  );
}
