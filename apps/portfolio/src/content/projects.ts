export interface Project {
  /** Slug used as the `projects.items.<id>.*` translation key prefix. */
  id: string;
  /** Proper noun — never translated. */
  name: string;
  /** Proper nouns (tech names) — never translated. */
  tech: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: "shellhub",
    name: "ShellHub",
    tech: [
      "React",
      "Vue 3",
      "TypeScript",
      "Golang",
      "Zustand",
      "Vuex",
      "Zod",
      "Docker",
      "REST APIs",
      "Vitest",
    ],
    link: "https://www.shellhub.io/",
  },
  {
    id: "os-systems",
    name: "OS Systems",
    tech: [
      "React",
      "Vue",
      "Angular",
      "TypeScript",
      "Golang",
      "Electron",
      "Docker",
      "Windows Server",
      "Hyper-V",
      "Active Directory",
    ],
  },
  {
    id: "sedec-invest-mt",
    name: "SEDEC / Invest MT",
    tech: ["Vue 3", "Vuex", "TypeScript"],
    link: "https://www.investmt.com.br/pt-br",
  },
];
