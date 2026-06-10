import { useId } from "react";
import { useField, useFormikContext } from "formik";
import * as Label from "@radix-ui/react-label";

import { inputVariants, errorVariants } from "./classes";

export interface Number {
  type: "number";
  name: string;
  label: string;
  placeholder: string;
  optional?: boolean;
}

export function NumberView({ name, label, placeholder, optional }: Number) {
  const id = useId();
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const error = meta.touched && meta.error ? meta.error : undefined;
  return (
    <div className="flex flex-col gap-2">
      <Label.Root
        htmlFor={id}
        className="block text-xs font-bold tracking-wider text-gray-500 uppercase"
      >
        <>{label}</>
        {optional && (
          <span className="text-xs font-normal tracking-normal text-gray-400 normal-case">
            {" "}
            — optional
          </span>
        )}
      </Label.Root>
      <input
        id={id}
        type="number"
        placeholder={placeholder}
        className={inputVariants({ error: Boolean(error) })}
        value={`${field.value}`}
        onBlur={field.onBlur}
        onChange={(e) => setFieldValue(name, +e.target.value)}
      />
      {error && <span className={errorVariants()}>{error}</span>}
    </div>
  );
}
