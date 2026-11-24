import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Search, Sparkles } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import LearningIllustration from '../components/LearningIllustration';
import ReadingChallenge from '../components/ReadingChallenge';
import CTASection from '../components/CTASection';

export default function ReadingLabPage() {
  usePageMeta({
    title: 'Reading Lab: Reading Detective (Ages 4–7) — Scribbles | Kids Learning',
    description:
      'Explore Scribbles Reading Detective for ages 4–7: three short reading passages, six thinking questions, spotting clues, and understanding beyond the words.',
  });

  return (
    <div className="paper-grain pt-28 sm:pt-36">
      {/* Detective Hero */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#466B56]">
              Featured Learning Activity · Designed for Ages 4–7
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#26352F] leading-[1.08]">
              Scribbles Reading Detective
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#26352F]/90">
              Reading is not simply saying words correctly. Children should understand stories,
              connect clues, and think beyond what is written.
            </p>
            <div className="flex flex-wrap gap-5 pt-2 text-sm font-semibold text-[#4B5D55]">
              <span className="inline-flex items-center gap-2">
                <Search className="h-4 w-4 text-[#466B56]" aria-hidden="true" />
                <span>3 short reading passages</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#466B56]" aria-hidden="true" />
                <span>6 thinking questions</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#466B56]" aria-hidden="true" />
                <span>Easy-to-medium difficulty</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <LearningIllustration variant="detective" className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      {/* Interactive Website Demonstration */}
      <section className="border-y border-[#26352F]/10 bg-[#C5E3EC]/28 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 space-y-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="font-hand text-2xl text-[#466B56]">Interactive Website Demonstration</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
                Put on your detective hat and follow the story clues
              </h2>
              <p className="text-sm sm:text-base text-[#4B5D55]">
                Note: The passages and questions below are original website demonstration samples
                created to illustrate how Reading Detective works—not the official published
                worksheet itself.
              </p>
            </div>
          </div>

          <ReadingChallenge />
        </div>
      </section>

      {/* Practice Sheet Enquiry Callout */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
        <div className="rounded-3xl border border-[#26352F]/12 bg-[#F6ECD9]/65 p-8 sm:p-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
              Reading Detective Practice Sheet · Ages 4–7
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
              Interested in the Scribbles Reading Detective practice sheet?
            </h2>
            <p className="text-base text-[#4B5D55]">
              Write to Scribbles via our enquiry form or Instagram DM to ask about the Reading
              Detective activity for young readers aged 4–7.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#466B56] px-7 py-3.5 text-sm font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors shrink-0 w-fit"
          >
            <span>Enquire About the Practice Sheet</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
