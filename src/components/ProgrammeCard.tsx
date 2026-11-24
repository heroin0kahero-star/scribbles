import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProgrammeInfo } from '../data/scribblesData';

interface ProgrammeCardProps {
  programme: ProgrammeInfo;
  index: number;
}

export default function ProgrammeCard({ programme, index }: ProgrammeCardProps) {
  return (
    <article
      className={`group flex flex-col justify-between rounded-3xl border border-[#26352F]/12 p-7 sm:p-8 transition-transform duration-200 hover:-translate-y-1 ${programme.accentBg}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold text-[#4B5D55]">
          <span className="tabular-nums">0{index + 1} · {programme.format}</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
          {programme.title}
        </h3>

        <p className="text-sm sm:text-base leading-relaxed text-[#26352F]/85">
          {programme.shortSummary}
        </p>

        <ul className="space-y-2 pt-2 text-sm text-[#4B5D55]">
          {programme.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#466B56] shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-6 mt-6 border-t border-[#26352F]/10">
        <Link
          to={programme.slug}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#466B56] group-hover:text-[#26352F] transition-colors"
        >
          <span>Explore {programme.title}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
