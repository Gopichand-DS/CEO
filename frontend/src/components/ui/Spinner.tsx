interface SpinnerProps {
  size?: number;
}

export default function Spinner({
  size = 20,
}: SpinnerProps) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.25"
      />

      <path
        fill="currentColor"
        d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z"
      />
    </svg>
  );
}