export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/25 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-secondary/25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-0 left-1/3 h-[440px] w-[440px] rounded-full bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: "-12s" }} />
    </div>
  );
}