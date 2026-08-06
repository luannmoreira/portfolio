export interface ExperienceCardProps {
  name: string;
  issued: string;
  desc: string;
  startDate: string;
  endDate: string;
}

export default function ExperienceCard({
  name,
  issued,
  desc,
  startDate,
  endDate,
}: ExperienceCardProps) {
  return (
    <li className="border-l-2 border-outline-variant/30 pl-6 light:border-outline-variant/70">
      <p className="font-label-mono text-label-mono text-secondary">
        {startDate} — {endDate}
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
