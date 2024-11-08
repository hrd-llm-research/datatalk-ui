// ChartComponent.jsx
"use client";
import EnhancedDynamicChart from "@/components/charts/DynamicChart";

export default function ChartComponent({ chartItem }) {
  // Use optional chaining (?.) to safely access properties
  const chartType = chartItem?.data?.chart_type || "bar chart"; // Fallback to a default type if undefined
  const chartData = chartItem?.data?.data || []; // Fallback to an empty array if undefined
  const chartName = chartItem?.visualization_name || "Unnamed Chart";
  const chart_id = chartItem?.visualization_id
  return (
    <EnhancedDynamicChart
      config={chartItem.data || {}}
      type={chartType}
      data={chartData}
      name={chartName}
      chart_id={chart_id}
    />
  );
}
