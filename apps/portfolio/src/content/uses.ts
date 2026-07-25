export interface UsesItem {
  category: string;
  name: string;
  note?: string;
}

export const usesItems: UsesItem[] = [
  {
    category: "Editor",
    name: "VS Code",
    note: "My daily driver, most of the time.",
  },
  { category: "Terminal", name: "Konsole" },
  { category: "OS", name: "Garuda Linux", note: "Arch-based." },
  {
    category: "Browser",
    name: "Whatever's around",
    note: "As a web developer, sticking to just one browser is a bad habit — I keep several around on purpose.",
  },
  { category: "Notes", name: "Notion" },
  { category: "AI Assistant", name: "Claude" },
  {
    category: "Hardware",
    name: "Two monitors",
    note: "Some purists call it a window-management crutch. I call it a necessity — my eyesight isn't what it used to be.",
  },
];
