import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import NavActions from "./NavActions";
import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";

interface MobileNavProps {
  onLogin?: () => void;
}

export default function MobileNav({
  
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="w-full">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <NavLogo />

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((prev) => !prev)}
          className="
            flex
            h-12
            w-12
            items-center
             justify-center
            rounded-xl
             border
               border-white/10
               bg-black
             text-white
             transition-colors
                duration-300
              hover:bg-slate-900
          "
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu
              className="
                h-5
                w-5
              "
            />
          )}
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        className={`
          fixed
          left-0
          right-0
          top-0
          z-50
          rounded-b-3xl
          border-b
          border-white/10
          bg-black
          shadow-2xl
          transition-all
          duration-500
          ease-out
          ${
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-full pointer-events-none opacity-0"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-6 py-6">
          {/* Header */}
          <div className="relative flex items-center">
            <NavLogo />

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                rounded-xl
                border
                border-white/10
                bg-black
                p-2.5
                text-white
                transition-all
                duration-300
                hover:bg-slate-900
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6 border-b border-white/10" />

          {/* Navigation */}
          <div className="mt-6">
            <NavLinks
              vertical
              onNavigate={() => setOpen(false)}
            />
          </div>

          {/* Actions */}
          <div className="mt-8">
            <NavActions
                mobile
                onNavigate={() => setOpen(false)}
                
            />
          </div>
        </div>
      </div>
    </div>
  );
}