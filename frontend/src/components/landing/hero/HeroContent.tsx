import HeroActions from "./HeroActions";
import HeroBadge from "./HeroBadge";
import HeroMetrics from "./HeroMetrics";

export default function HeroContent() {
  return (
    <div className="max-w-2xl">
      <HeroBadge />

      <h1
        className="
          mt-8
          text-5xl
          font-extrabold
          leading-tight
          tracking-tight
          text-slate-900
          lg:text-6xl
        "
      >
        Your AI Executive Team for
        <span className="block text-indigo-600">
          Smarter Business Decisions.
        </span>
      </h1>

      <p
        className="
          mt-8
          max-w-xl
          text-lg
          leading-8
          text-slate-600
        "
      >
        Mini CEO transforms your business data into executive intelligence.
        Monitor revenue, investigate operational issues, predict risks, and ask
        complex business questions through a secure AI platform built for
        modern organizations.
      </p>

      <div className="mt-10">
        <HeroActions />
      </div>

      <HeroMetrics />
    </div>
  );
}