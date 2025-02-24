"use client";

import BDropdown from "@/components/ui/bsa_dropdown/BDropdown";
import { toJSONLocal } from "@/lib/helper";
import { BorrowFormValues, borrowSchema } from "@/lib/schemas/borrowSchema";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AssetList from "../asset/AssetList";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Asset } from "@/lib/interface";
import AdminEmailTemplate from "../email-template/AdminEmailTemplate";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BorrowerEmailTemplate from "../email-template/BorrowerEmailTemplate";

export default function BorrowForm(props: any) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<BorrowFormValues>({
    resolver: zodResolver(borrowSchema),
    defaultValues: {
      assets: [],
    },
  });

  const dateBorrowedValue = watch("borrow_date");

  async function submitFormHandler(data: BorrowFormValues) {
    setIsLoading(true);

    try {
      data.borrow_date = new Date(data.borrow_date).toISOString();
      data.return_date = new Date(data.return_date).toISOString();
      data.borrow_status = "open";

      const response = await fetch("/api/borrow", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const res = await response.json();

        queryClient.invalidateQueries({ queryKey: ["borrowRecords"] });
        queryClient.invalidateQueries({ queryKey: ["assets"] });

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
            to: "john.parot@bsasolutions-inc.com, marimar.delatorre@bsasolutions-inc.com",
            subject: `Hi, New request from ${borrowRecord.borrower_name}`,
            html: AdminEmailTemplate({
              borrowRecord,
              borrowedAssets,
            })
          }),
        });

        await fetch(`/api/send-email-gmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: borrowRecord.borrower_email,
            subject: `Confirmation of Your Borrower Slip Booking`,
            html: BorrowerEmailTemplate({
              borrowRecord,
              borrowedAssets,
              type: "borrow_confirmation"
            })
          }),
        });

        toast({
          title: "Successfully booked",
          description:
            "Request is sent to marketing admin. You can now get the item",
          variant: "default",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "default",
      });
    } finally {
      setIsLoading(false);
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <form onSubmit={handleSubmit(submitFormHandler)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7">
            Please complete the form
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="flex flex-col">
              <label htmlFor="" className="block text-sm font-medium leading-6">
                Date
              </label>
              <div className="mt-2">
                {/* <input
                  id="date"
                  type="date"
                  disabled
                  value={new Date().toISOString().split("T")[0]}
                  className="input input-bordered w-full"
                /> */}
                <Input
                  id="date"
                  disabled
                  defaultValue={new Date().toISOString().split("T")[0]}
                ></Input>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="borrower_name"
                className="block text-sm font-medium leading-6"
              >
                Borrower's Name <span className="text-error">*</span>
              </label>
              {errors.borrower_name && (
                <p className="text-error text-sm">
                  {errors.borrower_name.message}
                </p>
              )}
              <div className="mt-2">
                <input
                  {...register("borrower_name")}
                  id="borrower_name"
                  name="borrower_name"
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.borrower_name ? "border-error" : ""
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="borrower_email"
                className="block text-sm font-medium leading-6"
              >
                Borrower's Email <span className="text-error">*</span>
              </label>
              {errors.borrower_email && (
                <p className="text-error text-sm">
                  {errors.borrower_email.message}
                </p>
              )}
              <div className="mt-2">
                <input
                  {...register("borrower_email")}
                  id="borrower_email"
                  name="borrower_email"
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.borrower_email ? "border-error" : ""
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="borrower_id"
                className="block text-sm font-medium leading-6"
              >
                Borrower's ID <span className="text-error">*</span>
              </label>
              {errors.borrower_id && (
                <p className="text-error text-sm">
                  {errors.borrower_id.message}
                </p>
              )}
              <div className="mt-2">
                <input
                  {...register("borrower_id")}
                  id="borrower_id"
                  name="borrower_id"
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.borrower_id ? "border-error" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6"
              >
                Location <span className="text-error">*</span>
              </label>
              {errors.location && (
                <p className="text-error text-sm">{errors.location.message}</p>
              )}
              <div className="mt-2">
                <BDropdown
                  register={register("location")}
                  className={`${errors.location ? "border-error" : ""}`}
                  name="location"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="contact_no"
                className="block text-sm font-medium leading-6"
              >
                Contact #
              </label>
              {errors.contact_no && (
                <p className="text-error text-sm">
                  {errors.contact_no.message}
                </p>
              )}
              <div className="mt-2">
                <input
                  {...register("contact_no")}
                  id="contact_no"
                  name="contact_no"
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.contact_no ? "border-error" : ""
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="asset"
                className="block text-sm font-medium leading-6"
              >
                Item(s) to borrow <span className="text-error">*</span>
              </label>
              {errors.assets && (
                <p className="text-error text-sm">{errors.assets.message}</p>
              )}
              <div className="mt-2">
                <AssetList register={register}></AssetList>
                {/* {assets.map((prop: Asset, id: number) => {
                  return (
                    <BCheckbox
                      key={prop.asset_id}
                      label={prop.asset_name}
                      name={"assets"}
                      asset_id={prop.asset_id}
                      disabled={prop.asset_status != "available"}
                      register={register("assets")}
                    />
                  );
                })} */}
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6"
              >
                Description <span className="text-error">*</span>
              </label>
              {errors.description && (
                <p className="text-error text-sm">
                  {errors.description.message}
                </p>
              )}
              <div className="mt-2">
                <textarea
                  {...register("description")}
                  className={`textarea textarea-bordered w-full ${
                    errors.description ? "border-error" : ""
                  }`}
                  placeholder="Description"
                  name="description"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="date_borrowed"
                className="block text-sm font-medium leading-6"
              >
                Date Borrowed <span className="text-error">*</span>
              </label>
              {errors.borrow_date && (
                <p className="text-error text-sm">
                  {errors.borrow_date.message}
                </p>
              )}
              <div className="mt-2">
                <input
                  {...register("borrow_date")}
                  id="borrow_date"
                  name="borrow_date"
                  type="date"
                  className={`input input-bordered w-full ${
                    errors.borrow_date ? "border-error" : ""
                  }`}
                  min={toJSONLocal(new Date())}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="return_date"
                className="block text-sm font-medium leading-6"
              >
                Expected return date <span className="text-error">*</span>
              </label>
              {errors.return_date && (
                <p className="text-error text-sm">
                  {errors.return_date.message}
                </p>
              )}
              <div className="mt-2">
                <input
                  {...register("return_date")}
                  id="return_date"
                  name="return_date"
                  type="date"
                  min={dateBorrowedValue ?? toJSONLocal(new Date())}
                  className={`input input-bordered w-full ${
                    errors.return_date ? "border-error" : ""
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {errors.agreement && (
                <p className="text-error text-sm">{errors.agreement.message}</p>
              )}
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-warning my-1"
                  {...register("agreement")}
                />
                <label htmlFor="agreement">
                  I hereby acknowledge that I have received the above-mentioned
                  property and will use it solely for the purpose it was
                  intended. I understand that I am fully responsible for the
                  said property while it is under my care and that any damage,
                  loss, or theft will be my sole responsibility. I agree to
                  return the property on or before the expected return date
                  indicated above. I also understand that failure to return the
                  property on the said date will be subject to penalties as may
                  be determined by the company.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 flex  justify-end">
        <Button disabled={isLoading} type="submit">
          {/* <Loader2 className="animate-spin" />
          Please wait */}
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Processing...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}
