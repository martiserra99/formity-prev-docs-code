// multi-step/multi-step-value.ts
import type { OnNext, OnBack } from "@formity/react";
import type { FormityStatus } from "@/types";

export interface MultiStepValue<T extends Record<string, unknown>> {
  onNext: OnNext<T>;
  onBack: OnBack<T>;
  status: FormityStatus;
}
