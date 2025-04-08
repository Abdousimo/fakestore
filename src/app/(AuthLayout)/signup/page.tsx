"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Logo from "@/components/Logo";
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
import { signupValidationSchema } from "@/validation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth.api";
import { toast } from "sonner";

type formValidationType = z.infer<typeof signupValidationSchema>;

function Page() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<formValidationType>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success(
        "Your account has been created successfully, you can now login",)
    },
    onError: (error) => {
      if (error instanceof Error) {
        form.setError("root", {
          message: error.message,
        });
      }
    },
  });

  const onSubmit = async (data: formValidationType) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen container flex justify-center items-center py-20">
      <div className="bg-card p-8 rounded-lg shadow w-full max-w-md">
        <Link href="/" className="flex justify-center">
          <Logo />
        </Link>
        {isSubmitted ? (
          <>
            <p className="text-center mt-8 text-muted-foreground">
              Your account has been created successfully, Please check your
              email to verify it.
            </p>
          </>
        ) : (
          <>
            <h2 className="h2 mt-8 mb-6 text-primary">Signup</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
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
                        <Input placeholder="Enter your email" {...field} />
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
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-destructive text-sm">
                  {form.formState.errors.root?.message}
                </p>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="block w-full"
                >
                  Create an account
                </Button>
              </form>
            </Form>
            <div className="my-4 text-center text-muted-foreground text-sm flex gap-1">
              Already have an account?{" "}
              <Link className="hover:underline" href="/login">
                login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
