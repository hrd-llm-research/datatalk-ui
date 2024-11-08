"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  Save,
  XCircle,
  RotateCw,
  Brush,
  Paintbrush,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import SavePopupComponent from "./SavePopupComponent";
import CustomTable from "@/components/CustomTable";
import { fetchData } from "@/services/table/prepareService";
import CleanDialogComponent from "./CleanDialogComponent";
import { useToast } from "@/hooks/use-toast";

export default function TableDataComponent({ showTable }) {
  console.log(showTable);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [showCleanDialog, setShowCleanDialog] = useState(false);
  const [columnType, setColumnType] = useState(null);
  const { toast } = useToast();
  const handleFetchData = () => {
    fetchData("https://seyha.com", true)
      .then((data) => {
        setData(data);
        setHeaders(Object.keys(data[0] || {}));
      })
      .catch(console.error);
  };
  useEffect(() => {
    if (showTable) {
      const timer = setTimeout(() => {
        handleFetchData();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [showTable]);
  const determineColumnType = (columnName) => {
    if (!data || data.length === 0) return "categorical";

    const nonNullValues = data
      .map((row) => row[columnName])
      .filter(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== "null" &&
          value !== "NULL" &&
          value !== "N/A" &&
          value !== ""
      );

    if (nonNullValues.length === 0) return "categorical";
    const allNumeric = nonNullValues.every(
      (value) => typeof value === "number"
    );
    if (allNumeric) return "numeric";
    const allStrings = nonNullValues.every(
      (value) => typeof value === "string" && value.trim() !== ""
    );
    if (allStrings) return "categorical";
    const allBooleans = nonNullValues.every(
      (value) => typeof value === "boolean"
    );
    if (allBooleans) return "categorical";
    return "categorical";
  };

  const handleSave = () => {
    toast({
      title: "success",
      description: "Saved Data Successfully",
      variant: "success",
    });
    setTimeout(() => setShowPopup(false), 6000);
  };

  const handleClean = () => {
    if (selectedColumn) {
      setColumnType(determineColumnType(selectedColumn));
      setShowCleanDialog(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleConfirmClean = (option) => {
    console.log("Cleaning column with option:", option);
    setShowCleanDialog(false);
  };

  const handleDownload = () => {
    const csvData = data.map((item) => headers.map((header) => item[header]));
    const csvContent =
      headers.join(",") + "\n" + csvData.map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetAll = () => {
    setSelectedColumn(null);
    setColumnType(null);
  };

  const handleColumnSelect = (columnName) => {
    setSelectedColumn(columnName === selectedColumn ? null : columnName);
  };

  return (
    <div className="mx-auto text-sm font-normal z-40">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-color 2xl:text-xl text-base font-medium">
            {data.length == 0 ? "Default Database" : "Car Sale"}
          </h2>
          {data.length == 0 ? (
            ""
          ) : (
            <p className="text-slate-300 text-xs">50 rows, 50 columns</p>
          )}
        </div>
        <div className="space-x-2">
          {selectedColumn ? (
            <Button
              onClick={handleClean}
              variant="outline"
              className="bg-primary1 2xl:text-sm text-xs  w-24 text-white hover:opacity-90 hover:bg-primary1 hover:text-white transition-all duration-300 ease-in-out  border-none  rounded-sm px-5 py-3"
            >
              <Paintbrush className="w-4 h-4 mr-2" />
              Clean
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              variant="outline"
              className="bg-primary1 w-24 2xl:text-sm text-xs text-white hover:opacity-90 hover:bg-primary1 hover:text-white transition-all duration-300 ease-in-out  border-none  rounded-sm px-5 py-3"
            >
              <Image
                src="/assets/saveBtn.svg"
                alt="save"
                width={15}
                height={15}
              />
              Save
            </Button>
          )}

          {selectedColumn ? (
            <Button
              onClick={handleResetAll}
              className="bg-primary1 2xl:text-sm text-xs  rounded-sm px-5 py-3  w-36 text-white hover:opacity-90 hover:bg-primary1 hover:text-white transition-all duration-300 ease-in-out  border-none "
            >
              <RotateCw className="w-4 h-4 mr-2" />
              Reset All
            </Button>
          ) : (
            <Button
              onClick={handleDownload}
              className="bg-primary1 2xl:text-sm  rounded-sm px-5 py-3 text-xs w-36 text-white hover:opacity-90 hover:bg-primary1 hover:text-white transition-all duration-300 ease-in-out  border-none"
            >
              <Image
                src="/assets/downloadbtn.svg"
                alt="download"
                width={16}
                height={16}
              />
              Download
            </Button>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-start justify-center pt-10 z-[100]">
          <div className="mt-10">
            <SavePopupComponent onClose={handleClosePopup} />
          </div>
        </div>
      )}
      <CleanDialogComponent
        isOpen={showCleanDialog}
        onClose={() => setShowCleanDialog(false)}
        onConfirm={handleConfirmClean}
        columnType={columnType}
      />

      <div className="xl:h-[70vh]  2xl:h-[74vh] overflow-y-auto scrollbar-hide">
        <CustomTable
          data={data}
          onColumnSelect={handleColumnSelect}
          selectedColumn={selectedColumn}
          headerClassName="text-xs font-medium 2xl:text-base py-3 text-color bg-gray-200 "
          rowClassName="2xl:text-sm text-xs bg-white"
          tableWidth="100%"
          tableHeight="100%"
          verticalScroll={true}
          cellClassName=" bg-white"
          tableClassName=""
          showIndex={true}
        />
      </div>
    </div>
  );
}
