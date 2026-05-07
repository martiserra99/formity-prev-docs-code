import type { ComponentPropsWithoutRef } from "react";

import { useFormikContext } from "formik";

import { Button } from "../button";
import { useMultiStep } from "@/multi-step";

export function BackButton<T extends Record<string, unknown>>(
  props: ComponentPropsWithoutRef<"button">,
) {
  const { values } = useFormikContext<T>();
  const { onBack } = useMultiStep<T>();
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => onBack(values)}
      {...props}
    />
  );
}
