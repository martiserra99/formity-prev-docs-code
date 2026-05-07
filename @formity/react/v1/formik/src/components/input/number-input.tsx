import { useId } from "react";
import { useFormikContext } from "formik";
import { tv } from "tailwind-variants";

interface NumberInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export function NumberInput({ name, label, placeholder }: NumberInputProps) {
  const formik = useFormikContext<Record<string, unknown>>();
  const error = formik.touched[name]
    ? (formik.errors[name] as string | undefined)
    : undefined;
  return (
    <Input
      label={label}
      value={formik.values[name] as number}
      placeholder={placeholder}
      onChange={(value) => formik.setFieldValue(name, value)}
      error={error}
    />
  );
}

const input = tv({
  base: "mt-2 w-full rounded-xl border bg-neutral-900 px-4 py-3 text-base text-white transition-colors duration-300 placeholder:text-neutral-500 focus-visible:outline-none",
  variants: {
    error: {
      true: "border-red-400 focus-visible:border-red-400",
      false: "border-neutral-800 focus-visible:border-white",
    },
  },
});

interface InputProps {
  label: string;
  value: number;
  placeholder: string;
  onChange: (value: number) => void;
  error: string | undefined;
}

function Input({ label, value, placeholder, onChange, error }: InputProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-base font-medium text-white">
        {label}
      </label>
      <input
        type="number"
        value={String(value)}
        placeholder={placeholder}
        onChange={(e) => onChange(Number(e.target.value))}
        className={input({ error: !!error })}
      />
      {error && (
        <p className="mt-2 text-sm font-normal text-red-400">{error}</p>
      )}
    </div>
  );
}
