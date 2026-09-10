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
    <div
      className="h-64 w-full"
      role="img"
      aria-label={`Graphique des revenus mensuels de ${chartData[0]?.label ?? "début de période"} à ${chartData.at(-1)?.label ?? "fin de période"}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 12, right: 4, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="#ded4c3" strokeDasharray="3 5" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="label"
            tick={{ fill: "#607168", fontSize: 11 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#607168", fontSize: 11 }}
            tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => formatFcfa(Number(value ?? 0))}
            contentStyle={{
              background: "#fffdf9",
              border: "1px solid #ded4c3",
              borderRadius: "12px",
              boxShadow: "0 12px 30px rgba(20,35,28,.12)",
            }}
            cursor={{ fill: "#f5e8c9", opacity: 0.5 }}
            labelStyle={{ color: "#14231c", fontWeight: 700 }}
          />
          <Bar dataKey="inbound" name="Revenus" fill="#174837" radius={[7, 7, 2, 2]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
