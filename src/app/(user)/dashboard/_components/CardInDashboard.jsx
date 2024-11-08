"use client";
import { useState } from "react";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { toast, Toaster } from "react-hot-toast";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/hooks/use-toast";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export function CardPage() {
  const [isDeletePopUpOpen, setDeletePopUpOpen] = useState(false);
  const [isRenameOpen, setRenameOpen] = useState(false);
  const [tempChartName, setTempChartName] = useState("Sales BreakDown");
  const [chartName, setChartName] = useState("Sales BreakDown");
  const [isRenameLoading, setIsRenameLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();
  const openDeletePopUp = () => setDeletePopUpOpen(true);
  const closeDeletePopUp = () => setDeletePopUpOpen(false);
  const openRenamePopUp = () => {
    setTempChartName(chartName);
    setRenameOpen(true);
  };
  const closeRenamePopUp = () => setRenameOpen(false);

  const handleRename = async () => {
    setIsRenameLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setChartName(tempChartName);
      toast({
        variant: "success",
        title: "Success",
        description: "Chart renamed successfully!",
      });
      closeRenamePopUp();
    } catch {
      toast({
        variant: "desctructive",
        title: "Failed",
        description: "Chart renamed successfully!",
      });
    } finally {
      setIsRenameLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        variant: "success",
        title: "Success",
        description: "Chart deleted successfully!",
      });
      setIsVisible(false);
      closeDeletePopUp();
    } catch {
      toast({
        variant: "desctructive",
        title: "Failed",
        description: "Chart deleted successfully!",
      });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <Toaster position="top-right" />
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="rounded-lg min-w-[271px] h-52 sm:h-52 md:h-52 items-center justify-center cursor-pointer">
            <div className="w-full flex justify-between align-middle pr-2 pl-2 mt-3">
              <CardTitle className="font-medium text-sm block w-auto">
                {chartName}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreVertical className="h-5 w-5 text-color" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32 p-2 bg-white rounded-md shadow-lg">
                  <DropdownMenuItem onClick={openRenamePopUp}>
                    <Edit className="mr-2" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openDeletePopUp}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 text-red-600" />
                    <span className="text-red-600">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-36 w-full">
                <BarChart data={chartData} width={300} height={200}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <Bar
                    dataKey="desktop"
                    fill={chartConfig.desktop.color}
                    radius={4}
                  />
                  <Bar
                    dataKey="mobile"
                    fill={chartConfig.mobile.color}
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent
          className="w-80 px-4 py-2 mr-3 -mt-2.5"
          side="bottom"
          align="end"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-medium">{chartName}</h4>
              <p className="text-xs text-justify">
                This chart shows the monthly breakdown of sales data divided by
                desktop and mobile usage.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeletePopUpOpen} onOpenChange={closeDeletePopUp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-medium">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this dashboard? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeDeletePopUp}
              //   disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeleteLoading}
              variant="destructive"
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={isRenameOpen} onOpenChange={setRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-medium">Rename Chart</DialogTitle>
            <DialogDescription>
              Enter a new name for your chart.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Label htmlFor="name" className="text-right mb-2">
              Name
            </Label>
            <Input
              value={tempChartName}
              onChange={(e) => setTempChartName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleRename}
              disabled={isRenameLoading}
              className="bg-primary1 hover:bg-opacity-80 hover:bg-primary1 transition-all "
            >
              {isRenameLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
