import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
  return (
    <div
      id="contact"
      className="flex w-full h-screen flex-col md:flex-column gap-5 items-center align-center justify-center text-white relative"
    >
      <div className="flex flex-col align-center justify-center items-center w-full pl-5 pr-5">
        <h1 className="text-3xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 font-mono">
          Gostou?
        </h1>
        <h1 className="text-5xl font-bold">Entre em contato!</h1>
        <p className="text-xl text-justify font-light text-gray-300 pt-2 sm:w-3/6">
          Atualmente estou procurando por novas oportunidades de emprego e
          gostaria de explorar possíveis vagas em sua empresa. Se houver alguma
          vaga que se alinhe com minhas habilidades e experiência, adoraria
          discutir mais sobre isso. Alternativamente, se você gostaria apenas de
          se conectar ou tiver alguma pergunta para mim, sinta-se à vontade para
          me enviar uma mensagem. Estou sempre ansioso para expandir minha rede
          profissional e retornarei o mais breve possível!
        </p>
      </div>
      <a
        href="mailto:luannmcurioso@gmail.com"
        className="bg-dark-100 rounded-full px-5 py-2 border border-dark-100 hover:border-dark-50 font-bold font-mono border border-4"
      >
        Mande um alô!{" "}
        <FontAwesomeIcon className="ml-2" icon={faCircleArrowRight} />{" "}
      </a>
      <p className="text-md font-light text-gray-300">Ou, se preferir, visite minhas redes sociais ou me mande uma mensagem via WhatsApp!</p>
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
        <li>
          <a
            href="https://wa.me/5565999722455?text=Ol%C3%A1%2C%20Luann!"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon size="2xl" icon={faWhatsapp} />
          </a>
        </li>
      </ul>
    </div>
  );
}
