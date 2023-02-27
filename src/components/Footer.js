import HrCurve from "./HrCurve";

const today = new Date();
const year = today.getFullYear();
export default function Footer() {
  return (
    <div className="mt-4 bg-dark-200 rounded-md text-white text-lg px-52 py-4">
      <ul className="text-center font-bold pt-5 m-2 ">
        <li>
          <a href="#home" className="hover:underline">
            Sobre
          </a>
        </li>
        <li>
          <a href="#skills" className="hover:underline">
            Habilidades
          </a>
        </li>
        <li>
          <a href="#honors" className="hover:underline">
            Experiência
          </a>
        </li>
        <li>
          <a href="#certs" className="hover:underline">
            Certificações
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:underline">
            Contato
          </a>
        </li>
      </ul>

      <HrCurve />
      <a href="tel:65999722455">
        <p className="text-sm font-bold text-center py-1">
          +55 (65) 99972-2455
        </p>
      </a>
      <p className="text-sm font-light text-center">
        Copyright © <span>{year}</span> Luann Curioso. Todos os direitos
        reservados
      </p>
    </div>
  );
}
