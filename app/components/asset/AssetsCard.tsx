"use client";

import { useQuery } from "@tanstack/react-query";
import { Asset } from "@/lib/interface";
import AssetForm from "./AssetForm";
import AssetActions from "./AssetActions";

export default function AssetsCard() {
  const {
    data: assets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await fetch("/api/assets");
      if (!res.ok) throw new Error("Failed to fetch assets");
      return res.json();
    }
  });

  return (
    <div className="card bg-base-100 bordered">
      <div className="card-body">
        {isLoading ? (
          <p>Loading ...</p>
        ) : error ? (
          <span>Error loading assets: {error.message}</span>
        ) : (
          <>
            <div className="flex flex-row w-full justify-between">
              <h2 className="card-title">Assets</h2>
              <AssetForm />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((i: Asset) => (
                  <tr key={i.asset_id}>
                    <td>{i.asset_name}</td>
                    <td>{i.asset_type}</td>
                    <td className="flex">
                      <span
                        className={`${
                          i.asset_status !== "available"
                            ? "bg-error text-error-foreground"
                            : "bg-success text-success-foreground"
                        } badge p-3`}
                      >
                        {i.asset_status}
                      </span>
                    </td>
                    <td>
                      <AssetActions item={i} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
