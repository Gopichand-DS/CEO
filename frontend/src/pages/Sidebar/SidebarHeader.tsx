const SidebarHeader = () => {
  return (
    <div className="border-b px-6 py-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
          MC
        </div>

        <div>
          <h1 className="text-lg font-bold">
            Mini CEO
          </h1>

          <p className="text-sm text-slate-500">
            Executive Intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;