import type { ReactNode } from "react";
import Callout from "./Callout";

interface WarningProps {
  title?: string;
  children: ReactNode;
}

function Warning({ title, children }: WarningProps) {
  return (
    <Callout variant="warning" title={title}>
      {children}
    </Callout>
  );
}

export default Warning;
