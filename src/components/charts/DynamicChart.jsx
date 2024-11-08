"use client";

import * as React from "react";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer } from "../ui/chart";
import {
  deleteVisualizationByIdService,
  renameVisualizationByIdService,
} from "@/services/myChartsService";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const EnhancedDynamicChart = ({
  chart_id,
  name,
  data = [],
  config,
  type,
  xAxisKey = "customer_name",
}) => {
  const explain = config?.explain || "";
  const [isRenameDialogOpen, setIsRenameDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [newChartName, setNewChartName] = React.useState(name);
  const [tempChartName, setTempChartName] = React.useState(name);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  // Open and close handlers for dialogs
  const openRenameDialog = () => {
    setTempChartName(newChartName);
    setIsRenameDialogOpen(true);
  };
  const closeRenameDialog = () => setIsRenameDialogOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);
  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  // Handle renaming of the chart
  const handleRename = async () => {
    setIsLoading(true);
    try {
      const isRenameSuccessful = await renameVisualizationByIdService(
        chart_id,
        tempChartName
      );
      console.log("result:", isRenameSuccessful);
      if (isRenameSuccessful) {
        setNewChartName(tempChartName);
        toast({
          variant: "success",
          title: "Success",
          description: "Chart renamed successfully!",
        });
        closeRenameDialog();
      } else {
        toast({
          variant: "destructive",
          title: "failed",
          description: "Failed to rename chart. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error renaming dashboard:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deletion of the chart
  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      const isDeleteSuccessful = await deleteVisualizationByIdService(chart_id);
      if (isDeleteSuccessful) {
        toast({
          variant: "success",
          title: "Success",
          description: "Chart deleted successfully!",
        });
        closeDeleteDialog();
        if (onDelete) {
          onDelete(chart_id); // Call the parent's onDelete callback
        }
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to delete chart. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Render the chart based on type
  const renderChart = () => {
    switch (type) {
      case "bar chart":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="market_share_percentage" fill={COLORS[0]} />
          </BarChart>
        );
      case "line chart":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="market_share_percentage"
              stroke={COLORS[1]}
            />
          </LineChart>
        );
      case "area chart":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="market_share_percentage"
              fill={COLORS[2]}
              stroke={COLORS[2]}
            />
          </AreaChart>
        );
      case "scatter chart":
        return (
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="category" dataKey={xAxisKey} name="Category" />
            <YAxis
              type="number"
              dataKey="market_share_percentage"
              name="Percentage"
            />
            <Tooltip />
            <Legend />
            <Scatter name={name} data={data} fill={COLORS[3]} />
          </ScatterChart>
        );
      case "pie chart":
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey="market_share_percentage"
              nameKey="product_category"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {data.map((item, index) => (
                <Cell
                  key={`cell-${item.visualization_id}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case "radar chart":
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xAxisKey} />
            <PolarRadiusAxis />
            <Radar
              name="Market Share"
              dataKey="market_share_percentage"
              stroke={COLORS[4]}
              fill={COLORS[4]}
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        );
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="font-medium text-sm">{newChartName}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="focus:outline-none shadow-none border-none hover:bg-slate-50 p-2 bg-white h-8 w-8 flex items-center justify-center">
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={openRenameDialog}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteDialog}>
              <Trash2 className="mr-2 h-4 w-4" color="#ef4444" />
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0 h-52  bg-white">
        <ChartContainer config={config} className=" h-full w-full">
          <HoverCard className="">
            <HoverCardTrigger asChild>
              <div variant="link" className="px-0 inline-block w-full h-full">
                <ResponsiveContainer width="100%" className={"h-full"}>
                  {renderChart()}
                </ResponsiveContainer>
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              className="w-80 bg-white"
              side="bottom"
              align="end"
            >
              <div className="flex justify-start space-x-4 border rounded-sm">
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-medium h-auto px-2 pt-2 ">
                    {name}
                  </h4>
                  <p className="text-xs text-justify px-2 py-2">{explain}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </ChartContainer>
      </CardContent>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={closeRenameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-medium">Rename Chart</DialogTitle>
            <DialogDescription>
              Enter a new name for your chart.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1">
            <div>
              <Label htmlFor="name" className="text-right mb-2">
                Name
              </Label>
              <Input
                id="name"
                value={tempChartName}
                onChange={(e) => setTempChartName(e.target.value)}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleRename}
              disabled={isLoading}
              className="bg-primary1 hover:bg-primary1 hover:opacity-80 rounded-sm px-5 py-3 transition-all"
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-medium">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chart? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeDeleteDialog}
              disabled={isLoading}
              className="rounded-sm px-5 py-3"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isLoading}
              className="rounded-sm px-5 py-3"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EnhancedDynamicChart;
