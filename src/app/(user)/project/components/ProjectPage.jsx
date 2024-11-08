"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectCard from "./Card";
import DialogDemo from "./DialogProjectCard";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectPage({ data = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProjects = searchTerm
    ? data.filter((project) =>
        project.connection_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim())
      )
    : data;

  return (
    <section className="w-full bg-white h-screen rounded-[14px] flex flex-col px-8 py-4">
      <div className="flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-2 py-4 sm:h-16 space-y-2 sm:space-y-0 gap-2">
          <div className="flex gap-4 items-center justify-evenly">
            <h1 className="text-xl sm:text-2xl text-color font-medium">
              Projects
            </h1>

            <h3 className="text-lg sm:text-xl text-slate-800 font-medium">
              {filteredProjects.length}
            </h3>
          </div>

          <div className="flex gap-4 flex-row-reverse">
            <DialogDemo />
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
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)] ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-x-6 gap-y-8 place-items-center ">
          {filteredProjects &&
            filteredProjects?.map((project, index) => {
              return (
                <ProjectCard
                  key={index}
                  id={project.database_id}
                  port={project.port}
                  createdAt={project.created_date}
                  connectionName={project.connection_name}
                  databaseName={project.database_name}
                  username={project.username}
                  hostname={project.ip_address}
                  schema={project.schema_name}
                />
              );
            })}
        </div>
      </ScrollArea>
    </section>
  );
}
