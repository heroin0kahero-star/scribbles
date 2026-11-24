import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, MapPin, Sparkles } from 'lucide-react';
import { BRAND } from '../data/scribblesData';
import { usePageMeta } from '../hooks/usePageMeta';
import LearningIllustration from '../components/LearningIllustration';
import CTASection from '../components/CTASection';

export default function EarlyLearningPage() {
  usePageMeta({
    title: 'Early Learning (Offline · Lucknow) — Scribbles | Kids Learning',
    description:
      'Supportive in-person Early Learning in Lucknow built on patience, visual curiosity, and gentle foundational development.',
  });

  return (
    <div className="paper-grain pt-28 sm:pt-36">
      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#466B56]">
              Offline Learning · {BRAND.location}
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#26352F] leading-[1.08]">
              A gentle, supportive start for early learners.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5D55]">
              Scribbles offers offline Early Learning in Lucknow—creating a warm, unhurried space
              where young children feel encouraged to notice, wonder, and take small, joyful steps
              at their own natural pace.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#466B56] px-7 py-3.5 text-sm font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors"
              >
                <span>Enquire About Early Learning</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/programmes/tuition"
                className="inline-flex items-center gap-2 rounded-full border border-[#26352F]/20 bg-[#FFF8ED] px-6 py-3.5 text-sm font-semibold text-[#26352F] hover:bg-[#F6ECD9] transition-colors"
              >
                <span>Explore Offline Tuition</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <LearningIllustration variant="early-learning" className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      <section className="border-t border-[#26352F]/10 bg-[#EF9B82]/15 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="font-hand text-2xl text-[#466B56]">{BRAND.subMotto}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
              What guides our Early Learning environment
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 space-y-3">
              <HeartHandshake className="h-6 w-6 text-[#466B56]" aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold text-[#26352F]">
                Patient Encouragement
              </h3>
              <p className="text-base text-[#4B5D55] leading-relaxed">
                Every child arrives with their own rhythm. Early Learning welcomes curiosity gently
                without hurry or comparison.
              </p>
            </div>

            <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 space-y-3">
              <Sparkles className="h-6 w-6 text-[#466B56]" aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold text-[#26352F]">
                Visual &amp; Interactive Discovery
              </h3>
              <p className="text-base text-[#4B5D55] leading-relaxed">
                Ideas are shared through tangible, enjoyable moments rather than monotonous drills,
                making early foundations feel welcoming.
              </p>
            </div>

            <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 space-y-3">
              <MapPin className="h-6 w-6 text-[#466B56]" aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold text-[#26352F]">
                In-Person in Lucknow
              </h3>
              <p className="text-base text-[#4B5D55] leading-relaxed">
                Offered offline in Lucknow. Reach out via Instagram DM at {BRAND.instagramHandle} for
                admissions availability and parent guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Begin with small steps and strong foundations."
        description="Connect with Scribbles via Instagram DM to enquire about offline Early Learning in Lucknow."
      />
    </div>
  );
}
