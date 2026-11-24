import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { BRAND } from '../data/scribblesData';

interface CTASectionProps {
  headline?: string;
  description?: string;
  primaryLabel?: string;
  primaryTo?: string;
}

export default function CTASection({
  headline = "Let's make learning a little more wonderful.",
  description = 'Whether you are exploring online Phonics, Communication, and Grammar or offline Early Learning and Tuition in Lucknow, Scribbles welcomes your enquiry.',
  primaryLabel = 'Enquire for Admissions',
  primaryTo = '/contact',
}: CTASectionProps) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#26352F]/12 bg-[#DDE9D9]/65 px-7 py-12 sm:px-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className="font-hand text-2xl text-[#466B56]">{BRAND.subMotto}</p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#26352F] leading-tight">
              {headline}
            </h2>
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#26352F]/85">
              {description}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
            <Link
              to={primaryTo}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#466B56] px-7 py-3.5 text-base font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors"
            >
              <span>{primaryLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#26352F]/20 bg-[#FFF8ED] px-6 py-3 text-sm font-semibold text-[#26352F] hover:bg-[#F6ECD9] transition-colors"
            >
              <Instagram className="h-4 w-4 text-[#466B56]" aria-hidden="true" />
              <span>DM {BRAND.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
