import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { PHONICS_WORDS } from '../data/scribblesData';
import { usePageMeta } from '../hooks/usePageMeta';
import CTASection from '../components/CTASection';

const PHONICS_STAGES = [
  {
    step: '01',
    title: 'Letter Sounds',
    desc: 'Meeting each letter by the sound it makes rather than just reciting letter names.',
  },
  {
    step: '02',
    title: 'Sound Recognition',
    desc: 'Hearing and spotting individual sounds at the start, middle, and end of everyday words.',
  },
  {
    step: '03',
    title: 'Blending',
    desc: 'Gently sliding separate letter sounds together so they join into a spoken word.',
  },
  {
    step: '04',
    title: 'Word Reading',
    desc: 'Decoding new words independently using sound skills instead of guessing or memorising.',
  },
  {
    step: '05',
    title: 'Reading Confidence',
    desc: 'Feeling proud and curious when opening books and discovering familiar patterns.',
  },
];

export default function PhonicsPage() {
  usePageMeta({
    title: 'Phonics & Early Reading — Scribbles | Kids Learning',
    description:
      'Every great reader starts with a little sound. Explore Scribbles’ online Phonics approach from letter sounds and blending to confident word reading.',
  });

  const [selectedWordIdx, setSelectedWordIdx] = useState(0);
  const [revealedCount, setRevealedCount] = useState(1);
  const [blended, setBlended] = useState(false);

  const currentWord = PHONICS_WORDS[selectedWordIdx];

  const handleSelectWord = (idx: number) => {
    setSelectedWordIdx(idx);
    setRevealedCount(1);
    setBlended(false);
  };

  const handleTapTile = (tileIdx: number) => {
    if (tileIdx + 1 > revealedCount) {
      setRevealedCount(tileIdx + 1);
    }
  };

  const handleBlend = () => {
    setRevealedCount(currentWord.sounds.length);
    setBlended(true);
  };

  return (
    <div className="paper-grain pt-28 sm:pt-36">
      {/* Header */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs font-bold tracking-wider uppercase text-[#466B56]">
            Online Learning · Foundational Reading
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#26352F] leading-[1.08]">
            Every great reader starts with a little sound.
          </h1>
          <p className="text-lg leading-relaxed text-[#4B5D55]">
            Scribbles Phonics focuses on building strong foundations instead of relying on rote
            memorisation—helping children recognise sounds, connect them with letters, blend words,
            and decode unfamiliar words with calm confidence.
          </p>
        </div>
      </section>

      {/* Interactive Sound-to-Word Visual Journey */}
      <section className="border-y border-[#26352F]/10 bg-[#DDE9D9]/45 py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="font-hand text-2xl text-[#466B56]">Interactive Sound-to-Word Explorer</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
                Tap each letter tile, then blend the word
              </h2>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a sample word">
              {PHONICS_WORDS.map((item, idx) => (
                <button
                  key={item.word}
                  type="button"
                  role="tab"
                  aria-selected={idx === selectedWordIdx}
                  onClick={() => handleSelectWord(idx)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold cursor-pointer transition-colors ${
                    idx === selectedWordIdx
                      ? 'bg-[#26352F] text-[#FFF8ED]'
                      : 'bg-[#FFF8ED] text-[#26352F] hover:bg-[#F5CB65]/40'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-center rounded-[2rem] border border-[#26352F]/12 bg-[#FFF8ED] p-7 sm:p-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {currentWord.sounds.map((tile, idx) => {
                  const isActive = idx < revealedCount;
                  return (
                    <button
                      key={`${currentWord.word}-${tile.letter}-${idx}`}
                      type="button"
                      onClick={() => handleTapTile(idx)}
                      style={{
                        backgroundColor: isActive ? tile.color : '#F6ECD9',
                      }}
                      className={`group flex flex-col items-center justify-center rounded-2xl border-2 border-[#26352F]/20 p-5 sm:p-7 transition-all duration-200 cursor-pointer hover:-translate-y-1 ${
                        isActive ? 'opacity-100' : 'opacity-70'
                      }`}
                    >
                      <span className="font-display text-4xl sm:text-5xl font-bold text-[#26352F]">
                        {tile.letter}
                      </span>
                      <span className="mt-2 text-xs sm:text-sm font-semibold text-[#26352F]/85 text-center">
                        {isActive ? tile.soundCue : 'Tap to reveal sound'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleBlend}
                  className="inline-flex items-center gap-2 rounded-full bg-[#466B56] px-6 py-3 text-sm font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>Blend Sounds Together</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectWord(selectedWordIdx)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4B5D55] hover:text-[#26352F] cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  <span>Reset Tiles</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-[#26352F]/12 bg-[#F6ECD9]/75 p-7 text-center space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
                {blended ? 'Word Decoded' : 'Sound by Sound'}
              </p>
              <div className="font-display text-5xl sm:text-6xl font-bold tracking-wider text-[#26352F]">
                {blended
                  ? currentWord.word
                  : currentWord.sounds
                      .slice(0, revealedCount)
                      .map((s) => s.letter)
                      .join(' · ')}
              </div>
              <p className="text-base text-[#26352F]/85">
                {blended
                  ? currentWord.meaningHint
                  : 'Hear each sound first, then blend them smoothly into a whole word.'}
              </p>
              <p className="font-hand text-xl text-[#466B56] pt-1">{currentWord.spotlightNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Stage Visual Learning Journey */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24 space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="font-hand text-2xl text-[#466B56]">Step-by-Step Foundation</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
            From Letter Sounds to Reading Confidence
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-5">
          {PHONICS_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="flex flex-col justify-between rounded-2xl border border-[#26352F]/12 bg-[#FFF8ED] p-6 space-y-4"
            >
              <span className="font-sans text-xs font-bold tracking-wider uppercase text-[#466B56] tabular-nums">
                Step {stage.step}
              </span>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-semibold text-[#26352F]">
                  {stage.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5D55]">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Real Instagram Progression Context (with honest pacing disclaimer) */}
        <div className="rounded-3xl border border-[#26352F]/12 bg-[#F6ECD9]/60 p-7 sm:p-10 grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
              Early Reading Example · Scribbles Instagram
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
              Seeing sounds click into words like CAT and DOG
            </h3>
            <p className="text-base leading-relaxed text-[#26352F]/85">
              One documented learning example on Scribbles’ Instagram highlights a three-year-old
              child progressing from recognising individual letter sounds to reading simple words
              such as <strong>CAT</strong> and <strong>DOG</strong>. Because every child learns at
              their own pace, this milestone is shared as an inspiring glimpse of sound-first
              learning rather than a guaranteed timeline for every student.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/parent-stories"
              className="inline-flex items-center gap-2 rounded-full border border-[#26352F]/20 bg-[#FFF8ED] px-6 py-3 text-sm font-semibold text-[#26352F] hover:bg-[#DDE9D9] transition-colors"
            >
              <span>See Parent Stories</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to explore Phonics for your child?"
        description="Send an enquiry to connect with Scribbles on Instagram DMs and discuss your child’s reading stage."
      />
    </div>
  );
}
