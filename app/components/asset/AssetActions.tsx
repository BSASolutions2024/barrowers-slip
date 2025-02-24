"use client";

import { Asset } from "@/lib/interface";
import DeleteAsset from "./DeleteAsset";

export default function AssetActions({item}:{item:Asset}) {

  return (
    <>
      <DeleteAsset item={item} ></DeleteAsset>
    </>
  );
}
