import NavActions from "./NavActions";
import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";

export default function DesktopNav() {
  return (
    <div className="hidden w-full items-center justify-between lg:flex">
      
      {/* Logo */}
      <div className="flex-shrink-0">
        <NavLogo />
      </div>

      {/* Navigation */}
      <div className="flex flex-1 justify-center px-12">
        <NavLinks />
      </div>

      {/* Actions */}
      <div className="flex-shrink-0">
        <NavActions />
      </div>
    </div>
  );
}