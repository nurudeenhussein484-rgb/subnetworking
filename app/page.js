"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X, Phone, MapPin, MessageCircle } from "lucide-react";
import { NAV, SERVICES, WHY, PROJECTS, PHONE, LOCATION, DEFAULT_MSG, INTRO, ABOUT_TEXT, waLink } from "../lib/content";

const ease = [0.22, 1, 0.36, 1];
const vp = { once: true, margin: "-80px" };
const id = (n) => n.toLowerCase();
const WA = waLink(DEFAULT_MSG);

function useDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => { const m = window.matchMedia("(min-width:768px)"); const f = () => setD(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  return d;
}
function Parallax({ children, amount = 40, className = "" }) {
  const ref = useRef(null), desk = useDesktop(), rm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], desk && !rm ? [amount, -amount] : [0, 0]);
  return <div ref={ref} className={className}><motion.div style={{ y }}>{children}</motion.div></div>;
}
function Words({ text, Tag = "p", className = "" }) {
  const T = motion[Tag];
  return <Tag className={className}>{text.split(" ").map((w, i) => (
    <motion.span key={i} className="mr-[0.25em] inline-block" initial={{ opacity: 0, filter: "blur(8px)", y: 14 }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }} viewport={vp} transition={{ duration: 0.6, delay: i * 0.04, ease }}>{w}</motion.span>
  ))}</Tag>;
}
const Mask = ({ children, className = "" }) => (
  <motion.div className={className} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={vp} transition={{ duration: 1.1, ease }}>{children}</motion.div>
);
const Eyebrow = ({ children }) => <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">{children}</p>;
function Btn({ href, children, variant = "solid", ...p }) {
  const v = variant === "solid" ? "bg-brand text-white hover:bg-[#3b8bff]" : variant === "dark" ? "bg-ink text-white hover:bg-brand" : "border border-white/25 text-white hover:bg-white/10";
  return <a href={href} {...p} className={`group inline-flex items-center justify-center gap-2 rounded-md px-7 py-4 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${v}`}>{children}<ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" /></a>;
}

