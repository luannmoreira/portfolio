import CertCard from "./CardCerts";
import HrCurve from "./HrCurve";
import { certs } from "../content/certs";

export default function Certs() {
  return (
    <section id="certs" className="mt-4 text-white light:text-dark-500">
      <h1 className="text-2xl font-bold">Courses</h1>
      <p className="font-light text-gray-400 light:text-gray-600">
        I've done them and I'll always recomend!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 justify-center mt-4 gap-5">
        {certs.map((cert) => (
          <CertCard key={cert.linkCurso} {...cert} />
        ))}
      </div>
      <HrCurve />
    </section>
  );
}
