import { motion } from "framer-motion";
import { Section } from "./Section";
import { Award, ExternalLink } from "lucide-react";
import { useCertifications } from "@/lib/portfolio-data";

export function Certifications() {
  const { data = [] } = useCertifications();
  return (
    <Section id="certifications" eyebrow="Certifications" title="Continuous learning">
      <div className="grid gap-4 md:grid-cols-3">
        {data.map((c, i) => (
          <motion.a key={c.id} href={c.url ?? "#"} target={c.url ? "_blank" : undefined} rel="noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="glass card-shadow group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-primary/50">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <Award size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold">{c.name}</h3>
              <p className="truncate text-xs text-muted-foreground">{c.issuer}{c.year ? ` · ${c.year}` : ""}</p>
            </div>
            {c.url && <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary" />}
          </motion.a>
        ))}
      </div>
    </Section>
  );
}