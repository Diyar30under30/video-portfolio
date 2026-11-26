import { useEffect, useMemo, useRef, useState } from "react";
import { site, categories, works, t as dict } from "./content.js";

// ---------- helpers ----------
function useReveal(dep) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function embedUrl(url) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  return null;
}

// цветная заглушка, пока нет постера
function placeholderBg(i) {
  const hues = [210, 25, 160, 280, 45, 340, 190, 0];
  const h = hues[i % hues.length];
  return `radial-gradient(120% 90% at 30% 20%, hsl(${h} 35% 28%), hsl(${h} 30% 8%) 70%)`;
}

const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// ---------- курсор: кружок, который растёт над [data-cursor] и пишет текст ----------
function Cursor() {
  const ref = useRef(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!finePointer()) return;
    const el = ref.current;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      const target = e.target.closest?.("[data-cursor]");
      setLabel(target ? target.dataset.cursor : "");
      el.classList.toggle("link", !target && !!e.target.closest?.("a,button,label,input,textarea"));
    };
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    const scroll = () => setLabel("");
    addEventListener("mousemove", move);
    addEventListener("scroll", scroll, { passive: true });
    loop();
    document.documentElement.classList.add("has-cursor");
    return () => { removeEventListener("mousemove", move); removeEventListener("scroll", scroll); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className={`cursor${label ? " big" : ""}`}><span>{label}</span></div>;
}

// ---------- sections ----------
function Header({ lang, setLang, t }) {
  const ids = ["work", "about", "contact"];
  return (
    <header className="header">
      <a href="#top" className="logo">
        <b>{site.brand[0]}</b> <span>{site.brand[1]}</span>
      </a>
      <nav className="nav">
        {t.nav.map((n, i) => (
          <a key={n} href={`#${ids[i]}`}>{n}</a>
        ))}
      </nav>
      <div className="header-right">
        <div className="lang">
          <button className={lang === "ru" ? "on" : ""} onClick={() => setLang("ru")}>RU</button>
          <span>·</span>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
        <a href="#contact" className="cta">{t.cta}</a>
      </div>
    </header>
  );
}

function Hero({ t, onReel }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 700px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const on = () => setMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const src = (mobile && site.hero.mobile) || site.hero.desktop;
  const togglePause = () => {
    const v = ref.current; if (!v) return;
    v.paused ? v.play() : v.pause();
    setPaused(v.paused);
  };

  return (
    <section className="hero" id="top" data-cursor={site.showreel ? t.reel : undefined}
      onClick={(e) => site.showreel && !e.target.closest("button,a") && onReel()}>
      {src ? (
        <video ref={ref} className="hero-video" src={src} poster={site.hero.poster || undefined}
          autoPlay loop muted={muted} playsInline preload="auto" />
      ) : (
        <div className="hero-video hero-fallback" />
      )}
      <div className="hero-shade" />
      {src && (
        <div className="hero-controls">
          <button aria-label="pause" onClick={togglePause}>{paused ? "▶" : "❚❚"}</button>
          <button aria-label="sound" onClick={() => setMuted((m) => !m)}>{muted ? "🔇" : "🔊"}</button>
        </div>
      )}
      <div className="hero-content">
        <div className="eyebrow">
          <span>{site.years}</span><i className="line" /><span>{t.role}</span>
        </div>
        <h1 className="name">
          <span className="rise"><span>{site.firstName}</span></span>
          <span className="rise"><span className="outline">{site.lastName}</span></span>
        </h1>
        <p className="lead">{t.lead}</p>
        <button className="reel-btn" onClick={onReel}>
          <span className="reel-dot">▶</span>{t.reel}
        </button>
      </div>
      <a href="#work" className="scroll-hint">{t.scroll}</a>
    </section>
  );
}

function Card({ w, i, onOpen, lang, t }) {
  const vid = useRef(null);
  const cat = categories.find((c) => c.key === w.cat);
  return (
    <button
      className="card reveal"
      style={{ transitionDelay: `${(i % 3) * 60}ms` }}
      data-cursor={t.play}
      onClick={onOpen}
      onMouseEnter={() => vid.current?.play().catch(() => {})}
      onMouseLeave={() => { if (vid.current) { vid.current.pause(); vid.current.currentTime = 0; } }}
    >
      <div className="thumb" style={w.poster ? undefined : { background: placeholderBg(i) }}>
        {w.poster && <img src={w.poster} alt={w.title} loading="lazy" />}
        {w.preview && <video ref={vid} src={w.preview} muted loop playsInline preload="none" />}
        <span className="dur">{w.dur}</span>
        <span className="play">▶</span>
      </div>
      <div className="meta">
        <span className="client">{w.client}</span>
        <span className="title">{w.title}</span>
        {cat && <span className="cat">{cat[lang]}</span>}
      </div>
    </button>
  );
}

