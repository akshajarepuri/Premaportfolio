import { motion } from "framer-motion";
import { Section } from "./Section";
import { useProjects } from "@/lib/portfolio-data";
import { Github, ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";

export function Projects() {
  const { data = [] } = useProjects();
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => Array.from(new Set(data.flatMap((p) => p.tech))).sort(), [data]);
  const filtered = useMemo(() => data.filter((p) => {
    const matchQ = !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase());
    const matchT = !tag || p.tech.includes(tag);
    return matchQ && matchT;
  }), [data, q, tag]);

  return (
    <Section id="projects" eyebrow="Featured Projects" title="Things I've built" subtitle="Selected work spanning AI, full-stack and cloud.">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…"
            className="w-full rounded-full border border-border bg-card/50 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setTag(null)} className={`rounded-full border px-3 py-1 text-xs ${tag === null ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>All</button>
          {tags.slice(0, 8).map((t) => (
            <button key={t} onClick={() => setTag(t === tag ? null : t)}
              className={`rounded-full border px-3 py-1 text-xs transition-all ${t === tag ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.article key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="glass card-shadow group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-primary/20">
            <div className="relative aspect-[16/10] overflow-hidden">
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="flex h-full w-full items-center justify-center gradient-bg text-4xl font-bold text-primary-foreground opacity-90">
                  {p.title.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 5).map((t) => (
                  <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">{t}</span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2">
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary">
                    <Github size={14} /> Code
                  </a>
                )}
                {p.live_url && (
                  <a href={p.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg gradient-bg px-3 py-1.5 text-xs text-primary-foreground">
                    <ExternalLink size={14} /> Live
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-muted-foreground">No projects match your search.</div>
        )}
      </div>
    </Section>
  );
}