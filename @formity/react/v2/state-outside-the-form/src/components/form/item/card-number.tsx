import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CreditCardIcon } from "lucide-react";
import * as Label from "@radix-ui/react-label";

import { cn } from "@/lib/cn";
import { inputVariants, errorVariants } from "./classes";

export interface CardNumber {
  type: "cardNumber";
  name: string;
  label: string;
}

export function CardNumberView({ name, label }: CardNumber) {
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
          <div className="relative">
            <CreditCardIcon className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-400" />
            <input
              id={id}
              type="text"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              aria-invalid={!!fieldState.error}
              className={cn(
                inputVariants({ error: !!fieldState.error }),
                "pl-10 font-mono tracking-widest",
              )}
              {...field}
              onChange={(e) => field.onChange(format(e.target.value))}
            />
          </div>
          {error && <span className={errorVariants()}>{error.message}</span>}
        </div>
      )}
    />
  );
}

function format(cardNumber: string) {
  return cardNumber
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
