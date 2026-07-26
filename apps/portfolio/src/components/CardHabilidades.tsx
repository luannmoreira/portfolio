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
    <li className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 font-label-mono text-label-mono">
        <img src={img} alt="" aria-hidden="true" className="h-4 w-4" />
        {name}
      </span>
      <span className="rounded bg-surface-container-high px-2 py-1 text-right text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">
        {experience}
      </span>
    </li>
  );
}
