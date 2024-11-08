import { getAllCharts } from "@/services/myChartAction";
import { getAllVisualizationChartsService } from "@/services/myChartsService";
import SavedChartPage from "./_components/myChartLayout";
// import { charts } from "@/utils/mockData";

export default async function Save() {
  // const response = await getAllCharts();
  const savedChartData = await getAllVisualizationChartsService();
  // console.log("Saved Chart Data:",savedChartData)
  const charts= savedChartData?.payload ||[];
  // const chartData = response.success ? response.data : [];
  // const chartData = savedChartData.success? chartData.data:[];
  // console.log("In chart data:",charts)
  return <SavedChartPage charts={charts} />;

}
