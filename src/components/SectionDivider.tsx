export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      <div className="mx-4 flex items-center gap-1.5">
        <span className="h-1 w-1 rounded-full bg-border/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
        <span className="h-1 w-1 rounded-full bg-border/60" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
    </div>
  );
}
