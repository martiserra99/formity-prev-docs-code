import { useMemo } from "react";
import * as constants from "../constants";
import * as format from "../utils/format";

interface SummaryProps {
  values: {
    email: string;
    city: string;
    country: string;
    deliveryMethod: string;
  };
}

export function Summary({ values }: SummaryProps) {
  const delivery = useMemo(() => {
    if (values.deliveryMethod) {
      return constants.deliveryMethods.find(
        (m) => m.value === values.deliveryMethod,
      );
    }
    return null;
  }, [values.deliveryMethod]);

  const total = useMemo(() => {
    if (delivery) {
      return constants.subtotal + delivery.price;
    }
    return constants.subtotal;
  }, [delivery]);

  return (
    <aside className="flex w-80 shrink-0 flex-col overflow-y-auto border-l border-gray-100 bg-gray-50 px-6 py-10">
      <h2 className="mb-6 text-xs font-semibold tracking-widest text-gray-400 uppercase">
        Order summary
      </h2>

      <div className="mb-6 flex flex-col gap-3">
        {constants.cartItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-gray-950">
              {format.price(item.price)}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-2 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Subtotal</span>
          <span className="text-sm font-semibold text-gray-950">
            {format.price(constants.subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Delivery</span>
          <span className="text-sm font-semibold text-gray-950">
            {delivery ? delivery.priceLabel : "—"}
          </span>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-sm font-bold text-gray-950">Total</span>
        <span className="text-base font-bold text-gray-950">
          {delivery ? format.price(total) : "—"}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {values.email && (
          <div>
            <p className="mb-0.5 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Confirmation to
            </p>
            <p className="truncate text-sm font-medium text-gray-700">
              {values.email}
            </p>
          </div>
        )}
        {(values.city || values.country) && (
          <div>
            <p className="mb-0.5 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Shipping to
            </p>
            <p className="text-sm font-medium text-gray-700">
              {[values.city, format.country(values.country)]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
