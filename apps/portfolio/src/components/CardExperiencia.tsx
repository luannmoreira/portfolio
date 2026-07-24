interface CardExperienciaProps {
  name: string;
  issued: string;
  desc: string;
  anoEntrada: string;
  anoSaida: string;
}

export default function CardExperiencia({
  name,
  issued,
  desc,
  anoEntrada,
  anoSaida,
}: CardExperienciaProps) {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-offset="100"
      className="md:w-2/6 bg-dark-100 rounded-md py-4 px-4"
    >
      <div className="mt-2">
        <h1 className="font-bold md:text-xl">{name}</h1>
        <p className="font-light md:text-lg">Company {issued}</p>
        <p className="font-light text-gray-300 md:text-md">
          ({anoEntrada} till {anoSaida})
        </p>
        <p className="font-light text-gray-400">{desc}</p>
      </div>
    </div>
  );
}
