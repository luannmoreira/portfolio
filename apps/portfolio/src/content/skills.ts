import javascript from "../assets/skills/javascript.svg";
import bash from "../assets/skills/bash.svg";
import linux from "../assets/skills/linux.svg";
import python from "../assets/skills/python.svg";
import node from "../assets/skills/nodejs.svg";
import reactIcon from "../assets/skills/react.svg";
import tailwind from "../assets/skills/tailwind.svg";
import windows from "../assets/skills/windows.svg";
import docker from "../assets/skills/docker.svg";
import git from "../assets/skills/git.svg";
import express from "../assets/skills/express.svg";
import gitlab from "../assets/skills/gitlab.svg";
import html from "../assets/skills/html.svg";
import vue from "../assets/skills/vue.svg";
import csharp from "../assets/skills/csharp.svg";

export type SkillCategory = "Languages" | "Frameworks" | "Infrastructure";

export interface Skill {
  name: string;
  experience: string;
  img: string;
  category: SkillCategory;
}

export const skills: Skill[] = [
  { name: "JavaScript", experience: "4 years", img: javascript, category: "Languages" },
  { name: "Python", experience: "3 years", img: python, category: "Languages" },
  {
    name: "C#",
    experience: "I haven't worked with this language professionaly :)",
    img: csharp,
    category: "Languages",
  },
  { name: "BASH", experience: "6 years", img: bash, category: "Languages" },
  { name: "HTML", experience: "4 years", img: html, category: "Languages" },
  { name: "React", experience: "2 years", img: reactIcon, category: "Frameworks" },
  { name: "Vue", experience: "2 years", img: vue, category: "Frameworks" },
  { name: "Tailwind", experience: "1 year", img: tailwind, category: "Frameworks" },
  { name: "NodeJS", experience: "2 years", img: node, category: "Frameworks" },
  { name: "express", experience: "2 years", img: express, category: "Frameworks" },
  { name: "Docker", experience: "1 year", img: docker, category: "Infrastructure" },
  { name: "GIT", experience: "3 years", img: git, category: "Infrastructure" },
  { name: "GitLab", experience: "3 years", img: gitlab, category: "Infrastructure" },
  { name: "Linux", experience: "6 years", img: linux, category: "Infrastructure" },
  { name: "Windows Server", experience: "4 years", img: windows, category: "Infrastructure" },
];
