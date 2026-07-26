import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import profile from "../assets/frame.webp";
import ArrowRightCircleIcon from "./icons/ArrowRightCircleIcon";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import HrCurve from "./HrCurve";
import Reveal from "./Reveal";
import loading from "../assets/loading.svg";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const profileImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If the browser already has this image cached, it can be "complete" by
    // the time this effect runs — some browsers don't reliably fire onLoad
    // for an already-cached image, which would otherwise leave the overlay
    // stuck. onLoad below still handles the normal, not-yet-cached case.
    if (profileImgRef.current?.complete) {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="fixed bg-dark-500 text-white top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white flex flex-col items-center justify-center">
          <img src={loading} alt="loading" />
          <p>Loading...</p>
        </div>
      ) : null}
      <section className="flex w-full lg:h-screen mt-20 flex-col md:flex-row gap-5 items-center justify-center text-white relative">
        <Reveal
          variant="flip-right"
          duration={1500}
          offset={200}
          className="w-full md:w-3/6"
        >
          <img
            ref={profileImgRef}
            src={profile}
            alt="profile"
            className="top-50"
            width={1000}
            height={568}
            onLoad={() => setIsLoading(false)}
          />
        </Reveal>
        <Reveal
          variant="fade-right"
          duration={1000}
          offset={100}
          className="md:w-3/6"
        >
          <div className="flex flex-col w-full mt-8">
            <h1 className="text-2xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 font-mono">
              Howdy, Partner! I'm called
            </h1>
            <h1 className="text-5xl font-bold">Luann Curioso</h1>
            <p className="text-2xl font-bold text-gray-200">
              And I build for the{" "}
              <span className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-600">
                web
              </span>
            </p>
            <p className="text-lg font-light text-gray-300 ">
              With experience in web development, I started my career at
              technology area just over 3 years ago and since then every day I'm
              more sure I chose right. Today I'm qualified from the
              creation/customization of graphic interfaces using the popular
              technologies on the market to back-end programming + tests.
            </p>
          </div>
          <Link to="/resume" className="mt-2 block">
            Check my resume{" "}
            <ArrowRightCircleIcon className="ml-2 w-4 h-4 inline-block" />{" "}
          </Link>
          <ul className="flex mt-2 gap-3 items-center">
            <li>
              <a
                href="https://github.com/luannmoreira"
                rel="noreferrer"
                target="_blank"
                aria-label="GitHub"
              >
                <GithubIcon className="w-8 h-8" />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/luanncurioso"
                rel="noreferrer"
                target="_blank"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-8 h-8" />
              </a>
            </li>
          </ul>
        </Reveal>
        <HrCurve />
      </section>
    </>
  );
}
