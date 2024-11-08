"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getCurrentUser,
  logoutService,
  SignOutService,
} from "@/services/auth/authService";
import AvatarDropdown from "../AvatarDropdown";
import EditProfileDialog from "../EditProfileDialog";
import SuccessPopup from "../SuccessPopup";
import LogoutDialog from "../LogoutDialog";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Navbar({ user }) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentUser();
      if (userData) {
        setFirstName(userData.full_name.split(" ")[0]);
        setLastName(userData.full_name.split(" ")[1]);
        setUsername(userData.username || "");
        setEmail(userData.email);
        setAvatarSrc(
          userData.profile_image
            ? `${userData.profile_image}`
            : "https://github.com/shadcn.png?height=128&width=128"
        );
      }
    };
    fetchUserData();
  }, []);

  const handleEditProfile = (event) => {
    event.preventDefault();
    setIsEditProfileOpen(false);
    setIsSuccessPopupOpen(true);
    setIsSuccessPopupOpen(true);
  };

  const handleLogout = async () => {
    const success = await SignOutService();
    if (success) {
      setIsLogoutOpen(false);

    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav
      className={cn(
        "h-16 flex items-center justify-between  pt-5 pb-5 pl-[84px] pr-12 ",
        (pathname.endsWith("/preparation") || pathname.endsWith("/explore")) &&
          "bg-[#F7F9FB] px-[84px]"
      )}
    >
      <Link href="/project" className="flex gap-2">
        <Image
          src="/assets/logo-text.svg"
          alt="DataTalk"
          width={120}
          height={30}
          className="object-cover"
        />
      </Link>

      <div className="flex items-center gap-4 text-gray-600 ">
        <AvatarDropdown
          firstName={firstName}
          lastName={lastName}
          avatarSrc={avatarSrc}
          onEditClick={() => setIsEditProfileOpen(true)}
          onLogoutClick={() => setIsLogoutOpen(true)}
        />

        <EditProfileDialog
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          firstName={firstName}
          lastName={lastName}
          avatarSrc={avatarSrc}
          username={username}
          email={email}
          onAvatarChange={handleAvatarChange}
          onFirstNameChange={(e) => setFirstName(e.target.value)}
          onLastNameChange={(e) => setLastName(e.target.value)}
          onSubmit={handleEditProfile}
        />

        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={() => setIsSuccessPopupOpen(false)}
        />

        <LogoutDialog
          isOpen={isLogoutOpen}
          onClose={() => setIsLogoutOpen(false)}
          onLogout={handleLogout}
        />
      </div>
    </nav>
  );
}
