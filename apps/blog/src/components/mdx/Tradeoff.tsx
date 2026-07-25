import type { ReactNode } from "react";
import Callout from "./Callout";

interface TradeoffProps {
  title?: string;
  children: ReactNode;
}

function Tradeoff({ title, children }: TradeoffProps) {
  return (
    <Callout variant="tradeoff" title={title}>
      {children}
    </Callout>
  );
}

export default Tradeoff;
