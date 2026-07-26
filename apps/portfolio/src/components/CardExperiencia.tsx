export interface CardExperienciaProps {
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
    <li className="border-l-2 border-outline-variant/30 pl-6">
      <p className="font-label-mono text-label-mono text-secondary">
        {anoEntrada} — {anoSaida}
      </p>
      <h3 className="font-headline-md text-headline-md">{name}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant">
        {issued}
      </p>
      <p className="mt-2 font-body-md text-body-md leading-relaxed text-on-surface-variant">
        {desc}
      </p>
    </li>
  );
}
