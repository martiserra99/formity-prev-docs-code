import { ColumnsView, type Columns } from "./columns";
import { InputView, type Input } from "./input";
import { SelectView, type Select } from "./select";
import { RadioView, type Radio } from "./radio";
import { CardNumberView, type CardNumber } from "./card-number";
import { ExpiryDateView, type ExpiryDate } from "./expiry-date";

export type Item = Columns | Input | Select | Radio | CardNumber | ExpiryDate;

export function ItemView(item: Item) {
  switch (item.type) {
    case "columns":
      return <ColumnsView {...item} />;
    case "input":
      return <InputView {...item} />;
    case "select":
      return <SelectView {...item} />;
    case "radio":
      return <RadioView {...item} />;
    case "cardNumber":
      return <CardNumberView {...item} />;
    case "expiryDate":
      return <ExpiryDateView {...item} />;
  }
}
