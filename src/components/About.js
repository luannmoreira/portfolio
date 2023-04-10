import profile from "../assets/profilepic.jpg";
import HrCurve from "./HrCurve";

export default function About() {
  return (
    <div
      id="home"
      className="flex w-full lg:h-screen flex-col md:flex-row gap-5 items-center justify-center text-white relative"
    >
      <div
        className="md:w-3/6"
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-offset="100"
      >
        <div className="flex flex-col w-full">
          <h1 className="text-3xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 font-mono">
            About me
          </h1>
          <p className="text-lg font-light text-gray-300">
          Hello! My name is Luann and I'm a developer passionate about
            programming, especially interfaces, UI/UX and CI/CD. Furthermore,
            I'm a big fan of cooking and I love to try new recipes in
            my free time. My tech journey started in 2019 when
            I started to venture into the development of web interfaces.
            Since then, I have worked in different technology companies,
            including the Secretariat for Economic Development of Mato Grosso,
            always looking to improve my skills in programming and
            improve my experience in interfaces. I am currently
            specialist in TypeScript, JavaScript, Vue, React and Node.js and
            I also have knowledge in Python and C#. I'm always looking for
            new challenges and technologies to learn and implement in my
            projects. I love building products that help people and make
            their lives easier and more enjoyable. When I'm not coding,
            I like to spend my time trying out new cooking recipes and
            learning more about different techniques and ingredients. In addition
            In addition, I am a great admirer of dogs and whenever I can,
            I like to walk and play with them. I'm excited to continue
            my journey in technology and contribute to amazing projects and
            innovators in the future.
          </p>
        </div>
      </div>
      <div className="w-100 md:w-1/5">
        <img src={profile} alt="profile" className="top-50 rounded" />
      </div>
      <HrCurve />
    </div>
  );
}
