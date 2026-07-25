import type { ReactNode } from "react";
import Callout from "./Callout";

interface TipProps {
  title?: string;
  children: ReactNode;
}

function Tip({ title, children }: TipProps) {
  return (
    <Callout variant="tip" title={title}>
      {children}
    </Callout>
  );
}

export default Tip;
