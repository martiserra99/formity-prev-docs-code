import type { UnionToIntersection } from "type-fest";
import type { Flow, s } from "@formity/react";
import type { FormStatus } from "./types/status";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "./components/form";
import { Review } from "./components/review";

import * as constants from "./constants";
import * as format from "./utils/format";

type Values = UnionToIntersection<Fields[keyof Fields]>;

type Fields = {
  personal: {
    name: string;
    email: string;
  };
  background: {
    experience: string;
    jobTitle: string;
  };
  preferences: {
    employmentType: string;
    workArrangement: string;
  };
  about: {
    whyRole: string;
    greatestStrength: string;
  };
};

export type Schema = {
  render: React.ReactNode;
  struct: [
    s.Form<Fields["personal"]>,
    s.Form<Fields["background"]>,
    s.Form<Fields["preferences"]>,
    s.Form<Fields["about"]>,
    s.Form<Record<never, never>>,
    s.Return<Values>,
  ];
  inputs: Record<never, never>;
  params: {
    status: FormStatus;
  };
};

export const flow: Flow<Schema> = [
  {
    form: {
      fields: () => ({
        name: ["", []],
        email: ["", []],
      }),
      render: ({ fields, onBack, onNext }) => (
        <Form
          key="personal"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              name: z.string().nonempty("Please enter your full name"),
              email: z.email("Please enter a valid email address"),
            }),
          )}
          heading="Personal details"
          message="Let's start with your basic contact information."
          content={[
            {
              type: "input",
              name: "name",
              label: "Full name",
              placeholder: "Jane Smith",
            },
            {
              type: "input",
              name: "email",
              label: "Email address",
              placeholder: "jane@example.com",
            },
          ]}
          buttons={{
            back: null,
            next: "Continue",
          }}
          onBack={onBack}
          onNext={onNext}
        />
      ),
    },
  },
  {
    form: {
      fields: () => ({
        experience: ["", []],
        jobTitle: ["", []],
      }),
      render: ({ fields, onBack, onNext }) => (
        <Form
          key="background"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              experience: z
                .string()
                .nonempty("Please select your years of experience"),
              jobTitle: z
                .string()
                .nonempty("Please enter your current job title"),
            }),
          )}
          heading="Your background"
          message="Tell us about your professional experience."
          content={[
            {
              type: "select",
              name: "experience",
              label: "Years of experience",
              placeholder: "Select years of experience",
              options: constants.yearsOfExperience,
            },
            {
              type: "input",
              name: "jobTitle",
              label: "Current job title",
              placeholder: "Software Engineer",
            },
          ]}
          buttons={{
            back: "Back",
            next: "Continue",
          }}
          onBack={onBack}
          onNext={onNext}
        />
      ),
    },
  },
  {
    form: {
      fields: () => ({
        employmentType: ["", []],
        workArrangement: ["", []],
      }),
      render: ({ fields, onBack, onNext }) => (
        <Form
          key="preferences"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              employmentType: z
                .string()
                .nonempty("Please select an employment type"),
              workArrangement: z
                .string()
                .nonempty("Please select a work arrangement"),
            }),
          )}
          heading="Your preferences"
          message="What kind of role are you looking for?"
          content={[
            {
              type: "select",
              name: "employmentType",
              label: "Employment type",
              placeholder: "Select employment type",
              options: constants.employmentTypes,
            },
            {
              type: "select",
              name: "workArrangement",
              label: "Work arrangement",
              placeholder: "Select work arrangement",
              options: constants.workArrangements,
            },
          ]}
          buttons={{
            back: "Back",
            next: "Continue",
          }}
          onBack={onBack}
          onNext={onNext}
        />
      ),
    },
  },
  {
    form: {
      fields: () => ({
        whyRole: ["", []],
        greatestStrength: ["", []],
      }),
      render: ({ fields, onBack, onNext }) => (
        <Form
          key="about"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              whyRole: z
                .string()
                .nonempty("Please tell us why you want this role"),
              greatestStrength: z
                .string()
                .nonempty("Please share your greatest strength"),
            }),
          )}
          heading="About you"
          message="Help us get to know you a little better."
          content={[
            {
              type: "textarea",
              name: "whyRole",
              label: "Why do you want this role?",
              placeholder: "Tell us what excites you about this opportunity…",
            },
            {
              type: "textarea",
              name: "greatestStrength",
              label: "What is your greatest strength?",
              placeholder: "Describe a strength that sets you apart…",
            },
          ]}
          buttons={{
            back: "Back",
            next: "Continue",
          }}
          onBack={onBack}
          onNext={onNext}
        />
      ),
    },
  },
  {
    form: {
      fields: () => ({}),
      render: ({ values, params, onNext }) => (
        <Review
          key="review"
          heading="Review your application"
          message="Everything look right? Submit when you're ready."
          content={[
            {
              text: "Personal details",
              edit: "personal",
              rows: [
                { label: "Full name", value: format.text(values.name) },
                {
                  label: "Email address",
                  value: format.text(values.email),
                },
              ],
            },
            {
              text: "Background",
              edit: "background",
              rows: [
                {
                  label: "Years of experience",
                  value: format.experience(values.experience),
                },
                {
                  label: "Current job title",
                  value: format.text(values.jobTitle),
                },
              ],
            },
            {
              text: "Preferences",
              edit: "preferences",
              rows: [
                {
                  label: "Employment type",
                  value: format.employmentType(values.employmentType),
                },
                {
                  label: "Work arrangement",
                  value: format.workArrangement(values.workArrangement),
                },
              ],
            },
            {
              text: "About you",
              edit: "about",
              rows: [
                {
                  label: "Why this role",
                  value: format.text(values.whyRole),
                },
                {
                  label: "Greatest strength",
                  value: format.text(values.greatestStrength),
                },
              ],
            },
          ]}
          button="Submit application"
          onNext={onNext}
          status={params.status}
        />
      ),
    },
  },
  {
    return: (values) => ({
      name: values.name,
      email: values.email,
      experience: values.experience,
      jobTitle: values.jobTitle,
      employmentType: values.employmentType,
      workArrangement: values.workArrangement,
      whyRole: values.whyRole,
      greatestStrength: values.greatestStrength,
    }),
  },
];
