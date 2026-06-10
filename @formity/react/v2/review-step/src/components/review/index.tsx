import type { OnNext } from "@formity/react";
import type { FormStatus } from "../../types/status";

import { ItemView, type Item } from "./item";
import { Button } from "../button";

interface ReviewProps {
  heading: string;
  message: string;
  content: Item[];
  button: string;
  onNext: OnNext<Record<never, never>>;
  status: FormStatus;
}

export function Review({
  heading,
  message,
  content,
  button,
  onNext,
  status,
}: ReviewProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h2 className="mb-1.5 text-2xl font-bold text-gray-950">{heading}</h2>
          <p className="text-sm font-medium text-gray-400">{message}</p>
        </div>
        <div className="mb-8 flex flex-col gap-4">
          {content.map((item, i) => (
            <ItemView key={i} item={item} onEdit={() => {}} />
          ))}
        </div>
        <div className="flex w-full items-center justify-end gap-4">
          <Button
            variant="primary"
            onClick={() => onNext({})}
            disabled={status.submitting}
          >
            {status.submitting ? "Submitting..." : button}
          </Button>
        </div>
      </div>
    </div>
  );
}
