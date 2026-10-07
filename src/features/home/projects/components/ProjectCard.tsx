import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  period: string;
  focus: string;
  image: string;
  liveUrl?: string;
  index: number;
}

export default function ProjectCard({
  title,
  period,
  focus,
  image,
  liveUrl,
  index,
}: ProjectCardProps) {
  return (
    <article
      className={`works-gallery-project works-gallery-project--${
        (index % 4) + 1
      } group min-w-0`}
    >
      {liveUrl ? (
        <Link
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${title} website (opens in a new tab)`}
          className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-[#f2ede6]"
        >
          <ProjectCardContent
            title={title}
            period={period}
            focus={focus}
            image={image}
            index={index}
            interactive
          />
        </Link>
      ) : (
        <ProjectCardContent
          title={title}
          period={period}
          focus={focus}
          image={image}
          index={index}
          interactive={false}
        />
      )}
    </article>
  );
}

function ProjectCardContent({
  title,
  period,
  focus,
  image,
  index,
  interactive,
}: Omit<ProjectCardProps, "liveUrl"> & { interactive: boolean }) {
  return (
    <>
      <figure className="relative m-0 aspect-[16/10] overflow-hidden border border-[#f2ede6]/10 bg-[#11100f] transition-colors duration-300 group-hover:border-[#f2ede6]/36">
        <Image
          src={image}
          alt={`${title} project preview`}
          fill
          sizes="(max-width: 767px) 80vw, (max-width: 1536px) 59vw, 900px"
          className="object-contain p-3 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none md:p-5"
        />
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 font-mono text-[0.62rem] tracking-[0.12em] text-[#f2ede6]/55 md:left-5 md:top-5"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </figure>

      <div className="mt-5 flex items-start justify-between gap-5 md:mt-6">
        <div className="min-w-0">
          <div className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#f2ede6]/48">
            {period}
          </div>
          <h3 className="text-balance text-[clamp(1.05rem,1.8vw,1.55rem)] leading-[1.08] tracking-[-0.035em] text-[#f2ede6] [font-family:var(--font-akira)]">
            {title}
          </h3>
          <p className="mt-3 max-w-[34rem] text-sm leading-6 text-[#f2ede6]/58 md:text-[0.95rem]">
            {focus}
          </p>
        </div>

        {interactive && (
          <span
            aria-hidden="true"
            className="mt-1 grid size-10 shrink-0 place-items-center border border-[#f2ede6]/20 text-[#f2ede6]/68 transition-[border-color,color,transform] duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-[#f2ede6] group-hover:text-[#f2ede6]"
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );
}
