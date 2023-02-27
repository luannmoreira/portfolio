import { useState } from "react";

import profile from "../assets/profile.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import HrCurve from "./HrCurve";
import resume from "../assets/resume.pdf";
import loading from "../assets/loading.svg";
export default function Hiro() {
  const [loaded, setLoaded] = useState(true);

  return (
    <>
      {loaded ? (
        <div className="fixed bg-dark-500 text-white top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white flex flex-col items-center justify-center">
          <img src={loading} alt="loading" />
          <p>Carregando...</p>
        </div>
      ) : null}
      <div
        id="home"
        className="flex w-full lg:h-screen mt-20 flex-col md:flex-row gap-5 items-center justify-center text-white relative"
      >
        <div className="w-3/6 h-3/6 min-h-full">
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
            <h1 className="text-2xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 font-mono">Olá! Eu me chamo</h1>
            <h1 className="text-5xl font-bold">Luann Curioso</h1>
            <p class="text-2xl font-bold text-gray-200">
              E eu construo coisas para a{" "}
              <span class="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-600">
                web
              </span>
            </p>
            <p className="text-lg font-light text-gray-300 ">
              Com experiência em desenvolvimento web, iniciei minha carreira na
              área de tecnologia há pouco mais de 3 anos e desde então a cada
              dia tenho mais certeza que escolhi certo. Hoje estou capacitado
              desde a criação/customização de interfaces gráficas utilizando as
              tecnologias mais conhecidas no mercado até programação de back-end
              + testes.
            </p>
          </div>
          <a href={resume} className="mt-2 block">
            Cheque meu currículo{" "}
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
