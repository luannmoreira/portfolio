import ArrowRightCircleIcon from "./icons/ArrowRightCircleIcon";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import WhatsappIcon from "./icons/WhatsappIcon";

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex w-full h-screen flex-col md:flex-column gap-5 items-center align-center justify-center text-white light:text-dark-500 relative"
    >
      <div className="flex flex-col align-center justify-center items-center w-full pl-5 pr-5">
        <h1 className="text-3xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 font-mono">
          Did you like this website?
        </h1>
        <h1 className="text-5xl font-bold">Be in touch!</h1>
        <p className="text-xl text-justify font-light text-gray-300 light:text-gray-600 pt-2 sm:w-3/6">
          I'm not looking for a job right now, but I am always listening new
          people and I love to make contact and network, so feel free to check
          my stuff out or be in touch, I'm sure there's always something new I'm
          working torwards!
        </p>
      </div>
      <a
        href="mailto:luannmcurioso@gmail.com"
        className="bg-dark-100 light:bg-light-100 rounded-full px-5 py-2 border border-dark-100 light:border-light-100 hover:border-dark-50 light:hover:border-light-50 font-bold font-mono border border-4"
      >
        Send a hey!{" "}
        <ArrowRightCircleIcon className="ml-2 w-4 h-4 inline-block" />{" "}
      </a>
      <p className="text-md font-light text-gray-300 light:text-gray-600 text-center">
        Or, rather, visit my social medias or send me a WhatsApp message!
      </p>
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
        <li>
          <a
            href="https://wa.me/5565999722455?text=Ol%C3%A1%2C%20Luann!"
            rel="noreferrer"
            target="_blank"
            aria-label="WhatsApp"
          >
            <WhatsappIcon className="w-8 h-8" />
          </a>
        </li>
      </ul>
    </section>
  );
}
