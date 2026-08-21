import { useEffect, useState } from "react";
import clsx from "clsx";

export interface NavigationItem {
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "Features", href: "features" },
  { label: "Workflow", href: "workflow" },
  { label: "Security", href: "security" },
  { label: "Pricing", href: "pricing" },
  { label: "FAQ", href: "faq" },
];

interface NavLinksProps {
  vertical?: boolean;
  onNavigate?: () => void;
}

export default function NavLinks({
  vertical = false,
  onNavigate,
}: NavLinksProps) {
  const [activeSection, setActiveSection] = useState("features");

  useEffect(() => {
  const handleScroll = () => {
    const navbarHeight = 80;

    for (const item of navigationItems) {
      const section = document.getElementById(item.href);

      if (!section) continue;

      const rect = section.getBoundingClientRect();

      if (
        rect.top <= navbarHeight + 100 &&
        rect.bottom >= navbarHeight + 100
      ) {
        setActiveSection(item.href);
        break;
      }
    }
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const handleClick = (
  event: React.MouseEvent<HTMLAnchorElement>,
  id: string
  ) => {
  event.preventDefault();

  setActiveSection(id);

   const section = document.getElementById(id);

   if (!section) return;

    const navbar = document.querySelector("header");
    const navbarHeight = navbar?.clientHeight ?? 80;

    const y =
    section.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight;

    window.scrollTo({
     top: y,
     behavior: "smooth",
   });

   onNavigate?.();
  };

  return (
    <nav
      className={clsx(
        "flex",
        vertical
          ? "flex-col items-start gap-5"
          : "items-center gap-9"
      )}
    >
      {navigationItems.map((item) => (
        <a
          key={item.label}
          href={`#${item.href}`}
          onClick={(event) => handleClick(event, item.href)}
          className={clsx(
            "group relative py-2 text-[15px] font-semibold transition-all duration-300",
            activeSection === item.href
              ? "text-white"
              : "text-white/80 hover:text-white"
          )}
        >
          {item.label}

          <span
            className={clsx(
              "absolute -bottom-1 left-0 h-[2px] rounded-full bg-white transition-all duration-300",
              activeSection === item.href
                ? "w-full"
                : "w-0 group-hover:w-full"
            )}
          />
        </a>
      ))}
    </nav>
  );
}