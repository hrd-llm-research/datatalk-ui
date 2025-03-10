import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Timeline = React.forwardRef(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("flex mt-5 flex-col", className)} {...props} />
));
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("relative flex flex-col p-6 pt-0 [&>*]:mb-0", className)}
    {...props}
  />
));
TimelineItem.displayName = "TimelineItem";

const TimelineTime = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "absolute translate-x-36 md:-translate-x-24 text-sm font-semibold leading-none text-secondary-foreground",
      className
    )}
    {...props}
  />
));
TimelineTime.displayName = "TimelineTime";

const TimelineConnector = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute  top-[5px] left-[30px] -translate-x-1/2 translate-y-2 h-full w-px bg-gray-400",
      className
    )}
    {...props}
  />
));
TimelineConnector.displayName = "TimelineConnector";

const TimelineHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4", className)}
    {...props}
  />
));
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        " leading-none text-color tracking-tight text-secondary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);
TimelineTitle.displayName = "CardTitle";

const TimelineIcon = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col size-3 bg-gray-400 rounded-full", className)}
    {...props}
  />
));
TimelineIcon.displayName = "TimelineIcon";

const TimelineDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground max-w-sm", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";

const TimelineContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-start p-6 pt-0", className)}
    {...props}
  />
));
TimelineContent.displayName = "TimelineIcon";

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineDescription,
  TimelineContent,
  TimelineTime,
};
