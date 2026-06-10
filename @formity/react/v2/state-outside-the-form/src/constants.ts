export const countries = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "nl", label: "Netherlands" },
  { value: "pt", label: "Portugal" },
  { value: "se", label: "Sweden" },
  { value: "no", label: "Norway" },
  { value: "dk", label: "Denmark" },
  { value: "fi", label: "Finland" },
  { value: "ch", label: "Switzerland" },
  { value: "at", label: "Austria" },
  { value: "be", label: "Belgium" },
  { value: "ie", label: "Ireland" },
  { value: "nz", label: "New Zealand" },
  { value: "jp", label: "Japan" },
  { value: "sg", label: "Singapore" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
  { value: "other", label: "Other" },
];

export const deliveryMethods = [
  {
    value: "standard",
    label: "Standard delivery",
    description: "5–7 business days",
    price: 0,
    priceLabel: "Free",
  },
  {
    value: "express",
    label: "Express delivery",
    description: "2–3 business days",
    price: 9.99,
    priceLabel: "$9.99",
  },
  {
    value: "overnight",
    label: "Overnight delivery",
    description: "Next business day",
    price: 19.99,
    priceLabel: "$19.99",
  },
];

export const cartItems = [
  { label: "Wireless Headphones", price: 79.0 },
  { label: "USB-C Cable (2-pack)", price: 14.0 },
  { label: "Phone Case", price: 24.0 },
];

export const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
