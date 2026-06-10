import type { DefaultValues, Resolver } from "react-hook-form";
import type { OnBack, OnNext } from "@formity/react";

import { useForm, FormProvider } from "react-hook-form";

import type { FormStatus } from "@/types/status";

import { ItemView, type Item } from "./item";
import { Button } from "../button";

interface FormProps<T extends Record<string, unknown>> {
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
  heading: string;
  message: string;
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
  resolver,
  heading,
  message,
  content,
  buttons,
  onBack,
  onNext,
  status,
}: FormProps<T>) {
  const form = useForm({ defaultValues, resolver });
  return (
    <form noValidate autoComplete="off" onSubmit={form.handleSubmit(onNext)}>
      <FormProvider {...form}>
        <div className="mb-8">
          <h2 className="mb-1.5 text-2xl font-bold text-gray-950">{heading}</h2>
          <p className="text-sm font-medium text-gray-400">{message}</p>
        </div>
        <div className="@container mb-8 flex flex-col gap-6">
          {content.map((item, i) => (
            <ItemView key={i} {...item} />
          ))}
        </div>
        <div className="flex w-full items-center justify-end gap-4">
          {buttons.back && (
            <Button
              type="button"
              variant="secondary"
              disabled={status.submitting}
              onClick={() => onBack(form.getValues())}
            >
              {buttons.back}
            </Button>
          )}
          <Button type="submit" variant="primary" disabled={status.submitting}>
            {status.submitting ? "Submitting..." : buttons.next}
          </Button>
        </div>
      </FormProvider>
    </form>
  );
}
