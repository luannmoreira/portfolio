import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// No analytics backend exists in this project (adding one is a product
// decision, out of scope here) — logging is the "at minimum" bar so this
// actually runs instead of silently no-op'ing forever (the previous
// reportWebVitals() with no argument never imports web-vitals at all, since
// its own guard requires a callback). Real field data, visible to anyone
// who opens devtools, is still strictly better than none.
reportWebVitals((metric) => {
  console.info(`[web-vitals] ${metric.name}`, metric.value);
});
