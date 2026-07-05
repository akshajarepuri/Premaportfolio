import { motion } from "framer-motion";
import { Section } from "./Section";
import { Briefcase } from "lucide-react";
import { useExperience } from "@/lib/portfolio-data";

export function Experience() {
  const { data = [] } = useExperience();
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked" subtitle="Internships and roles where I learned by shipping.">
      <div className="mx-auto max-w-4xl space-y-6">
        {data.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="glass card-shadow rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-primary-foreground">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{e.role}</h3>
                  <p className="text-sm text-primary">{e.company}</p>
                </div>
              </div>
              <div className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{e.period}</div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{e.description}</p>
            {e.bullets.length > 0 && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {e.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full gradient-bg" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}