function Blueprint({ v = 0, className = "" }) {
  const sets = [
    <g key="a"><circle cx="200" cy="150" r="90" /><circle cx="200" cy="150" r="50" /><path d="M200 60V20M200 240v40M110 150H40M290 150h70M136 86l-40-40M264 214l40 40" /></g>,
    <g key="b"><rect x="70" y="60" width="260" height="180" /><rect x="120" y="100" width="160" height="100" /><path d="M70 60l50 40M330 60l-50 40M70 240l50-40M330 240l-50-40M200 60V20M200 240v40" /></g>,
    <g key="c"><path d="M40 230L140 130l60 60 100-130 60 60" /><circle cx="140" cy="130" r="7" /><circle cx="200" cy="190" r="7" /><circle cx="300" cy="60" r="7" /><path d="M40 260h320M40 250v20M360 250v20" /></g>,
  ];
  return (
    <div className={`grid-dark relative overflow-hidden bg-navy ${className}`}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Abstract technical drawing" className="absolute inset-0 h-full w-full fill-none stroke-brand" strokeWidth="1.4">{sets[v % 3]}</svg>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false), [small, setSmall] = useState(false), [active, setActive] = useState("home");
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setSmall(y > 24));
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(id(n)); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${small || open ? "border-b border-line bg-bg/85 shadow-sm backdrop-blur-md" : "border-b border-transparent bg-transparent"}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 lg:px-8 ${small ? "h-14" : "h-20"}`}>
        <a href="#home" className={`text-[15px] font-extrabold tracking-[0.18em] transition-colors ${small || open ? "text-ink" : "text-white"}`}>SUBNETWORKING</a>
        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <a key={n} href={`#${id(n)}`} className={`relative py-1 text-sm font-medium transition-colors ${small ? "text-muted hover:text-ink" : "text-slate-300 hover:text-white"} ${active === id(n) ? (small ? "!text-ink" : "!text-white") : ""}`}>
              {n}{active === id(n) && <motion.span layoutId="nav-ind" className="absolute inset-x-0 -bottom-0.5 h-px bg-brand" />}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3b8bff] md:inline-block">Let&apos;s Talk</a>
        <button className={`p-2 md:hidden ${small || open ? "text-ink" : "text-white"}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-x-0 bottom-0 top-14 bg-bg px-6 pt-8 md:hidden">
            {NAV.map((n, i) => (
              <motion.a key={n} href={`#${id(n)}`} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05, ease }} className="block border-b border-line py-5 text-3xl font-bold">{n}</motion.a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-8 block rounded-md bg-brand py-4 text-center font-semibold text-white">Let&apos;s Talk</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroVisual() {
  const { scrollY } = useScroll(), desk = useDesktop();
  const y = useTransform(scrollY, [0, 600], [0, desk ? 70 : 0]);
  const N = [[80, 90], [200, 50], [330, 110], [110, 210], [240, 190], [360, 260], [150, 330], [300, 340]];
  const L = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 6], [4, 7], [5, 7], [6, 7]];
  return (
    <motion.div style={{ y }} className="relative mx-auto w-full max-w-lg">
      <svg viewBox="0 0 440 400" role="img" aria-label="Abstract engineering diagram of connected infrastructure nodes" className="w-full overflow-visible">
        <g stroke="#1677FF" strokeOpacity=".25" fill="none">
          <circle cx="220" cy="200" r="190" /><circle cx="220" cy="200" r="130" />
          <motion.circle cx="220" cy="200" r="160" strokeDasharray="2 10" animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "220px 200px" }} />
          <path d="M10 200h420M220 10v380" strokeDasharray="3 6" />
        </g>
        {L.map(([a, b], i) => <motion.path key={i} d={`M${N[a][0]} ${N[a][1]}L${N[b][0]} ${N[b][1]}`} stroke="#1677FF" strokeOpacity=".7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.7 + i * 0.07, ease }} />)}
        {N.map(([x, yy], i) => (
          <motion.g key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.08, ease }} style={{ transformOrigin: `${x}px ${yy}px` }}>
            <circle cx={x} cy={yy} r={i === 4 ? 20 : 12} fill="#07111F" stroke="#1677FF" />
            <circle cx={x} cy={yy} r={i === 4 ? 7 : 3.5} fill="#1677FF" />
          </motion.g>
        ))}
        <g stroke="#fff" strokeOpacity=".35"><path d="M0 14v-14h14M426 0h14v14M440 386v14h-14M14 400H0v-14" fill="none" /></g>
      </svg>
    </motion.div>
  );
}

