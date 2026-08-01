import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import LanguageSwitcher from "./LanguageSwitcher";

test("renders both locale options inside a labeled group", () => {
  render(<LanguageSwitcher locale="en" onChange={() => {}} label="Language" />);

  expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "PT" })).toBeInTheDocument();
});

test("marks only the active locale's button as current", () => {
  render(
    <LanguageSwitcher locale="pt-BR" onChange={() => {}} label="Language" />
  );

  expect(screen.getByRole("button", { name: "EN" })).not.toHaveAttribute(
    "aria-current"
  );
  expect(screen.getByRole("button", { name: "PT" })).toHaveAttribute(
    "aria-current",
    "true"
  );
});

test("clicking the inactive option calls onChange with its locale", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<LanguageSwitcher locale="en" onChange={onChange} label="Language" />);

  await user.click(screen.getByRole("button", { name: "PT" }));

  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith("pt-BR");
});

test("clicking the already-active option still reports its locale", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<LanguageSwitcher locale="en" onChange={onChange} label="Language" />);

  await user.click(screen.getByRole("button", { name: "EN" }));

  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith("en");
});
