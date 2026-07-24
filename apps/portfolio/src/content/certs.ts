import type { CardCertsProps } from "../components/CardCerts";

import matangular from "../assets/certs/matangular.jpg";
import serfrontend from "../assets/certs/serfrontend.jpg";
import serfrontend2 from "../assets/certs/serfrontend2.jpg";
import harvardcs from "../assets/certs/harvardcs50.png";
import nuxttailwind from "../assets/certs/nuxttailwind.jpg";
import javascriptbible from "../assets/certs/javascriptbible.jpg";
import matreact from "../assets/certs/matreact.jpg";
import csharpcurso from "../assets/certs/csharpcurso.jpg";
import pythoncurso from "../assets/certs/pythoncurso.jpeg";

export const certs: CardCertsProps[] = [
  {
    name: "Harvard CS50",
    desc: "Estrutura de dados;\nEncapsulamento;\nAlgoritmos;\nSegurança da Informação;\nContato com linguagens de programação (C, Python, SQL)",
    img: harvardcs,
    issued: "freeCodeCamp.org",
    date: "Set 2022",
    linkCurso: "https://www.freecodecamp.org/news/harvard-cs50/",
  },
  {
    name: "Lógica de Programação com Javascript",
    desc: "Conceitos em lógica de programação;\n          Estrutura de dados;",
    img: serfrontend,
    issued: "UDEMY",
    date: "Mar 2022",
    linkCurso:
      "https://www.udemy.com/course/logica-de-programacao-com-javascript-iniciando-no-frontend/",
  },
  {
    name: "Curso de Javascript Completo do iniciante ao mestre",
    desc: "Introdução a lógica de programação;\n          Conceitos de programação orientada a objetos;\n          Javascript;",
    img: serfrontend2,
    issued: "UDEMY",
    date: "Set 2022",
    linkCurso:
      "https://www.udemy.com/course/javascript-completo-2018-do-iniciante-ao-mestre/",
  },
  {
    name: "Nuxt.js e TailwindCSS para turbinar a criação de front-end",
    desc: "Nuxt.js\n          TailwindCSS\n          API, tags de SEO, componentes e mais.",
    img: nuxttailwind,
    issued: "UDEMY",
    date: "Jul 2022",
    linkCurso:
      "https://www.udemy.com/course/nuxtjs-e-tailwindcss-para-turbinar-a-criacao-de-front-end/",
  },
  {
    name: "Curso Matheus Battisti Angular 13",
    desc: "Angular 13\n          Projeto em prática\n          Criação de telas\n          Estrutura do Angular (CLI, Two-Way Data Binding, TypeScript)",
    img: matangular,
    issued: "Matheus Battisti (YouTube)",
    date: "Jul 2022",
    linkCurso: "https://youtu.be/vJt_K1bFUeA",
  },
  {
    name: "The Javascript Bible",
    desc: "AJAX;\n          JQUERY;\n          JSON;\n          AngularJS;\n          Fetch API;",
    img: javascriptbible,
    issued: "UDEMY",
    date: "Oct 2022",
    linkCurso: "https://www.udemy.com/course/javascript-bible/",
  },
  {
    name: "Curso Matheus Battisti React",
    desc: "JSX\n          React Framework\n          Criação de telas\n          Consumindo API\n          Projeto em prática",
    img: matreact,
    issued: "Matheus Battisti (YouTube)",
    date: "Dez 2022",
    linkCurso: "https://youtu.be/FXqX7oof0I4",
  },
  {
    name: "C# Curso Completo: Do Básico ao Avançado!",
    desc: "Algoritmo, Estrutura de Dados, Fundamentos, OO, Coleções, Lambdas, LINQ e vários recursos!",
    img: csharpcurso,
    issued: "UDEMY",
    date: "Jul 2022",
    linkCurso:
      "https://www.udemy.com/share/101qHe3@41XpvOjvHsARpPXPCHZWlvoeXFziz1d6Q4TupP_63TgapO9ACIrVlAX334PeAIOC/",
  },
  {
    name: "Free Python Programming Course [2022]",
    desc: "Variables\n          Expressions and Statements\n          Comments\n          Data Types\n          Operators e muito mais sobre a linguagem!",
    img: pythoncurso,
    issued: "freeCodeCamp.org",
    date: "Ago 2022",
    linkCurso:
      "https://www.freecodecamp.org/news/python-programming-course/",
  },
];
