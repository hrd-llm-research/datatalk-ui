"use client";
import SideBarComponent from "./_component/SidebarComponent";
import TableDataComponent from "./_component/TableDataComponent";
import PopUp from "./_component/PopUp";
import { useState } from "react";
export default function Page() {
  const [showTable, isShowTable] = useState(false);
  return (
    <div className="flex flex-col h-full ">
      <div className="flex flex-1 gap-8">
        <div className="w-1/4 2xl:w-1/6 max-w-64">
          <SideBarComponent />
        </div>
        <div className="flex-1">
          <TableDataComponent showTable={showTable} />
        </div>
      </div>
      <div className="mt-8">
        <PopUp isShowTable={isShowTable} />
      </div>
    </div>
  );
}
