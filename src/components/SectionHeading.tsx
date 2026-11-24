export default function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 px-1 sm:px-2">
      <h2
        id={id}
        className="font-display text-[clamp(2.5rem,1.9rem+2.4vw,4rem)] leading-none font-bold tracking-[-0.035em]"
      >
        {title}
      </h2>
      <p className="max-w-[40ch] text-[17px] text-muted">{description}</p>
    </div>
  );
}
