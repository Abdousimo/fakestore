"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products.api";
import Product from "@/components/Product";
import {
   Form,
   FormField ,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { CarTaxiFrontIcon, LayoutDashboard } from "lucide-react";



function page() {
  const form = useForm()
  const { data:products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return (
    <div className="px-6">
      <div className="py-10">
        <div className="flex items-center justify-end gap-6">
            <Form {...form}>
              <form>
                <FormField
                control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Search for product" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="px-8 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer">
                  <span>
                    Filter
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 mr-2 border-border bg-[#e8e8e8]">
                  <DropdownMenuItem>
                  <div className="flex gap-2 items-center py-2 px-4">
                    <span className="font-semibold">Category</span>
                  </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>
                  <div className="flex gap-2 items-center py-2 px-4">
                    <span className="font-semibold">Category</span>
                  </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>
                  <div className="flex gap-2 items-center py-2 px-4">
                    <span className="font-semibold">Category</span>
                  </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8 lg:gap-12 py-10">
        {products?.map((product) => (
          <Product product={product} key={product?.id}/>
        ))}
      </div>
    </div>
  )
}

export default page