import type { ReactNode } from "react";
import Callout from "./Callout";

interface NoteProps {
  title?: string;
  children: ReactNode;
}

function Note({ title, children }: NoteProps) {
  return (
    <Callout variant="note" title={title}>
      {children}
    </Callout>
  );
}

export default Note;
