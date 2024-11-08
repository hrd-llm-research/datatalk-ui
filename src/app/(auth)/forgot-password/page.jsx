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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    router.push(`/set-new-password?email=${encodeURIComponent(values.email)}`);
    console.log("Password reset email sent to:", values.email);
    setIsLoading(false);
  }

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
          <Image
            src={"/assets/logo-text.svg"}
            width={150}
            height={150}
            alt="logo"
          />
          <div className="text-right space-y-1">
            <h2 className="text-[#143A47] text-[32px] font-medium">
              Reset Your Password
            </h2>
            <p className="text-[#143A47] text-[16px] font-medium">
              Enter the email address you used to register with.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              <div className="flex flex-col gap-6 w-[100%] lg:pr-[30%] xl:pr-[25%] mb-2">
                <p className="text-[#143A47] text-[14px]">
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

              <div className="flex flex-col w-[100%]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="h-12 text-base px-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right mt-4">
                    <Button
                      type="submit"
                      className="bg-[#007AFF] text-white h-[43px] rounded-xl hover:bg-[#136ED0]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Reset Password"}
                    </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
