"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
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
import { SignInAction } from "@/services/auth/authService";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await SignInAction(values);

    if (response.success) {
      toast({
        title: "Login successful",
        description: "You have been successfully logged in!",
        variant: "success",
      });
    router.push("/project");
    } else {
      toast({
        title: "Login failed",
        description:
          response.message || "Invalid credentials. Please try again.",
          variant: "destructive",
      });
      console.error("Login failed:", response.message);
    }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while trying to log in. Please try again.",
          variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          <div className="flex flex-col justify-between gap-6 w-full lg:pr-[30%] xl:pr-[25%]">
            <p className="text-[#143A47] text-[14px]">
              Please enter your details to access your account and continue
              exploring your documents with our AI-powered chatbot.
            </p>
            <p className="text-[#98A2B3] text-[14px]">
              Don&apos;t have an Account?
              <Link
                href={`/sign-up`}
                className="text-[#1F64E7] font-medium block"
              >
                Register
              </Link>
            </p>
          </div>

          <div className="flex flex-col w-full space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="h-12 text-base px-4 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
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

            <div className="text-left text-[#1F64E7] font-medium cursor-pointer">
              <Link href={`/forgot-password`}>Forgot password?</Link>
            </div>
          </div>
        </div>

        <div className="text-right">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#007AFF] text-white w-[100px] h-[43px] rounded-xl hover:bg-[#136ED0]"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
