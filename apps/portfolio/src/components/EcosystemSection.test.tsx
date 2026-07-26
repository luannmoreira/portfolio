import { render, screen } from "@testing-library/react";
import EcosystemSection from "./EcosystemSection";
import { ecosystem } from "../content/ecosystem";

test("renders every category label and every item name", () => {
  render(<EcosystemSection />);

  for (const category of ecosystem) {
    expect(screen.getByText(category.label)).toBeInTheDocument();
    for (const item of category.items) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    }
  }
});
