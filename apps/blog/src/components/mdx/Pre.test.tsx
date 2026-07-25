import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pre from "./Pre";

test("renders the pre content unchanged", () => {
  render(<Pre>const answer = 42;</Pre>);
  expect(screen.getByText("const answer = 42;")).toBeInTheDocument();
});

test("shows a copy button", () => {
  render(<Pre>code</Pre>);
  expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
});

test("copies the pre's text content when clicked", async () => {
  const user = userEvent.setup();
  const writeText = vi.spyOn(navigator.clipboard, "writeText");
  render(<Pre>const x = 1;</Pre>);

  await user.click(screen.getByRole("button", { name: /copy/i }));

  expect(writeText).toHaveBeenCalledWith("const x = 1;");
});

test("shows 'Copied!' feedback after a successful copy, then reverts", async () => {
  const user = userEvent.setup();
  render(<Pre>const x = 1;</Pre>);

  await user.click(screen.getByRole("button", { name: /copy/i }));
  expect(screen.getByText("Copied!")).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText("Copy")).toBeInTheDocument(), {
    timeout: 3000,
  });
});
