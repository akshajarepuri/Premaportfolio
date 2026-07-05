import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled ? "py-2" : "py-4")}>
      <nav className={cn("mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all", scrolled ? "glass card-shadow" : "bg-transparent")}>
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-bg text-primary-foreground shadow-lg shadow-primary/30">PA</span>
          <span className="gradient-text">Prema</span>
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={toggle} className="grid h-9 w-9 place-items-center rounded-full border border-border transition-all hover:border-primary/50 hover:text-primary">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="#contact" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground gradient-bg glow transition-transform hover:scale-105 md:inline-block">
            Hire Me
          </a>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-2 md:hidden">
          <div className="glass rounded-2xl p-4">
            <ul className="flex flex-col gap-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a onClick={() => setOpen(false)} href={`#${s.id}`} className="block py-1 text-sm">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}