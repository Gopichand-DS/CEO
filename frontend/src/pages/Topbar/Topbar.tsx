import SearchBox from "./SearchBox";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";

const Topbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <SearchBox />

        <NotificationDropdown />

        <UserDropdown />
      </div>
    </header>
  );
};

export default Topbar;