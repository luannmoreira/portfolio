import { render, screen } from "@testing-library/react";
import Decision from "./Decision";
import Tradeoff from "./Tradeoff";
import Warning from "./Warning";
import Tip from "./Tip";
import Note from "./Note";

test("Decision renders as a decision Callout", () => {
  render(<Decision>content</Decision>);
  expect(screen.getByText("Decision")).toBeInTheDocument();
  expect(screen.getByText("content")).toBeInTheDocument();
});

test("Tradeoff renders as a tradeoff Callout", () => {
  render(<Tradeoff>content</Tradeoff>);
  expect(screen.getByText("Trade-off")).toBeInTheDocument();
});

test("Warning renders as a warning Callout", () => {
  render(<Warning>content</Warning>);
  expect(screen.getByText("Warning")).toBeInTheDocument();
});

test("Tip renders as a tip Callout", () => {
  render(<Tip>content</Tip>);
  expect(screen.getByText("Tip")).toBeInTheDocument();
});

test("Note renders as a note Callout", () => {
  render(<Note>content</Note>);
  expect(screen.getByText("Note")).toBeInTheDocument();
});

test("each wrapper still accepts a title override", () => {
  render(<Decision title="Use pnpm workspaces">content</Decision>);
  expect(screen.getByText("Use pnpm workspaces")).toBeInTheDocument();
  expect(screen.queryByText("Decision")).not.toBeInTheDocument();
});
