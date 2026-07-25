export interface Project {
  name: string;
  description: string;
  tech: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    name: "ShellHub",
    description:
      "A production-grade remote device management platform used by real customers. Contributed across the full engineering lifecycle — building features in React and Vue 3 with TypeScript, standardizing unit testing with Vitest, refactoring legacy code into maintainable solutions, and improving frontend architecture consistency. Beyond feature work, this meant reducing technical debt, reviewing pull requests, and participating in architectural discussions alongside backend engineers — engineering a real product, not just its UI.",
    tech: [
      "React",
      "Vue 3",
      "TypeScript",
      "Zustand",
      "Vuex",
      "Zod",
      "Docker",
      "REST APIs",
      "Vitest",
    ],
  },
  {
    name: "OS Systems",
    description:
      "Enterprise software across multiple industries, spanning both application development and infrastructure. Built production applications with React, Vue, Angular, and Electron, while also working hands-on with Docker, Windows Server, Hyper-V, and Active Directory — experience that shaped an understanding of software delivery beyond the frontend layer.",
    tech: [
      "React",
      "Vue",
      "Angular",
      "TypeScript",
      "Electron",
      "Docker",
      "Windows Server",
      "Hyper-V",
      "Active Directory",
    ],
  },
  {
    name: "SEDEC / Invest MT",
    description:
      "The official investment platform for the Government of Mato Grosso, built with Vue 3, Vuex, and TypeScript. Delivered new features and ongoing maintenance for a production application serving a real government initiative.",
    tech: ["Vue 3", "Vuex", "TypeScript"],
    link: "https://www.investmt.com.br/pt-br",
  },
];
