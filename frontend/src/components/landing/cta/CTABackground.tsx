export default function CTABackground() {
  return (
    <>
      {/* Black Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Top Left Glow */}
      <div
        className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-white/5
          blur-[120px]
        "
      />

      {/* Bottom Right Glow */}
      <div
        className="
          absolute
          -right-32
          -bottom-32
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-white/[0.04]
          blur-[150px]
        "
      />

      {/* Center Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[34rem]
          w-[34rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.03]
          blur-[180px]
        "
      />

      {/* Grid Pattern */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />

      {/* Noise Overlay */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.015]
          [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]
          [background-size:22px_22px]
        "
      />
    </>
  );
}