import {
    Area,
    AreaChart,
    ResponsiveContainer,
} from "recharts";

import DashboardCard from "./DashboardCard";
import { revenueData } from "./dashboardData";

const chart = revenueData.map((value, index) => ({
    month: index,
    revenue: value,
}));

export default function RevenueChart() {
    return (
        <DashboardCard title="Revenue Trend">
            <div className="h-44">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <AreaChart data={chart}>
                        <Area
                            dataKey="revenue"
                            stroke="#4f46e5"
                            fill="#c7d2fe"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
}