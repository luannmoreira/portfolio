import {
  siTypescript,
  siJavascript,
  siGo,
  siNodedotjs,
  siDeno,
  siPython,
  siGnubash,
  siHtml5,
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
  siGitlab,
  siExpress,
} from "simple-icons";

export type SkillCategory = "Languages" | "Front-end" | "Testing" | "Platform";

export interface Skill {
  name: string;
  category: SkillCategory;
  iconPath?: string;
}

// Single source of truth for the tech-stack chips on the About page
// (merged from what used to be two separate sections: a skills-with-years
// bento and an icon-only ecosystem row list). Icons from simple-icons;
// C#, AWS, Windows Server, Zustand, and Playwright have no entry in that
// package, so those render as text-only chips.
export const skills: Skill[] = [
  { name: "TypeScript", category: "Languages", iconPath: siTypescript.path },
  { name: "JavaScript", category: "Languages", iconPath: siJavascript.path },
  { name: "Golang", category: "Languages", iconPath: siGo.path },
  { name: "Node.js", category: "Languages", iconPath: siNodedotjs.path },
  { name: "Deno", category: "Languages", iconPath: siDeno.path },
  { name: "Python", category: "Languages", iconPath: siPython.path },
  { name: "C#", category: "Languages" },
  { name: "BASH", category: "Languages", iconPath: siGnubash.path },
  { name: "HTML", category: "Languages", iconPath: siHtml5.path },
  { name: "React", category: "Front-end", iconPath: siReact.path },
  { name: "Vue.js", category: "Front-end", iconPath: siVuedotjs.path },
  {
    name: "TailwindCSS",
    category: "Front-end",
    iconPath: siTailwindcss.path,
  },
  { name: "Zustand", category: "Front-end" },
  { name: "Pinia", category: "Front-end", iconPath: siPinia.path },
  { name: "Zod", category: "Front-end", iconPath: siZod.path },
  { name: "Vitest", category: "Testing", iconPath: siVitest.path },
  { name: "Jest", category: "Testing", iconPath: siJest.path },
  { name: "Cypress", category: "Testing", iconPath: siCypress.path },
  { name: "Playwright", category: "Testing" },
  { name: "Git", category: "Testing", iconPath: siGit.path },
  { name: "Docker", category: "Platform", iconPath: siDocker.path },
  { name: "Kubernetes", category: "Platform", iconPath: siKubernetes.path },
  { name: "PostgreSQL", category: "Platform", iconPath: siPostgresql.path },
  { name: "MongoDB", category: "Platform", iconPath: siMongodb.path },
  { name: "RabbitMQ", category: "Platform", iconPath: siRabbitmq.path },
  {
    name: "GitHub Actions",
    category: "Platform",
    iconPath: siGithubactions.path,
  },
  { name: "Linux", category: "Platform", iconPath: siLinux.path },
  { name: "AWS", category: "Platform" },
  { name: "Windows Server", category: "Platform" },
  { name: "GitLab", category: "Platform", iconPath: siGitlab.path },
  { name: "Express", category: "Platform", iconPath: siExpress.path },
];
