import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Instagram } from 'lucide-react';
import {
  BRAND,
  JOURNAL_CATEGORIES,
  JOURNAL_ENTRIES,
  JournalCategory,
} from '../data/scribblesData';
import { usePageMeta } from '../hooks/usePageMeta';
import CTASection from '../components/CTASection';

export default function LearningJournalPage() {
  usePageMeta({
    title: 'Learning Journal — Scribbles | Kids Learning',
    description:
      'Editorial notes and activity ideas from Scribbles on Reading Tips, Phonics, Grammar, Communication, and Learning Through Play.',
  });

  const [activeCategory, setActiveCategory] = useState<JournalCategory>('All');

  const visibleEntries =
    activeCategory === 'All'
      ? JOURNAL_ENTRIES
      : JOURNAL_ENTRIES.filter((entry) => entry.category === activeCategory);

  return (
    <div className="paper-grain pt-28 sm:pt-36">
      <section className="mx-auto max-w-[1280px] px-5 pb-12 sm:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="font-hand text-2xl text-[#466B56]">Learning Journal</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#26352F] leading-[1.08]">
            Notes on reading, language, and joyful discovery.
          </h1>
          <p className="text-lg leading-relaxed text-[#4B5D55]">
            A creative editorial space sharing educational perspectives inspired by Scribbles&apos;
            learning posts on{' '}
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#466B56] underline decoration-[#466B56]/40 underline-offset-4"
            >
              {BRAND.instagramHandle}
            </a>
            .
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="mt-10 flex flex-wrap gap-2 border-b border-[#26352F]/10 pb-6"
          role="tablist"
          aria-label="Journal categories"
        >
          {JOURNAL_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(category)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-[#26352F] text-[#FFF8ED]'
                    : 'bg-[#F6ECD9] text-[#26352F] hover:bg-[#DDE9D9]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Editorial Magazine Grid */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleEntries.map((entry, idx) => (
            <article
              key={entry.id}
              className={`flex flex-col justify-between rounded-3xl border border-[#26352F]/12 p-7 sm:p-8 ${
                idx === 0 && activeCategory === 'All' ? 'md:col-span-2' : ''
              } ${entry.accentBg}`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#4B5D55]">
                  <span>{entry.issueNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#466B56]">{entry.category}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
                  {entry.title}
                </h2>

                <p className="text-base leading-relaxed text-[#26352F]/85">{entry.excerpt}</p>

                <p className="font-hand text-xl text-[#466B56]">
                  Home tip: {entry.takeaway}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[#26352F]/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to={entry.relatedRoute}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#26352F] hover:text-[#466B56]"
                >
                  <span>Explore Related Lab</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#4B5D55] hover:text-[#26352F]"
                >
                  <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{BRAND.instagramHandle}</span>
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
