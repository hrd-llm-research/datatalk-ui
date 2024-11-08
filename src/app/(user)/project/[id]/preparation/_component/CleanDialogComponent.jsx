"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CleanDialogComponent({
  isOpen,
  onClose,
  onConfirm,
  columnType,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [numericOptionsVisible, setNumericOptionsVisible] = useState(false);

  useEffect(() => {
    if (columnType === "numeric") {
      setNumericOptionsVisible(true);
    } else {
      setNumericOptionsVisible(false);
    }
  }, [columnType]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const options =
    columnType === "numeric"
      ? [
          "Replace missing value with median",
          "Replace missing value with mean",
          "Replace outlier with IQR(10%)",
          "Replace outlier with IQR(90%)",
          "Replace outlier with mean",
          "Replace missing value with other value",
        ]
      : [
          "Replace Missing Value with Other",
          "Remove Special Character",
          "Trim white space",
          "Replace data with relevant previous context",
        ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="2xl:text-[21px] text-lg font-medium">
          What would you like to clean this column?
        </DialogTitle>
        <RadioGroup
          value={selectedOption}
          onValueChange={handleOptionChange}
          className="space-y-2 mt-0"
        >
          {options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 cursor-pointer 2xl:text-base text-xs"
            >
              <RadioGroupItem
                value={option}
                className="bg-white rounded-full border-gray-300 checked:bg-primary1 checked:text-white"
                id={`option-${index}`}
              />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className=" 2xl:text-sm text-xs p-3"
              onClick={onClose}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={() => onConfirm(selectedOption)}
            disabled={!selectedOption}
            className="bg-primary1 2xl:text-sm text-xs p-3  w-24 text-white hover:opacity-90 hover:bg-primary1 hover:text-white transition-all duration-300 ease-in-out  border-none"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
