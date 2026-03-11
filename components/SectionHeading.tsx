type Props = {
  badge: string;
  title: string;
  description: string;
};

export default function SectionHeading({
  badge,
  title,
  description,
}: Props) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
        {badge}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
        {description}
      </p>
    </div>
  );
}