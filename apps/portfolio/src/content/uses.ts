export interface UsesItemSource {
  /** Slug used as the `uses.items.<id>.*` translation key prefix. */
  id: string;
  /** Proper noun — stays literal unless a `uses.items.<id>.name`
   * translation exists (used for the couple of entries whose display text
   * is prose, not a product name). */
  name: string;
}

export const usesItems: UsesItemSource[] = [
  { id: "editor", name: "VS Code" },
  { id: "terminal", name: "Konsole" },
  { id: "os", name: "Garuda Linux" },
  { id: "browser", name: "Whatever's around" },
  { id: "notes", name: "Notion" },
  { id: "ai-assistant", name: "Claude" },
  { id: "hardware", name: "Two monitors" },
];
