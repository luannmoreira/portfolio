import HonorCard from "./CardExperiencia.js";
import HrCurve from "./HrCurve.js";

export default function Experiencia() {
  return (
    <div id="honors" className="mt-4 text-white">
      <h1 className="text-2xl font-bold">Experiência</h1>
      <p className="font-light text-gray-400">
        Lhes presento a minha experiencia profissional!
      </p>

      <div className="flex flex-col md:flex-row mt-4 gap-5">
        <HonorCard
          name="Front-end Developer Trainee"
          issued="Secretaria de Desenvolvimento Econômico do Estado de Mato Grosso, Cuiabá/MT"
          desc="Desenvolvimento de interfaces para aplicativos governamentais Front‑End
          com HTML, CSS, Electron, Vue.js, Nuxt and APIs RESTful"
          anoEntrada="Jan 2022"
          anoSaida="Dez 2022"
        />
        <HonorCard
          name="Operations Trainee"
          issued="Videplast - Indústria de Embalagens, Várzea Grande/MT"
          desc="Montagem, configuração e manutenção de infraestrutura de redes e
          servidores, virtualização (Hyper‑V), Windows Server e Active Directory, além
          de praticar desenvolvimento front‑end Angular 13."
          anoEntrada="Ago 2020"
          anoSaida="Dez 2021"
        />
      </div>
      <HrCurve />
    </div>
  );
}
