import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, ArrowRight, Github, Linkedin, Mail, Sparkles, ArrowDown } from "lucide-react";
import { SiReact, SiNodedotjs, SiMongodb, SiAmazon, SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import profileImg from "@/assets/profile.jpg";

const ROLES = ["Computer Science Engineer", "Full Stack MERN Developer", "Cloud Enthusiast", "AI Explorer", "Software Developer", "Problem Solver"];

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!deleting && next === current) setTimeout(() => setDeleting(true), 1400);
      else if (deleting && next === "") { setDeleting(false); setI((v) => v + 1); }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);
  return text;
}

const ORBIT = [
  { Icon: SiReact, color: "text-[#61DAFB]" },
  { Icon: SiNodedotjs, color: "text-[#8CC84B]" },
  { Icon: SiMongodb, color: "text-[#00ED64]" },
  { Icon: SiAmazon, color: "text-[#FF9900]" },
  { Icon: FaJava, color: "text-[#EA2D2E]" },
  { Icon: SiPython, color: "text-[#FFD43B]" },
];

const STATS = [
  { label: "CGPA", value: "9.59", icon: "🎓" },
  { label: "Internships", value: "2+", icon: "💼" },
  { label: "Projects", value: "5+", icon: "🚀" },
  { label: "Certifications", value: "3+", icon: "🏆" },
];

export function Hero() {
  const typed = useTyping(ROLES);
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary animate-pulse-ring">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Available for Software Engineering & Internship Opportunities
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm <br />
            <span className="gradient-text">Prema Akshaja Repuri</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-6 h-8 font-display text-xl text-muted-foreground sm:text-2xl">
            <Sparkles className="mr-2 inline h-5 w-5 text-accent" />
            <span className="gradient-text font-semibold">{typed}</span>
            <span className="ml-1 inline-block h-6 w-[2px] translate-y-1 animate-pulse bg-primary" />
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            I design and build scalable full-stack applications, intelligent AI-powered solutions, and cloud-native software that solve real-world problems. Passionate about creating seamless digital experiences through innovation, clean architecture and modern technologies.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/resume.pdf" download className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground gradient-bg glow transition-transform hover:scale-[1.03]">
              <Download size={16} /> Download Resume
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary">
              View Projects <ArrowRight size={16} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10">
              Contact Me
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 flex items-center gap-3">
            {[
              { href: "https://github.com/", Icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/prema-akshaja-repuri-10604231a", Icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:pa.repuri45@gmail.com", Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/40 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-lg hover:shadow-primary/20">
                <Icon size={18} />
              </a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s, idx) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + idx * 0.08 }}
                className="glass card-shadow rounded-2xl px-4 py-3 text-center">
                <div className="text-lg">{s.icon}</div>
                <div className="mt-1 font-display text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          <div className="absolute inset-0 rounded-full gradient-bg opacity-30 blur-3xl" />
          <div className="glass card-shadow relative flex h-full w-full items-center justify-center rounded-[2rem] p-6">
            <div className="absolute inset-4 rounded-full border border-primary/20" />
            <div className="absolute inset-10 rounded-full border border-secondary/20" />
            <div className="relative h-[70%] w-[70%] overflow-hidden rounded-full ring-4 ring-primary/40 shadow-2xl shadow-primary/40">
              <img src={profileImg} alt="Prema Akshaja Repuri portrait" width={768} height={896} className="h-full w-full object-cover" />
            </div>
            {ORBIT.map((o, i) => {
              const angle = (360 / ORBIT.length) * i;
              const radius = 175;
              const style: React.CSSProperties = {
                animation: `float-orbit ${18 + i * 2}s linear infinite`,
                animationDelay: `-${angle / 20}s`,
              };
              (style as Record<string, string>)["--r"] = `${radius}px`;
              return (
                <div key={i} className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full glass card-shadow" style={style}>
                  <o.Icon className={`h-5 w-5 ${o.color}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
        Scroll <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}