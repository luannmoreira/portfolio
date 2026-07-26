import {
  siTypescript,
  siJavascript,
  siGo,
  siNodedotjs,
  siDeno,
  siReact,
  siVuedotjs,
  siTailwindcss,
  siPinia,
  siZod,
  siVitest,
  siJest,
  siCypress,
  siGit,
  siDocker,
  siKubernetes,
  siPostgresql,
  siMongodb,
  siRabbitmq,
  siGithubactions,
  siLinux,
} from "simple-icons";

export interface EcosystemItem {
  name: string;
  iconPath?: string;
}

export interface EcosystemCategory {
  label: string;
  items: EcosystemItem[];
}

// Icons sourced from simple-icons — Zustand, Playwright, and AWS have no
// entry in that package (AWS's was pulled at Amazon's request; the other
// two simply aren't in the registry yet), so those three render as
// text-only chips rather than with a mismatched substitute logo.
export const ecosystem: EcosystemCategory[] = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", iconPath: siTypescript.path },
      { name: "JavaScript", iconPath: siJavascript.path },
      { name: "Golang", iconPath: siGo.path },
      { name: "Node.js", iconPath: siNodedotjs.path },
      { name: "Deno", iconPath: siDeno.path },
    ],
  },
  {
    label: "Front-end",
    items: [
      { name: "React", iconPath: siReact.path },
      { name: "Vue.js", iconPath: siVuedotjs.path },
      { name: "TailwindCSS", iconPath: siTailwindcss.path },
      { name: "Zustand" },
      { name: "Pinia", iconPath: siPinia.path },
      { name: "Zod", iconPath: siZod.path },
    ],
  },
  {
    label: "Testing",
    items: [
      { name: "Vitest", iconPath: siVitest.path },
      { name: "Jest", iconPath: siJest.path },
      { name: "Cypress", iconPath: siCypress.path },
      { name: "Playwright" },
      { name: "Git", iconPath: siGit.path },
    ],
  },
  {
    label: "Platform",
    items: [
      { name: "Docker", iconPath: siDocker.path },
      { name: "Kubernetes", iconPath: siKubernetes.path },
      { name: "PostgreSQL", iconPath: siPostgresql.path },
      { name: "MongoDB", iconPath: siMongodb.path },
      { name: "RabbitMQ", iconPath: siRabbitmq.path },
      { name: "GitHub Actions", iconPath: siGithubactions.path },
      { name: "Linux", iconPath: siLinux.path },
      { name: "AWS" },
    ],
  },
];
