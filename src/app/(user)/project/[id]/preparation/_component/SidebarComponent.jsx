"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/PiseyCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimelineLayout } from "./TimelineComponent";
import Image from "next/image";
const SchemaItem = ({
  name,
  icon,
  children,
  level = 0,
  isTable = false,
  onTableSelect,
  activeTable,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = React.Children.count(children) > 0;

  const handleClick = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
    }

    if (isTable && onTableSelect) {
      onTableSelect(name);
    }
  };

  const isActive = isTable && activeTable === name;

  return (
    <div className={cn("mt-2", level === 0 ? "ml-0" : "ml-6")}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className={cn(
            "flex items-center w-full text-left p-2 rounded-sm transition-colors",
            isActive
              ? "bg-primary1 text-primary-foreground"
              : "hover:bg-gray-200 ",
            className
          )}
          onClick={handleClick}
        >
          {icon}
          <span className="ml-2 ">{name}</span>
        </CollapsibleTrigger>
        {hasChildren && (
          <CollapsibleContent>
            <div className="mt-1  pl-4">
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(child, {
                      level: level + 1,
                      onTableSelect,
                      activeTable,
                    })
                  : child
              )}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};
export default function SidebarComponent() {
  const [activeTable, setActiveTable] = useState(null);

  const handleTableSelect = (tableName) => {
    setActiveTable(tableName);
  };

  return (
    <Card className="w-full h-full  overflow-y-auto  text-sm  border-none  font-normal shadow-none ">
      <CardHeader className="pb-1 ">
        <CardTitle className="flex items-center text-color text-xs xl:text-[14px]  ">
          <Image
            src={"/assets/prepare/postgres.png"}
            alt="postgres"
            className="h-4 w-4 mr-2"
            height={10}
            width={10}
          />
          postgres@localhost
          <span className="ml-5 ">
            <RefreshCcw
              size={14}
              className="text-gray-500  hover:animate-spin"
            />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <SchemaItem
          className="p-1 pl-6 text-xs xl:text-[14px] hover:bg-none py-2 w-full "
          name="car sale"
          icon={
            <Image
              src={"/assets/prepare/db_icon.png"}
              alt="database"
              className="h-4 w-4 mr-2"
              width={10}
              height={10}
            />
          }
          onTableSelect={handleTableSelect}
          activeTable={activeTable}
        >
          <SchemaItem
            name="public"
            className={" p-1 py-2 text-xs xl:text-[14px]"}
            icon={
              <Image
                src={"/assets/prepare/schema.png"}
                alt="schema"
                className="h-4 w-4 mr-2"
                width={10}
                height={10}
              />
            }
          >
            <TimelineLayout />
          </SchemaItem>
        </SchemaItem>
      </CardContent>
    </Card>
  );
}
