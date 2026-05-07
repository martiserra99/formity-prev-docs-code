"use client";

import { useState } from "react";
import { Formity, Value } from "formity";

import components from "@/components";
import schema from "@/schema";

import Data from "@/data";

export default function Home() {
  const [result, setResult] = useState<Value | null>(null);

  function handleReturn(result: Value) {
    setResult(result);
  }

  if (result) {
    return <Data data={result} onStart={() => setResult(null)} />;
  }

  return (
    <Formity components={components} schema={schema} onReturn={handleReturn} />
  );
}
