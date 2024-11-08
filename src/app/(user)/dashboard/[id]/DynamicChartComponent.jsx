import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  Scatter,
  ScatterChart,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];
import { ChartContainer } from "@/components/ui/chart";
import { CardContent } from "@/components/ui/card";

export default function DynamicChartComponent({
  data,
  xAxisKey,
  config,
  name,
  type
}) {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            {/* <YAxis /> */}
            <Legend />
            sdfghj
            {Object.entries(config).map(([key, { color }], index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={color || COLORS[index % COLORS.length]}
              />
            ))}
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />

            <Legend />
            {Object.entries(config).map(([key, { color }], index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color || COLORS[index % COLORS.length]}
              />
            ))}
          </LineChart>
        );
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />

            <Legend />
            {Object.entries(config).map(([key, { color }], index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                fill={color || COLORS[index % COLORS.length]}
                stroke={color || COLORS[index % COLORS.length]}
              />
            ))}
          </AreaChart>
        );
      case "scatter":
        return (
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="stature" unit="cm" />
            <YAxis type="number" dataKey="y" name="weight" unit="kg" hide />

            <Legend iconSize={10} />
            {Object.entries(config).map(([key, { color }], index) => (
              <Scatter
                key={index}
                name={name}
                data={data}
                fill={color || COLORS[index % COLORS.length]}
              />
            ))}
          </ScatterChart>
        );
      case "pie":
        return (
          <PieChart >
            <Pie
              data={data}
              dataKey={Object.keys(config)[0]}
              nameKey={xAxisKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Legend className="rounded-full" />
          </PieChart>
        );
      case "radar":
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xAxisKey} />
            <PolarRadiusAxis />
            {Object.entries(config).map(([key, { color }], index) => (
              <Radar
                key={key}
                name={key}
                dataKey={key}
                stroke={color || COLORS[index % COLORS.length]}
                fill={color || COLORS[index % COLORS.length]}
                fillOpacity={0.6}
              />
            ))}
            <Legend />
          </RadarChart>
        );
      default:
        return null;
    }
  };
  return (
    <CardContent className="mt-2 justify-items-center p-0">
      <ChartContainer config={config} className="h-32 w-52">
        {renderChart()}
      </ChartContainer>
    </CardContent>
  );
}
