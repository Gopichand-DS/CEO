import { Link } from "react-router-dom";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Workflow", href: "#workflow" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API", href: "/api" },
      { label: "Support", href: "/support" },
      { label: "Status", href: "/status" },
    ],
  },
];

export default function FooterLinks() {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-10
        md:grid-cols-3
      "
    >
      {footerSections.map((section) => (
        <div key={section.title}>
          <h4
            className="
              text-base
              font-semibold
              text-white
            "
          >
            {section.title}
          </h4>

          <ul className="mt-5 space-y-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="
                    text-sm
                    text-white/75
                    transition-all
                    duration-300
                    hover:text-white
                    hover:translate-x-1
                    inline-block
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}