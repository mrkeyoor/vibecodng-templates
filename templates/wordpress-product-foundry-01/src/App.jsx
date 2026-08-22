import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const A = (file) => `${import.meta.env.BASE_URL}${file}`;

const themes = [
  {
    id: "nova",
    name: "NOVA Commerce",
    code: "THM—01",
    type: "Commerce",
    image: "foundry-commerce.webp",
    price: 89,
    version: "3.4.1",
    wp: "6.6+",
    php: "8.1+",
    font: "Wide grotesk / mono",
    blocks: 42,
    color: "#b9ef2d",
    line: "Products become objects of attention.",
    features: [
      "WooCommerce ready",
      "FSE checkout patterns",
      "42 native blocks",
    ],
  },
  {
    id: "field",
    name: "FIELD Notes",
    code: "THM—02",
    type: "Editorial",
    image: "foundry-editorial.webp",
    price: 74,
    version: "2.8.0",
    wp: "6.5+",
    php: "8.0+",
    font: "Editorial sans / serif",
    blocks: 36,
    color: "#ff674e",
    line: "A publishing system with a point of view.",
    features: [
      "Magazine query loops",
      "Contributor profiles",
      "Reading-mode styles",
    ],
  },
  {
    id: "atria",
    name: "ATRIA Stays",
    code: "THM—03",
    type: "Hospitality",
    image: "foundry-hospitality.webp",
    price: 96,
    version: "4.1.2",
    wp: "6.6+",
    php: "8.1+",
    font: "Humanist display / mono",
    blocks: 39,
    color: "#68d7ff",
    line: "Hospitality pages that hold atmosphere.",
    features: [
      "Room collection types",
      "Booking hand-off",
      "Local guide patterns",
    ],
  },
];

const plugins = [
  {
    id: "schema",
    name: "Schema Studio",
    code: "PLG—11",
    price: 29,
    version: "2.7.4",
    function: "Structured data",
    weight: 1,
    support: ["nova", "field", "atria"],
  },
  {
    id: "cache",
    name: "Cache Pilot",
    code: "PLG—12",
    price: 19,
    version: "1.9.2",
    function: "Page delivery",
    weight: 0,
    support: ["nova", "field", "atria"],
  },
  {
    id: "forms",
    name: "Forms Relay",
    code: "PLG—13",
    price: 25,
    version: "3.2.0",
    function: "Form routing",
    weight: 1,
    support: ["nova", "field", "atria"],
  },
  {
    id: "checkout",
    name: "Checkout Boost",
    code: "PLG—14",
    price: 39,
    version: "2.4.6",
    function: "Cart recovery",
    weight: 2,
    support: ["nova"],
  },
  {
    id: "members",
    name: "Member Routes",
    code: "PLG—15",
    price: 49,
    version: "1.8.1",
    function: "Access control",
    weight: 3,
    support: ["nova", "field"],
  },
];

const tiers = [
  {
    id: "solo",
    name: "Solo updates",
    price: 0,
    response: "Docs + release notes",
  },
  {
    id: "studio",
    name: "Studio channel",
    price: 79,
    response: "2 business days",
  },
  {
    id: "agency",
    name: "Agency channel",
    price: 149,
    response: "Priority / 1 business day",
  },
];

