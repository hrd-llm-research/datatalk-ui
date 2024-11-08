"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Edit, Menu, Trash } from "lucide-react";

const mockConnectionData = [
  {
    connectionName: "Primary Database",
    hostname: "db1.example.com",
    username: "admin",
    port: 5432,
    createdAt: "2024-11-02",
  },
  {
    connectionName: "Analytics Server",
    hostname: "analytics.example.com",
    username: "analytics_user",
    port: 9200,
    createdAt: "2024-10-15",
  },
  {
    connectionName: "Backup Server",
    hostname: "backup.example.com",
    username: "backup_user",
    port: 3306,
    createdAt: "2024-09-20",
  },
  {
    connectionName: "Backup Server",
    hostname: "backup.example.com",
    username: "backup_user",
    port: 3306,
    createdAt: "2024-09-20",
  },
];

const truncateText = (text, length) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

export default function ConnectionCard() {
  return (
    <div className="flex gap-4 justify-evenly items-center w-full flex-wrap p-2">
      {mockConnectionData.map((item, index) => {
        return (
          <Card
            key={`${item.connectionName}-${index}`}
            className="w-80 p-4 px-6 shadow-lg rounded-md  border
              bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <CardTitle className="text-lg font-semibold text-slate-800 mb-2">
              {item.connectionName}
            </CardTitle>
            <CardContent className="my-2 p-0">
              <ul className="text-xs text-slate-600 grid grid-cols-2 bg-slate-50 p-2 rounded-sm">
                <div>
                  <li className="flex flex-col mb-1">
                    <span className="font-semibold">Hostname:</span>
                    <span className="text-[10px]" title={item.hostname}>
                      {truncateText(item.hostname, 15)}
                    </span>
                  </li>
                  <li className="flex flex-col mb-1">
                    <span className="font-semibold">Username:</span>
                    <span className="text-[10px]" title={item.username}>
                      {truncateText(item.username, 15)}
                    </span>
                  </li>
                  <li className="flex flex-col mb-1">
                    <span className="font-semibold">Port:</span>
                    <span className="text-[10px]">{item.port || "N/A"}</span>
                  </li>
                </div>
                <div>
                  <li className="flex flex-col mb-1">
                    <span className="font-semibold">Database Name:</span>
                    <span className="text-[10px]" title="Sale_db">
                      {truncateText("Sale_db", 15)}
                    </span>
                  </li>
                  <li className="flex flex-col mb-1">
                    <span className="font-semibold">Schema:</span>
                    <span className="text-[10px]" title="Public">
                      {truncateText("Public", 15)}
                    </span>
                  </li>
                </div>
              </ul>
            </CardContent>
            <CardFooter className="text-xs text-slate-500 border-slate-200  justify-between flex items-center p-0 font-medium mt-3">
              <span>Created At: {item.createdAt}</span>
              <DropdownMenu className="border-none hover:cursor-pointer">
                <DropdownMenuTrigger>
                  <Menu />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="text-xs flex flex-row justify-between items-center">
                    <Edit color="blue" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs flex flex-row justify-between items-center">
                    <Trash color="red" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
