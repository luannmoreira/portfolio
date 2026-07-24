import { useState } from "react";

import profile from "../assets/frame.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import HrCurve from "./HrCurve";
import resume from "../assets/resume.pdf";
import loading from "../assets/loading.svg";

export default function Hero() {
  const [loaded, setLoaded] = useState(true);

  return (
    <>
      {loaded ? (
        <div className="fixed bg-dark-500 text-white top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white flex flex-col items-center justify-center">
          <img src={loading} alt="loading" />
          <p>Loading...</p>
        </div>
      ) : null}
      <div
        id="home"
        className="flex w-full lg:h-screen mt-20 flex-col md:flex-row gap-5 items-center justify-center text-white relative"
      >
        <div className="w-100 md:w-3/6">
          <img
            data-aos="flip-right"
            data-aos-duration="1500"
            data-aos-offset="200"
            src={profile}
            alt="profile"
            className="top-50"
            onLoad={() => setLoaded(false)}
          />
        </div>
        <div
          className="md:w-3/6"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-offset="100"
        >
          <div className="flex flex-col w-full mt-8">
            <h1 className="text-2xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 font-mono">Howdy, Partner! I'm called</h1>
            <h1 className="text-5xl font-bold">Luann Curioso</h1>
            <p class="text-2xl font-bold text-gray-200">
              And I build for the{" "}
              <span class="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-600">
                web
              </span>
            </p>
            <p className="text-lg font-light text-gray-300 ">
            With experience in web development, I started my career at
              technology area just over 3 years ago and since then every
              day I'm more sure I chose right. Today I'm qualified
              from the creation/customization of graphic interfaces using the
              popular technologies on the market to back-end programming
              + tests.
            </p>
          </div>
          <a href={resume} target="_blank" rel="noreferrer" className="mt-2 block">
            Check my resume{" "}
            <FontAwesomeIcon className="ml-2" icon={faCircleArrowRight} />{" "}
          </a>
          <ul className="flex mt-2 gap-3 items-center">
            <li>
              <a
                href="https://github.com/luannmoreira"
                rel="noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon size="2xl" icon={faGithub} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/luanncurioso"
                rel="noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon size="2xl" icon={faLinkedinIn} />
              </a>
            </li>
          </ul>
        </div>
        <HrCurve />
      </div>
    </>
  );
}
