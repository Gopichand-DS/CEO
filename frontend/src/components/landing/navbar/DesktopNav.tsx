import NavActions from "./NavActions";
import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";

interface DesktopNavProps {
  onLogin?: () => void;
}

export default function DesktopNav({
  onLogin,
}: DesktopNavProps) {
  return (
    <div className="hidden w-full items-center justify-between lg:flex">
      <div className="flex-shrink-0">
        <NavLogo />
      </div>

      <div className="flex flex-1 justify-center px-12">
        <NavLinks />
      </div>

      <div className="flex-shrink-0">
        <NavActions onLogin={onLogin} />
      </div>
    </div>
  );
}