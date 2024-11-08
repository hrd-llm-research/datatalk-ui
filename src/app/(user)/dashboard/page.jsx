"use client";

import React, { useState } from "react";
import { CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import CardDashboard from "./_components/CardDashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { getAllDashboardService } from "@/services/dashboard/dashboardService";
import { dashboardsData } from "@/utils/dashboardData";

// Function to calculate "time ago" from a given date
function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}
export default function DashboardsPage({ id }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dashboards, setDashboards] = useState([
    { id: 1, name: "Marketing Dashboard", lastUpdate: "2024-10-25T12:00:00" },
    // { id: 2, name: "Sales Dashboard", lastUpdate: "2024-10-22T15:30:00" },
    // { id: 3, name: "Customer Insights", lastUpdate: "2024-10-20T09:45:00" },
    // { id: 4, name: "Finance Overview", lastUpdate: "2024-10-19T18:15:00" },
    // { id: 5, name: "Operations Metrics", lastUpdate: "2024-10-18T08:00:00" },
  ]);
  // const dashboardsData= await getAllDashboardService();
  // console.log("Dashboards data:",dashboardsData)

  const { toast } = useToast();

  const handleDeleteDashboard = (id) => {
    const isDeleteSuccessful = Math.random() > 0.5;
    if (isDeleteSuccessful) {
      setDashboards(dashboards.filter((dashboard) => dashboard.id !== id));
  
      toast({
        title: "Successful",
        description: "Dashboard deleted successfully",
        variant: "success",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete dashboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDashboards = dashboards.filter((dashboard) =>
    dashboard.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {dashboards.length === 0 ? (
      
        <div className="w-full bg-white h-screen rounded-[14px] flex flex-col px-8 py-4 ">
          <div className="flex justify-between items-center py-4">
            <CardTitle className="text-xl sm:text-2xl text-color font-medium">
              Dashboards
            </CardTitle>
          </div>
          <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={"/assets/createdashboard.svg"}
                alt="createdashboard"
                width={250}
                height={250}
                className="mb-6"
              />
              <h1 className="font-medium text-[16px] mb-2 text-[#101828]">
                It&apos;s time to add your first dashboards
              </h1>
              <p className="text-[#ABABAB] text-sm font-medium mb-6">
                Start your dashboard journey now.
              </p>
              <Link
                href={`/dashboard/999`}
                className="bg-primary1 hover:bg-opacity-80 hover:bg-primary1 text-white rounded-sm px-5 py-1  flex items-center gap-2 font-medium capitalize"
              >
                + Add dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : filteredDashboards.length === 0 ? (
        <div className="w-full bg-white h-screen rounded-[14px] flex flex-col px-8 py-4">
          <div className="flex justify-between items-center py-3.5">
            <CardTitle className="text-xl sm:text-2xl text-color font-medium">
              Dashboards
              <span className="text-lg sm:text-xl text-slate-800 font-medium pl-4">
                {filteredDashboards.length}
              </span>
            </CardTitle>
            <div className="flex justify-between gap-4">
              <div className="relative w-[300px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Link
                href={`/dashboard/999`}
                className="bg-primary1 hover:bg-opacity-80 hover:bg-primary1 text-white px-4 rounded-sm  py-1  flex items-center gap-2 font-medium capitalize"
              >
                + Add dashboard
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              No results found for &quot;{searchTerm}&quot;.
            </p>
            <p className="text-gray-400">Please try seaching again!</p>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white h-screen rounded-[14px] flex flex-col px-8 py-4">
          <div className="flex justify-between items-center py-3.5 ">
            <CardTitle className="text-xl sm:text-2xl text-color font-medium">
              Dashboards
              <span className="text-lg sm:text-xl text-slate-800 font-medium pl-4">
                {filteredDashboards.length}
              </span>
            </CardTitle>
            <div className="flex justify-between gap-4">
              <div className="relative w-[300px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Link
                href={`/dashboard/999`}
                className="bg-primary1 hover:bg-opacity-80 hover:bg-primary1 text-white rounded-sm px-5 py-1  flex items-center gap-2 font-medium capitalize"
              >
                + Add dashboard
              </Link>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-10rem)] pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredDashboards.map((dashboard) => (
                <CardDashboard
                  key={dashboard.id}
                  id={dashboard.id}
                  name={dashboard.name}
                  lastUpdate={timeAgo(dashboard.lastUpdate)}
                  onDelete={() => handleDeleteDashboard(dashboard.id)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
}
