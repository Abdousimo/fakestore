import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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

import { Trash } from "lucide-react";
import { deleteProductById } from "@/api";


interface Props {
    productId: number;
  }

const DeleteProductDialog = ({productId}:Props) => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const deleteMutation = useMutation({
        mutationFn: deleteProductById,
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: ["product"],
          });
          setIsDialogOpen(false);
          toast.success("Product deleted successfully.");
        },
        onError: (error) => {
          toast.error("Error deleting product: " + error.message);
        },
      });
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button variant="destructive" size={"icon"}>
        <Trash size={40} />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete the
          product.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" disabled={deleteMutation.isPending}>
            Cancel
          </Button>
        </DialogClose>
        <Button
          disabled={deleteMutation.isPending}
          onClick={() => {
            deleteMutation.mutate(productId);
          }}
          variant="destructive"
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default DeleteProductDialog