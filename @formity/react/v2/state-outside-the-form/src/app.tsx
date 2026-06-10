import type { OnReturn, ReturnOutput } from "@formity/react";
import type { Status, FormStatus } from "./types/status";

import { useState, useCallback } from "react";
import { useFormity } from "@formity/react";

import { Summary } from "./components/summary";
import { Done } from "./components/done";

import { flow, type Schema } from "./flow";

export default function App() {
  const [status, setStatus] = useState<Status<ReturnOutput<Schema>>>({
    type: "form",
    submitting: false,
  });

  const onReturn = useCallback<OnReturn<Schema>>(async (output) => {
    setStatus({ type: "form", submitting: true });

    // Show output in the console
    console.log(output);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus({ type: "done", output });
  }, []);

  if (status.type === "done") {
    return (
      <Done
        output={status.output}
        onStartOver={() => setStatus({ type: "form", submitting: false })}
      />
    );
  }

  return <Form status={status} onReturn={onReturn} />;
}

interface FormProps {
  status: FormStatus;
  onReturn: OnReturn<Schema>;
}

function Form({ status, onReturn }: FormProps) {
  const form = useFormity({
    flow,
    params: { status },
    onReturn,
  });
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <main className="flex flex-1 items-start justify-center overflow-y-auto px-6 py-12">
        <div className="w-full max-w-lg">{form}</div>
      </main>
      <Summary
        values={{
          email: "",
          city: "",
          country: "",
          deliveryMethod: "",
        }}
      />
    </div>
  );
}
