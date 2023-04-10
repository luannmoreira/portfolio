import CertCard from "./CardCerts.js";
import matangular from "../assets/certs/matangular.jpg";
import serfrontend from "../assets/certs/serfrontend.jpg";
import serfrontend2 from "../assets/certs/serfrontend2.jpg";
import harvardcs from "../assets/certs/harvardcs50.png";
import nuxttailwind from "../assets/certs/nuxttailwind.jpg";
import javascriptbible from "../assets/certs/javascriptbible.jpg";
import matreact from "../assets/certs/matreact.jpg";
import csharpcurso from "../assets/certs/csharpcurso.jpg";
import pythoncurso from "../assets/certs/pythoncurso.jpeg";
import HrCurve from "./HrCurve.js";

// import

export default function Certs() {
  return (
    <div id="certs" className="mt-4 text-white">
      <h1 className="text-2xl font-bold">Courses</h1>
      <p className="font-light text-gray-400">
        I've done them and I'll always recomend!
      </p>

      {/* <div className="flex flex-col md:flex-row flex-wrap mt-4 gap-5"> */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center mt-4 gap-5">
        <CertCard
          name="Harvard CS50"
          desc="Estrutura de dados;
Encapsulamento;
Algoritmos;
Segurança da Informação;
Contato com linguagens de programação (C, Python, SQL)"
          img={harvardcs}
          issued="freeCodeCamp.org"
          date="Set 2022"
          linkCurso="https://www.freecodecamp.org/news/harvard-cs50/"
        />
        <CertCard
          name="Lógica de Programação com Javascript"
          desc="Conceitos em lógica de programação;
          Estrutura de dados;"
          img={serfrontend}
          issued="UDEMY"
          date="Mar 2022"
          linkCurso="https://www.udemy.com/course/logica-de-programacao-com-javascript-iniciando-no-frontend/"
        />
        <CertCard
          name="Curso de Javascript Completo do iniciante ao mestre"
          desc="Introdução a lógica de programação;
          Conceitos de programação orientada a objetos;
          Javascript;"
          img={serfrontend2}
          issued="UDEMY"
          date="Set 2022"
          linkCurso="https://www.udemy.com/course/javascript-completo-2018-do-iniciante-ao-mestre/"
        />
        <CertCard
          name="Nuxt.js e TailwindCSS para turbinar a criação de front-end"
          desc="Nuxt.js
          TailwindCSS
          API, tags de SEO, componentes e mais."
          img={nuxttailwind}
          issued="UDEMY"
          date="Jul 2022"
          linkCurso="https://www.udemy.com/course/nuxtjs-e-tailwindcss-para-turbinar-a-criacao-de-front-end/"
        />
        <CertCard
          name="Curso Matheus Battisti Angular 13"
          desc="Angular 13
          Projeto em prática
          Criação de telas
          Estrutura do Angular (CLI, Two-Way Data Binding, TypeScript)"
          img={matangular}
          issued="Matheus Battisti (YouTube)"
          date="Jul 2022"
          linkCurso="https://youtu.be/vJt_K1bFUeA"
        />
        <CertCard
          name="The Javascript Bible"
          desc="AJAX;
          JQUERY;
          JSON;
          AngularJS;
          Fetch API;"
          img={javascriptbible}
          issued="UDEMY"
          date="Oct 2022"
          linkCurso="https://www.udemy.com/course/javascript-bible/"
        />
        <CertCard
          name="Curso Matheus Battisti React"
          desc="JSX
          React Framework
          Criação de telas
          Consumindo API
          Projeto em prática"
          img={matreact}
          issued="Matheus Battisti (YouTube)"
          date="Dez 2022"
          linkCurso="https://youtu.be/FXqX7oof0I4"
        />
        <CertCard
          name="C# Curso Completo: Do Básico ao Avançado!"
          desc="Algoritmo, Estrutura de Dados, Fundamentos, OO, Coleções, Lambdas, LINQ e vários recursos!"
          img={csharpcurso}
          issued="UDEMY"
          date="Jul 2022"
          linkCurso="https://www.udemy.com/share/101qHe3@41XpvOjvHsARpPXPCHZWlvoeXFziz1d6Q4TupP_63TgapO9ACIrVlAX334PeAIOC/"
        />
        <CertCard
          name="Free Python Programming Course [2022]"
          desc="Variables
          Expressions and Statements
          Comments
          Data Types
          Operators e muito mais sobre a linguagem!"
          img={pythoncurso}
          issued="freeCodeCamp.org"
          date="Ago 2022"
          linkCurso="https://www.freecodecamp.org/news/python-programming-course/"
        />
      </div>
      <HrCurve />
    </div>
  );
}
