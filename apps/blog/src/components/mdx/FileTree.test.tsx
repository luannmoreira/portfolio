import { render, screen } from "@testing-library/react";
import FileTree from "./FileTree";
import FileTreeFolder from "./FileTreeFolder";
import FileTreeFile from "./FileTreeFile";

test("renders a nested tree of folders and files", () => {
  render(
    <FileTree>
      <FileTreeFolder name="src">
        <FileTreeFile name="index.ts" />
        <FileTreeFolder name="components">
          <FileTreeFile name="App.tsx" />
        </FileTreeFolder>
      </FileTreeFolder>
    </FileTree>
  );

  expect(screen.getByText("src")).toBeInTheDocument();
  expect(screen.getByText("index.ts")).toBeInTheDocument();
  expect(screen.getByText("components")).toBeInTheDocument();
  expect(screen.getByText("App.tsx")).toBeInTheDocument();
});

test("a folder with no children renders without a nested list", () => {
  const { container } = render(
    <FileTree>
      <FileTreeFolder name="empty" />
    </FileTree>
  );

  expect(screen.getByText("empty")).toBeInTheDocument();
  expect(container.querySelectorAll("ul")).toHaveLength(1);
});

test("a folder with children nests them in their own list", () => {
  const { container } = render(
    <FileTree>
      <FileTreeFolder name="src">
        <FileTreeFile name="index.ts" />
      </FileTreeFolder>
    </FileTree>
  );

  expect(container.querySelectorAll("ul")).toHaveLength(2);
});

test("a file renders as a leaf with no nested list", () => {
  const { container } = render(
    <FileTree>
      <FileTreeFile name="index.ts" />
    </FileTree>
  );

  expect(container.querySelectorAll("ul")).toHaveLength(1);
});
