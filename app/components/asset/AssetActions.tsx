"use client";

import { Asset } from "@/lib/interface";
import DeleteAsset from "./DeleteAsset";
import { UpdateAsset } from "./UpdateAsset";

export default function AssetActions({ item }: { item: Asset }) {

  return (
    <>
      <span className="flex flex-row">
        <UpdateAsset item={item}></UpdateAsset>
        <DeleteAsset item={item} ></DeleteAsset>
      </span>
    </>
  );
}
