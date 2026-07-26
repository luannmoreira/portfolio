import { useDocumentMeta } from "../hooks/useDocumentMeta";

// Scaffolded in the routing pass; full content (certs grid, #uses anchor,
// tech chips, code snippet) built out in the next milestone.
function Certifications() {
  useDocumentMeta(
    "Certifications & Uses — Luann Curioso",
    "Certifications, and the workstation and software stack used day to day."
  );

  return (
    <div className="min-h-screen pt-32 text-on-surface">
      <h1 className="font-headline-lg text-headline-lg">
        Certifications & Uses
      </h1>
    </div>
  );
}

export default Certifications;