const reveal = {
  initial: { opacity: 0, y: 38 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function App() {
  const heroRef = useRef(null);
  const menuButtonRef = useRef(null);
  const reduce = useReducedMotion();
  const enter = reduce
    ? {
        initial: false,
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      }
    : reveal;
  const [themeIndex, setThemeIndex] = useState(0);
  const [selected, setSelected] = useState(["schema", "cache"]);
  const [tier, setTier] = useState("studio");
  const [menu, setMenu] = useState(false);
  const [errors, setErrors] = useState({});
  const [issued, setIssued] = useState(false);
  const theme = themes[themeIndex];
  const activePlugins = plugins.filter((item) => selected.includes(item.id));
  const support = tiers.find((item) => item.id === tier);
  const incompatible = activePlugins.filter(
    (item) => !item.support.includes(theme.id),
  );
  const score = Math.max(
    74,
    97 -
      activePlugins.reduce((sum, item) => sum + item.weight, 0) -
      incompatible.length * 7,
  );
  const maintenance =
    activePlugins.length < 3
      ? "Light"
      : activePlugins.length < 5
        ? "Balanced"
        : "Active";
  const total =
    theme.price +
    activePlugins.reduce((sum, item) => sum + item.price, 0) +
    support.price;
  const manifest = useMemo(
    () =>
      `BC-${theme.code.slice(-2)}-${selected.length}${tier[0].toUpperCase()}-${total}`,
    [theme, selected, tier, total],
  );
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const chassisY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]),
    { stiffness: 80, damping: 24 },
  );
  const chassisRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-3, reduce ? -3 : 3],
  );

  const setTheme = (index) => {
    setThemeIndex(index);
    setIssued(false);
  };
  const cycleTheme = (direction) =>
    setTheme((themeIndex + direction + themes.length) % themes.length);
  const togglePlugin = (id) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setIssued(false);
  };
  const closeMenu = () => {
    setMenu(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };
  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    const escape = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", escape);
    };
  }, [menu]);
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = {};
    if (!String(data.get("name") || "").trim()) next.name = "Add your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") || "")))
      next.email = "Add a valid email.";
    if (incompatible.length)
      next.stack = "Resolve incompatible plugins before issue.";
    setErrors(next);
    setIssued(!Object.keys(next).length);
  };

  return (
    <div className="site">
      <a className="skip" href="#compiler">
        Skip to stack compiler
      </a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="BLOCK CTRL home">
          <b>BLOCK</b>
          <i>/</i>
          <span>CTRL</span>
        </a>
        <nav aria-label="Primary">
          <a href="#themes">
            <small>01</small> Themes
          </a>
          <a href="#plugins">
            <small>02</small> Plugins
          </a>
          <a href="#compiler">
            <small>03</small> Compiler
          </a>
        </nav>
        <div className="release-status">
          <i /> 03 themes / 05 plugins
        </div>
        <button
          ref={menuButtonRef}
          data-qa-action="menu"
          className="menu-trigger"
          type="button"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
        >
          Index <span>+</span>
        </button>
      </header>

      {menu && (
          <motion.div
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Product index"
            initial={reduce ? false : { opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={(event) => {
              if (event.key === "Escape") closeMenu();
            }}
          >
            <div>
              <p>BLOCK/CTRL / PRODUCT INDEX</p>
              <button type="button" onClick={closeMenu}>
                Close ×
              </button>
            </div>
            <nav aria-label="Product sections">
              {[
                ["themes", "Theme specimens"],
                ["plugins", "Plugin releases"],
                ["compiler", "Stack compiler"],
                ["manifest", "Build manifest"],
              ].map(([id, label], i) => (
                <a key={id} href={`#${id}`} onClick={closeMenu}>
                  <small>0{i + 1}</small>
                  <b>{label}</b>
                  <span>↘</span>
                </a>
              ))}
            </nav>
            <p>
              Fictional WordPress product studio
              <br />
              Illustrative releases / no downloads
            </p>
          </motion.div>
      )}

      <main id="top">
        <section className="hero" ref={heroRef} aria-labelledby="hero-title">
          <div className="hero-copy">
            <p>
              <span>RELEASE FOUNDRY / 2026</span>
              <b>Independent WordPress products</b>
            </p>
            <motion.h1
              id="hero-title"
              initial={reduce ? false : { opacity: 0, x: -55 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              WE BUILD
              <br />
              <i>THEMES.</i>
              <br />
              PLUG IN
              <br />
              <b>CONTROL.</b>
            </motion.h1>
            <div className="hero-actions">
              <a href="#themes">Browse releases ↓</a>
              <a href="#compiler">Compile a stack ↘</a>
            </div>
          </div>
          <motion.div
            className="hero-chassis"
            style={{ y: chassisY, rotate: chassisRotate }}
          >
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span>preview.blockctrl.test</span>
              <b>WP 6.6</b>
            </div>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={theme.id}
                className="chassis-preview"
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={A(theme.image)}
                  width="1536"
                  height="1024"
                  fetchPriority="high"
                  alt={`${theme.name} theme specimen`}
                />
                <div className="preview-copy">
                  <small>{theme.type} block theme</small>
                  <strong>{theme.name}</strong>
                  <span>{theme.line}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="socket-rail" aria-hidden="true">
              {plugins.slice(0, 4).map((item, i) => (
                <motion.i
                  key={item.id}
                  animate={reduce ? {} : { y: [0, -5, 0] }}
                  transition={{ duration: 2.4 + i * 0.3, repeat: Infinity }}
                  className={selected.includes(item.id) ? "active" : ""}
                >
                  <b>{item.code.slice(-2)}</b>
                  <span>{item.name}</span>
                </motion.i>
              ))}
            </div>
            <div className="compile-line">
              <span>BUILD HEALTH</span>
              <i>
                <motion.b animate={{ width: `${score}%` }} />
              </i>
              <strong>{score}</strong>
            </div>
          </motion.div>
          <div className="hero-stamp">
            <span>SHIP</span>
            <b>BETTER</b>
            <i>WP</i>
          </div>
        </section>

        <section className="release-ticker" aria-label="Release disciplines">
          <div aria-hidden="true">
            <span>
              BLOCK THEMES / PLUGIN SYSTEMS / ACCESSIBLE PATTERNS / CLEAN
              UPDATES /{" "}
            </span>
            <span>
              BLOCK THEMES / PLUGIN SYSTEMS / ACCESSIBLE PATTERNS / CLEAN
              UPDATES /{" "}
            </span>
          </div>
        </section>

        <section className="themes" id="themes" aria-labelledby="themes-title">
          <motion.header {...enter}>
            <p>01 / THEME SPECIMENS</p>
            <h2 id="themes-title">
              ONE ENGINE.
              <br />
              <i>THREE WORLDS.</i>
            </h2>
            <span>Original generated artwork / local assets</span>
          </motion.header>
          <div className="theme-stage">
            <div className="theme-browser">
              <div className="browser-bar">
                <i />
                <i />
                <i />
                <span>{theme.id}.blockctrl.test</span>
                <b>{theme.version}</b>
              </div>
              <AnimatePresence mode="wait">
                <motion.figure
                  key={theme.id}
                  initial={reduce ? false : { opacity: 0, x: 45 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -45 }}
                  transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={A(theme.image)}
                    width="1536"
                    height="1024"
                    loading="eager"
                    alt={`${theme.name}, ${theme.type.toLowerCase()} WordPress theme preview`}
                  />
                  <figcaption>
                    <p>
                      {theme.code} / {theme.type}
                    </p>
                    <h3>{theme.name}</h3>
                    <span>{theme.line}</span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
              <div className="theme-cycle">
                <button
                  data-qa-action="theme-cycle"
                  type="button"
                  onClick={() => cycleTheme(-1)}
                  aria-label="Previous theme"
                >
                  ←
                </button>
                <span>0{themeIndex + 1} / 03</span>
                <button
                  data-qa-action="theme-cycle"
                  type="button"
                  onClick={() => cycleTheme(1)}
                  aria-label="Next theme"
                >
                  →
                </button>
              </div>
            </div>
            <div
              className="theme-ledger"
              role="group"
              aria-label="Theme releases"
            >
              {themes.map((item, index) => (
                <button
                  data-qa-action="theme-select"
                  key={item.id}
                  type="button"
                  aria-pressed={themeIndex === index}
                  onClick={() => setTheme(index)}
                >
                  <span>{item.code}</span>
                  <b>{item.name}</b>
                  <small>
                    {item.type} / ${item.price}
                  </small>
                  <i style={{ background: item.color }} />
                </button>
              ))}
              <motion.div
                className="theme-facts"
                key={theme.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>RELEASE CARD / {theme.version}</p>
                <dl>
                  <div>
                    <dt>WordPress</dt>
                    <dd>{theme.wp}</dd>
                  </div>
                  <div>
                    <dt>PHP</dt>
                    <dd>{theme.php}</dd>
                  </div>
                  <div>
                    <dt>Blocks</dt>
                    <dd>{theme.blocks}</dd>
                  </div>
                  <div>
                    <dt>License</dt>
                    <dd>1 site</dd>
                  </div>
                </dl>
                <ul>
                  {theme.features.map((item) => (
                    <li key={item}>↳ {item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          className="plugins"
          id="plugins"
          aria-labelledby="plugins-title"
        >
          <motion.header {...enter}>
            <p>02 / PLUGIN RELEASE BOARD</p>
            <h2 id="plugins-title">
              SMALL MODULES.
              <br />
              <b>CLEAR SIGNAL.</b>
            </h2>
            <span>Illustrative compatibility / not a live scan</span>
          </motion.header>
          <div className="plugin-board">
            <div className="board-head">
              <span>MODULE</span>
              <span>CHANNEL</span>
              <span>VERSION</span>
              <span>{theme.name}</span>
            </div>
            {plugins.map((item, index) => {
              const fit = item.support.includes(theme.id);
              return (
                <motion.article key={item.id} {...enter}>
                  <span className="plugin-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <small>{item.code}</small>
                    <h3>{item.name}</h3>
                    <p>{item.function}</p>
                  </div>
                  <span>Stable</span>
                  <b>v{item.version}</b>
                  <em className={fit ? "pass" : "hold"}>
                    {fit ? "PASS" : "HOLD"}
                  </em>
                </motion.article>
              );
            })}
            <div className="trace" aria-hidden="true">
              <i />
              <i />
              <i />
              <b>WP</b>
            </div>
          </div>
        </section>

        <section
          className="compiler"
          id="compiler"
          aria-labelledby="compiler-title"
        >
          <header>
            <p>03 / STACK COMPILER</p>
            <h2 id="compiler-title">
              INSTALL ONLY
              <br />
              <i>
                WHAT EARNS
                <br />
                ITS PLACE.
              </i>
            </h2>
          </header>
          <div className="compiler-grid">
            <div className="install-queue">
              <fieldset>
                <legend>
                  <span>01</span> Theme foundation
                </legend>
                {themes.map((item, index) => (
                  <button
                    data-qa-action="theme-select"
                    key={item.id}
                    type="button"
                    aria-pressed={themeIndex === index}
                    onClick={() => setTheme(index)}
                  >
                    <i style={{ background: item.color }} />
                    <b>{item.name}</b>
                    <span>${item.price}</span>
                  </button>
                ))}
              </fieldset>
              <fieldset>
                <legend>
                  <span>02</span> Plugin modules
                </legend>
                {plugins.map((item) => {
                  const fit = item.support.includes(theme.id);
                  const on = selected.includes(item.id);
                  return (
                    <button
                      data-qa-action="plugin-toggle"
                      key={item.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => togglePlugin(item.id)}
                    >
                      <span className="check">{on ? "✓" : "+"}</span>
                      <b>
                        {item.name}
                        <small>
                          {fit ? "Compatible" : `Not for ${theme.type}`}
                        </small>
                      </b>
                      <span>${item.price}</span>
                    </button>
                  );
                })}
              </fieldset>
              <fieldset>
                <legend>
                  <span>03</span> Update channel
                </legend>
                {tiers.map((item) => (
                  <button
                    data-qa-action="support-select"
                    key={item.id}
                    type="button"
                    aria-pressed={tier === item.id}
                    onClick={() => {
                      setTier(item.id);
                      setIssued(false);
                    }}
                  >
                    <b>
                      {item.name}
                      <small>{item.response}</small>
                    </b>
                    <span>{item.price ? `+$${item.price}` : "Included"}</span>
                  </button>
                ))}
              </fieldset>
            </div>
            <div className="diagnostic">
              <div className="diagnostic-top">
                <p>LIVE BUILD / {theme.code}</p>
                <span>
                  {incompatible.length ? "ACTION NEEDED" : "READY TO COMPILE"}
                </span>
              </div>
              <div
                className="site-stack"
                aria-label={`${theme.name} with ${activePlugins.length} plugins`}
              >
                <motion.div
                  layout
                  className="stack-theme"
                  style={{ "--active": theme.color }}
                >
                  <span>{theme.code}</span>
                  <b>{theme.name}</b>
                  <i>THEME CHASSIS</i>
                </motion.div>
                <div className="stack-slots">
                  {activePlugins.length ? (
                    activePlugins.map((item, index) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={reduce ? false : { opacity: 0, x: 35 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className={
                          item.support.includes(theme.id) ? "fit" : "warn"
                        }
                      >
                        <span>{item.code}</span>
                        <b>{item.name}</b>
                        <i>
                          {item.support.includes(theme.id) ? "LOCKED" : "HOLD"}
                        </i>
                      </motion.div>
                    ))
                  ) : (
                    <p>No optional modules installed.</p>
                  )}
                </div>
              </div>
              <div className="metrics" role="status" aria-live="polite">
                <article>
                  <span>Build score</span>
                  <strong>
                    {score}
                    <small>/100</small>
                  </strong>
                  <i>
                    <motion.b animate={{ width: `${score}%` }} />
                  </i>
                </article>
                <article>
                  <span>Maintenance</span>
                  <strong>{maintenance}</strong>
                  <small>{activePlugins.length} optional modules</small>
                </article>
                <article>
                  <span>Compatibility</span>
                  <strong>
                    {incompatible.length
                      ? `${incompatible.length} hold`
                      : "All pass"}
                  </strong>
                  <small>Illustrative matrix</small>
                </article>
                <article>
                  <span>Stack total</span>
                  <strong>${total}</strong>
                  <small>Fictional one-time value</small>
                </article>
              </div>
              {incompatible.length > 0 && (
                <div className="warning" role="alert">
                  <b>Resolve before issue</b>
                  <p>
                    {incompatible.map((item) => item.name).join(", ")}{" "}
                    {incompatible.length === 1 ? "is" : "are"} not listed for{" "}
                    {theme.name}.
                  </p>
                </div>
              )}
              <a href="#manifest">Issue build manifest ↘</a>
            </div>
          </div>
        </section>

        <section
          className={`manifest ${issued ? "issued" : ""}`}
          id="manifest"
          aria-labelledby="manifest-title"
        >
          {!issued ? (
            <>
              <div className="manifest-copy">
                <p>04 / BUILD MANIFEST</p>
                <h2 id="manifest-title">
                  FOLD THE
                  <br />
                  STACK INTO
                  <br />
                  <b>A PLAN.</b>
                </h2>
                <span>
                  Fictional outcome. No payment, download, installation, or
                  email occurs.
                </span>
              </div>
              <form onSubmit={submit} noValidate>
                <header>
                  <b>BLOCK/CTRL / ISSUE DESK</b>
                  <span>
                    {theme.code} / {activePlugins.length} PLG
                  </span>
                </header>
                <div className="manifest-stack">
                  <span style={{ background: theme.color }}>{theme.name}</span>
                  {activePlugins.map((item) => (
                    <i key={item.id}>{item.name}</i>
                  ))}
                </div>
                {errors.stack && (
                  <p className="form-error" role="alert">
                    {errors.stack}
                  </p>
                )}
                <label>
                  Name
                  <input
                    aria-label="Name"
                    name="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <small>{errors.name}</small>}
                </label>
                <label>
                  Email
                  <input
                    aria-label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <small>{errors.email}</small>}
                </label>
                <dl>
                  <div>
                    <dt>Theme</dt>
                    <dd>{theme.name}</dd>
                  </div>
                  <div>
                    <dt>Plugins</dt>
                    <dd>{activePlugins.length}</dd>
                  </div>
                  <div>
                    <dt>Support</dt>
                    <dd>{support.name}</dd>
                  </div>
                  <div>
                    <dt>Total</dt>
                    <dd>${total}</dd>
                  </div>
                </dl>
                <button data-qa-action="manifest-submit" type="submit">
                  COMPILE MANIFEST ↗
                </button>
              </form>
            </>
          ) : (
            <motion.div
              className="issued-sheet"
              role="status"
              initial={reduce ? false : { opacity: 0, rotate: -2, y: 30 }}
              animate={{ opacity: 1, rotate: 0, y: 0 }}
            >
              <p>BLOCK/CTRL / MANIFEST ISSUED</p>
              <h2 id="manifest-title">
                STACK
                <br />
                <b>READY.</b>
              </h2>
              <strong>{manifest}</strong>
              <div>
                <span>
                  FOUNDATION <b>{theme.name}</b>
                </span>
                <span>
                  MODULES{" "}
                  <b>
                    {activePlugins.map((item) => item.name).join(" / ") ||
                      "Core only"}
                  </b>
                </span>
                <span>
                  CHANNEL <b>{support.name}</b>
                </span>
                <span>
                  VALUE <b>${total}</b>
                </span>
              </div>
              <small>
                FICTIONAL DEMO / NO ORDER, DOWNLOAD, OR INSTALLATION
              </small>
              <button
                data-qa-action="manifest-reset"
                type="button"
                onClick={() => {
                  setIssued(false);
                  setErrors({});
                }}
              >
                COMPILE ANOTHER ↺
              </button>
            </motion.div>
          )}
        </section>
      </main>

      <footer>
        <a className="brand" href="#top">
          <b>BLOCK</b>
          <i>/</i>
          <span>CTRL</span>
        </a>
        <p>
          Original WordPress product-studio template
          <br />
          Fictional releases and compatibility data
        </p>
        <nav>
          <a href="#themes">Themes</a>
          <a href="#plugins">Plugins</a>
          <a href="#compiler">Compiler</a>
        </nav>
        <a href="#top">Back to release ↑</a>
      </footer>
    </div>
  );
}
