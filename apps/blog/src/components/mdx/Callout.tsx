import type { ReactNode } from "react";
import CalloutIcon from "./CalloutIcon";

export type CalloutVariant =
  "decision" | "tradeoff" | "warning" | "tip" | "note";

interface CalloutProps {
  variant: CalloutVariant;
  title?: string;
  children: ReactNode;
}

const VARIANT_STYLES: Record<
  CalloutVariant,
  { label: string; classes: string }
> = {
  decision: {
    label: "Decision",
    classes:
      "border-blue-400 bg-blue-950 text-blue-100 light:bg-blue-50 light:text-blue-900",
  },
  tradeoff: {
    label: "Trade-off",
    classes:
      "border-amber-400 bg-amber-950 text-amber-100 light:bg-amber-50 light:text-amber-900",
  },
  warning: {
    label: "Warning",
    classes:
      "border-red-400 bg-red-950 text-red-100 light:bg-red-50 light:text-red-900",
  },
  tip: {
    label: "Tip",
    classes:
      "border-green-400 bg-green-950 text-green-100 light:bg-green-50 light:text-green-900",
  },
  note: {
    label: "Note",
    classes:
      "border-slate-400 bg-slate-950 text-slate-100 light:bg-slate-50 light:text-slate-900",
  },
};

function Callout({ variant, title, children }: CalloutProps) {
  const { label, classes } = VARIANT_STYLES[variant];

  return (
    <div
      role="note"
      className={`flex gap-3 rounded-md border-l-4 p-4 ${classes}`}
    >
      <CalloutIcon variant={variant} className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">{title ?? label}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Callout;
