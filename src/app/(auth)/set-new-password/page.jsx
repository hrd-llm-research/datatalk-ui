"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forgetPasswordService } from "@/services/auth/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const setNewPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export default function SetNewPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const email = searchParams.get("email");
  const form = useForm({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const data = { ...values, email };
    try {
      const response = await forgetPasswordService(data);

      if (response.success) {
        console.log("Password reset successful.", data);
        toast({
          variant: "success",
          title: "Success",
          description: "Password reset successfully!",
        });
        router.push("/login");
      } else {
        console.error("Password reset failed:", response.message);
        toast({
          title: "Error",
          description: "Failed to reset password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("An error occurred during password reset:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="flex items-center justify-center w-screen h-screen relative"
      style={{
        backgroundImage: `url("/photos/auth_background.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[url('/auth_background.png')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-[#F4F9FF] opacity-80 blur-[2px]"></div>

      <div className="relative z-10 items-center bg-white w-[80%] max-w-[1100px] p-10 shadow-lg space-y-4 rounded-xl">
        <div className="flex items-center gap-4 justify-between w-full">
          <Image
            src={"/assets/logo-text.svg"}
            width={150}
            height={150}
            alt="logo"
          />
          <div className="text-right space-y-1">
            <h2 className="text-[#143A47] text-[32px] font-medium">
              Set a new password
            </h2>
            <p className="text-[#143A47] text-[16px] font-medium">
              Please set a new password for your account
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              <div className="flex flex-col gap-6 w-[100%] lg:pr-[30%] xl:pr-[25%] mb-2 sm:mb-4 lg:mb-4">
                <p className="text-[#143A47] text-[16px] mb-auto">
                  Please enter your details to access your account and continue
                  exploring your documents with our AI-powered chatbot.
                </p>
                <Link
                  href={`/login`}
                  className="text-[#1F64E7] font-medium block"
                >
                  Back to login
                </Link>
              </div>

              <div className="flex flex-col w-[100%] gap-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="New password"
                            {...field}
                            className="h-12 text-base px-4 pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-500" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            {...field}
                            className="h-12 text-base px-4 pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-500" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="text-right">
              <Button
                type="submit"
                className="bg-[#007AFF] text-white h-[43px] rounded-xl hover:bg-[#136ED0]"
                disabled={isLoading}
              >
                {isLoading ? "Setting Password..." : "Set Password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
