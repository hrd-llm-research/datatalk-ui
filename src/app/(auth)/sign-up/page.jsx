import Image from "next/image";
import SignUpForm from "../_component/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div
      className="flex items-center justify-center w-screen h-screen relative"
      style={{
        backgroundImage: `url("/photos/auth_background.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#F4F9FF] opacity-80 blur-[2px]"></div>
      <div className="relative z-10 items-center bg-white  w-[80%] max-w-[1100px] p-10 shadow-lg space-y-4 rounded-xl">
        <div className="flex items-center gap-4 justify-between w-full">
          <Image src={"/assets/logo-text.svg"} width={150} height={150} alt="logo" />
          <div className="text-right space-y-1">
            <h2 className="text-[#143A47] text-[32px] font-medium">Sign Up</h2>
            <p className="text-[#143A47] text-[16px] font-medium">
              Welcome! Please enter your details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
          <div className="flex flex-col gap-6 w-[100%] lg:pr-[30%] xl:pr-[25%] mb-2">
            <p className="text-[#143A47] text-[14px] mb-auto">
              Please enter your details to access your account and continue
              exploring your documents with our AI-powered chatbot.
            </p>
            <div className="text-[#98A2B3] text-[14px]">
              Already have an account?
              <Link
                href={`/login`}
                className="text-[#1F64E7] font-medium block"
              >
                Login
              </Link>
              <div className="h-[43px]"></div>
            </div>
          </div>

          <div className="flex flex-col w-[100%]">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
