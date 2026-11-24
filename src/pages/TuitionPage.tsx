import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Lightbulb, MapPin } from 'lucide-react';
import { BRAND } from '../data/scribblesData';
import { usePageMeta } from '../hooks/usePageMeta';
import LearningIllustration from '../components/LearningIllustration';
import CTASection from '../components/CTASection';

export default function TuitionPage() {
  usePageMeta({
    title: 'Offline Tuition (Lucknow) — Scribbles | Kids Learning',
    description:
      'Supportive offline tuition in Lucknow focused on genuine understanding, steady confidence, and independent learning habits.',
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
              Supportive offline tuition rooted in clarity.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5D55]">
              Alongside online programmes, Scribbles offers offline Tuition in Lucknow—guiding
              children toward deeper understanding, steadier study confidence, and greater
              independence.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#466B56] px-7 py-3.5 text-sm font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors"
              >
                <span>Enquire for Tuition Admissions</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-[#26352F]/20 bg-[#FFF8ED] px-6 py-3.5 text-sm font-semibold text-[#26352F] hover:bg-[#F6ECD9] transition-colors"
              >
                <span>Our Teaching Philosophy</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <LearningIllustration variant="tuition" className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      <section className="border-t border-[#26352F]/10 bg-[#F6ECD9]/45 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="font-hand text-2xl text-[#466B56]">How We Approach Tuition</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
              Understanding first, confidence always
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 space-y-3">
              <Lightbulb className="h-6 w-6 text-[#466B56]" aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold text-[#26352F]">
                Beyond Rote Memorisation
              </h3>
              <p className="text-base text-[#4B5D55] leading-relaxed">
                Rather than repeating answers without context, learners explore why concepts work so
                knowledge sticks naturally.
              </p>
            </div>

            <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 space-y-3">
              <Compass className="h-6 w-6 text-[#466B56]" aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold text-[#26352F]">
                Becoming Independent Learners
              </h3>
              <p className="text-base text-[#4B5D55] leading-relaxed">
                Step-by-step guidance encourages children to think through questions thoughtfully
                and take pride in their own progress.
              </p>
            </div>

            <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 space-y-3">
              <MapPin className="h-6 w-6 text-[#466B56]" aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold text-[#26352F]">
                Admissions via Instagram DM
              </h3>
              <p className="text-base text-[#4B5D55] leading-relaxed">
                Tuition availability in Lucknow is shared directly with parents through enquiries at{' '}
                <span className="font-semibold text-[#26352F]">{BRAND.instagramHandle}</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Discuss offline tuition in Lucknow."
        description="Prepare an enquiry message or write directly to @scribbles.lucknow on Instagram to learn more."
      />
    </div>
  );
}
