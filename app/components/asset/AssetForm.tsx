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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const assetSchema = z.object({
  asset_name: z.string().min(1, "Asset name is required"),
});

type AssetFormValues = z.infer<typeof assetSchema>;

export default function AssetForm() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: AssetFormValues) => {
      setIsLoading(true)
      const response = await fetch("/api/assets", {
        method: "POST",
        body: JSON.stringify(data),
      });


      if(!response.ok) throw new Error("Failed to create asset")

      return await response.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "New Asset",
        description: "Successfully created",
        variant: "default",
      });

      queryClient.invalidateQueries({ queryKey: ["assets"] })
      
      setIsOpen(false);
      reset();
      setIsLoading(false)
    },
    onError: (error:any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });

      setIsLoading(false)
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full p-3" variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Asset</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          id="asset-form"
          onSubmit={handleSubmit((data: AssetFormValues) =>
            mutation.mutate(data)
          )}
        >
          <Label htmlFor="asset_name">Asset name</Label>
          {errors.asset_name && (
            <p className="text-error text-sm">{errors.asset_name.message}</p>
          )}
          <Input id="asset_name" {...register("asset_name")} autoComplete="off"></Input>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => reset()}>
              Close
            </Button>
          </DialogClose>
          <Button type="submit" form="asset-form" variant="default" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
