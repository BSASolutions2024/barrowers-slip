"use client"

import { useQuery } from "@tanstack/react-query";
import BCheckbox from "@/components/ui/bsa_checkbox/BCheckbox";
import { Asset } from "@/lib/interface";
import { Skeleton } from "@/components/ui/skeleton";

export default function AssetList(props:any) {
  const { data: assets = [], isLoading, error } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await fetch("/api/assets");
      if (!res.ok) throw new Error("Failed to fetch assets");
      return res.json();
    },
    staleTime: 1000 * 30
  });

  if (isLoading) return <Skeleton className="h-4 w-[250px]"></Skeleton>;
  if (error) return <p>Error loading assets: {error.message}</p>;


  return (<>
    {assets.map((prop: Asset, id: number) => {
        return (
        <BCheckbox
            key={prop.asset_id}
            label={prop.asset_name}
            name={"assets"}
            asset_id={prop.asset_id}
            disabled={prop.asset_status != "available"}
            register={props.register("assets")}
        />
        );
    })}
  </>)
}
