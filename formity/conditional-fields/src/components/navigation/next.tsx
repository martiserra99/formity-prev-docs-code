import { ReactNode } from "react";

import Button from "../user-interface/button";

import { useAnimate } from "@/animate";

interface NextProps {
  children: ReactNode;
}

export default function Next({ children }: NextProps) {
  const { animate } = useAnimate();
  return <Button disabled={animate !== "none"}>{children}</Button>;
}
