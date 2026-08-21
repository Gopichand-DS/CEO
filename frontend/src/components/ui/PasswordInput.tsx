import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function PasswordInput({
  error = false,
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={showPassword ? "text" : "password"}
        className={clsx(
          `
          h-12
          w-full
          rounded-xl
          border
          bg-white
          px-4
          pr-12
          text-sm
          text-slate-900
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-300
          `,
          error
            ? `
              border-red-500
              focus:ring-4
              focus:ring-red-100
            `
            : `
              border-slate-300
              focus:border-[#4F46E5]
              focus:ring-4
              focus:ring-indigo-100
            `,
          className
        )}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          rounded-lg
          p-1
          text-slate-500
          transition-colors
          hover:text-[#4F46E5]
        "
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}