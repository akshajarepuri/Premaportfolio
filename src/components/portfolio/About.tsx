import { motion } from "framer-motion";
import { Section } from "./Section";
import { Code2, Cloud, Brain, Rocket, Users, Award } from "lucide-react";

const INTERESTS = [
  { icon: Code2, label: "Software Development" },
  { icon: Brain, label: "Artificial Intelligence" },
  { icon: Cloud, label: "Cloud Computing" },
  { icon: Rocket, label: "Full Stack" },
  { icon: Users, label: "Open Source" },
  { icon: Award, label: "Hackathons" },
];
const STATS = [
  { label: "CGPA", value: "9.59" },
  { label: "Projects", value: "5+" },
  { label: "Internships", value: "2+" },
  { label: "Hackathons", value: "3+" },
  { label: "Certifications", value: "3+" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About Me" title="Engineer, builder, learner" subtitle="A quick snapshot of who I am and what I care about.">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass card-shadow rounded-3xl p-8">
          <p className="text-base leading-relaxed text-foreground/90">
            I'm a <span className="gradient-text font-semibold">Computer Science Engineering</span> student at GITAM University maintaining a <span className="gradient-text font-semibold">CGPA of 9.59/10</span>. I love turning ideas into products — scalable software, AI-powered applications, and cloud-native systems that solve real problems.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            My focus areas span the full stack, computer vision, cloud infrastructure and open source. I aspire to grow into a Software Development Engineer role and contribute to technologies that meaningfully improve people's lives.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <div key={i.label} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm">
                <i.icon className="h-4 w-4 text-primary" /> {i.label}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass card-shadow rounded-2xl p-6 text-center">
              <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}