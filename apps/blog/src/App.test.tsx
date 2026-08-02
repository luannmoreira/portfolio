import { render, screen } from "@testing-library/react";
import { createMemoryRouter } from "react-router";
import App, { routes } from "./App";

// Own router/history per test instead of sharing the app's real browser
// router — isolates this from any other test's navigation state.
function renderApp(initialEntries = ["/"]) {
  const router = createMemoryRouter(routes, { initialEntries });
  return render(<App router={router} />);
}

// Integration-level check that App wires up routing correctly — detailed
// content assertions live in each page's own test file.
test("redirects / to the blog archive", async () => {
  renderApp();
  expect(
    await screen.findByRole("heading", { name: "Writing", level: 1 })
  ).toBeInTheDocument();
});
