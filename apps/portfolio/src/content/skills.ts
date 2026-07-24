import type { CardHabilidadesProps } from "../components/CardHabilidades";

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

export const skills: CardHabilidadesProps[] = [
  { name: "JavaScript", experience: "4 years", img: javascript },
  { name: "Python", experience: "3 years", img: python },
  {
    name: "C#",
    experience: "I haven't worked with this language professionaly :)",
    img: csharp,
  },
  { name: "Docker", experience: "1 year", img: docker },
  { name: "BASH", experience: "6 years", img: bash },
  { name: "HTML", experience: "4 years", img: html },
  { name: "React", experience: "2 years", img: reactIcon },
  { name: "Vue", experience: "2 years", img: vue },
  { name: "Tailwind", experience: "1 year", img: tailwind },
  { name: "NodeJS", experience: "2 years", img: node },
  { name: "express", experience: "2 years", img: express },
  { name: "GIT", experience: "3 years", img: git },
  { name: "GitLab", experience: "3 years", img: gitlab },
  { name: "Linux", experience: "6 years", img: linux },
  { name: "Windows Server", experience: "4 years", img: windows },
];
