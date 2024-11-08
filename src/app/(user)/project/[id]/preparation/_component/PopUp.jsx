"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
const data = [
  { department: "HR", averageSalary: 55000 },
  { department: "Engineering", averageSalary: 85000 },
  { department: "Marketing", averageSalary: 65000 },
  { department: "Sales", averageSalary: 70000 },
  { department: "Finance", averageSalary: 75000 },
];

export default function PopUp({ isShowTable }) {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleChat = () => setIsOpen(!isOpen);

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
      setIsOpen(false);
      isShowTable(true);
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-b from-transparent to-blue-200 transition-opacity"
          onClick={toggleChat}
        ></div>
      )}

      <Button
        onClick={toggleChat}
        className={cn(
          "fixed left-1/2 transform transition-all shadow-lg duration-300 ease-in-out -translate-x-1/2 rounded-full p-4 flex items-center justify-center bg-white hover:bg-white border w-[150px] z-50",
          isOpen && "-translate-y-[60px]  ",
          !isOpen && "-translate-y-[60px]"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <ChevronDown className="h-6 w-6 text-gray-700" />
        ) : (
          <ChevronUp className="h-6 w-6 text-gray-700" />
        )}
      </Button>

      <Card
        className={`border-none bg-transparent shadow-none fixed left-1/2 transform -translate-x-1/2 w-[80%] max-w-4xl transition-all duration-300 ease-in-out  ${
          isOpen
            ? "top-[70%] -translate-y-1/2 opacity-100 xl:-translate-y-[50%] h-[500px]"
            : "top-full opacity-0"
        }`}
      >
        <CardContent>
          <ScrollArea className="h-[300px]  scrollbar-hide mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={"flex flex-row items-start gap-3 mb-4 "}
              >
                <Avatar className="mt-1 bg-white">
                  <AvatarFallback className="bg-white">
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-blue-500" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className={` max-w-[80%]`}>
                  <div
                    className={`p-4 rounded-lg ${
                      message.role === "ai"
                        ? "bg-white shadow-sm"
                        : "bg-white shadow-sm"
                    }`}
                  >
                    <p className="2xl:text-sm text-xs">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <form
            onSubmit={handleSubmit}
            className="flex w-full justify-center gap-2"
          >
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow text-xs h-10 bg-white outline-none  focus-visible:ring-0"
            />
            <Button
              type="submit"
              className="w-40  bg-primary1 2xl:text-sm text-xs h-10   text-white hover:opacity-90 hover:bg-primary1 hover:text-white transition-all duration-300 ease-in-out  border-none"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
