// "use client";
// import { useState, useEffect } from "react";
// import AvatarDropdown from "./AvatarDropdown";
// import EditProfileDialog from "./EditProfileDialog";
// import SuccessPopup from "./SuccessPopup";
// import LogoutDialog from "./LogoutDialog";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { getCurrentUser } from "@/services/auth/authService";

// export default function Navbar({ user }) {
//   const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
//   const [isLogoutOpen, setIsLogoutOpen] = useState(false);
//   const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [avatarSrc, setAvatarSrc] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user?.user?.accessToken) {
//         const userData = await getCurrentUser(user?.user?.accessToken);
//         if (userData) {
//           setFirstName(userData.full_name.split(" ")[0]);
//           setLastName(userData.full_name.split(" ")[1]);
//           setUsername(userData.username || "");
//           setEmail(userData.email);
//           setAvatarSrc(
//             userData.profile_image
//               ? `${userData.profile_image}`
//               : "https://github.com/shadcn.png?height=128&width=128"
//           );
//         }
//       }
//     };
//     fetchUserData();
//   }, [user]);

//   const handleEditProfile = (event) => {
//     event.preventDefault();
//     setIsEditProfileOpen(false);
//     setIsSuccessPopupOpen(true);
//   };

//   const handleLogout = () => {
//     setIsLogoutOpen(false);
//     router.push("/");
//     // Implement logout logic here
//   };

//   const handleAvatarChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => setAvatarSrc(e.target.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <nav className="bg-background">
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-end h-16">
//           <div className="flex items-center">
//             <AvatarDropdown
//               firstName={firstName}
//               lastName={lastName}
//               avatarSrc={avatarSrc}
//               onEditClick={() => setIsEditProfileOpen(true)}
//               onLogoutClick={() => setIsLogoutOpen(true)}
//             />

//             <EditProfileDialog
//               isOpen={isEditProfileOpen}
//               onClose={() => setIsEditProfileOpen(false)}
//               firstName={firstName}
//               lastName={lastName}
//               avatarSrc={avatarSrc}
//               username={username}
//               email={email}
//               onAvatarChange={handleAvatarChange}
//               onFirstNameChange={(e) => setFirstName(e.target.value)}
//               onLastNameChange={(e) => setLastName(e.target.value)}
//               onSubmit={handleEditProfile}
//             />

//             <SuccessPopup
//               isOpen={isSuccessPopupOpen}
//               onClose={() => setIsSuccessPopupOpen(false)}
//             />

//             <LogoutDialog
//               isOpen={isLogoutOpen}
//               onClose={() => setIsLogoutOpen(false)}
//               onLogout={handleLogout}
//             />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";
import { useState } from "react";
import AvatarDropdown from "./AvatarDropdown";
import EditProfileDialog from "./EditProfileDialog";
import SuccessPopup from "./SuccessPopup";
import LogoutDialog from "./LogoutDialog";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [firstName, setFirstName] = useState("Chhil");
  const [lastName, setLastName] = useState("Chhempanha");
  const [username, setUsername] = useState("chhel_chhempanha");
  const [email, setEmail] = useState("panha168@gmail.com");
  const [avatarSrc, setAvatarSrc] = useState(
    "https://github.com/shadcn.png?height=128&width=128"
  );
  const { toast } = useToast();
  const handleEditProfile = (event) => {
    event.preventDefault();
    setIsEditProfileOpen(false);
    toast({
      variant: "success",
      title: "Success",
      description: "Your profile has been successfully updated.",
      duration: 1000,
    });
  };

  const handleLogout = () => {
    setIsLogoutOpen(false);
    
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
    <nav className="bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-16">
          <div className="flex items-center">
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
        </div>
      </div>
    </nav>
  );
}
