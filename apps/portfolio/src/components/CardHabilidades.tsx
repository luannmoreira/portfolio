import Reveal from "./Reveal";

export interface CardHabilidadesProps {
  name: string;
  experience: string;
  img: string;
}

export default function CardHabilidades({
  name,
  experience,
  img,
}: CardHabilidadesProps) {
  return (
    <Reveal
      variant="fade-up"
      duration={500}
      offset={100}
      className="w-full p-4 text-center justify-center border-2 border-gray-900 light:border-gray-300 bg-dark-200 light:bg-light-200 rounded-md flex flex-col h-48"
    >
      <img
        src={img}
        className="w-20 max-h-20 mx-auto"
        alt={name}
        loading="lazy"
        decoding="async"
      />
      <div className="mt-2">
        <h1 className="font-bold md:text-xl">{name}</h1>
        <p className="font-light md:text-lg">{experience} of experience</p>
      </div>
    </Reveal>
  );
}
