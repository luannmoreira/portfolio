import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../test-i18n";
import Image from "./Image";

// A distinctive stand-in for the real prefixing, rather than the actual
// implementation (which defaults to import.meta.env.BASE_URL — "/" in this
// test environment). That default matters here for more than the usual
// "can't tell resolved from unresolved" reason: for a protocol-relative
// src ("//host/..."), stripping and re-adding a single "/" against a "/"
// base reconstructs the exact same string, so a broken guard that
// mis-resolves "//..." would still pass an assertion against the raw
// input. Mocking with a base that isn't "/" closes that hole.
vi.mock("../../content/resolveAssetUrl", () => ({
  resolveAssetUrl: vi.fn((path: string) => `/BASE${path}`),
}));

test("renders the image with its src and alt", () => {
  renderWithI18n(<Image src="/content/blog/en/slug/cover.png" alt="A cover" />);

  const img = screen.getByRole("img", { name: "A cover" });
  expect(img).toHaveAttribute("src", "/BASE/content/blog/en/slug/cover.png");
});

test("passes through an external https:// src unresolved", () => {
  renderWithI18n(
    <Image src="https://cdn.example.com/pic.png" alt="External" />
  );

  const img = screen.getByRole("img", { name: "External" });
  expect(img).toHaveAttribute("src", "https://cdn.example.com/pic.png");
});

test("passes through a protocol-relative src unresolved", () => {
  renderWithI18n(<Image src="//cdn.example.com/pic.png" alt="External" />);

  const img = screen.getByRole("img", { name: "External" });
  expect(img).toHaveAttribute("src", "//cdn.example.com/pic.png");
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
