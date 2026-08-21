import {
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import NavLogo from "@/components/landing/navbar/NavLogo";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Executive Intelligence",
    description:
      "Ask business questions in natural language and receive executive-ready insights.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description:
      "Monitor revenue, projects, employees and company performance from one dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Built with secure authentication, role-based access control and encrypted communication.",
  },
];

export default function RegisterLeftPanel() {
  return (
    <div
      className="
        relative
        flex
        h-full
        flex-col
        justify-between
        overflow-hidden
        px-12
        py-14
      "
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Glow */}
      <div
        className="
          absolute
          -left-20
          -top-20
          h-72
          w-72
          rounded-full
          bg-indigo-600/20
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-96
          w-96
          rounded-full
          bg-indigo-500/10
          blur-[150px]
        "
      />

      {/* Content */}
      <div className="relative z-10">
        <NavLogo />

        <div className="mt-20">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              text-slate-300
              backdrop-blur-xl
            "
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />

            Executive Intelligence Platform
          </div>

          <h1
            className="
              mt-8
              text-5xl
              font-bold
              leading-tight
              tracking-tight
              text-white
            "
          >
            Welcome to

            <span className="block text-indigo-400">
              Mini CEO
            </span>
          </h1>

          <p
            className="
              mt-6
              max-w-lg
              text-lg
              leading-8
              text-slate-400
            "
          >
            Transform business operations with AI-powered executive
            intelligence, automated investigations, real-time analytics,
            and strategic decision support.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-5"
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                "
              >
                <Icon className="h-6 w-6 text-indigo-400" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  {title}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          border-t
          border-white/10
          pt-8
          text-sm
          text-slate-400
        "
      >
        <span>Trusted by modern businesses</span>

        <span>Enterprise Ready</span>
      </div>
    </div>
  );
}