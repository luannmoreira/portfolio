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
    <a
      href={linkCurso}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col justify-between border border-outline-variant/30 bg-surface-container-lowest p-gutter transition-all hover:shadow-[0px_4px_20px_rgba(15,23,42,0.05)]"
    >
      <div>
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-container">
          <img
            src={img}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 rounded object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3 className="mb-2 font-headline-md text-headline-md">{name}</h3>
        <p className="mb-4 font-caption text-caption text-secondary">
          {issued} • {date}
        </p>
        <p className="whitespace-pre-line font-body-md text-body-md text-on-surface-variant">
          {desc}
        </p>
      </div>
    </a>
  );
}
