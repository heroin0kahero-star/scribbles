import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import LearningIllustration from '../components/LearningIllustration';
import CTASection from '../components/CTASection';

const DIALOGUE_PROMPTS = [
  {
    id: 'describe',
    situation: 'Describing a favourite picture',
    scripted: '“This is a dog. The dog is brown.”',
    expressive: '“Look! This playful brown puppy looks ready to chase a ball in the park.”',
    note: 'Encouraging observation and natural vocabulary without rigid scripts.',
  },
  {
    id: 'feelings',
    situation: 'Sharing how a story felt',
    scripted: '“The story was good.”',
    expressive: '“I liked the ending because the character solved the clue all by himself!”',
    note: 'Helping children connect feelings with reasons in everyday English.',
  },
  {
    id: 'curiosity',
    situation: 'Asking questions comfortably',
    scripted: 'Silent hesitation when unsure',
    expressive: '“Why did the author use a quiet clue here? Could it happen next?”',
    note: 'Replacing fear of mistakes with curious, confident conversation.',
  },
];

export default function CommunicationPage() {
  usePageMeta({
    title: 'English Communication — Scribbles | Kids Learning',
    description:
      'Helping children understand English and express their thoughts naturally with confidence through Scribbles’ online Communication programme.',
  });

  const [activePromptIdx, setActivePromptIdx] = useState(0);
  const activePrompt = DIALOGUE_PROMPTS[activePromptIdx];

  return (
    <div className="paper-grain pt-28 sm:pt-36">
      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#466B56]">
              Online Learning · Expressive Confidence
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#26352F] leading-[1.08]">
              Helping children understand—and share their own voice.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5D55]">
              Knowing words on a page is only half the journey. Scribbles’ online English
              Communication sessions focus on helping children listen with understanding and
              express their thoughts naturally, comfortably, and without hesitation.
            </p>
          </div>

          <div className="lg:col-span-5">
            <LearningIllustration variant="speech" className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      {/* Interactive Expressive Dialogue Showcase */}
      <section className="border-y border-[#26352F]/10 bg-[#C5E3EC]/35 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="font-hand text-2xl text-[#466B56]">From Hesitation to Expression</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
              Why gentle conversation changes everything
            </h2>
            <p className="text-base text-[#4B5D55]">
              Select a moment below to compare memorised phrases with confident, child-led
              expression (website illustration).
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Communication scenarios">
            {DIALOGUE_PROMPTS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === activePromptIdx}
                onClick={() => setActivePromptIdx(idx)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold cursor-pointer transition-colors ${
                  idx === activePromptIdx
                    ? 'bg-[#26352F] text-[#FFF8ED]'
                    : 'bg-[#FFF8ED] text-[#26352F] hover:bg-[#F5CB65]/40'
                }`}
              >
                {item.situation}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 sm:p-9 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#4B5D55]">
                Rote / Cautious Habit
              </p>
              <p className="font-display text-2xl text-[#4B5D55] italic">
                {activePrompt.scripted}
              </p>
              <p className="text-sm text-[#4B5D55]">
                Children often hold back when they feel worried about making a mistake or repeating
                a rehearsed line.
              </p>
            </div>

            <div className="rounded-3xl border border-[#466B56]/30 bg-[#FFF8ED] p-7 sm:p-9 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
                  Understanding &amp; Expression
                </p>
                <MessageCircle className="h-5 w-5 text-[#466B56]" aria-hidden="true" />
              </div>
              <p className="font-display text-2xl font-semibold text-[#26352F]">
                {activePrompt.expressive}
              </p>
              <p className="font-hand text-xl text-[#466B56]">{activePrompt.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parent-Friendly Values */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3 border-t border-[#26352F]/15 pt-6">
            <h3 className="font-display text-2xl font-semibold text-[#26352F]">
              Listening comes first
            </h3>
            <p className="text-base text-[#4B5D55] leading-relaxed">
              Before children speak fluently, they need to understand what they hear—connecting tone,
              context, and meaning comfortably.
            </p>
          </div>
          <div className="space-y-3 border-t border-[#26352F]/15 pt-6">
            <h3 className="font-display text-2xl font-semibold text-[#26352F]">
              Safe space to try
            </h3>
            <p className="text-base text-[#4B5D55] leading-relaxed">
              Interactive sessions invite children to speak openly, ask questions, and build ideas
              at their own pace without fear of judgement.
            </p>
          </div>
          <div className="space-y-3 border-t border-[#26352F]/15 pt-6">
            <h3 className="font-display text-2xl font-semibold text-[#26352F]">
              Everyday relevance
            </h3>
            <p className="text-base text-[#4B5D55] leading-relaxed">
              Communication skills carry over into reading stories aloud, classroom participation,
              and sharing thoughts with family and friends.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        headline="Help your child feel at home in English."
        description="Enquire about online English Communication sessions via Instagram DM."
      />
    </div>
  );
}
