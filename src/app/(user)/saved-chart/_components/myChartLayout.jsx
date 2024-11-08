// SavedChartPage.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChartComponent from "./Chart";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function SavedChartPage({ charts }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCharts = searchTerm
    ? charts.filter((chart) =>
        chart.visualization_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : charts;

  return (
    <section className="w-full bg-white h-screen rounded-[14px] flex flex-col px-8 py-4">
      <div className="flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-2 py-4 sm:h-16 space-y-2 sm:space-y-0">
          <div className="flex gap-4 items-center justify-evenly">
            <h1 className="text-xl sm:text-2xl text-color font-medium">
              My Charts
            </h1>
            <h3 className="text-lg sm:text-xl text-slate-800 font-medium">
              {filteredCharts.length}
            </h3>
          </div>
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search charts"
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {filteredCharts.length > 0 ? (
        <ScrollArea className="flex-grow pb-20">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
            {filteredCharts.map((chart, index) => (
              <ChartComponent chartItem={chart} key={index} c />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Card className="flex flex-col justify-center items-center p-4 h-[250px] w-[250px] gap-y-4 border-none">
            <Image src={"/assets/visual.svg"} width={300} height={300} alt="no chart" />
            <CardTitle className="font-normal text-color text-center text-[14px]">
              Doesn't have any saved visuals
            </CardTitle>
          </Card>
        </div>
      )}
    </section>
  );
}
