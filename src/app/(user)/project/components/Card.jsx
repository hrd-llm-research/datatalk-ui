"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Trash, Edit, Menu, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { renameProject, deleteProject } from "@/services/projectAction";
import formatCreatedAt from "@/lib/formatDate";

const truncateText = (text, length) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

export default function ProjectCard({
  id,
  connectionName = "",
  hostname = "",
  port,
  username = "",
  databaseName = "",
  schema = "",
  createdAt,
}) {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState(connectionName);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleRename = async () => {
    setIsLoading(true);
    console.log(id, newProjectName);
    try {
      const result = await renameProject(id, newProjectName);
      if (result.success) {
        setIsRenameDialogOpen(false);

        toast({
          variant: "success",
          title: "Success",
          description: "Project renamed successfully!",
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Error renaming project:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteProject(id);
      if (result.success) {
        setIsDeleteDialogOpen(false);
        toast({
          variant: "success",
          title: "Success",
          description: "Project deleted successfully!",
        });
        router.refresh();
      } else {
        console.error("Failed to delete project:", result.message);
        toast({
          title: "Error",
          description: "Failed to delete project. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[calc(20rem)] xl:max-2xl:w-[calc(18rem)]  p-4 px-4 shadow-lg rounded-md border bg-white  hover:shadow-xl transform hover:scale-100 transition-all duration-200">
      <CardTitle className="text-lg font-semibold text-slate-800 mb-2">
        {connectionName}
      </CardTitle>
      <Link href={`/project/${id}/preparation`}>
        <CardContent className="my-2 p-0">
          <ul className="text-xs text-slate-600 grid grid-cols-2 bg-blue-50  p-3 rounded-sm gap-4">
            <div>
              <li className="flex flex-col mb-1">
                <span className="font-semibold text-xs">Hostname:</span>
                <span className="text-[10px]" title={hostname}>
                  {truncateText(hostname, 15)}
                </span>
              </li>
              <li className="flex flex-col mb-1">
                <span className="font-semibold text-xs">Username:</span>
                <span className="text-[10px]" title={username}>
                  {truncateText(username, 15)}
                </span>
              </li>
              <li className="flex flex-col mb-1">
                <span className="font-semibold text-xs">Port:</span>
                <span className="text-[10px]">{port || "N/A"}</span>
              </li>
            </div>
            <div>
              <li className="flex flex-col mb-1">
                <span className="font-semibold text-xs">Database Name</span>
                <span className="text-[10px]" title={databaseName}>
                  {truncateText(databaseName, 15)}
                </span>
              </li>
              <li className="flex flex-col mb-1">
                <span className="font-semibold text-xs">Schema:</span>
                <span className="text-[10px]" title={schema}>
                  {truncateText(schema, 15)}
                </span>
              </li>
            </div>
          </ul>
        </CardContent>
      </Link>
      <CardFooter className="text-xs text-slate-500 border-slate-200 justify-between flex items-center p-0 font-medium mt-3">
        <span>Created At: {formatCreatedAt(createdAt)}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setIsRenameDialogOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" color="#ef4444" />
              <span className="text-[#ef4444]">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="w-fit">Rename Project</DialogTitle>
            <DialogDescription>
              Enter a new name for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 ">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="col-span-4 rounded-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleRename}
              disabled={isLoading}
              className="bg-primary1 hover:bg-primary1   rounded-sm px-5 py-3  hover:bg-opacity-80"
            >
              {isLoading ? "Renaming..." : "Rename Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-primary1 hover:bg-primary1 hover:bg-opacity-80 text-white  rounded-sm px-5 py-3"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
              className=" rounded-sm px-5 py-3"
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
