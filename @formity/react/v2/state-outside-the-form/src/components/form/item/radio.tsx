import { cva } from "class-variance-authority";
import { useFormContext, Controller } from "react-hook-form";

import { errorVariants } from "./classes";

const buttonVariants = cva(
  "flex w-full items-center justify-between rounded-lg border px-4 py-3.5 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-gray-400/20",
  {
    variants: {
      selected: {
        true: "border-gray-950 bg-gray-950 text-white",
        false: "border-gray-200 bg-white text-gray-950 hover:border-gray-300",
      },
      error: { true: "", false: "" },
    },
    compoundVariants: [
      { selected: false, error: true, className: "border-red-300 text-red-500 hover:border-red-400" },
    ],
  },
);

const labelVariants = cva("text-sm font-semibold", {
  variants: {
    selected: { true: "text-white", false: "text-gray-950" },
    error: { true: "", false: "" },
  },
  compoundVariants: [
    { selected: false, error: true, className: "text-red-500" },
  ],
});

const descriptionVariants = cva("text-xs font-medium", {
  variants: {
    selected: { true: "text-white/60", false: "text-gray-400" },
    error: { true: "", false: "" },
  },
  compoundVariants: [
    { selected: false, error: true, className: "text-red-400" },
  ],
});

const priceVariants = cva("text-sm font-semibold", {
  variants: {
    selected: { true: "text-white", false: "text-gray-950" },
    error: { true: "", false: "" },
  },
  compoundVariants: [
    { selected: false, error: true, className: "text-red-500" },
  ],
});

export interface Radio {
  type: "radio";
  name: string;
  options: {
    value: string;
    label: string;
    description: string;
    priceLabel: string;
  }[];
}

export function RadioView({ name, options }: Radio) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            {options.map((option) => {
              const selected = field.value === option.value;
              const error = !!fieldState.error;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  className={buttonVariants({ selected, error })}
                >
                  <div>
                    <p className={labelVariants({ selected, error })}>{option.label}</p>
                    <p className={descriptionVariants({ selected, error })}>{option.description}</p>
                  </div>
                  <span className={priceVariants({ selected, error })}>{option.priceLabel}</span>
                </button>
              );
            })}
          </div>
          {fieldState.error && (
            <span className={errorVariants()}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
