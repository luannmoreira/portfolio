import HrCurve from "./HrCurve";

const today = new Date();
const year = today.getFullYear();
export default function Footer() {
  return (
    <div className="mt-4 bg-dark-200 rounded-md text-white text-lg py-4 mt-10 sm:mt-0">
      <ul className="text-center font-bold pt-5 m-2 ">
        <li>
          <a href="#home" className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="#skills" className="hover:underline">
            Skills
          </a>
        </li>
        <li>
          <a href="#honors" className="hover:underline">
            Experience
          </a>
        </li>
        <li>
          <a href="#certs" className="hover:underline">
            Certifications
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>

      <HrCurve />
      <p className="text-sm font-light text-center">
        Copyright © <span>{year}</span> Luann Curioso. All Rights Reserved.
      </p>
    </div>
  );
}
