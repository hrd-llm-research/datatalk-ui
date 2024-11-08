"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BookmarkCheck, BotMessageSquare, UserRound } from "lucide-react";

const data = [
  { department: "HR", averageSalary: 55000 },
  { department: "Engineering", averageSalary: 85000 },
  { department: "Marketing", averageSalary: 65000 },
  { department: "Sales", averageSalary: 70000 },
  { department: "Finance", averageSalary: 75000 },
];

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "user",
      content: "Show me a bar chart of average salary by department",
    },
    {
      id: 2,
      role: "ai",
      content:
        "First, a mapping has been created to translate salary ranges into numerical values, where 'Low' corresponds to 30,000, 'Medium' to 60,000, and 'High' to 90,000. The salary range for each employee is then replaced with its corresponding numerical value, creating a new column representing average salaries. Next, the data is grouped by department, and the average salary for each department is calculated. Finally, a bar chart is generated to visually represent the average salary for each department, with departments displayed on the x-axis and average salaries on the y-axis.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        role: "user",
        content: input.trim(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  return (
    <Card className="mx-auto max-w-4xl bg-[#F7F9FB]">
      <CardContent className="p-0 m-1">
        <ScrollArea className="h-[70vh] pr-4">
          {messages.map((message) => (
            <div key={message.id} className={"flex flex-row items-start gap-3 p-2"}>
              <Avatar className="mt-1">
                <AvatarFallback>
                  {message.role === "user" ? (
                    <UserRound size={16} color="blue"/>
                  ) : (
                    <BotMessageSquare size={16} color="blue"/>
                  )}
                </AvatarFallback>
              </Avatar>

              <div className={`max-w-[80%]`}>
                <div
                  className={`p-4 rounded-lg ${
                    message.role === "ai"
                      ? "bg-white shadow-sm"
                      : "bg-white shadow-sm"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className="">
                  {message.role === "ai" && (
                    <div className="flex mt-4 gap-4">
                      <div className="p-4 rounded-lg bg-white w-fit shadow-sm">
                        <div className="mt-4 h-64 w-[350px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="department" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="averageSalary" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <Button className="bg-white hover:bg-white w-16 h-8">
                        <BookmarkCheck size={20} className="text-primary1" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="px-2">
        <form
          onSubmit={handleSubmit}
          className="flex w-full justify-center gap-2"
        >
          <Input
            placeholder="Ask Question about your dataset?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow text-xs h-10" 
          />

          <Button
            type="submit"
            className="w-40 bg-primary1 hover:bg-blue-600 text-white rounded-lg text-xs h-10" 
          >
            Submit
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}