"use client";
import React, { useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
} from "./timeline";

export const TimelineLayout = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Timeline className=" text-xs font-normal">
      {/* Timeline Item: Customers */}
      <TimelineItem onClick={() => handleClick("customers")}>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon
            className={`${
              activeItem === "customers" ? "bg-blue-500 " : "bg-gray-300 "
            } h-3 w-3 rounded-full`}
          />
          <TimelineTitle
            className={`${
              activeItem === "customers" ? "text-primary1  " : "text-gray-700 "
            } cursor-pointer`}
          >
            Car_Models
          </TimelineTitle>
        </TimelineHeader>
      </TimelineItem>

      {/* Timeline Item: Users */}
      <TimelineItem onClick={() => handleClick("users")}>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon
            className={`${
              activeItem === "users" ? "bg-blue-500" : "bg-gray-300"
            } h-3 w-3 rounded-full`}
          />
          <TimelineTitle
            className={`${
              activeItem === "users" ? "text-primary1 " : "text-gray-700"
            } cursor-pointer`}
          >
            Customer
          </TimelineTitle>
        </TimelineHeader>
      </TimelineItem>

      {/* Timeline Item: Products */}
      <TimelineItem onClick={() => handleClick("products")}>
        <TimelineHeader>
          <TimelineIcon
            className={`${
              activeItem === "products" ? "bg-blue-500" : "bg-gray-300"
            } h-3 w-3 rounded-full`}
          />
          <TimelineTitle
            className={`${
              activeItem === "products" ? "text-primary1" : "text-gray-700"
            } cursor-pointer`}
          >
            Car_Type
          </TimelineTitle>
        </TimelineHeader>
      </TimelineItem>
    </Timeline>
  );
};
