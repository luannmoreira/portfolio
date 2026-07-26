import { Link } from "react-router";
import HrCurve from "./HrCurve";

const today = new Date();
const year = today.getFullYear();
export default function Footer() {
  return (
    <footer className="mt-4 bg-dark-200 light:bg-light-200 rounded-md text-white light:text-dark-500 text-lg py-4 mt-10 sm:mt-0 print:hidden">
      <ul className="text-center font-bold pt-5 m-2 ">
        <li>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link to="/projects" className="hover:underline">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/uses" className="hover:underline">
            Uses
          </Link>
        </li>
        <li>
          <Link to="/now" className="hover:underline">
            Now
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
      </ul>

      <HrCurve />
      <p className="text-sm font-light text-center">
        Copyright © <span>{year}</span> Luann Curioso. All Rights Reserved.
      </p>
    </footer>
  );
}
