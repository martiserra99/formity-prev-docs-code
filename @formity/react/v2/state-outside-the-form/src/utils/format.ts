import * as constants from "../constants";

const mapCountries = Object.fromEntries(
  constants.countries.map(({ value, label }) => [value, label]),
);

const mapDelivery = Object.fromEntries(
  constants.deliveryMethods.map(({ value, label, priceLabel }) => [
    value,
    { label, priceLabel },
  ]),
);

export function text(value: string): string {
  return value || "—";
}

export function country(value: string): string {
  return mapCountries[value] ?? "—";
}

export function deliveryLabel(value: string): string {
  return mapDelivery[value]?.label ?? "—";
}

export function deliveryPrice(value: string): string {
  return mapDelivery[value]?.priceLabel ?? "—";
}

export function price(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function cardNumber(value: string): string {
  if (!value) return "—";
  const digits = value.replace(/\D/g, "");
  if (digits.length < 4) return "—";
  return `•••• •••• •••• ${digits.slice(-4)}`;
}
