import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SavePopupComponent({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xl w-full mx-4">
        <div className="flex items-center justify-between space-x-4">
          {/* Text and Icon */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-md text-color whitespace-nowrap overflow-hidden text-ellipsis">
              Your changes have been successfully saved!
            </h3>
          </div>

          {/* View Save Button and Close Icon */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="w-[104px] border-blue-600 text-blue-600 hover:bg-blue-100"
            >
              View Save
            </Button>
            <button
              onClick={onClose} // Close the popup on click
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
