import { usesItems } from "../content/uses";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Uses() {
  useDocumentMeta(
    "Uses — Luann Curioso",
    "What I actually work with, day to day — hardware, software, and tooling."
  );

  return (
    <div className="min-h-screen text-white">
      <h1 className="text-3xl font-bold">Uses</h1>
      <p className="font-light text-gray-400">
        What I actually work with, day to day.
      </p>
      <dl className="mt-6 flex flex-col gap-4">
        {usesItems.map((item) => (
          <div key={item.name}>
            <dt className="font-mono text-sm uppercase text-blue">
              {item.category}
            </dt>
            <dd className="font-semibold">{item.name}</dd>
            {item.note && (
              <dd className="font-light text-gray-400">{item.note}</dd>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}

export default Uses;
