import HonorCard from "./CardExperiencia.js";
import HrCurve from "./HrCurve.js";

export default function Experiencia() {
  return (
    <div id="honors" className="mt-4 text-white">
      <h1 className="text-2xl font-bold">Experience</h1>
      <p className="font-light text-gray-400">
      I present to you my professional experience!
      </p>

      <div className="flex flex-col md:flex-row mt-4 gap-5">
        <HonorCard
          name="Front-end Developer"
          issued="ShellHub"
          desc="Improving UI responsiveness, creating and architecting unitary tests using Jest(Vitest) and creating new end-user features using Vue and Vuetify."
          anoEntrada="Mar 2023"
          anoSaida="Present"
        />
        <HonorCard
          name="Front-end Developer"
          issued="OS Systems"
          desc="I am currently undergoing a period of experience in the open-source development team, where I am developing my skills in Vue and TypeScript."
          anoEntrada="Mar 2023"
          anoSaida="Present"
        />
        <HonorCard
          name="Front-end Developer Trainee"
          issued="Department of Economic Development of the State of Mato Grosso, Cuiabá/MT"
          desc="Development of interfaces for Front-End government applications with HTML, CSS,
          Electron, Vue.js, Nuxt and RESTful APIs."
          anoEntrada="Jan 2022"
          anoSaida="Dez 2022"
        />
        <HonorCard
          name="Operations Trainee"
          issued="Videplast - Plastic Factory, Várzea Grande/MT"
          desc="Assembly, configuration and maintenance of network and server infrastructure, virtualization
          (Hyper-V), Windows Server and Active Directory, in addition to practicing front-end development
          Angular 13."
          anoEntrada="Ago 2020"
          anoSaida="Dez 2021"
        />
      </div>
      <HrCurve />
    </div>
  );
}
