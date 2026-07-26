import { render, screen } from "@testing-library/react";
import Uses from "./Uses";
import { usesItems } from "../content/uses";

test("renders an anchor target and every uses item", () => {
  const { container } = render(<Uses />);

  expect(container.querySelector("#uses")).toBeInTheDocument();

  for (const item of usesItems) {
    expect(screen.getByText(item.category)).toBeInTheDocument();
    expect(screen.getByText(item.name)).toBeInTheDocument();
  }
});
