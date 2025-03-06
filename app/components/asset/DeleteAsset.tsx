"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Asset } from "@/lib/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

export default function DeleteAssetButton({ item }: { item: Asset }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true)
      const response = await fetch(`/api/assets/${item.asset_id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Failed to delete asset");

      return await response.json();
    },
    onSuccess: (res: any) => {
      toast({
        title: "Asset Deleted",
        description: res.message,
        variant: "default",
      });

      queryClient.invalidateQueries({ queryKey: ["assets"] });
      setIsLoading(false)
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false)
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full p-3" variant="ghost">
          <Trash></Trash>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md text-destructive">
            Delete Confirmation
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{item.asset_name}</strong>{" "}
            asset?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => mutation.mutate()} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Processing...
              </>
            ) : (
              "Yes, delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
