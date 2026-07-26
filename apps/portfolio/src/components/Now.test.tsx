import { render, screen } from "@testing-library/react";
import Now from "./Now";
import { nowItems, nowLastUpdated } from "../content/now";

test("renders an anchor target for cross-page nav", () => {
  const { container } = render(<Now />);
  expect(container.querySelector("#now")).toBeInTheDocument();
});

test("renders the last-updated date and every now item", () => {
  render(<Now />);

  expect(screen.getByText(new RegExp(nowLastUpdated))).toBeInTheDocument();

  for (const item of nowItems) {
    expect(
      screen.getByRole("heading", { name: item.title })
    ).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
  }
});
