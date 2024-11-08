"use client";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SuccessPopup({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h3 className="text-2xl font-semibold">Success!</h3>
          <p>Your profile has been successfully updated.</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full bg-blue-500 text-white hover:bg-blue-600">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
