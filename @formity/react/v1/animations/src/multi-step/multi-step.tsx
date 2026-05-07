// multi-step/multi-step.tsx
import type { ReactNode } from "react";
import type { OnNext, OnBack } from "@formity/react";

import { useMemo } from "react";

import type { FormityStatus } from "@/types";

import type { MultiStepValue } from "./multi-step-value";
import { MultiStepContext } from "./multi-step-context";

interface MultiStepProps<T extends Record<string, unknown>> {
  onNext: OnNext<T>;
  onBack: OnBack<T>;
  status: FormityStatus;
  children: ReactNode;
}

export function MultiStep<T extends Record<string, unknown>>({
  onNext,
  onBack,
  status,
  children,
}: MultiStepProps<T>) {
  const values = useMemo(
    () => ({ onNext, onBack, status }),
    [onNext, onBack, status],
  ) as MultiStepValue<Record<string, unknown>>;
  return (
    <MultiStepContext.Provider value={values}>
      {children}
    </MultiStepContext.Provider>
  );
}
