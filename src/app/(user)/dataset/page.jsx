"use client";

import { useState } from "react";
import {
  ArrowDownToLineIcon,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MOCK_DATA = [
  {
    id: "PLVQ8OMeJ69b8qLORG30",
    name: "employee_attrition_data.sql",
    lastUpdate: "20.09.2019",
    createdAt: "12.09.2019",
  },
  {
    id: "QMVP9NLfK70c9rMPSH41",
    name: "customer_churn_analysis.sql",
    lastUpdate: "15.10.2019",
    createdAt: "05.10.2019",
  },
  {
    id: "RSTQ1BDgH82e1pNOUJ52",
    name: "sales_forecast_2020.sql",
    lastUpdate: "01.11.2019",
    createdAt: "20.10.2019",
  },
  {
    id: "UVWX2CFiI93f2qOPVK63",
    name: "product_inventory.sql",
    lastUpdate: "10.11.2019",
    createdAt: "01.11.2019",
  },
  {
    id: "YZAB3DGjJ04g3rQQWL74",
    name: "marketing_campaign_results.sql",
    lastUpdate: "25.11.2019",
    createdAt: "15.11.2019",
  },
  {
    id: "BCDE4EHkK15h4sSRXM85",
    name: "user_engagement_metrics.sql",
    lastUpdate: "05.12.2019",
    createdAt: "28.11.2019",
  },
  {
    id: "FGHI5FIlL26i5tTSYN96",
    name: "financial_report_q4.sql",
    lastUpdate: "15.12.2019",
    createdAt: "10.12.2019",
  },
  {
    id: "JKLM6GJmM37j6uUTZO07",
    name: "social_media_analytics.sql",
    lastUpdate: "22.12.2019",
    createdAt: "18.12.2019",
  },
  {
    id: "NOPQ7HKnN48k7vVUAP18",
    name: "supply_chain_data.sql",
    lastUpdate: "02.01.2020",
    createdAt: "28.12.2019",
  },
  {
    id: "RSTU8ILoO59l8wWVBQ29",
    name: "customer_feedback_analysis.sql",
    lastUpdate: "10.01.2020",
    createdAt: "05.01.2020",
  },
];

const DatasetRow = ({ dataset, onDelete, onDownload }) => (
  <TableRow className="h-[60px]">
    <TableCell>{dataset.name}</TableCell>
    <TableCell className="hidden sm:table-cell">{dataset.id}</TableCell>
    <TableCell>{dataset.lastUpdate}</TableCell>
    <TableCell>{dataset.createdAt}</TableCell>
    <TableCell>
      <div className="flex items-center justify-center">
        <Button variant="link" size="icon" onClick={() => onDownload(dataset)}>
          <ArrowDownToLineIcon color="blue" className="h-5 w-5 text-primary" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" size="icon">
              <Trash2 className="h-5 w-5 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                dataset and remove the data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(dataset.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TableCell>
  </TableRow>
);

export default function DataSetPage() {
  const [datasets, setDatasets] = useState(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDatasets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDatasets = filteredDatasets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = (id) => {
    setDatasets(datasets.filter((dataset) => dataset.id !== id));
  };

  const handleDownload = (dataset) => {
    const csvContent = `Name,ID,Last Update,Created At\n${dataset.name},${dataset.id},${dataset.lastUpdate},${dataset.createdAt}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${dataset.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="w-full bg-white h-full rounded-[14px] flex flex-col px-8 py-4">
      <div className="flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-2 py-4 sm:h-16 space-y-2 sm:space-y-0">
          <div className="flex gap-4 items-center justify-evenly">
            <h1 className="text-xl sm:text-2xl text-color font-medium">
              Datasets
            </h1>

            <h3 className="text-lg sm:text-xl text-slate-800 font-medium">
              {filteredDatasets.length}
            </h3>
          </div>

          <div className="flex gap-4">
            <div className="relative w-full sm:w-[300px] ">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Dataset"
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <CardContent className="h-full p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Dataset-ID</TableHead>
              <TableHead>Last-Update</TableHead>
              <TableHead>Create-At</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDatasets.map((dataset) => (
              <DatasetRow
                key={dataset.id}
                dataset={dataset}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between p-0">
        <div>
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredDatasets.length)} of{" "}
          {filteredDatasets.length}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </section>
  );
}
