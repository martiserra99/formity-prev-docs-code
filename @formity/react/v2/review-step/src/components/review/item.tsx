import { cn } from "@/lib/cn";

export interface Item {
  text: string;
  edit: string;
  rows: { label: string; value: string }[];
}

interface ItemViewProps {
  item: Item;
  onEdit: (edit: string) => void;
}

export function ItemView({ item, onEdit }: ItemViewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-3">
        <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          {item.text}
        </p>
        <button
          type="button"
          onClick={() => onEdit(item.edit)}
          className="text-xs font-semibold text-gray-500 transition-colors hover:text-gray-950"
        >
          Edit
        </button>
      </div>
      {item.rows.map((row, i) => (
        <div
          key={row.label}
          className={cn("flex items-start justify-between gap-4 px-5 py-3", {
            "border-b border-gray-200": i < item.rows.length - 1,
          })}
        >
          <span className="shrink-0 text-xs font-medium text-gray-500">
            {row.label}
          </span>
          <span className="text-right text-xs font-semibold text-gray-900">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
