import type { ReactNode } from "react";

import { useFormik, FormikProvider } from "formik";
import { useMultiStep } from "@/multi-step";

interface FormStepProps<T extends Record<string, unknown>> {
  initialValues: T;
  validationSchema: object;
  children: ReactNode;
}

export function FormStep<T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  children,
}: FormStepProps<T>) {
  const { onNext } = useMultiStep();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onNext,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative flex h-screen w-full items-center justify-center px-4 py-8 font-sans"
    >
      <FormikProvider value={formik}>{children}</FormikProvider>
    </form>
  );
}

interface FormStepContentProps {
  children: ReactNode;
}

export function FormStepContent({ children }: FormStepContentProps) {
  return <div className="w-full max-w-md">{children}</div>;
}

interface FormStepHeadingProps {
  children: ReactNode;
}

export function FormStepHeading({ children }: FormStepHeadingProps) {
  return (
    <h2 className="mb-6 text-center text-4xl font-semibold text-white">
      {children}
    </h2>
  );
}

interface FormStepInputsProps {
  children: ReactNode;
}

export function FormStepInputs({ children }: FormStepInputsProps) {
  return <div className="mb-6 flex flex-col gap-4">{children}</div>;
}

interface FormStepRowProps {
  children: ReactNode;
}

export function FormStepRow({ children }: FormStepRowProps) {
  return <div className="flex gap-4">{children}</div>;
}
