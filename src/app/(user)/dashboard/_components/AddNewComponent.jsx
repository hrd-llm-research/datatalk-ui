"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { charts } from "@/utils/mockData";
import DynamicChartComponent from "./DynamicChartComponent";
import { addSelectedChart } from "@/services/dashboard/dashboardAction";


const AddNewComponentPage = ({ addChart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter charts based on the search term
  const filteredCharts = charts.filter((chart) =>
    chart.chartName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //selecting a chart
  const handleSelectChart = async (chart) => {
    try {
      await addSelectedChart(chart);
      addChart(chart); // Add the chart to the dashboard immediately
      setIsOpen(false); // Close the popup after adding
    } catch (error) {
      console.error("Failed to add chart:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <Sheet
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open) setSearchTerm(""); // Clear search input
        }}
      >
        <SheetTrigger asChild>
          <div
            onClick={() => setIsOpen(true)}
            className="border border-dashed border-[#8abef6] rounded-lg min-w-[271px] min-h-52 flex flex-col items-center justify-center cursor-pointer"
          >
            <Image
              src={"/assets/addnewcomponent.svg"}
              alt="addcomponents"
              width={150}
              height={150}
            />
            <p className="text-[#007AFF] text-xs font-medium mt-2">
              Add Component
            </p>
          </div>
        </SheetTrigger>
  
        <SheetContent
          side="bottom"
          className="container mx-auto px-4 rounded-t-md h-[500px]"
        >
          <SheetHeader className=" ml-4 mr-4">
            <SheetTitle className="mb-3">Add chart</SheetTitle>
            <Separator className="mb-4 w-auto" />
            <div className="flex justify-between gap-8 pt-4">
              <SheetDescription className="text-left text-md font-medium mb-4">
                Showing {filteredCharts.length} of {charts.length} charts
              </SheetDescription>
              <div className="relative w-[300px] justify-end">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </SheetHeader>
          {charts.length === 0 ? (
            // No card chart
            <div className="flex flex-col items-center justify-center h-72 rounded-md">
              <Image
                src={"/assets/nocardchart.png"}
                alt="nochart"
                width={150}
                height={150}
              />
              <p className="mt-4 text-sm text-gray-500">
                Doesn’t have any saved visuals
              </p>
            </div>
          ) : filteredCharts.length === 0 ? (
            // Search not found
            <div className="flex flex-col items-center justify-center h-72 rounded-md">
              <p className="text-gray-500 text-lg">
                No results found for "{searchTerm}"
              </p>
              <p className="text-gray-400">Please try searching again!</p>
            </div>
          ) : (
            // List card chart
            <ScrollArea className="h-72 mt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-1 ml-4 mr-4">
                {filteredCharts.map((chart, index) => (
                  <Card
                    key={index}
                    className="relative min-w-[271px] min-h-52 group hover:bg-blue-100 transition-colors duration-300"
                    onClick={() => handleSelectChart(chart)}
                  >
                    <CardHeader className="p-3 pt-4">
                      <div className="flex justify-between gap-2">
                        <CardTitle className="text-sm font-medium">
                          {chart.chartName}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <DynamicChartComponent
                      config={chart.chartConfig}
                      data={chart.data}
                      name={chart.chartName}
                      type={chart.type}
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="focus:outline-none"
                        
                      >
                        <Plus
                          size={24}
                          className="text-blue-500 bg-white rounded-full w-10 h-10"
                        />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddNewComponentPage;
