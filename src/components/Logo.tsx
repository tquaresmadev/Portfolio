export default function Logo({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} aria-label={label} className="inline-flex min-h-11 items-center">
      <span className="font-display text-[22px] leading-none font-extrabold tracking-[-0.04em]">
        TQ
        <span aria-hidden="true" className="ml-[0.08em] inline-block size-[0.3em] rounded-[2px] bg-accent" />
      </span>
    </a>
  );
}
