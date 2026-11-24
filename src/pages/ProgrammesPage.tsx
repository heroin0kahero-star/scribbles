import { Link } from 'react-router-dom';
import { ArrowRight, Laptop, MapPin } from 'lucide-react';
import { BRAND } from '../data/scribblesData';
import { usePageMeta } from '../hooks/usePageMeta';
import ProgrammeSection from '../components/ProgrammeSection';
import CTASection from '../components/CTASection';

export default function ProgrammesPage() {
  usePageMeta({
    title: 'Programmes Overview — Scribbles | Kids Learning',
    description:
      'Explore Scribbles Online Learning (Phonics, Communication, Grammar) and Offline Learning in Lucknow (Early Learning, Tuition).',
  });

  return (
    <div className="paper-grain pt-28 sm:pt-36">
      <section className="mx-auto max-w-[1280px] px-5 pb-14 sm:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="font-hand text-2xl text-[#466B56]">Our Programmes</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#26352F] leading-[1.08]">
            Thoughtful pathways for reading, speaking, and writing.
          </h1>
          <p className="text-lg leading-relaxed text-[#4B5D55]">
            Scribbles offers interactive online learning across Phonics, Communication, and Grammar,
            alongside supportive offline Early Learning and Tuition in {BRAND.location}.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-sm font-semibold text-[#26352F]">
            <a
              href="#online-learning"
              className="inline-flex items-center gap-2 rounded-full border border-[#26352F]/15 bg-[#DDE9D9]/60 px-5 py-2.5 hover:bg-[#DDE9D9] transition-colors"
            >
              <Laptop className="h-4 w-4 text-[#466B56]" aria-hidden="true" />
              <span>Online Learning (3 Programmes)</span>
            </a>
            <a
              href="#offline-learning"
              className="inline-flex items-center gap-2 rounded-full border border-[#26352F]/15 bg-[#EF9B82]/25 px-5 py-2.5 hover:bg-[#EF9B82]/40 transition-colors"
            >
              <MapPin className="h-4 w-4 text-[#26352F]" aria-hidden="true" />
              <span>Offline Learning · Lucknow (2 Programmes)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Online Learning */}
      <section id="online-learning" className="border-t border-[#26352F]/10 bg-[#F6ECD9]/35 py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <ProgrammeSection
            format="Online Learning"
            title="Online Learning"
            subtitle="Designed to keep young learners active, curious, and involved through visual examples and supportive guidance."
          />
        </div>
      </section>

      {/* Offline Learning */}
      <section id="offline-learning" className="border-t border-[#26352F]/10 py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <ProgrammeSection
            format="Offline Learning"
            title={`Offline Learning · ${BRAND.location}`}
            subtitle="In-person guidance built around unhurried attention, encouraging feedback, and strong foundations."
          />
        </div>
      </section>

      {/* Reading Detective Link Banner */}
      <section className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-[#26352F]/12 bg-[#C5E3EC]/45 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
              Featured Activity · Ages 4–7
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
              Looking for Scribbles Reading Detective?
            </h2>
            <p className="text-base text-[#26352F]/85">
              Try our interactive Reading Lab demonstration to see how three short passages and six
              thinking questions build deeper story comprehension.
            </p>
          </div>
          <Link
            to="/reading-lab"
            className="inline-flex items-center gap-2 rounded-full bg-[#26352F] px-6 py-3 text-sm font-semibold text-[#FFF8ED] hover:bg-[#466B56] transition-colors shrink-0 w-fit"
          >
            <span>Visit Reading Lab</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
