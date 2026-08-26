import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../test-i18n";
import Image from "./Image";

test("renders the image with its src and alt", () => {
  renderWithI18n(<Image src="/content/blog/en/slug/cover.png" alt="A cover" />);

  const img = screen.getByRole("img", { name: "A cover" });
  expect(img).toHaveAttribute("src", "/content/blog/en/slug/cover.png");
});

test("lazy-loads and decodes asynchronously", () => {
  renderWithI18n(<Image src="/cover.png" alt="A cover" />);

  const img = screen.getByRole("img", { name: "A cover" });
  expect(img).toHaveAttribute("loading", "lazy");
  expect(img).toHaveAttribute("decoding", "async");
});

test("renders a figcaption from the title prop", () => {
  renderWithI18n(<Image src="/cover.png" alt="A cover" title="A caption" />);

  expect(screen.getByText("A caption")).toBeInTheDocument();
});

test("omits the figcaption when no title is given", () => {
  const { container } = renderWithI18n(
    <Image src="/cover.png" alt="A cover" />
  );

  expect(container.querySelector("figcaption")).not.toBeInTheDocument();
});
