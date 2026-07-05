import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({ id, eyebrow, title, subtitle, children }: { id: string; eyebrow: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            <span className="gradient-text">{title}</span>
          </h2>
          {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}