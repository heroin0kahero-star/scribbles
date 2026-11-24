import { ArrowUpRight, Instagram, Laptop, MapPin } from 'lucide-react';
import { BRAND } from '../data/scribblesData';
import { usePageMeta } from '../hooks/usePageMeta';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  usePageMeta({
    title: 'Contact & Admissions — Scribbles | Kids Learning',
    description:
      'Enquire for Scribbles admissions in Lucknow (offline Early Learning and Tuition) or online (Phonics, Communication, Grammar) via Instagram DM.',
  });

  return (
    <div className="paper-grain pt-28 sm:pt-36 pb-20">
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="font-hand text-2xl text-[#466B56]">Contact &amp; Admissions</p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#26352F] leading-[1.08]">
                Start your child&apos;s Scribbles journey.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#4B5D55]">
                Admissions enquiries are received directly through Instagram DMs. Use the enquiry
                helper to prepare your message, or message Scribbles straight on Instagram.
              </p>
            </div>

            <div className="space-y-4 rounded-3xl border border-[#26352F]/12 bg-[#F6ECD9]/60 p-7">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-[#466B56] shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-[#26352F]">Location</p>
                  <p className="text-sm text-[#4B5D55]">{BRAND.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Laptop className="mt-1 h-5 w-5 text-[#466B56] shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-[#26352F]">Learning Formats Available</p>
                  <p className="text-sm text-[#4B5D55]">
                    Online Learning: Phonics, Communication, Grammar
                  </p>
                  <p className="text-sm text-[#4B5D55]">
                    Offline Learning (Lucknow): Early Learning, Tuition
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#26352F]/10">
                <Instagram className="mt-1 h-5 w-5 text-[#466B56] shrink-0" aria-hidden="true" />
                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#26352F]">Direct Admissions Channel</p>
                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#26352F] px-5 py-2.5 text-sm font-semibold text-[#FFF8ED] hover:bg-[#466B56] transition-colors"
                  >
                    <span>Message {BRAND.instagramHandle} on Instagram</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
