import { Link } from "react-router";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed z-50 bg-dark-500 light:bg-light-500 w-full top-0 left-0 px-8 py-4 lg:px-20 xl:px-36 print:hidden">
      <div className="flex justify-between items-center text-white light:text-dark-500">
        <Link to="/">
          <img
            src={logo}
            className="App-logo w-12 rounded-full"
            alt="logo"
            width={503}
            height={414}
          />
        </Link>
        <ul className="hidden md:flex">
          <li className="p-4 font-mono text-white light:text-dark-500 hover:text-blue light:hover:text-teal-700">
            01. <Link to="/about">About</Link>
          </li>
          <li className="p-4 font-mono text-white light:text-dark-500 hover:text-blue light:hover:text-teal-700">
            02. <Link to="/projects">Projects</Link>
          </li>
          <li className="p-4 font-mono text-white light:text-dark-500 hover:text-blue light:hover:text-teal-700">
            03. <Link to="/uses">Uses</Link>
          </li>
          <li className="p-4 font-mono text-white light:text-dark-500 hover:text-blue light:hover:text-teal-700">
            04. <Link to="/now">Now</Link>
          </li>
          <li className="p-4 font-mono text-white light:text-dark-500 hover:text-blue light:hover:text-teal-700">
            05. <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/resume"
            className="bg-dark-100 light:bg-light-100 rounded-full px-5 py-2 border border-dark-100 light:border-light-100 hover:border-dark-50 light:hover:border-light-50 font-bold font-mono border border-4"
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  );
}
