import { Plus, SquareLibrary } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavbarDashboard({
  toggleSidebar,
  startNewChat,
  isSidebarOpen,
}) {
  return (
    <nav className="bg-white rounded-sm shadow-sm px-4 py-0 flex justify-between items-center z-20">
      <div className="flex items-center space-x-4">
        <Button
          onClick={toggleSidebar}
          variant="outline"
          size="icon"
          className="w-9 h-9"
        >
          <SquareLibrary size={20} />
        </Button>

        <Button
          onClick={startNewChat}
          className="flex items-center justify-center w-32 h-9 text-sm bg-primary1 hover:bg-blue-700 text-white"
        >
          <Plus size={18} />
          <span className="ml-2">New Chat</span>
        </Button>
      </div>
    </nav>
  );
}