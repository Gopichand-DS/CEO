import * as React from "react";
import clsx from "clsx";

type HeadingAlign = "left" | "center" | "right";

interface HeadingProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: HeadingAlign;
  className?: string;
}

const alignStyles: Record<HeadingAlign, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

export default function Heading({
  badge,
  title,
  description,
  align = "center",
  className,
}: HeadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5",
        alignStyles[align],
        className
      )}
    >
      {badge && <div>{badge}</div>}

      <h2
        className="
          max-w-4xl
          text-4xl
          font-bold
          leading-tight
          tracking-tight
          text-slate-900
          md:text-5xl
          lg:text-6xl
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            max-w-3xl
            text-lg
            leading-8
            text-slate-600
            md:text-xl
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}