import HrCurve from "./HrCurve";

const today = new Date();
const year = today.getFullYear();
export default function Footer() {
  return (
    <div className="mt-4 bg-dark-200 rounded-md text-white px-8 py-4">
      <ul className="text-center">
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
      </ul>

      <HrCurve />

      <p className="text-sm font-light text-center">
        Copyright © <span>{year}</span> Luann Curioso. Todos os direitos
        reservados
      </p>
    </div>
  );
}
