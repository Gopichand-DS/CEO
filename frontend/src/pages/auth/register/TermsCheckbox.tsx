import { Link } from "react-router-dom";

interface TermsCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function TermsCheckbox({
  checked = false,
  onChange,
}: TermsCheckboxProps) {
  return (
    <label
      className="
        flex
        items-start
        gap-3
        rounded-xl
        border
        border-slate-200
        p-4
        transition-colors
        duration-300
        hover:border-indigo-300
        hover:bg-slate-50
      "
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        className="
          mt-1
          h-5
          w-5
          rounded
          border-slate-300
          text-[#4F46E5]
          focus:ring-[#4F46E5]
        "
      />

      <span
        className="
          text-sm
          leading-6
          text-slate-600
        "
      >
        I agree to the{" "}

        <Link
          to="/terms"
          className="
            font-semibold
            text-[#4F46E5]
            hover:underline
          "
        >
          Terms of Service
        </Link>

        {" "}and{" "}

        <Link
          to="/privacy"
          className="
            font-semibold
            text-[#4F46E5]
            hover:underline
          "
        >
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}