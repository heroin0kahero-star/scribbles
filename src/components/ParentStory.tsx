import { ArrowUpRight, Instagram } from 'lucide-react';
import { ParentStoryTheme } from '../data/scribblesData';

interface ParentStoryProps {
  story: ParentStoryTheme;
  index: number;
}

export default function ParentStory({ story, index }: ParentStoryProps) {
  return (
    <article
      className={`flex flex-col justify-between rounded-3xl border border-[#26352F]/12 p-7 sm:p-9 ${story.accentBg}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold tracking-wide text-[#4B5D55]">
          <span className="tabular-nums">0{index + 1} · {story.label}</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
          {story.title}
        </h3>

        <p className="text-base leading-relaxed text-[#26352F]/90">{story.summary}</p>

        <p className="font-hand text-xl text-[#466B56] leading-snug pt-1">
          {story.observation}
        </p>
      </div>

      <div className="mt-7 pt-5 border-t border-[#26352F]/10">
        <a
          href={story.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#26352F] hover:text-[#466B56] transition-colors"
        >
          <Instagram className="h-4 w-4 text-[#466B56] shrink-0" aria-hidden="true" />
          <span>{story.sourceLabel}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
