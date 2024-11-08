import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar({ isSidebarOpen, chatHistory, activeChat, onChatSelect, onDeleteChat }) {
  return (
    <div className={`bg-white shadow-sm rounded-sm mb-4 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
      <div className="flex flex-col p-4">
        <div className="text-gray-800 text-sm mb-4">Chat History</div>
        <ul className="space-y-1">
          {chatHistory.length > 0 ? (
            chatHistory.map((chat) => (
              <li
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer text-sm flex items-center justify-between
                  ${activeChat && activeChat.id === chat.id ? 'bg-blue-500 text-white' : 'text-gray-700'} hover:bg-blue-100`}
              >
                <span className="truncate flex-grow" onClick={() => onChatSelect(chat)}>
                  {chat.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  className="ml-2 h-6 w-6 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No chat history available...</p>
          )}
        </ul>
      </div>
    </div>
  );
}