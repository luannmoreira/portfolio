import type { ReactNode } from "react";
import Callout from "./Callout";

interface DecisionProps {
  title?: string;
  children: ReactNode;
}

function Decision({ title, children }: DecisionProps) {
  return (
    <Callout variant="decision" title={title}>
      {children}
    </Callout>
  );
}

export default Decision;
