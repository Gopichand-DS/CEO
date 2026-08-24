import { Link } from "react-router-dom";

export default function FooterBrand() {
  return (
    <div className="max-w-sm">
      <Link
        to="/"
        className="inline-flex items-center gap-3"
      >
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            bg-[#fbf6e3]
            shadow-xl
          "
        >
          <img
            src="/logo.png"
            alt="Mini CEO"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">
            Mini CEO
          </h3>

          <p className="text-sm text-slate-400">
            Executive Intelligence Platform
          </p>
        </div>
      </Link>

      <p
        className="
          mt-6
          text-base
          leading-7
          text-slate-400
        "
      >
        Mini CEO empowers founders, executives, and leadership teams with
        AI-driven business intelligence, automated investigations,
        executive reporting, and real-time operational insights—all from
        a secure, enterprise-ready platform.
      </p>
    </div>
  );
}