function Hero() {
  const line = (t, i) => (<span key={i} className="block overflow-hidden pb-[0.1em]"><motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.95, delay: 0.15 + i * 0.13, ease }}>{t}</motion.span></span>);
  return (
    <section id="home" className="grid-dark relative overflow-hidden bg-navy pt-28 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 sm:pb-28 lg:grid-cols-12 lg:px-8 lg:pt-10 lg:pb-32">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Engineering • Technology • Connectivity</motion.p>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {["Engineering", "Solutions Built", "to Perform."].map(line)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7, ease }} className="mt-7 max-w-xl text-lg text-slate-300">Professional engineering, networking and technology solutions designed around reliability, performance and real-world needs.</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Btn href="#services">Explore Services</Btn><Btn href="#contact" variant="ghost">Talk to Us</Btn>
          </motion.div>
        </div>
        <div className="lg:col-span-5"><HeroVisual /></div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
      <div className="grid items-end gap-12 lg:grid-cols-12">
        <Words Tag="h2" text="Engineering. Technology. Practical Solutions." className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:col-span-7 lg:text-7xl" />
        <div className="lg:col-span-5">
          <motion.p initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.8, ease }} className="text-lg leading-relaxed text-muted">{INTRO}</motion.p>
          <Mask className="mt-8"><div className="relative"><Blueprint v={2} className="aspect-[16/9] w-full" /><span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded bg-navy/80 px-2.5 py-1 text-[11px] font-semibold tracking-widest text-white"><MapPin size={12} className="text-brand" />ILORIN, KWARA STATE</span></div></Mask>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="grid-dark bg-navy py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6"><Eyebrow>Services</Eyebrow><Words Tag="h2" text="What We Do" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl" /></div>
          <p className="self-end text-lg text-slate-400 lg:col-span-5 lg:col-start-8">Practical solutions designed around your technical and project needs.</p>
        </div>
        <ul className="mt-16 border-b border-white/15">
          {SERVICES.map(({ icon: Icon, title, text }, i) => (
            <motion.li key={title} initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.75, delay: i * 0.07, ease }} className="group border-t border-white/15">
              <div className="grid items-center gap-3 px-2 py-8 transition-colors duration-500 group-hover:bg-white/[0.04] md:grid-cols-12 md:gap-6 md:px-5 md:py-11">
                <span className="text-sm font-semibold text-brand md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl font-bold transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-4xl">{title}</h3>
                <p className="leading-relaxed text-slate-400 md:col-span-4">{text}</p>
                <div className="hidden justify-end md:col-span-2 md:flex"><Icon size={36} strokeWidth={1.4} className="text-brand transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-6" /></div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <Mask><Parallax amount={30} className="overflow-hidden"><div className="group overflow-hidden"><Blueprint v={1} className="aspect-[5/4] w-full scale-110 transition-transform duration-1000 group-hover:scale-[1.17]" /></div></Parallax></Mask>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: 0.7, duration: 0.7, ease }} className="absolute -bottom-5 right-4 border border-line bg-white px-4 py-3 text-xs font-semibold tracking-widest shadow-lg lg:-right-8">ENGINEERING / TECHNOLOGY</motion.div>
        </div>
        <div className="lg:col-span-5">
          <Eyebrow>About Subnetworking</Eyebrow>
          <Words Tag="h2" text="Built Around Solutions That Work." className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl" />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.8, delay: 0.2, ease }} className="mt-6 text-lg leading-relaxed text-muted">{ABOUT_TEXT}</motion.p>
          <a href="#contact" className="group relative mt-8 inline-flex items-center gap-2 font-semibold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100">Get in touch <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></a>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="bg-[#EEF2F7] py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start"><Eyebrow>Why Subnetworking</Eyebrow><Words Tag="h2" text="Why Subnetworking?" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl" /></div>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {WHY.map(({ icon: Icon, title, text }, i) => (
            <motion.div key={title} initial={{ opacity: 0, scale: 0.96, y: 24 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={vp} transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease }} className={`border-t border-ink/20 pt-6 ${i % 2 ? "sm:mt-12" : ""}`}>
              <Icon size={26} strokeWidth={1.6} className="text-brand" />
              <h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-2 leading-relaxed text-muted">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-12"], ratio = ["aspect-[4/3] lg:aspect-auto lg:h-[460px]", "aspect-[4/3] lg:aspect-auto lg:h-[460px]", "aspect-[4/3] sm:aspect-[21/9]"];
  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6"><Eyebrow>Projects</Eyebrow><Words Tag="h2" text="Selected Work" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl" /></div>
        <p className="self-end text-lg text-muted lg:col-span-5 lg:col-start-8">Explore examples of technical and engineering-focused work.</p>
      </div>
      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        {PROJECTS.map((p, i) => (
          <motion.article key={i} initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={vp} transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease }} className={`group relative overflow-hidden bg-navy text-white ${span[i % 3]}`}>
            <div className={`relative ${ratio[i % 3]}`}>
              <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-105">
                {p.image ? <img src={p.image} alt={`${p.title} project`} loading="lazy" className="h-full w-full object-cover" /> : <Blueprint v={i} className="h-full w-full" />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent transition-opacity duration-500 md:opacity-70 md:group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">{p.category}</p>
                <h3 className="mt-2 text-2xl font-bold transition-transform duration-500 md:group-hover:-translate-y-1 sm:text-3xl">{p.title}</h3>
                <p className="mt-2 max-w-md text-slate-300 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">{p.text}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">View Project <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" /></a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="grid-dark relative overflow-hidden bg-navy py-24 text-white sm:py-36">
      <span aria-hidden className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-extrabold leading-none tracking-tight text-white/[0.03]">SUBNETWORKING</span>
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Words Tag="h2" text="Let's Build Something That Works." className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl" />
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ delay: 0.4, duration: 0.8 }} className="mx-auto mt-6 max-w-xl text-lg text-slate-300">Have a project, technical requirement or business need? Let&apos;s talk.</motion.p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><Btn href={WA} target="_blank" rel="noopener noreferrer">Talk on WhatsApp</Btn><Btn href="#contact" variant="ghost">Contact Us</Btn></div>
      </div>
    </section>
  );
}

