import { motion } from "framer-motion";
import { Section } from "./Section";
import { useServices } from "@/lib/portfolio-data";
import { Code, Cloud, Brain, Plug, Database, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = { code: Code, cloud: Cloud, brain: Brain, plug: Plug, database: Database, compass: Compass };

export function Services() {
  const { data = [] } = useServices();
  return (
    <Section id="services" eyebrow="Services" title="What I can build for you" subtitle="How I can help teams and clients ship better software.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.map((s, i) => {
          const Icon = ICONS[s.icon ?? "code"] ?? Code;
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass card-shadow group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1">
              <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/25" />
              <div className="relative">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl gradient-bg text-primary-foreground glow">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}