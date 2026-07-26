import Reveal from "./Reveal";

export interface CardCertsProps {
  name: string;
  desc: string;
  img: string;
  issued: string;
  date: string;
  linkCurso: string;
}

export default function CardCerts({
  name,
  desc,
  img,
  issued,
  date,
  linkCurso,
}: CardCertsProps) {
  return (
    <a href={linkCurso} target="_blank" rel="noreferrer">
      <Reveal
        variant="fade-up"
        duration={500}
        offset={100}
        className="hover:bg-dark w-full h-full bg-dark-200 rounded-md py-4 px-4"
      >
        <img
          src={img}
          className="w-full h-56 mx-auto object-cover"
          alt={name}
          loading="lazy"
          decoding="async"
        />
        <div className="mt-2">
          <h1 className="font-bold md:text-xl">{name}</h1>
          <p className="font-light md:text-lg">by {issued}</p>
          <p className="font-light text-gray-400">{desc}</p>
          <p className="font-light text-gray-400">{date}</p>
        </div>
      </Reveal>
    </a>
  );
}
