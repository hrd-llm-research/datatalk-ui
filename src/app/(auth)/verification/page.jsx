"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import resendOTPAction, { verifyOTPAction } from "@/services/auth/authService";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your OTP must be 6 characters.",
  }),
});
export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  async function onSubmit(data) {
    setIsLoading(true);

    const submitData = {
      ...data,
      email,
    };

    try {
      const response = await verifyOTPAction(submitData);

      if (response.success) {
        toast({
          title: "Success",
          description: response.message || "OTP verified successfully!",
          variant: "success",
        });
        router.push("/login");
      } else {
        toast({
          title: "Verification Failed",
          description: response.message || "Failed to verify OTP.",
          variant: "desctructive",
        });
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast({
        title: "Error",
        description: "An error occurred while verifying OTP. Please try again.",
        variant: "desctructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendCode = async (e) => {
    e.preventDefault();

    try {
      const res = await resendOTPAction(email);

      if (res.success) {
        toast({
          title: "Code Resent",
          description: "A new OTP has been sent to your email.",
          variant: "success",
        });
      } else {
        toast({
          title: "Resend Failed",
          description: res.message || "Unable to resend OTP. Please try again.",
          variant: "desctructive",
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast({
        title: "Error",
        description: "An error occurred while resending OTP. Please try again.",
        variant: "desctructive",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen relative"
      style={{
        backgroundImage: `url("/photos/auth_background.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[url('/auth_background')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-[#F4F9FF] opacity-80 blur-[2px]"></div>
      <div className="relative z-10 items-center bg-white  w-[80%] max-w-[1100px] p-10 shadow-lg space-y-4 rounded-xl">
        <div className="flex items-center gap-4 justify-between w-full">
          <Image
            src={"/assets/logo-text.svg"}
            width={150}
            height={150}
            alt="logo"
          />
          <div className="text-right space-y-1">
            <h2 className="text-[#143A47] text-[32px] font-medium">
              Verification
            </h2>
            <p className="text-[#143A47] text-[16px] font-medium">
              Enter your 6-digit code.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8  ">
          <div className="flex flex-col jus gap-6 w-full lg:pr-[30%] xl:pr-[25%]">
            <p className="text-[#143A47] text-[14px]">
              Please enter your details to access your account and continue
              exploring your documents with our AI-powered chatbot.
            </p>
            <Link href={`/login`} className="text-[#1F64E7] font-medium block">
              Back to login
            </Link>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px]">Enter OTP</FormLabel>
                    <FormControl>
                      <InputOTP
                        {...field}
                        maxLength={6}
                        className="w-full flex  justify-between"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="w-16 h-16 text-3xl"
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={1}
                            className="w-16 h-16 text-3xl"
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={2}
                            className="w-16 h-16 text-3xl"
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={3}
                            className="w-16 h-16 text-3xl"
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={4}
                            className="w-16 h-16 text-3xl"
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={5}
                            className="w-16 h-16 text-3xl"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      <span className="text-[#143A47] text-[14px]">
                        Didn&apos;t receive a code?{" "}
                      </span>
                      <button
                        onClick={handleResendCode}
                        className="text-[#1F64E7] cursor-pointer text-[13px]"
                      >
                        Resend code
                      </button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#007AFF] text-white w-[100px] h-[43px]  rounded-xl hover:bg-[#136ED0]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoaderCircle size={48} className="animate-spin " />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
