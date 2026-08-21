import type { ReactNode }  from "react";

interface AuthLayoutProps {
  leftPanel: ReactNode;
  children: ReactNode;
}

export default function AuthLayout({
  leftPanel,
  children,
}: AuthLayoutProps) {
  return (
    <main
      className="
        min-h-screen
        bg-slate-50
      "
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
          className="
            flex
            items-center
            justify-center
            px-6
            py-12
            sm:px-10
            lg:px-16
            xl:px-24
          "
        >
          <div
            className="
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