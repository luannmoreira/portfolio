import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SkillCard from "./CardHabilidades.js";

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
import HrCurve from "./HrCurve.js";
import csharp from "../assets/skills/csharp.svg"

export default function Habilidades() {
  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div id="skills" className="mt-4 text-white">
      <h1 className="text-2xl font-bold">Skills</h1>
      <p className="font-light text-gray-400">
        Here are some of my tech skills!
      </p>

      <div className="mt-4">
        <Slider {...settings}>
          <SkillCard name="JavaScript" experience="4 years" img={javascript} />
          <SkillCard name="Python" experience="3 years" img={python} />
          <SkillCard name="C#" experience="I haven't worked with this language professionaly :)" img={csharp} />
          <SkillCard name="Docker" experience="1 year" img={docker} />
          <SkillCard name="BASH" experience="6 years" img={bash} />
          <SkillCard name="HTML" experience="4 years" img={html} />
          <SkillCard name="React" experience="2 years" img={reactIcon} />
          <SkillCard name="Vue" experience="2 years" img={vue} />
          <SkillCard name="Tailwind" experience="1 year" img={tailwind} />
          <SkillCard name="NodeJS" experience="2 years" img={node} />
          <SkillCard name="express" experience="2 years" img={express} />
          <SkillCard name="GIT" experience="3 years" img={git} />
          <SkillCard name="GitLab" experience="3 years" img={gitlab} />
          <SkillCard name="Linux" experience="6 years" img={linux} />
          <SkillCard name="Windows Server" experience="4 years" img={windows} />
        </Slider>
      </div>
      <HrCurve />
    </div>
  );
}
