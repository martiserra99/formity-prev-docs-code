import * as constants from "../constants";

const mapExperience = Object.fromEntries(
  constants.yearsOfExperience.map(({ value, label }) => [value, label]),
);

const mapEmploymentTypes = Object.fromEntries(
  constants.employmentTypes.map(({ value, label }) => [value, label]),
);

const mapWorkArrangements = Object.fromEntries(
  constants.workArrangements.map(({ value, label }) => [value, label]),
);

export function text(value: string): string {
  return value || "—";
}

export function experience(value: string): string {
  return mapExperience[value] ?? "—";
}

export function employmentType(value: string): string {
  return mapEmploymentTypes[value] ?? "—";
}

export function workArrangement(value: string): string {
  return mapWorkArrangements[value] ?? "—";
}
