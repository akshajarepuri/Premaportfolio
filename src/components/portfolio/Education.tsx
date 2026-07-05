import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section } from "./Section";
import { useEducation } from "@/lib/portfolio-data";

export function Education() {
  const { data = [] } = useEducation();
  return (
    <Section id="education" eyebrow="Education" title="Academic journey" subtitle="Consistent excellence across every stage.">
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2" />
        <div className="space-y-8">
          {data.map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`relative grid gap-4 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
              <div className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full gradient-bg glow md:left-1/2" />
              <div className={`glass card-shadow ml-10 rounded-2xl p-6 md:ml-0 ${i % 2 ? "md:mr-10" : "md:ml-10"}`}>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <GraduationCap size={14} /> {e.period}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold">{e.institution}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.degree}</p>
                {e.score && <div className="mt-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{e.score}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}