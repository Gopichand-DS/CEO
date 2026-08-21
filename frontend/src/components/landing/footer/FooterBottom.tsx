import { Copyright, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com",
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
        border-slate-200
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
          text-slate-600
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
              text-slate-600
              transition-colors
              hover:text-indigo-600
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
              border-slate-200
              text-slate-500
              transition-all
              duration-300
              hover:border-indigo-600
              hover:bg-indigo-600
              hover:text-white
            "
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}