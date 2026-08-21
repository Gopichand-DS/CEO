interface FloatingKPIProps {
  title: string;
  value: string;
  className?: string;
}

export default function FloatingKPI({
  title,
  value,
  className = "",
}: FloatingKPIProps) {
  return (
    <div
      className={`
        absolute
        rounded-2xl
        border
        border-white/60
        bg-white/90
        px-5
        py-4
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        ${className}
      `}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}