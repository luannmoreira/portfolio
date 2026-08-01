import { screen } from "@testing-library/react";
import { renderWithI18n } from "../test-i18n";
import Uses from "./Uses";
import { usesItems } from "../content/uses";
import en from "../locales/en/translation.json";

test("renders an anchor target and every uses item", () => {
  const { container } = renderWithI18n(<Uses />);

  expect(container.querySelector("#uses")).toBeInTheDocument();

  for (const item of usesItems) {
    const copy = en.uses.items[item.id as keyof typeof en.uses.items];
    expect(screen.getByText(copy.category)).toBeInTheDocument();
    expect(
      screen.getByText("name" in copy ? copy.name : item.name)
    ).toBeInTheDocument();
  }
});
