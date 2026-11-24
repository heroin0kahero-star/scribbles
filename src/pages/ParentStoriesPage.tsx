import { ArrowUpRight, Instagram } from 'lucide-react';
import { BRAND, PARENT_STORY_THEMES } from '../data/scribblesData';
import { usePageMeta } from '../hooks/usePageMeta';
import ParentStory from '../components/ParentStory';
import CTASection from '../components/CTASection';

export default function ParentStoriesPage() {
  usePageMeta({
    title: 'Parent Stories & Learning Progress — Scribbles | Kids Learning',
    description:
      'Verified parent feedback themes and early reading stories from Scribbles (@scribbles.lucknow) celebrating confidence and independent learning.',
  });

  return (
    <div className="paper-grain pt-28 sm:pt-36">
      <section className="mx-auto max-w-[1280px] px-5 pb-14 sm:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="font-hand text-2xl text-[#466B56]">Parent Stories &amp; Feedback</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#26352F] leading-[1.08]">
            Small steps. Real confidence.
          </h1>
          <p className="text-lg leading-relaxed text-[#4B5D55]">
            Scribbles shares parent reflections on online classes and young learners&apos; reading
            milestones directly on Instagram. To honour authenticity, every story below reflects
            published themes from{' '}
            <span className="font-semibold text-[#26352F]">{BRAND.instagramHandle}</span> and
            links straight to the original community profile.
          </p>
        </div>
      </section>

      {/* Curated Instagram-Linked Feedback Cards */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {PARENT_STORY_THEMES.map((story, idx) => (
            <ParentStory key={story.id} story={story} index={idx} />
          ))}
        </div>
      </section>

      {/* Original Instagram Feedback Notice */}
      <section className="border-t border-[#26352F]/10 bg-[#F6ECD9]/45 py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-8 sm:p-12 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
                Original Instagram Feedback Archive
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
                See original parent testimonials &amp; early reading reels on Instagram
              </h2>
              <p className="text-base leading-relaxed text-[#4B5D55]">
                In keeping with child privacy and factual accuracy, Scribbles does not display
                invented quotes or unverified student photographs here. Visit{' '}
                <strong>{BRAND.instagramHandle}</strong> to view shared parent feedback posts on
                confidence, concept understanding, and early reading journeys.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#26352F] px-6 py-3.5 text-sm font-semibold text-[#FFF8ED] hover:bg-[#466B56] transition-colors"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span>Visit {BRAND.instagramHandle}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
