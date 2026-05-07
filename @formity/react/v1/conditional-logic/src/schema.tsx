// schema.tsx
import type { Schema, Form, Return } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormStep,
  FormStepContent,
  FormStepHeading,
  FormStepInputs,
  FormStepRow,
} from "./components/form-step";

import { Select } from "./components/input/select";
import { TextInput } from "./components/input/text-input";
import { NumberInput } from "./components/input/number-input";
import { NextButton } from "./components/buttons/next-button";
import { BackButton } from "./components/buttons/back-button";

export type Values = [
  Form<{ name: string; surname: string; age: number }>,
  Form<{ softwareDeveloper: string }>,
  Return<{
    name: string;
    surname: string;
    age: number;
    softwareDeveloper: boolean;
  }>,
];

export const schema: Schema<Values> = [
  {
    form: {
      values: () => ({
        name: ["", []],
        surname: ["", []],
        age: [20, []],
      }),
      render: ({ values, onNext }) => (
        <FormStep
          key="yourself"
          defaultValues={values}
          resolver={zodResolver(
            z.object({
              name: z
                .string()
                .min(1, { message: "Required" })
                .max(20, { message: "Must be at most 20 characters" }),
              surname: z
                .string()
                .min(1, { message: "Required" })
                .max(20, { message: "Must be at most 20 characters" }),
              age: z
                .number()
                .min(18, { message: "Minimum of 18 years old" })
                .max(99, { message: "Maximum of 99 years old" }),
            }),
          )}
          onSubmit={onNext}
        >
          <FormStepContent>
            <FormStepHeading>Tell us about yourself</FormStepHeading>
            <FormStepInputs>
              <FormStepRow>
                <TextInput name="name" label="Name" placeholder="Your name" />
                <TextInput
                  name="surname"
                  label="Surname"
                  placeholder="Your surname"
                />
              </FormStepRow>
              <NumberInput name="age" label="Age" placeholder="Your age" />
            </FormStepInputs>
            <NextButton>Next</NextButton>
          </FormStepContent>
        </FormStep>
      ),
    },
  },
  {
    form: {
      values: () => ({
        softwareDeveloper: ["yes", []],
      }),
      render: ({ values, onNext, onBack }) => (
        <FormStep
          key="softwareDeveloper"
          defaultValues={values}
          resolver={zodResolver(
            z.object({
              softwareDeveloper: z.string(),
            }),
          )}
          onSubmit={onNext}
        >
          <FormStepContent>
            <FormStepHeading>Are you a software developer?</FormStepHeading>
            <FormStepInputs>
              <Select
                name="softwareDeveloper"
                label="Software developer"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </FormStepInputs>
            <FormStepRow>
              <BackButton onBack={onBack}>Back</BackButton>
              <NextButton>Submit</NextButton>
            </FormStepRow>
          </FormStepContent>
        </FormStep>
      ),
    },
  },
  {
    return: ({ name, surname, age, softwareDeveloper }) => ({
      name,
      surname,
      age,
      softwareDeveloper: softwareDeveloper === "yes",
    }),
  },
];
