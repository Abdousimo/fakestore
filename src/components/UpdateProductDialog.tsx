import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Pencil } from "lucide-react";
import { updateProductById } from "@/api";
import { updateProductValidationSchema } from "@/validation";
import { ProductType } from "@/entities";


interface Props {
    product: ProductType;
  }


  type formValidationType = z.infer<typeof updateProductValidationSchema>;


const UpdateProductDialog = ({product}:Props) => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

     const form = useForm<formValidationType>({
        resolver: zodResolver(updateProductValidationSchema),
        defaultValues: {
          title: product?.title,
          price: product?.price,
          description: product?.description,
          category: product?.category,
        },
      });
    
    const updateMutation = useMutation({
        mutationFn: updateProductById,
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: ["product"],
          });
          setIsDialogOpen(false);
          toast.success("Product updated successfully.");
        },
        onError: (error) => {
          toast.error("Error deleting product: " + error.message);
        },
      });

      const onSubmit = async (data: formValidationType) => {
        updateMutation.mutate({
            ...data ,
            id: product?.id});
      };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button size={"icon"} variant="default">
        <DialogTrigger asChild>
            <Pencil size={20} />
        </DialogTrigger>
      </Button>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update product Informations</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input  type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                    <DialogClose>
                    <Button variant="ghost" disabled={updateMutation.isPending}>
                        Cancel
                    </Button>
                    </DialogClose>
                    <Button
                    disabled={updateMutation.isPending}
                    type="submit"
                    variant="default"
                    >
                    Submit
                    </Button>
                </DialogFooter>
            </form>
       </Form>
      
      
    </DialogContent>
  </Dialog>
  )
}

export default UpdateProductDialog