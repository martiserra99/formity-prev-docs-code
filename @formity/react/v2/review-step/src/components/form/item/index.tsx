import { InputView, type Input } from "./input";
import { SelectView, type Select } from "./select";
import { TextareaView, type Textarea } from "./textarea";

export type Item = Input | Select | Textarea;

export function ItemView(item: Item) {
  switch (item.type) {
    case "input": {
      return <InputView {...item} />;
    }
    case "select": {
      return <SelectView {...item} />;
    }
    case "textarea": {
      return <TextareaView {...item} />;
    }
  }
}
