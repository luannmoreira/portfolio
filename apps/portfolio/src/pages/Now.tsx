import { nowItems, nowLastUpdated } from "../content/now";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

// Convention: https://nownownow.com — what I'm actually focused on right
// now, manually updated (not auto-generated) when it goes stale.
function Now() {
  useDocumentMeta(
    "Now — Luann Curioso",
    `What I'm focused on right now. Last updated: ${nowLastUpdated}.`
  );

  return (
    <div className="min-h-screen text-white light:text-dark-500">
      <h1 className="text-3xl font-bold">Now</h1>
      <p className="font-light text-gray-400 light:text-gray-600">
        Last updated: {nowLastUpdated}
      </p>
      <ul className="mt-6 flex flex-col gap-6">
        {nowItems.map((item) => (
          <li key={item.title}>
            <h2 className="font-bold md:text-xl">{item.title}</h2>
            <p className="font-light text-gray-400 light:text-gray-600">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Now;
