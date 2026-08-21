interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox({
  className,
  ...props
}: CheckboxProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className={`
        h-5
        w-5
        rounded
        border-slate-300
        text-[#4F46E5]
        focus:ring-[#4F46E5]
        ${className ?? ""}
      `}
    />
  );
}