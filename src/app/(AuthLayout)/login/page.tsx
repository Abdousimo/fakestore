'use client';
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
 } from "@/components/ui/form";
 import { Input } from "@/components/ui/input";
 import { loginValidationSchema } from "@/validation";
 import { useRouter } from "next/navigation";
 import { setAccessTokenCookie } from "@/lib/utils";
import { login } from "@/api/auth.api";

 type formValidationType = z.infer<typeof loginValidationSchema>;


function page() {
    const router = useRouter();
    const form = useForm<formValidationType>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    });
    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
        if (data?.token) setAccessTokenCookie(data.token);
        router.push("/profile/products");
        },
        onError: (error) => {
        if (error instanceof Error) {
            form.setError("root", {
            message: error.message,
            });
        }
        },
    });
    const onSubmit = async (credentials: formValidationType) => {
        mutate(credentials);
    };
  return (
    <div className="min-h-screen container flex justify-center items-center py-20">
      <div className="bg-card p-8 rounded-lg shadow w-full max-w-md">
        <Link href="/" className="flex justify-center">
          <Logo />
        </Link>
        <h2 className="h2 mt-8 mb-6 text-primary">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter your username" {...field} />
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
                      placeholder="Please enter your password"
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

            <Button type="submit" disabled={isPending} className="block w-full">
              Connect to your account
            </Button>
          </form>
        </Form>
        <div className="my-4 text-center text-muted-foreground text-sm flex gap-1">
          Don&apos;t have an account?{" "}
          <Link className="hover:underline" href="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page