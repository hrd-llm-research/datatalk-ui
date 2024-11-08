"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import {
  Plus,
  Send,
  SendHorizontal,
  SparklesIcon,
  SplitSquareVertical,
  User2,
  X,
  BookmarkCheck,
  PanelLeftOpen,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const initialConversations = [
  {
    title: "Training Hours vs Attrition",
    initialMessage:
      "Here's a chart showing the correlation between training hours and attrition:",
    chartData: [
      { month: "Jan-23", desktop: 186, mobile: 80 },
      { month: "Feb-23", desktop: 305, mobile: 200 },
      { month: "Mar-23", desktop: 237, mobile: 120 },
      { month: "Apr-23", desktop: 173, mobile: 190 },
      { month: "May-23", desktop: 209, mobile: 130 },
      { month: "Jun-23", desktop: 214, mobile: 140 },
    ],
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export default function Component() {
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [saveChartOpen, setSaveChartOpen] = useState(false);
  const [chartTitle, setChartTitle] = useState("");
  const [selectedChart, setSelectedChart] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();

    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);

    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSaveChart = (chartData) => {
    setSelectedChart(chartData);
    setSaveChartOpen(true);
  };

  const handleSaveConfirm = () => {
    console.log("Saving chart:", { title: chartTitle, data: selectedChart });
    setSaveChartOpen(false);
    setChartTitle("");
    setSelectedChart(null);
  };

  const startNewChat = (initialMessage = "") => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: "New Chat",
      messages: initialMessage
        ? [{ role: "user", content: initialMessage }]
        : [],
    };
    setChatSessions((prevSessions) => [...prevSessions, newChat]);
    setCurrentChatId(newChatId);
    return newChatId;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (!currentChatId) {
      const newChatId = startNewChat();
      setChatSessions((prevSessions) =>
        prevSessions.map((session) => {
          if (session.id === newChatId) {
            const { initialMessage, chartData } = initialConversations[0];
            return {
              ...session,
              title: inputMessage,
              messages: [
                { role: "user", content: inputMessage },
                { role: "assistant", content: initialMessage, chartData },
              ],
            };
          }
          return session;
        })
      );
    } else {
      setChatSessions((prevSessions) =>
        prevSessions.map((session) => {
          if (session.id === currentChatId) {
            const conversationIndex =
              (session.messages.length / 2) % initialConversations.length;
            const { initialMessage, chartData } =
              initialConversations[conversationIndex];
            const updatedMessages = [
              ...session.messages,
              { role: "user", content: inputMessage },
              { role: "assistant", content: initialMessage, chartData },
            ];
            return {
              ...session,
              title:
                session.messages.length === 0 ? inputMessage : session.title,
              messages: updatedMessages,
            };
          }
          return session;
        })
      );
    }

    setInputMessage("");
    if (isMobileView) setIsSidebarOpen(false);
  };

  const deleteChat = (chatId) => {
    setChatSessions((prevSessions) =>
      prevSessions.filter((chat) => chat.id !== chatId)
    );
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const SidebarContent = () => (
    <ScrollArea className="h-full">
      <div className="p-6 px-6">
        <h3 className="text-sm font-medium mb-2 px-2">Chats</h3>
        {chatSessions.map((session) => (
          <div
            key={session.id}
            className={`flex items-center mb-1 group px-4 py-2 rounded-lg cursor-pointer ${
              session.id === currentChatId ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentChatId(session.id);
              setIsSidebarOpen(false);
            }}
          >
            <div className="flex-grow text-sm text-gray-600 truncate">
              <span className="line-clamp-1">{session.title}</span>
            </div>
            <button
              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                deleteChat(session.id);
              }}
            >
              <X className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Delete chat</span>
            </button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <>
      <div className="flex h-[82vh] mt-6">
        <aside
          className={`hidden md:block transition-all duration-300 ease-in-out overflow-hidden rounded-lg shadow-sm bg-white ${
            isSidebarOpen ? "w-64 mr-6" : "w-0"
          }`}
        >
          <SidebarContent />
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 p-4 rounded-lg shadow-sm bg-white">
            {isMobileView ? (
              <Sheet onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden bg-[#007AFF] hover:bg-[#136ED0]"
                    aria-label="Toggle Sidebar"
                  >
                    <SplitSquareVertical  className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80%] max-w-[250px] p-0">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            ) : (
              <Button
                
                size="icon"
                onClick={toggleSidebar}
                className="hidden md:inline-flex bg-[#007AFF] hover:bg-[#136ED0]"
              >
                <SplitSquareVertical className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={() => startNewChat()}
              className="bg-[#007AFF] hover:bg-[#136ED0] text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> New chat
            </Button>
          </div>
          <main className="flex-1 overflow-auto p-4 flex flex-col">
            {currentChatId ? (
              chatSessions
                .find((chat) => chat.id === currentChatId)
                ?.messages.map((message, index) => (
                  <div key={index} className="mb-4 w-full max-w-3xl mx-auto">
                    <div className="flex items-start gap-4">
                      <Avatar className="flex-shrink-0">
                        
                          {message.role === "user" ? (
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          ) : (
                            <SparklesIcon />
                          )}
                        
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <p className="whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        </div>
                        {message.chartData && (
                          <div className="flex items-start gap-4 mt-4">
                            <Card className="flex-grow">
                              <CardContent>
                                <ChartContainer config={chartConfig}>
                                  <BarChart
                                    // width={500}
                                    // height={300}
                                    data={message.chartData}
                                    accessibilityLayer
                                  >
                                    <CartesianGrid
                                      vertical={false}
                                      horizontal={false}
                                    />
                                    <XAxis
                                      dataKey="month"
                                      tickLine={false}
                                      tickMargin={10}
                                      axisLine={false}
                                      tickFormatter={(value) =>
                                        value.slice(0, 3)
                                      }
                                    />
                                    <ChartTooltip
                                      cursor={false}
                                      content={
                                        <ChartTooltipContent hideLabel />
                                      }
                                    />
                                    <Bar
                                      dataKey="desktop"
                                      fill="var(--color-desktop)"
                                      radius={8}
                                    />
                                  </BarChart>
                                </ChartContainer>
                              </CardContent>
                            </Card>
                            <Button
                              variant="outline"
                              className="px-6"
                              onClick={() => handleSaveChart(message.chartData)}
                            >
                              <BookmarkCheck className="h-5 w-5 text-blue-600" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center text-4xl font-medium text-gray-500 mb-8">
                  How can I assist you?
                </div>
                <div className="w-full max-w-3xl mx-auto">
                  <form
                    onSubmit={sendMessage}
                    className="flex items-center gap-4 justify-start"
                  >
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask a question about your dataset..."
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-[#007AFF] hover:bg-[#136ED0] text-white ">
                      <Send className="mr-2 h-4 w-4" /> Send
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </main>
          {currentChatId && (
            <div className="p-4 ">
              <form
                onSubmit={sendMessage}
                className="flex items-center gap-4 justify-start max-w-3xl mx-auto"
              >
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a question about your dataset..."
                  className="flex-1"
                />
                <Button type="submit" className="bg-[#007AFF] hover:bg-[#136ED0] text-white">
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Dialog open={saveChartOpen} onOpenChange={setSaveChartOpen}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Save Chart
            </DialogTitle>
          </DialogHeader>
          <div className="grid py-4">
            <Input
              placeholder="Add title here"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              className="col-span-3"
            />
            {selectedChart && (
              <div className="w-full pt-6">
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={selectedChart}
                    
                    >
                      <CartesianGrid vertical={false} horizontal={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Bar
                        dataKey="desktop"
                        fill="var(--color-desktop)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              className="w-24 bg-[#007AFF] hover:bg-[#136ED0] text-white"
              onClick={handleSaveConfirm}
            >
              <BookmarkCheck className="mr-2 h-5 w-5" />
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
