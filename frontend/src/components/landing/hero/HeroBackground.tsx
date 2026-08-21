export default function HeroBackground() {
  return (
    <>
      {/* Base Gradient */}
      <div
        className="
          absolute
          inset-0
          -z-20
          bg-gradient-to-br
          from-indigo-50
          via-white
          to-slate-100
        "
      />

      {/* Top Left Glow */}
      <div
        className="
          absolute
          -top-40
          -left-40
          -z-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-indigo-300/20
          blur-[140px]
        "
      />

      {/* Top Right Glow */}
      <div
        className="
          absolute
          top-0
          right-0
          -z-10
          h-[360px]
          w-[360px]
          rounded-full
          bg-cyan-300/20
          blur-[120px]
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          absolute
          bottom-0
          left-1/2
          -z-10
          h-[380px]
          w-[380px]
          -translate-x-1/2
          rounded-full
          bg-violet-300/20
          blur-[140px]
        "
      />

      {/* Grid Pattern */}
      <div
        className="
          absolute
          inset-0
          -z-10
          opacity-[0.04]
          [background-image:linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />
    </>
  );
}