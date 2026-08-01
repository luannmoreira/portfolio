import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithI18n } from "../../test-i18n";
import Pre from "./Pre";

test("renders the pre content unchanged", () => {
  renderWithI18n(<Pre>const answer = 42;</Pre>);
  expect(screen.getByText("const answer = 42;")).toBeInTheDocument();
});

test("shows a copy button", () => {
  renderWithI18n(<Pre>code</Pre>);
  expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
});

test("copies the pre's text content when clicked", async () => {
  const user = userEvent.setup();
  const writeText = vi.spyOn(navigator.clipboard, "writeText");
  renderWithI18n(<Pre>const x = 1;</Pre>);

  await user.click(screen.getByRole("button", { name: /copy/i }));

  expect(writeText).toHaveBeenCalledWith("const x = 1;");
});

test("shows 'Copied!' feedback after a successful copy, then reverts", async () => {
  const user = userEvent.setup();
  renderWithI18n(<Pre>const x = 1;</Pre>);

  await user.click(screen.getByRole("button", { name: /copy/i }));
  expect(screen.getByText("Copied!")).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText("Copy")).toBeInTheDocument(), {
    timeout: 3000,
  });
});
