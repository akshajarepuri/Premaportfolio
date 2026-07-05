import { motion } from "framer-motion";
import { Section } from "./Section";
import { useSkills } from "@/lib/portfolio-data";
import { useMemo } from "react";

export function Skills() {
  const { data = [] } = useSkills();
  const grouped = useMemo(() => {
    const g = new Map<string, typeof data>();
    for (const s of data) {
      const arr = g.get(s.category) ?? [];
      arr.push(s);
      g.set(s.category, arr);
    }
    return Array.from(g.entries());
  }, [data]);

  return (
    <Section id="skills" eyebrow="Skills" title="Tools of the trade" subtitle="Technologies I use to design, ship and scale.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {grouped.map(([cat, items], idx) => (
          <motion.div key={cat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
            className="glass card-shadow group relative overflow-hidden rounded-2xl p-6">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
            <h3 className="font-display text-lg font-semibold text-foreground">{cat}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((s) => (
                <span key={s.id} className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium transition-all hover:border-primary/50 hover:text-primary">
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}