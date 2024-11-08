"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, LogOutIcon } from "lucide-react";

export default function AvatarDropdown({
  firstName,
  lastName,
  avatarSrc,
  onEditClick,
  onLogoutClick,
}) {
  const displayAvatarSrc =
    avatarSrc === "default.png" || !avatarSrc
      ? "https://imgs.search.brave.com/A-TAPjfyGv5L9n1ZU6k5kgODsuBa-o3WzWtOBwzO-rE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8x/LzE2L0tpdHR5X21l/b3dpbmcuanBn"
      : avatarSrc;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={displayAvatarSrc}
              alt={`${firstName} ${lastName}`}
              className="object-fill"
            />
            <AvatarFallback>
              {firstName?.[0]}
              {lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <span className="text-[16px] text-color">
            {firstName} {lastName}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={onEditClick}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onLogoutClick} className="text-destructive">
          <LogOutIcon className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
