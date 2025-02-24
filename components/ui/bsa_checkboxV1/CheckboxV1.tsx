"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { forwardRef } from "react";

const CheckboxV1 = forwardRef((props: any, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox name={props.name} className="checkbox" />
      <label
        htmlFor="terms"
        className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {props.label}
      </label>
    </div>
  );
});

export default CheckboxV1
