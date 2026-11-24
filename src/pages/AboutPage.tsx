import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '../data/scribblesData';
import { usePageMeta } from '../hooks/usePageMeta';
import ScrollPath from '../components/ScrollPath';
import LearningIllustration from '../components/LearningIllustration';
import CTASection from '../components/CTASection';

const PHILOSOPHY_CHAPTERS = [
  {
    num: '01',
    title: 'Why understanding matters',
    body: 'Children can sometimes memorise a rule or repeat a spelling list and still feel unsure when they meet a new word or sentence. Scribbles begins with why language works—helping learners connect sounds, meanings, and patterns so understanding stays with them.',
    note: 'Understanding outlasts memorisation.',
  },
  {
    num: '02',
    title: 'Learning through visual examples',
    body: 'Abstract explanations rarely invite young minds in. Using visual comparisons, story clues, letter tiles, and playful illustrations turns grammar and reading into ideas children can actually picture and enjoy.',
    note: 'See the pattern, feel the meaning.',
  },
  {
    num: '03',
    title: 'The importance of patience',
    body: 'Every child has their own rhythm. Some lean into sounds quickly while others take time observing before speaking out loud. Scribbles protects an unhurried space where curiosity is never rushed.',
    note: 'Small steps. Strong foundations.',
  },
  {
    num: '04',
    title: 'Developing confidence, not mark-anxiety',
    body: 'True mastery is not measured solely by tests. When a learner feels comfortable asking questions, decoding an unfamiliar word, or expressing a thought in English, confidence grows naturally.',
    note: 'Learn. Understand. Express.',
  },
  {
    num: '05',
    title: 'Individual learning journeys',
    body: 'No two children arrive with the same interests or pace. Whether online in Phonics, Communication, and Grammar or offline in Lucknow for Early Learning and Tuition, every step meets the child where they are.',
    note: 'Beautiful beginnings.',
  },
];

export default function AboutPage() {
  usePageMeta({
    title: 'About Scribbles | Our Philosophy — Scribbles | Kids Learning',
    description:
      'Discover Scribbles in Lucknow: our understanding-first English teaching philosophy built on patience, visual clarity, and individual confidence.',
  });

  const routeContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="paper-grain pt-28 sm:pt-36">
      {/* Editorial Intro */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="font-hand text-2xl text-[#466B56]">About Scribbles</p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#26352F] leading-[1.08]">
              Helping children master English with patience and wonder.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5D55]">
              Based in {BRAND.location}, Scribbles is an educational initiative focused on making
              English reading, communication, and grammar clear, interactive, and encouraging—never
              intimidating.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/programmes"
                className="inline-flex items-center gap-2 rounded-full bg-[#466B56] px-6 py-3 text-sm font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors"
              >
                <span>Explore Programmes</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/parent-stories"
                className="inline-flex items-center gap-2 rounded-full border border-[#26352F]/20 bg-[#FFF8ED] px-6 py-3 text-sm font-semibold text-[#26352F] hover:bg-[#F6ECD9] transition-colors"
              >
                <span>Read Parent Stories</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <LearningIllustration variant="open-book" className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      {/* Long-form Editorial Story + Vertical Animated SVG Route */}
      <section className="border-t border-[#26352F]/10 bg-[#F6ECD9]/40 py-16 sm:py-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div ref={routeContainerRef} className="relative grid gap-10 md:grid-cols-12">
            {/* Vertical animated SVG path column */}
            <div className="hidden md:block md:col-span-3 relative">
              <ScrollPath
                triggerRef={routeContainerRef}
                variant="vertical"
                className="sticky top-28 h-[520px] w-full"
              />
            </div>

            {/* Mobile simplified path */}
            <ScrollPath
              triggerRef={routeContainerRef}
              variant="vertical"
              className="md:hidden absolute inset-y-0 left-0 w-14"
            />

            {/* Editorial Chapters */}
            <div className="md:col-span-9 space-y-12 pl-12 md:pl-0">
              {PHILOSOPHY_CHAPTERS.map((chapter) => (
                <article
                  key={chapter.num}
                  className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 sm:p-10 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase text-[#466B56] tabular-nums">
                      Chapter {chapter.num}
                    </span>
                    <span className="font-hand text-xl text-[#4B5D55]">{chapter.note}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
                    {chapter.title}
                  </h2>
                  <p className="max-w-prose text-base sm:text-lg leading-relaxed text-[#26352F]/85">
                    {chapter.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Every child deserves a calm beginning."
        description="Explore our online and offline learning programmes or write to us directly via Instagram DM."
      />
    </div>
  );
}
