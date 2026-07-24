import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SkillCard from "./CardHabilidades";
import HrCurve from "./HrCurve";
import { skills } from "../content/skills";

export default function Habilidades() {
  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <section id="skills" className="mt-4 text-white">
      <h1 className="text-2xl font-bold">Skills</h1>
      <p className="font-light text-gray-400">
        Here are some of my tech skills!
      </p>

      <div className="mt-4">
        <Slider {...settings}>
          {skills.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </Slider>
      </div>
      <HrCurve />
    </section>
  );
}
