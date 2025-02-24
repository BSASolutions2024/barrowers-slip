"use client";

const BCheckbox = ({
  asset_id,
  label,
  name,
  disabled,
  register,
}: {
  asset_id?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  tickChange?: any;
  register: any;
}) => {
  
  return (
    <div className="form-control">
      <label className="cursor-pointer flex flex-row p-2 gap-2">
        <input
          className="checkbox checkbox-warning data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
          name={name}
          value={asset_id}
          disabled={disabled}
          defaultChecked={false}
          {...register}
          type="checkbox"
        ></input>
        <span className="label-text text-sm text-justify">
          {label} <span className="text-error">{disabled ? "- Not Available" : ""}</span>
        </span>
      </label>
    </div>
  );
};

export default BCheckbox;
