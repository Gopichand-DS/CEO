import { useEffect, useState } from "react";
import clsx from "clsx";

import { Container } from "@/components/ui";

import LoginModal from "../auth/LoginModal";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoginOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoginOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl"
            : "bg-black"
        )}
      >
        <Container>
          <div className="flex h-20 items-center">
            <DesktopNav
              onLogin={() => setIsLoginOpen(true)}
            />

            <div className="flex w-full lg:hidden">
              <MobileNav
                onLogin={() => setIsLoginOpen(true)}
              />
            </div>
          </div>
        </Container>
      </header>

      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}