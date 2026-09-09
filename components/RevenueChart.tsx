"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyPoint } from "@/lib/engine/types";
import { formatFcfa, formatMonth } from "@/lib/format";

export function RevenueChart({ data }: { data: MonthlyPoint[] }) {
  const chartData = data.map((point) => ({
    ...point,
    label: formatMonth(point.month),
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid stroke="#e6ddd0" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#5c6b63", fontSize: 12 }} />
          <YAxis
            tick={{ fill: "#5c6b63", fontSize: 12 }}
            tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
          />
          <Tooltip
            formatter={(value) => formatFcfa(Number(value ?? 0))}
            labelStyle={{ color: "#14231c" }}
          />
          <Bar dataKey="inbound" name="Revenus" fill="#1f4d3a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
