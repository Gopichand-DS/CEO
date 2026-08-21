interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  const calculateStrength = (value: string) => {
    if (!value) return 0;

    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    return score;
  };

  const strength = calculateStrength(password);

  const levels = [
    {
      label: "Enter Password",
      color: "bg-slate-200",
      text: "text-slate-400",
    },
    {
      label: "Very Weak",
      color: "bg-red-500",
      text: "text-red-500",
    },
    {
      label: "Weak",
      color: "bg-orange-500",
      text: "text-orange-500",
    },
    {
      label: "Medium",
      color: "bg-yellow-500",
      text: "text-yellow-600",
    },
    {
      label: "Strong",
      color: "bg-lime-500",
      text: "text-lime-600",
    },
    {
      label: "Very Strong",
      color: "bg-emerald-500",
      text: "text-emerald-600",
    },
  ];

  const current = levels[strength];

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">
          Password Strength
        </span>

        <span
          className={`text-xs font-semibold ${current.text}`}
        >
          {current.label}
        </span>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`
              h-2
              flex-1
              rounded-full
              transition-all
              duration-300
              ${
                index < strength
                  ? current.color
                  : "bg-slate-200"
              }
            `}
          />
        ))}
      </div>

      <div className="mt-4 grid gap-2 text-xs text-slate-500">
        <p
          className={
            password.length >= 8
              ? "text-emerald-600"
              : ""
          }
        >
          ✓ Minimum 8 characters
        </p>

        <p
          className={
            /[A-Z]/.test(password)
              ? "text-emerald-600"
              : ""
          }
        >
          ✓ One uppercase letter
        </p>

        <p
          className={
            /[a-z]/.test(password)
              ? "text-emerald-600"
              : ""
          }
        >
          ✓ One lowercase letter
        </p>

        <p
          className={
            /[0-9]/.test(password)
              ? "text-emerald-600"
              : ""
          }
        >
          ✓ One number
        </p>

        <p
          className={
            /[^A-Za-z0-9]/.test(password)
              ? "text-emerald-600"
              : ""
          }
        >
          ✓ One special character
        </p>
      </div>
    </div>
  );
}