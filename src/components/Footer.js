import hr from '../assets/curve-hr.svg'

export default function Footer(){
  return (
    <div className="mt-4 bg-dark-200 rounded-md text-white px-8 py-4">
      <ul className="text-center">
        <li><a href="#home" className="hover:underline">Sobre</a></li>
        <li><a href="#skills" className="hover:underline">Habilidades</a></li>
        <li><a href="#honors" className="hover:underline">Experiência</a></li>
        <li><a href="#certs" className="hover:underline">Certificações</a></li>
      </ul>

      <img src={hr} className="mb-4 mt-4 w-full md:h-1 text-white bottom-0" alt="hr" />

      <p className="text-sm font-light text-center">Copyright © 2023 Damasukma Trihanandi. All Right Reserved</p>

    </div>
  )
}
