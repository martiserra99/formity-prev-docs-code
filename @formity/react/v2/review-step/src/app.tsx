import type { OnReturn, ReturnOutput } from "@formity/react";
import type { Status } from "./types/status";

import { useState, useCallback } from "react";
import { Formity } from "@formity/react";

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

  return <Formity flow={flow} params={{ status }} onReturn={onReturn} />;
}
