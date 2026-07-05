import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-bg text-primary-foreground">PA</span>
          <span className="gradient-text">Prema Akshaja Repuri</span>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground">About</a>
          <a href="#projects" className="hover:text-foreground">Projects</a>
          <a href="#experience" className="hover:text-foreground">Experience</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a aria-label="GitHub" href="https://github.com/" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"><Github size={16} /></a>
          <a aria-label="LinkedIn" href="https://linkedin.com/in/prema-akshaja-repuri-10604231a" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"><Linkedin size={16} /></a>
          <a aria-label="Email" href="mailto:pa.repuri45@gmail.com" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"><Mail size={16} /></a>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-muted-foreground">
        Designed & developed by <span className="gradient-text font-semibold">Prema Akshaja Repuri</span> · © {new Date().getFullYear()}
      </div>
    </footer>
  );
}