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
import { SignUpAction } from "@/services/auth/authService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((value) => !/\s/.test(value), "Password cannot contain spaces"),
});

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);

    try {
      const response = await SignUpAction(values);
      if (response.success) {
        console.log("SignUp successful", values);
        toast({
          title: "SignUp successful",
          description: "You have been signed up successfully!",
          variant: "success"
        });
        router.push(`/verification?email=${encodeURIComponent(values.email)}`);
      } else {
        toast({
          title: "Signup failed",
          description:
            response.message || "An unexpected error occurred during signup.",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Error during signup process:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while trying to sign up. Please try again later.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your first name"
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your last name"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
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

        <div className="text-right">
          <Button
            type="submit"
            className="bg-[#007AFF] text-white h-[43px] rounded-xl hover:bg-[#136ED0] mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
