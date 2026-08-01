import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../test-i18n";
import Decision from "./Decision";
import Tradeoff from "./Tradeoff";
import Warning from "./Warning";
import Tip from "./Tip";
import Note from "./Note";

test("Decision renders as a decision Callout", () => {
  renderWithI18n(<Decision>content</Decision>);
  expect(screen.getByText("Decision")).toBeInTheDocument();
  expect(screen.getByText("content")).toBeInTheDocument();
});

test("Tradeoff renders as a tradeoff Callout", () => {
  renderWithI18n(<Tradeoff>content</Tradeoff>);
  expect(screen.getByText("Trade-off")).toBeInTheDocument();
});

test("Warning renders as a warning Callout", () => {
  renderWithI18n(<Warning>content</Warning>);
  expect(screen.getByText("Warning")).toBeInTheDocument();
});

test("Tip renders as a tip Callout", () => {
  renderWithI18n(<Tip>content</Tip>);
  expect(screen.getByText("Tip")).toBeInTheDocument();
});

test("Note renders as a note Callout", () => {
  renderWithI18n(<Note>content</Note>);
  expect(screen.getByText("Note")).toBeInTheDocument();
});

test("each wrapper still accepts a title override", () => {
  renderWithI18n(<Decision title="Use pnpm workspaces">content</Decision>);
  expect(screen.getByText("Use pnpm workspaces")).toBeInTheDocument();
  expect(screen.queryByText("Decision")).not.toBeInTheDocument();
});
