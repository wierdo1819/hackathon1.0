import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface RiskTrendChartProps {
  data: Array<{ time: number; risk: number }>;
}

export const RiskTrendChart: React.FC<RiskTrendChartProps> = ({ data }) => {
  const chartData = data.map((point) => ({
    time: `${point.time}s`,
    risk: point.risk,
  }));

  const CustomTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 rounded p-2">
          <p className="text-xs text-slate-300">{payload[0].payload.time}</p>
          <p className="text-sm font-semibold text-blue-400">
            Risk: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-4">
      <h3 className="font-semibold text-white mb-4">Risk Progression</h3>
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-slate-400">
          <p className="text-sm">No data yet...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
            <XAxis
              dataKey="time"
              stroke="rgba(148,163,184,0.5)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="rgba(148,163,184,0.5)"
              domain={[0, 100]}
              style={{ fontSize: "12px" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={30}
              stroke="rgba(34,197,94,0.3)"
              strokeDasharray="5 5"
              label={{ value: "Low", position: "right", fill: "#22c55e" }}
            />
            <ReferenceLine
              y={70}
              stroke="rgba(239,68,68,0.3)"
              strokeDasharray="5 5"
              label={{ value: "High", position: "right", fill: "#ef4444" }}
            />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RiskTrendChart;
