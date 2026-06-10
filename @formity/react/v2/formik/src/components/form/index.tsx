import type { AnyObjectSchema } from "yup";
import type { OnBack, OnNext } from "@formity/react";

import { useFormik, FormikProvider } from "formik";

import type { FormStatus } from "@/types/status";

import { ItemView, type Item } from "./item";
import { Button } from "../button";

interface FormProps<T extends Record<string, unknown>> {
  defaultValues: T;
  validationSchema: AnyObjectSchema;
  heading: string;
  content: Item[];
  buttons: {
    back: string | null;
    next: string;
  };
  onBack: OnBack<T>;
  onNext: OnNext<T>;
  status: FormStatus;
}

export function Form<T extends Record<string, unknown>>({
  defaultValues,
  validationSchema,
  heading,
  content,
  buttons,
  onBack,
  onNext,
  status,
}: FormProps<T>) {
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: onNext,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-screen w-full items-center justify-center px-4 py-8"
      autoComplete="off"
    >
      <FormikProvider value={formik}>
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-center text-4xl font-bold text-gray-950">
            {heading}
          </h2>
          <div className="mb-6 flex flex-col gap-4">
            {content.map((field, index) => (
              <ItemView key={index} {...field} />
            ))}
          </div>
          <div className="flex gap-4">
            {buttons.back && (
              <Button
                type="button"
                variant="secondary"
                disabled={status.submitting}
                onClick={() => onBack(formik.values)}
              >
                {buttons.back}
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={status.submitting}
            >
              {status.submitting ? "Submitting..." : buttons.next}
            </Button>
          </div>
        </div>
      </FormikProvider>
    </form>
  );
}
