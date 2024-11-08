"use client";

import * as React from "react";
import {
  Edit,
  EllipsisVertical,
  MoreVertical,
  PencilLine,
  Trash2,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartContainer } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
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

export default function CardDashboard({id, name, lastUpdate, onDelete }) {
  const [isDeletePopUpOpen, setDeletePopUpOpen] = React.useState(false);
  const [isRenameOpen, setRenameOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(name);
  const [tempTitle, setTempTitle] = React.useState(name);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const openDeletePopUp = () => setDeletePopUpOpen(true);
  const closeDeletePopUp = () => setDeletePopUpOpen(false);

  const openRenamePopup = () => {
    setTempTitle(newTitle);
    setRenameOpen(true);
  };
  const closeRenamePopup = () => setRenameOpen(false);

  const handleRename = async () => {
    setIsLoading(true);
    try {
      // Simulate an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isRenameSuccessful = Math.random() > 0.5; // Simulate a success or failure scenario

      if (isRenameSuccessful) {
        setNewTitle(tempTitle);
        toast({
          variant: "success",
          title: "Success",
          description: "Dashboard renamed successfully!",
        });
        closeRenamePopup();
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to rename dashboard. Please try again.",
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

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // onDelete();
      onDelete();
      closeDeletePopUp();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Card className="relative overflow-hidden cursor-pointer container  h-52 ">
        <div className="absolute right-2 top-2 text-gray-400 justify-items-end z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="h-5 w-5 text-color" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10">
              <DropdownMenuItem onClick={openRenamePopup}>
                <Edit className="mr-2" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openDeletePopUp}>
                <Trash2 className="mr-2 text-red-600" />
                <span className="text-red-600">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* <Link href={`/dashboard/${Math.floor(Math.random() * 100)}`}> */}
        <Link href={`/dashboard/${id}`}>
          <CardHeader className="absolute inset-0 z-40 flex items-center justify-center">
            <div className="bg-white w-[230px] shadow-lg rounded-[5px] text-white px-4 py-2">
              <CardTitle className="font-medium text-color text-sm flex flex-col items-center">
                <p>{newTitle}</p>
                <span className="text-xs text-muted-foreground">
                  Last update {lastUpdate}
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          </Link>
          <CardContent className="border-b-8 border-b-primary1 h-52">
            <ChartContainer
              config={chartConfig}
              className="opacity-60 h-40 w-full mt-3"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
 
      </Card>
   
      {/* Delete Confirmation Popup */}
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
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Rename Popup */}
      <Dialog open={isRenameOpen} onOpenChange={setRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-medium">Rename Dashboard</DialogTitle>
            <DialogDescription>
              Enter a new name for your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1">
            <div>
              <Label htmlFor="name" className="text-right mb-2">
                Name
              </Label>
              <Input
                id="name"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="col-span-3 focus-visible:ring-transparent"
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleRename}
              disabled={isLoading}
              className="bg-primary1 hover:bg-opacity-80 hover:bg-primary1 transition-all "
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
