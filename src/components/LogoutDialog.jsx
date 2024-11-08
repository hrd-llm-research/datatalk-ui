"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LogoutDialog({ isOpen, onClose, onLogout }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>Are you sure you want to logout?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onLogout} className="text-white">
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