const inp = "mt-2 w-full rounded-md border border-line bg-white px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
function Field({ label, error, area, ...p }) {
  return (<label className="block text-sm font-semibold">{label}{area ? <textarea rows={4} className={inp} {...p} /> : <input className={inp} {...p} />}{error && <span role="alert" className="mt-1 block text-xs font-normal text-red-600">{error}</span>}</label>);
}
function Contact() {
  const [f, setF] = useState({ name: "", contact: "", need: "", message: "" }), [err, setErr] = useState({});
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = "Please enter your name.";
    if (!f.contact.trim()) er.contact = "Please enter a phone number or email.";
    if (!f.need.trim()) er.need = "Please tell us what you need.";
    if (!f.message.trim()) er.message = "Please add a short message.";
    setErr(er);
    if (Object.keys(er).length) return;
    window.open(waLink(`Hello Subnetworking,\n\nName: ${f.name}\nContact: ${f.contact}\nNeed: ${f.need}\n\n${f.message}`), "_blank", "noopener,noreferrer");
  };
  const cards = [{ icon: Phone, t: "Phone", v: PHONE, href: "tel:+2347078693219" }, { icon: MapPin, t: "Location", v: LOCATION }, { icon: MessageCircle, t: "WhatsApp", v: "Start a conversation", href: WA }];
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Contact</Eyebrow><Words Tag="h2" text="Let's Talk" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl" />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {cards.map(({ icon: Icon, t, v, href }) => {
              const body = (<><Icon size={22} className="text-brand" /><div><p className="text-xs font-semibold uppercase tracking-widest text-muted">{t}</p><p className="mt-1 font-semibold">{v}</p></div></>);
              const c = "flex items-center gap-5 py-5 transition-transform duration-300";
              return href ? <a key={t} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${c} hover:translate-x-1.5`}>{body}</a> : <div key={t} className={c}>{body}</div>;
            })}
          </div>
        </div>
        <motion.form onSubmit={submit} noValidate initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.8, ease }} className="space-y-5 border border-line bg-white p-6 sm:p-9 lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2"><Field label="Name" value={f.name} onChange={set("name")} error={err.name} /><Field label="Phone or Email" value={f.contact} onChange={set("contact")} error={err.contact} /></div>
          <Field label="What do you need?" value={f.need} onChange={set("need")} error={err.need} />
          <Field label="Message" area value={f.message} onChange={set("message")} error={err.message} />
          <button className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-10 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand sm:w-auto">Send Enquiry<ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-3 lg:px-8">
        <div><p className="font-extrabold tracking-[0.18em] text-white">SUBNETWORKING</p><p className="mt-2 text-sm">Engineering • Technology • Connectivity</p></div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">{NAV.map((n) => <a key={n} href={`#${id(n)}`} className="transition hover:text-white">{n}</a>)}</nav>
        <div className="text-sm"><p>{LOCATION}</p><a href="tel:+2347078693219" className="mt-1 block hover:text-white">{PHONE}</a><a href={WA} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-semibold text-white hover:text-brand">WhatsApp us <ArrowUpRight size={15} /></a></div>
      </div>
      <p className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">© 2026 Subnetworking. All rights reserved.</p>
    </footer>
  );
}

export default function Page() {
  return (<><Header /><main><Hero /><Intro /><Services /><About /><Why /><Projects /><CTA /><Contact /></main><Footer />
    <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Chat with Subnetworking on WhatsApp" className="fixed bottom-5 right-5 z-40 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition hover:scale-105"><MessageCircle size={26} /></a></>);
}
