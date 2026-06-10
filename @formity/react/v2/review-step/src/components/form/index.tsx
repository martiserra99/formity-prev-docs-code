import type { DefaultValues, Resolver } from "react-hook-form";
import type { OnBack, OnNext } from "@formity/react";

import { useForm, FormProvider } from "react-hook-form";

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
}: FormProps<T>) {
  const form = useForm({ defaultValues, resolver });
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white px-4 py-12">
      <div className="w-full max-w-lg">
        <form
          noValidate
          autoComplete="off"
          onSubmit={form.handleSubmit(onNext)}
        >
          <FormProvider {...form}>
            <div className="mb-8">
              <h2 className="mb-1.5 text-2xl font-bold text-gray-950">
                {heading}
              </h2>
              <p className="text-sm font-medium text-gray-400">{message}</p>
            </div>
            <div className="mb-8 flex flex-col gap-6">
              {content.map((item, i) => (
                <ItemView key={i} {...item} />
              ))}
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              {buttons.back && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onBack(form.getValues())}
                >
                  {buttons.back}
                </Button>
              )}
              <Button type="submit" variant="primary">
                {buttons.next}
              </Button>
            </div>
          </FormProvider>
        </form>
      </div>
    </div>
  );
}
