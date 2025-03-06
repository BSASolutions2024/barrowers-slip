"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatDateStandard } from "@/lib/helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import BorrowerEmailTemplate from "../email-template/BorrowerEmailTemplate";
import { BorrowFormValues } from "@/lib/schemas/borrowSchema";
import { Asset } from "@/lib/interface";

export default function BorrowersCard() {
  const { toast } = useToast();
  const [isReturnLoading, setIsReturnLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const queryClient = useQueryClient();

  const {
    data: borrowRecords = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["borrowRecords"],
    queryFn: async () => {
      const res = await fetch("/api/borrow");
      if (!res.ok) throw new Error("Failed to fetch assets");
      return res.json();
    },
    staleTime: 1000 * 30
  });

  const mutation = useMutation({
    mutationFn: async (record: any) => {
      const response = await fetch(`/api/borrow/${record.borrow_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record.borrow_items),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error("Failed to update borrow status");
      } else {
        const borrowRecord: BorrowFormValues = res.data.borrowRecord;
        const borrowedAssets: any = res.data.borrowAssets.map(
          (asset: Asset) => asset.asset_name
        );

        await fetch(`/api/send-email-gmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: record.borrower_email,
            subject: `Return Confirmation`,
            html: BorrowerEmailTemplate({
              borrowRecord,
              borrowedAssets,
              type: "return_confirmation",
            }),
          }),
        });
      }

      return res;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["borrowRecords"] });
      queryClient.invalidateQueries({ queryKey: ["assets"] });

      toast({
        title: "Successfully mark as returned",
        description:
          "The items are returned please check the condition of the item(s)",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <div className="card bg-base-100 bordered">
        <div className="card-body">
          {isLoading ? (
            <p>Loading ...</p>
          ) : error ? (
            <span>Error loading assets: {error.message}</span>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Borrower's Name</th>
                  <th>Item Borrowed</th>
                  <th>Description</th>
                  <th>Expected Return Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {borrowRecords.map((record: any) => (
                  <tr key={record.borrow_id}>
                    <td>{formatDateStandard(record.borrow_date)}</td>
                    <td>{record.borrower_name}</td>
                    <td>
                      <ul className="list-disc">
                        {record.borrow_items.length == 0 && ("No Asset(s) found: The asset might have been deleted.")}
                        {record.borrow_items.map((item: any) => (
                          <li key={item.asset_id}>{item.assets.asset_name}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{record.description}</td>
                    <td>{formatDateStandard(record.return_date)}</td>
                    <td>
                      <span
                        className={`badge p-3 ${
                          record.borrow_status === "open"
                            ? "bg-primary"
                            : "bg-success text-success-foreground"
                        }`}
                      >
                        {record.borrow_status}
                      </span>
                    </td>
                    <td>
                      <Button
                        className="bg-accent"
                        type="button"
                        disabled={record.borrow_status !== "open"}
                        onClick={() => {
                          setIsReturnLoading((prev) => ({
                            ...prev,
                            [record.borrow_id]: true,
                          }));

                          mutation.mutate(record, {
                            onSuccess: () => {
                              setIsReturnLoading((prev) => ({
                                ...prev,
                                [record.borrow_id]: false,
                              }));
                            },
                          });
                        }}
                      >
                        {isReturnLoading[record.borrow_id] ? (
                          <>
                            <Loader2 className="animate-spin" />
                          </>
                        ) : record.borrow_status !== "open" ? (
                          "Returned"
                        ) : (
                          "Return"
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
