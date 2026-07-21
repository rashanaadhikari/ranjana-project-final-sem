"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";

interface InteractiveBarChartProps {
  title?: string;
  description?: string;
  data: any[];
  config: {
    [key: string]: { label: string; color: string };
  };
  xAxisKey: string;
}

export function InteractiveBarChart({ title, description, data, config, xAxisKey }: InteractiveBarChartProps) {
  const chartKeys = Object.keys(config);
  const [activeCharts, setActiveCharts] = React.useState<string[]>(chartKeys);

  const total = React.useMemo(
    () => {
      const sums: Record<string, number> = {};
      chartKeys.forEach((key) => {
        sums[key] = data.reduce((acc, curr) => acc + (curr[key] || 0), 0);
      });
      return sums;
    },
    [data, chartKeys]
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
      <div className="flex flex-col sm:flex-row border-b border-gray-200 items-stretch">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
          {title && <h3 className="text-xl font-bold leading-none tracking-tight">{title}</h3>}
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto">
          {chartKeys.map((key) => {
            const isActive = activeCharts.includes(key);
            return (
              <button
                key={key}
                disabled={chartKeys.length <= 1}
                className={`relative z-30 flex flex-1 flex-col justify-center gap-1 border-gray-200 px-4 py-3 sm:px-6 sm:py-6 text-left transition-colors sm:border-l ${
                  isActive ? "bg-gray-50/50" : "opacity-40 hover:opacity-75"
                } ${chartKeys.length <= 1 ? "cursor-default" : ""}`}
                onClick={() => {
                   if (chartKeys.length <= 1) return;
                   setActiveCharts(prev => 
                      prev.includes(key) ? (prev.length > 1 ? prev.filter(k => k !== key) : prev) 
                      : [...prev, key]
                   );
                }}
              >
                <span className="text-[10px] sm:text-xs text-gray-500 uppercase font-semibold tracking-wider">
                  {config[key].label}
                </span>
                <span className="text-base sm:text-2xl leading-none font-bold text-gray-900">
                  {total[key].toLocaleString()}
                </span>
                {isActive && chartKeys.length > 1 && (
                   <div className="absolute top-0 left-0 w-full h-[3px]" style={{ backgroundColor: config[key].color }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-2 pt-6 sm:p-6 lg:p-8">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ left: 12, right: 12, bottom: 12, top: 12 }}
            >
              <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3"/>
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                minTickGap={32}
                tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip 
                 cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                 contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                 labelStyle={{ fontWeight: "bold", marginBottom: "8px", color: '#111' }}
              />
              {chartKeys.filter(key => activeCharts.includes(key)).map(key => (
                <Bar 
                  key={key}
                  dataKey={key} 
                  fill={config[key].color} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
