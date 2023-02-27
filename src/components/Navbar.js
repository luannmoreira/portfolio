import logo from "../assets/logo.png";
import resume from "../assets/resume.pdf";

export default function Navbar() {
  return (
    <div className="fixed z-50 bg-dark-500 w-full top-0 left-0 px-8 py-4 lg:px-20 xl:px-36">
      <div className="flex justify-between items-center text-white">
        <img src={logo} className="App-logo w-12 rounded-full" alt="logo" />
        <ul className="hidden md:flex">
          <li className="p-4 font-mono text-white hover:text-blue">
            01. <a href="#home">Sobre</a>
          </li>
          <li className="p-4 font-mono text-white hover:text-blue">
            02. <a href="#skills">Habilidades</a>
          </li>
          <li className="p-4 font-mono text-white hover:text-blue">
            03. <a href="#honors">Experiência</a>
          </li>
          <li className="p-4 font-mono text-white hover:text-blue">
            04. <a href="#certs">Cursos/Certificados</a>
          </li>
          <li className="p-4 font-mono text-white hover:text-blue">
            05. <a href="#contact">Contato</a>
          </li>
        </ul>
        <a
          href={resume}
          rel="noreferrer"
          target="_blank"
          className="bg-dark-100 rounded-full px-5 py-2 border border-dark-100 hover:border-dark-50 font-bold font-mono border border-4"
        >
          Curriculo
        </a>
      </div>
    </div>
  );
}
