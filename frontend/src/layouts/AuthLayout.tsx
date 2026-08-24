import type { ReactNode } from "react";

interface AuthLayoutProps {
  leftPanel: ReactNode;
  children: ReactNode;
  variant?: "default" | "glass";
}

export default function AuthLayout({
  leftPanel,
  children,
  variant = "default",
}: AuthLayoutProps) {
  const isGlass = variant === "glass";

  return (
    <main
      className={`
        min-h-screen
        ${isGlass ? "bg-black" : "bg-slate-50"}
      `}
    >
      <div
        className="
          mx-auto
          grid
          min-h-screen
          max-w-[1700px]
          lg:grid-cols-[42%_58%]
        "
      >
        {/* Left Branding Panel */}
        <aside
          className="
            hidden
            lg:flex
            relative
            overflow-hidden
            bg-black
          "
        >
          {leftPanel}
        </aside>

        {/* Right Authentication Area */}
        <section
          className={`
            relative
            flex
            items-center
            justify-center
            overflow-hidden
            px-6
            py-12
            sm:px-10
            lg:px-16
            xl:px-24
            ${
              isGlass
                ? "bg-black/80 backdrop-blur-3xl"
                : "bg-slate-50"
            }
          `}
        >
          {isGlass && (
            <>
              {/* Black Glass Background */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-black/40
                  backdrop-blur-3xl
                "
              />

              {/* Subtle Top Right Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-40
                  -top-40
                  h-[32rem]
                  w-[32rem]
                  rounded-full
                  bg-indigo-600/10
                  blur-[160px]
                "
              />

              {/* Subtle Bottom Left Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-40
                  -left-40
                  h-[32rem]
                  w-[32rem]
                  rounded-full
                  bg-violet-600/10
                  blur-[160px]
                "
              />
            </>
          )}

          {/* Registration/Login Form */}
          <div
            className="
              relative
              z-10
              w-full
              max-w-xl
            "
          >
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}