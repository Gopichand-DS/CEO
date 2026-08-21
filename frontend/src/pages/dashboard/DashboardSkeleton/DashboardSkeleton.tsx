const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">

      {/* Header */}

      <div className="h-28 rounded-2xl bg-slate-200" />

      {/* KPI Cards */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-2xl bg-slate-200"
          />
        ))}

      </div>

      {/* Analytics */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="h-[380px] rounded-2xl bg-slate-200 xl:col-span-2" />

        <div className="h-[380px] rounded-2xl bg-slate-200" />

      </div>

      {/* Activity */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="h-[340px] rounded-2xl bg-slate-200" />

        <div className="h-[340px] rounded-2xl bg-slate-200" />

      </div>

      {/* Executive */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="h-[420px] rounded-2xl bg-slate-200 xl:col-span-2" />

        <div className="h-[420px] rounded-2xl bg-slate-200" />

      </div>

    </div>
  );
};

export default DashboardSkeleton;