// Список в стиле «индекса»: строка на проект + превью, которое следует за курсором
function WorkList({ list, lang, t, onOpen }) {
  const [hover, setHover] = useState(null);
  const box = useRef(null);
  const vid = useRef(null);
  const move = (e) => {
    if (box.current) box.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 90}px)`;
  };
  useEffect(() => {
    const off = () => setHover(null);
    addEventListener("scroll", off, { passive: true });
    return () => removeEventListener("scroll", off);
  }, []);
  useEffect(() => {
    const v = vid.current;
    if (v && hover !== null && list[hover]?.preview) v.play().catch(() => {});
  }, [hover, list]);
  const w = hover !== null ? list[hover] : null;

  return (
    <div className="worklist" onMouseMove={move} onMouseLeave={() => setHover(null)}>
      {list.map((x, i) => {
        const cat = categories.find((c) => c.key === x.cat);
        return (
          <button key={x.title + i} className={`row reveal${hover !== null && hover !== i ? " dim" : ""}`}
            data-cursor={t.play} onMouseEnter={() => setHover(i)} onClick={() => onOpen(i)}>
            <span className="r-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="r-client">{x.client}</span>
            <span className="r-title">{x.title}</span>
            <span className="r-cat">{cat?.[lang]}</span>
            <span className="r-place">{x.place}</span>
            <span className="r-year">{x.year}</span>
          </button>
        );
      })}
      {finePointer() && (
        <div ref={box} className={`float-preview${w ? " on" : ""}`}
          style={w && !w.poster ? { background: placeholderBg(hover) } : undefined}>
          {w?.poster && <img src={w.poster} alt="" />}
          {w?.preview && <video ref={vid} key={w.preview} src={w.preview} muted loop playsInline />}
        </div>
      )}
    </div>
  );
}

function Works({ t, lang, onOpen }) {
  const [filter, setFilter] = useState("featured");
  const [view, setView] = useState("grid");
  const list = useMemo(
    () => works.filter((w) => filter === "all" || (filter === "featured" ? w.featured : w.cat === filter)),
    [filter]
  );
  const count = (k) => works.filter((w) => w.cat === k).length;
  useReveal(filter + view);

  return (
    <section className="section" id="work">
      <div className="section-head reveal">
        <span className="num">01</span>
        <h2>{t.worksTitle[0]}<br /><span className="outline">{t.worksTitle[1]}</span></h2>
        <span className="muted">{t.archive(works.length)}</span>
      </div>
      <div className="toolbar reveal">
        <div className="filters">
          <button className={filter === "featured" ? "on" : ""} onClick={() => setFilter("featured")}>{t.featured}</button>
          {categories.filter((c) => count(c.key)).map((c) => (
            <button key={c.key} className={filter === c.key ? "on" : ""} onClick={() => setFilter(c.key)}>
              {c[lang]} · {count(c.key)}
            </button>
          ))}
          <button className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>{t.all} · {works.length}</button>
        </div>
        <div className="view-toggle">
          <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")}>{t.grid}</button>
          <button className={view === "list" ? "on" : ""} onClick={() => setView("list")}>{t.list}</button>
        </div>
      </div>
      {view === "grid" ? (
        <div className="grid" key={filter}>
          {list.map((w, i) => (
            <Card key={w.title + i} w={w} i={i} lang={lang} t={t} onOpen={() => onOpen(list, i)} />
          ))}
        </div>
      ) : (
        <WorkList key={filter} list={list} lang={lang} t={t} onOpen={(i) => onOpen(list, i)} />
      )}
    </section>
  );
}

function About({ t, lang }) {
  return (
    <section className="section" id="about">
      <div className="section-head reveal">
        <span className="num">02</span>
        <span className="label">{t.aboutLabel}</span>
      </div>
      <div className="about">
        <h3 className="reveal">{t.aboutTitle}</h3>
        <div className="about-text reveal">
          {t.aboutText.map((p) => <p key={p}>{p}</p>)}
          <ul className="skills">{t.skills.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>
      <div className="stats">
        {site.stats.map((s) => (
          <div key={s.value} className="stat reveal">
            <b>{s.value}</b><span>{s[lang]}</span>
          </div>
        ))}
      </div>

      <div className="process">
        <span className="label reveal">{t.processLabel}</span>
        <ol>
          {t.process.map(([h, p], i) => (
            <li key={h} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="step">{String(i + 1).padStart(2, "0")}</span>
              <b>{h}</b>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="clients reveal">
        <span className="label">{t.clientsLabel}</span>
        <div className="marquee">
          <div className="track">
            {[...site.clients, ...site.clients].map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </div>

      {site.testimonials.length > 0 && (
        <div className="reviews">
          <span className="label reveal">{t.reviewsLabel}</span>
          <div className="reviews-grid">
            {site.testimonials.map((r) => (
              <figure key={r.who} className="review reveal">
                <blockquote>«{r[lang]}»</blockquote>
                <figcaption>{r.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Contact({ t }) {
  const f = t.form;
  const [state, setState] = useState("idle"); // idle | busy | ok | fail

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("busy");
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setState("ok");
      form.reset();
    } catch {
      setState("fail");
    }
  }

  return (
    <section className="section" id="contact">
      <div className="section-head reveal">
        <span className="num">03</span>
        <h2>{t.contactTitle}</h2>
      </div>
      <div className="contact">
        <form className="brief reveal" onSubmit={submit}>
          <input name="name" placeholder={f.name} required />
          <input name="brand" placeholder={f.brand} />
          <label className="field-label">{f.type}</label>
          <div className="chips">
            {f.types.map((x, i) => (
              <label key={x} className="chip">
                <input type="radio" name="type" value={x} defaultChecked={i === 0} /><span>{x}</span>
              </label>
            ))}
          </div>
          <textarea name="message" rows={4} placeholder={f.message} />
          <label className="field-label">{f.source}</label>
          <div className="chips">
            {f.sources.map((x) => (
              <label key={x} className="chip">
                <input type="radio" name="source" value={x} /><span>{x}</span>
              </label>
            ))}
          </div>
          <input name="contact" placeholder={f.contact} required />
          <button className="submit" disabled={state === "busy"}>{state === "busy" ? f.busy : f.submit}</button>
          {state === "ok" && <p className="note ok">{f.ok}</p>}
          {state === "fail" && (
            <p className="note fail">{f.fail} <a href={site.links.telegram} target="_blank" rel="noreferrer">Telegram →</a></p>
          )}
        </form>
        <div className="links reveal">
          <a href={site.links.telegram} target="_blank" rel="noreferrer"><span>Telegram</span>{"@" + site.links.telegram.split("/").pop()}</a>
          <a href={site.links.instagram} target="_blank" rel="noreferrer"><span>Instagram</span>{"@" + site.links.instagram.split("/").pop()}</a>
          <a href={`mailto:${site.links.email}`}><span>Email</span>{site.links.email}</a>
          <p className="muted">{t.city}</p>
        </div>
      </div>
    </section>
  );
}

function Lightbox({ list, index, setIndex, t, lang }) {
  const w = list[index];
  const many = list.length > 1;
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (many && e.key === "ArrowRight") setIndex((i) => (i + 1) % list.length);
      if (many && e.key === "ArrowLeft") setIndex((i) => (i - 1 + list.length) % list.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [list.length, many, setIndex]);

  const embed = w.full && embedUrl(w.full);
  const cat = categories.find((c) => c.key === w.cat);
  const credits = [w.year, cat?.[lang], w.place, w.role].filter(Boolean);
  return (
    <div className="lightbox" onClick={() => setIndex(null)} data-cursor={t.close}>
      <div className="lb-inner" onClick={(e) => e.stopPropagation()} data-cursor="">
        <div className="lb-player">
          {embed ? (
            <iframe key={embed} src={embed} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={w.title} />
          ) : w.full ? (
            <video key={w.full} src={w.full} poster={w.poster || undefined} controls autoPlay playsInline />
          ) : (
            <div className="lb-empty">{t.noVideo}</div>
          )}
        </div>
        <div className="lb-bar">
          <div>
            <span className="client">{w.client}</span> <span className="title">{w.title}</span>
            {credits.length > 0 && <div className="credits">{credits.join("  ·  ")}</div>}
          </div>
          <div className="lb-btns">
            {many && <button onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)}>← {t.prev}</button>}
            {many && <button onClick={() => setIndex((i) => (i + 1) % list.length)}>{t.next} →</button>}
            <button onClick={() => setIndex(null)}>✕ {t.close}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- app ----------
export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("lang") || "ru"; } catch { return "ru"; }
  });
  const [box, setBox] = useState({ list: [], index: null });
  const t = dict[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);
  useReveal(lang);

  const setIndex = (v) => setBox((b) => ({ ...b, index: typeof v === "function" ? v(b.index) : v }));
  const openReel = () =>
    setBox({ list: [{ client: "Showreel", title: `${site.firstName} ${site.lastName}`, full: site.showreel }], index: 0 });

  return (
    <>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} onReel={openReel} />
        <Works t={t} lang={lang} onOpen={(list, index) => setBox({ list, index })} />
        <About t={t} lang={lang} />
        <Contact t={t} />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {site.firstName} {site.lastName} — {t.rights}</span>
        <span>{t.city}</span>
        <a href={`mailto:${site.links.email}`}>{site.links.email}</a>
      </footer>
      {box.index !== null && <Lightbox list={box.list} index={box.index} setIndex={setIndex} t={t} lang={lang} />}
    </>
  );
}
