import DashboardCard from "./DashboardCard";

export default function RiskCard() {
    return (
        <DashboardCard title="Executive Risk Score">
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-5xl font-black text-emerald-600">
                        92
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        Low Risk
                    </p>
                </div>

                <div className="flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-emerald-500">
                    <span className="text-lg font-bold">
                        92%
                    </span>
                </div>

            </div>
        </DashboardCard>
    );
}