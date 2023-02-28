import profile from "../assets/profilepic.jpg";
import HrCurve from "./HrCurve";

export default function About() {
  return (
    <div
      id="home"
      className="flex w-full lg:h-screen flex-col md:flex-row gap-5 items-center justify-center text-white relative"
    >
      <div
        className="md:w-3/6"
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-offset="100"
      >
        <div className="flex flex-col w-full">
          <h1 className="text-3xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 font-mono">
            Sobre mim
          </h1>
          <p className="text-lg font-light text-gray-300">
            Olá! Meu nome é Luann e sou um desenvolvedor apaixonado por
            programação, especialmente interfaces, UI/UX e CI/CD. Além disso,
            sou um grande fã de culinária e adoro experimentar novas receitas em
            meu tempo livre. Minha jornada na tecnologia começou em 2019, quando
            comecei a me aventurar no desenvolvimento de interfaces para web.
            Desde então, já trabalhei em diferentes empresas de tecnologia,
            incluindo a Secretaria de Desenvolvimento Econômico de Mato Grosso,
            sempre buscando evoluir minhas habilidades em programação e
            aprimorar minha experiência em interfaces. Atualmente, sou
            especialista em TypeScript, JavaScript, Vue, React e Node.js e
            também tenho conhecimentos em Python e C#. Sempre estou em busca de
            novos desafios e tecnologias para aprender e implementar em meus
            projetos. Adoro construir produtos que ajudam as pessoas e tornam
            suas vidas mais fáceis e agradáveis. Quando não estou codificando,
            gosto de passar meu tempo experimentando novas receitas culinárias e
            aprendendo mais sobre técnicas e ingredientes diferentes. Além
            disso, sou um grande admirador de cachorros e sempre que posso,
            gosto de passear e brincar com eles. Estou animado para continuar
            minha jornada na tecnologia e contribuir para projetos incríveis e
            inovadores no futuro.
          </p>
        </div>
      </div>
      <div className="w-100 md:w-1/5">
        <img src={profile} alt="profile" className="top-50 rounded" />
      </div>
      <HrCurve />
    </div>
  );
}
