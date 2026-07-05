import { motion } from "framer-motion";
import { Section } from "./Section";
import { Trophy } from "lucide-react";
import { useAchievements } from "@/lib/portfolio-data";

export function Achievements() {
  const { data = [] } = useAchievements();
  return (
    <Section id="achievements" eyebrow="Achievements" title="Milestones & wins">
      <div className="grid gap-5 md:grid-cols-2">
        {data.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="glass card-shadow group relative overflow-hidden rounded-2xl p-6">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-secondary/20 blur-2xl transition-all group-hover:bg-secondary/40" />
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-bg text-primary-foreground glow">
                <Trophy size={22} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{a.year}</div>
                <h3 className="mt-1 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}