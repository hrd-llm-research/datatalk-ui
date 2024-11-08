"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
const timelineButtonVariants = cva(
  "relative z-10 h-[22px] w-[22px] rounded-full p-0",
  {
    variants: {
      active: {
        true: "bg-blue-500 text-blue-500",
        false: "bg-gray-200 text-gray-900 dark:text-gray-100",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const labelVariants = cva("ml-4 text-xl", {
  variants: {
    active: {
      true: "text-blue-500",
      false: "text-gray-900 dark:text-gray-100",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const lineVariants = cva(
  "absolute left-[11px] top-6 h-[calc(100%+26px)] w-[2px] bg-gray-200"
);

export default function VerticalTimeline({ items, onItemClick }) {
  const [activeItem, setActiveItem] = useState(items[0]?.id || null);

  const handleItemClick = (id) => {
    setActiveItem(id);
    if (onItemClick) {
      onItemClick(id);
    }
  };

  return (
    <div className="p-8">
      <div className="relative flex flex-col gap-8">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex items-center">
            {index < items.length - 1 && (
              <div className={cn(lineVariants())} aria-hidden="true" />
            )}
            <Button
              variant="ghost"
              className={cn(
                timelineButtonVariants({ active: activeItem === item.id })
              )}
              onClick={() => handleItemClick(item.id)}
            >
              <span className="sr-only">Select {item.label}</span>
            </Button>

            <span
              className={cn(labelVariants({ active: activeItem === item.id }))}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
