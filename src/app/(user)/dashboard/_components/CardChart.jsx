"use client";

import { useState } from "react";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import DynamicChartComponent from "./DynamicChartComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useToast } from "@/hooks/use-toast";
export default function CardChart({
  data,
  xAxisKey,
  config,
  name,
  type,
  onDelete,
}) {
  const [isDeletePopUpOpen, setDeletePopUpOpen] = useState(false);
  const [isRenameOpen, setRenameOpen] = useState(false);
  const [tempChartName, setTempChartName] = useState(name);
  const [chartName, setChartName] = useState(name);
  const [isRenameLoading, setIsRenameLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { toast } = useToast();
  const openDeletePopUp = () => setDeletePopUpOpen(true);
  const closeDeletePopUp = () => setDeletePopUpOpen(false);

  const openRenamePopUp = () => {
    setTempChartName(chartName); // Set current display name in the rename input
    setRenameOpen(true);
  };

  const closeRenamePopUp = () => setRenameOpen(false);

  const handleRename = async () => {
    setIsRenameLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setChartName(tempChartName); // Update displayed name only on save
      toast({
        variant: "success",
        title: "Success",
        description: "Chart renamed successfully!",
      });
      closeRenamePopUp();
    } catch {
      toast({
        variant: "Error",
        title: "Failed",
        description: "Chart renamed successfully!",
      });
    } finally {
      setIsRenameLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onDelete(); // function to handle deletion
    closeDeletePopUp(); // Close the delete confirmation popup
    toast({
      variant: "success",
      title: "Success",
      description: "Chart deleted successfully!",
    });
    setIsDeleteLoading(false);
  };

  return (
    <>
      <Card className="rounded-lg min-w-[271px] min-h-52 flex flex-col items-center justify-center cursor-pointer">
        <div className="w-full flex justify-between align-middle pr-2 pl-2 pb-6">
          <CardTitle className="font-medium text-sm block w-auto">
            {chartName}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="h-5 w-5 text-color" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 p-2 bg-white rounded-md shadow-lg">
              <DropdownMenuItem
                className="flex items-center focus:outline-none cursor-pointer"
                onClick={openRenamePopUp}
              >
                <Edit className="mr-2" />
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center focus:outline-none cursor-pointer text-red-600"
                onClick={openDeletePopUp}
              >
                <Trash2 className="mr-2 text-red-600" />
                <span className="text-red-600">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DynamicChartComponent
          config={config}
          data={data}
          name={chartName}
          type={type}
        />

        {/* Rename Dialog */}
        <Dialog open={isRenameOpen} onOpenChange={setRenameOpen}>
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleRename}
                className="bg-primary1 hover:bg-primary1 hover:opacity-45 transition-all text-white"
                disabled={isRenameLoading} // Only disable during rename loading
              >
                {isRenameLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeletePopUpOpen} onOpenChange={closeDeletePopUp}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-medium">
                Confirm Deletion
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this chart? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={closeDeletePopUp}
                disabled={isDeleteLoading} // Only disable during delete loading
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={isDeleteLoading} // Only disable during delete loading
              >
                {isDeleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
