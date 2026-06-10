import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as Label from "@radix-ui/react-label";

import { cn } from "@/lib/cn";
import { inputVariants, errorVariants } from "./classes";

export interface ExpiryDate {
  type: "expiryDate";
  name: string;
  label: string;
}

export function ExpiryDateView({ name, label }: ExpiryDate) {
  const id = useId();
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Label.Root
            htmlFor={id}
            className="block text-xs font-bold tracking-wider text-gray-500 uppercase"
          >
            {label}
          </Label.Root>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            aria-invalid={!!fieldState.error}
            className={cn(
              inputVariants({ error: !!fieldState.error }),
              "font-mono tracking-widest",
            )}
            {...field}
            onChange={(e) => field.onChange(format(e.target.value))}
          />
          {error && <span className={errorVariants()}>{error.message}</span>}
        </div>
      )}
    />
  );
}

function format(expiryDate: string) {
  const digits = expiryDate.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}
