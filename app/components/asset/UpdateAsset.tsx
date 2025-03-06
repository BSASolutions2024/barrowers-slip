import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AssetFormValues, assetSchema } from "@/lib/schemas/assetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


export function UpdateAsset({ item }: { item: AssetFormValues }) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const selectAssetSchema = assetSchema.pick({ asset_name: true });
    type UpdatedAssetFormValues = z.infer<typeof selectAssetSchema>

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdatedAssetFormValues>({
        resolver: zodResolver(selectAssetSchema),
        defaultValues:{
            asset_name: item.asset_name
        }
    });

    const mutation = useMutation({
        mutationFn: async (data: UpdatedAssetFormValues) => {
            setIsLoading(true)
            const response = await fetch(`/api/assets/${item.asset_id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });


            if (!response.ok) throw new Error("Failed to create asset")

            return await response.json();
        },
        onSuccess: (res: any) => {
            toast({
                title: "New Asset",
                description: "Successfully updated",
                variant: "default",
            });

            queryClient.invalidateQueries({ queryKey: ["assets"] })

            setIsOpen(false);
            reset();
            setIsLoading(false)
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });

            setIsLoading(false)
        }
    });

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                const input = document.getElementById("asset_name") as HTMLInputElement;
                if (input) {
                    input.setSelectionRange(input.value.length, input.value.length);
                    input.value = item.asset_name
                    input.focus(); // Prevent auto-highlight
                }
            }, 50);
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full p-3" variant="ghost">
                    <Pencil />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Asset</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form
                    id="asset-form"
                    onSubmit={handleSubmit((data: UpdatedAssetFormValues) =>
                        mutation.mutate(data)
                    )}
                >
                    <Label htmlFor="asset_name">Asset name</Label>
                    {errors.asset_name && (
                        <p className="text-error text-sm">{errors.asset_name.message}</p>
                    )}
                    <Input id="asset_name" {...register("asset_name")} autoComplete="off" ></Input>
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
                            "Update"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}