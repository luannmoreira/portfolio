import { usesItems } from "../content/uses";

export default function Uses() {
  return (
    <section id="uses" className="scroll-mt-32">
      <div className="mb-stack-sm flex items-center gap-4">
        <h2 className="font-headline-lg text-headline-lg">
          Hardware & Software
        </h2>
        <div className="h-px flex-grow bg-outline-variant/30" />
      </div>
      <dl className="grid grid-cols-1 gap-stack-sm sm:grid-cols-2">
        {usesItems.map((item) => (
          <div key={item.name}>
            <dt className="mb-1 font-label-mono text-label-mono uppercase tracking-widest text-secondary">
              {item.category}
            </dt>
            <dd className="font-headline-md text-[16px] font-semibold">
              {item.name}
            </dd>
            {item.note && (
              <dd className="text-sm text-on-surface-variant">{item.note}</dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
