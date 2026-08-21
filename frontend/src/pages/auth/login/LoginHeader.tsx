export default function LoginHeader() {
  return (
    <div>
      <span
        className="
          inline-flex
          rounded-full
          bg-indigo-100
          px-3
          py-1
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-indigo-700
        "
      >
        Welcome Back
      </span>

      <h1
        className="
          mt-5
          text-3xl
          font-bold
          tracking-tight
          text-slate-900
        "
      >
        Sign in to Mini CEO
      </h1>

      <p className="mt-3 text-slate-600 leading-7">
        Continue managing your organization with AI-powered executive
        intelligence, business insights, and real-time analytics.
      </p>
    </div>
  );
}