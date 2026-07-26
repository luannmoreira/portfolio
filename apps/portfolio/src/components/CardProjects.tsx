import Reveal from "./Reveal";

export interface CardProjectsProps {
  name: string;
  description: string;
  tech: string[];
  link?: string;
}

export default function CardProjects({
  name,
  description,
  tech,
  link,
}: CardProjectsProps) {
  const card = (
    <Reveal
      variant="fade-up"
      duration={500}
      offset={100}
      className="hover:bg-dark h-full w-full rounded-md bg-dark-200 light:bg-light-200 px-4 py-4"
    >
      <h1 className="font-bold md:text-xl">{name}</h1>
      <p className="mt-2 font-light text-gray-400 light:text-gray-600">
        {description}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs">
        {tech.map((item) => (
          <li
            key={item}
            className="rounded-full bg-dark-100 light:bg-light-100 px-2 py-1"
          >
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );

  if (!link) {
    return card;
  }

  return (
    <a href={link} target="_blank" rel="noreferrer">
      {card}
    </a>
  );
}
