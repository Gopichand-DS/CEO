import { Badge } from "@/components/ui";

import CTAActions from "./CTAActions";

export default function CTAContent() {
  return (
    <div
      className="
        relative
        z-10
        mx-auto
        max-w-5xl
      "
    >
      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          px-8
          py-16
          backdrop-blur-2xl
          shadow-2xl
          md:px-16
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            text-center
          "
        >
          <Badge
            className="
              border
              border-white/15
              bg-white/10
              text-white
              backdrop-blur-xl
            "
          >
            Executive Intelligence Platform
          </Badge>

          <h2
            className="
              mt-8
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              md:text-5xl
              lg:text-6xl
            "
          >
            Ready to Transform
            <br />

            <span className="text-white">
              Your Business with AI?
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-3xl
              text-lg
              leading-8
              text-slate-400
            "
          >
            Empower your executives with intelligent investigations,
            executive-ready reports, real-time business insights,
            and AI-powered decision support—all from one secure,
            enterprise-grade platform.
          </p>

          <CTAActions />

          <div
            className="
              mt-12
              flex
              flex-wrap
              items-center
              justify-center
              gap-8
              text-sm
              text-slate-400
            "
          >
            <span>✓ No Credit Card Required</span>

            <span>✓ Enterprise Security</span>

            <span>✓ AI-Powered Insights</span>

            <span>✓ 5-Minute Setup</span>
          </div>
        </div>
      </div>
    </div>
  );
}