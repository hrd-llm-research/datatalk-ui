"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddNewComponentPage from "../_components/AddNewComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import DynamicChartComponent from "../_components/DynamicChartComponent";
import { getSelectedCharts } from "@/services/dashboard/dashboardAction";
import CardChart from "../_components/CardChart";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { Edit, MoreVertical, Trash2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
import { CardPage } from "../_components/CardInDashboard";
const page = ({ params, config, data, type }) => {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
  const chartConfig = {
    desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
    mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
  };
 
  const [isEditing, setIsEditing] = useState(false);
  const [dashboardName, setDashboardName] = useState("Marketing Dashboard");
  const [charts, setCharts] = useState([]);
  const nameRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isEditing && nameRef.current) placeCursorAtEnd();
  }, [isEditing]);

  // useEffect(() => {
  //   const fetchCharts = async () => {
  //     const fetchedCharts = await getSelectedCharts();
  //     setCharts(fetchedCharts);
  //   };
  //   fetchCharts();
  // }, []);

  const addChart = (newChart) => {
    setCharts((prevCharts) => [...prevCharts, newChart]);
  };

  const placeCursorAtEnd = () => {
    if (nameRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(nameRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleBlur = () => {
    const newName = dashboardName.trim();
    setDashboardName(newName || "Name Your Dashboard");
    setIsEditing(false);
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     if(dashboardName.trim() === ""){
        
  //       setIsEditing(false);
  //       setDashboardName("Name Your Dashboard")
  //       e.preventDefault();
  //       console.log("GGGG")
  //       console.log(dashboardName)
  //       return;
  //     }
       
  //     e.preventDefault();
  //     const newName = dashboardName.trim();
  //     setDashboardName(newName || "Name Your Dashboard");
  //     setIsEditing(false);
  //   }
  // };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      // Check if dashboardName is empty or null-like, and set default if true
      const newName = dashboardName && dashboardName.trim() !== "" 
        ? dashboardName.trim() 
        : "Name Your Dashboard";
  
      // Update the dashboard name
      setDashboardName(newName);
      setIsEditing(false);
    }
  };
  

  const handleInput = (e) => {
    let newText = e.target.innerText;
    if (newText.length > 50) {
      newText = newText.slice(0, 50);
      e.target.innerText = newText;
    }
    setDashboardName(newText);
    placeCursorAtEnd();
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const handleDeleteConfirm = (indexToDelete) => {
    try {
      setCharts((prevCharts) =>
        prevCharts.filter((_, index) => index !== indexToDelete)
      );
      toast.success("Successfully deleted the chart!");
    } catch (error) {
      console.error("Error deleting chart:", error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full bg-white h-screen rounded-[14px] flex flex-col px-8 py-4">
        <div className="flex flex-row justify-between items-center py-4">
          <CardTitle className="flex items-center gap-4 text-xl sm:text-2xl text-color font-medium">
            <span
              ref={nameRef}
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={handleBlur}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              className={`cursor-pointer outline-none text-xl sm:text-2xl text-color font-medium ${
                isEditing ? "border-b border-dashed border-gray-400" : ""
              }`}
              onClick={enableEditing}
            >
              {params.id != "999" ?  dashboardName : "Name Your Dashboard"}
            </span>
            <span className="text-muted-foreground" onClick={enableEditing}>
              <Image
                src={"/assets/edit.svg"}
                alt="edit"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </span>
          </CardTitle>
          <Link href="/dashboard">
            <button className="bg-primary1 hover:bg-opacity-80 text-white rounded-sm px-5 py-2 flex items-center gap-2 -mt-2">
              <Image
                src={"/assets/save.svg"}
                alt="save"
                width={15}
                height={15}
              />
              Save
            </button>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)] pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            <AddNewComponentPage addChart={addChart} />

            {params.id != '999' && <CardPage />}
            

            {charts.map((chart, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <div>
                    <CardChart
                      data={chart.data}
                      config={chart.chartConfig}
                      name={chart.chartName}
                      type={chart.type}
                      onDelete={() => handleDeleteConfirm(index)}
                    />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-80 px-4 py-2 mr-3 -mt-2.5"
                  side="bottom"
                  align="end"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1 flex-1">
                      <h4 className="text-sm font-medium">{chart.chartName}</h4>
                      <p className="text-xs text-justify">
                        This chart shows the average daily screen time of 2h
                        20m, divided into News, Games, and Social Media.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default page;
