import { Link } from "react-router";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="fixed z-50 bg-dark-500 w-full top-0 left-0 px-8 py-4 lg:px-20 xl:px-36 print:hidden">
      <div className="flex justify-between items-center text-white">
        <Link to="/">
          <img src={logo} className="App-logo w-12 rounded-full" alt="logo" />
        </Link>
        <ul className="hidden md:flex">
          <li className="p-4 font-mono text-white hover:text-blue">
            01. <Link to="/about">About</Link>
          </li>
          <li className="p-4 font-mono text-white hover:text-blue">
            02. <Link to="/projects">Projects</Link>
          </li>
          <li className="p-4 font-mono text-white hover:text-blue">
            03. <Link to="/uses">Uses</Link>
          </li>
          <li className="p-4 font-mono text-white hover:text-blue">
            04. <Link to="/now">Now</Link>
          </li>
          <li className="p-4 font-mono text-white hover:text-blue">
            05. <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <Link
          to="/resume"
          className="bg-dark-100 rounded-full px-5 py-2 border border-dark-100 hover:border-dark-50 font-bold font-mono border border-4"
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}
