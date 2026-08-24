import { Copyright, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/vallapaneni-gopi-chand-51a70031a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/Gopichand-DS",
    label: "GitHub",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "X",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms of Service",
    href: "/terms",
  },
  {
    label: "Cookie Policy",
    href: "/cookies",
  },
];

export default function FooterBottom() {
  return (
    <div
      className="
        mt-16
        flex
        flex-col
        items-center
        justify-between
        gap-8
        border-t
        border-white/30
        pt-8
        lg:flex-row
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-sm
          text-white
        "
      >
        <Copyright className="h-4 w-4" />

        <span>
          {new Date().getFullYear()} Mini CEO. All rights reserved.
        </span>
      </div>

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-center
          gap-6
        "
      >
        {legalLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="
              text-sm
              text-white/80
              transition-colors
              hover:text-white
            "
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/60
              text-white
              transition-all
              duration-300
              hover:border-white
              hover:bg-white
              hover:text-[#616161]
            "
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}