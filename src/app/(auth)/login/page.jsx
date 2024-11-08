"use client";
import Image from "next/image";

import LoginForm from "../_component/LoginForm";

export default function Login() {
  return (
    <div
      className="flex items-center justify-center w-screen h-screen relative"
      style={{
        backgroundImage: `url("/assets/Signup.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#F4F9FF] opacity-80 blur-[2px]"></div>
      <div className="relative z-10 items-center bg-white  w-[80%] max-w-[1100px] p-10 shadow-lg space-y-4 rounded-xl">
        <div className="flex items-center gap-4 justify-between w-full">
          <Image
            src={"/assets/logo-text.svg"}
            width={150}
            alt="logo"
            height={150}
          />
          <div className="text-right space-y-1">
            <h2 className="text-[#143A47] text-[32px] font-medium">Sign In</h2>
            <p className="text-[#143A47] text-[16px] font-medium">
              Welcome back!
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
