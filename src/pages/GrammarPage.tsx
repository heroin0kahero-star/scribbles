import { useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import LearningIllustration from '../components/LearningIllustration';
import CTASection from '../components/CTASection';

const NOUN_ITEMS = [
  { word: 'Teacher', category: 'Person', hint: 'Someone who guides and helps.' },
  { word: 'Lucknow', category: 'Place', hint: 'A city you can visit on a map.' },
  { word: 'Cat', category: 'Animal', hint: 'A living creature with whiskers.' },
  { word: 'Pencil', category: 'Thing', hint: 'An object used for drawing or writing.' },
] as const;

const SILENT_LETTER_WORDS = [
  { word: 'KNIGHT', silent: 'K', spoken: 'Sounds like “nite”' },
  { word: 'WRITE', silent: 'W', spoken: 'Sounds like “rite”' },
  { word: 'LAMB', silent: 'B', spoken: 'Sounds like “lam”' },
  { word: 'ISLAND', silent: 'S', spoken: 'Sounds like “eye-land”' },
];

const PUNCTUATION_ROLES = [
  {
    mark: '.',
    name: 'Full Stop',
    example: 'The cat sat on the mat.',
    role: 'Takes a calm pause when a complete thought finishes.',
  },
  {
    mark: '?',
    name: 'Question Mark',
    example: 'Did you spot the clue?',
    role: 'Raises curiosity when we are asking and wondering.',
  },
  {
    mark: '!',
    name: 'Exclamation Mark',
    example: 'Look at that bright rainbow!',
    role: 'Adds excitement, surprise, or strong feeling.',
  },
];

const SPELLING_FAMILIES = [
  { present: 'sweep', past: 'swept' },
  { present: 'keep', past: 'kept' },
  { present: 'sleep', past: 'slept' },
];

export default function GrammarPage() {
  usePageMeta({
    title: 'English Grammar — Scribbles | Kids Learning',
    description:
      "Grammar doesn't have to be boring. Explore Scribbles' visual approach to nouns, homophones (KNIGHT/NIGHT), silent letters, punctuation, and spelling patterns.",
  });

  const [selectedNounIdx, setSelectedNounIdx] = useState(0);
  const [homophoneChoice, setHomophoneChoice] = useState<'KNIGHT' | 'NIGHT'>('KNIGHT');
  const [silentWordIdx, setSilentWordIdx] = useState(0);
  const [punctIdx, setPunctIdx] = useState(0);
  const [revealedPast, setRevealedPast] = useState<Record<string, boolean>>({ sweep: true });

  const activeNoun = NOUN_ITEMS[selectedNounIdx];
  const activeSilent = SILENT_LETTER_WORDS[silentWordIdx];
  const activePunct = PUNCTUATION_ROLES[punctIdx];

  return (
    <div className="paper-grain pt-28 sm:pt-36">
      {/* Header */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#466B56]">
              Online Learning · Visual Grammar Discovery
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#26352F] leading-[1.08]">
              Grammar doesn&apos;t have to be boring.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5D55]">
              Instead of endless rule charts, Scribbles uses visual scenes, relatable contrasts,
              and playful challenges so children genuinely understand how English words fit together.
            </p>
          </div>

          <div className="lg:col-span-5">
            <LearningIllustration variant="grammar" className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      {/* Understanding beats memorising */}
      <section className="border-y border-[#26352F]/10 bg-[#F5CB65]/22 py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
              Understanding beats memorising.
            </h2>
            <p className="text-base text-[#26352F]/85">
              Try each interactive mini-challenge below to experience how Scribbles brings grammar
              topics to life visually.
            </p>
          </div>
          <p className="font-hand text-2xl text-[#466B56]">Interactive Website Demos</p>
        </div>
      </section>

      {/* 5 Interactive Visual Grammar Challenges */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 space-y-10">
        {/* 1. Naming Words & Nouns */}
        <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 sm:p-10 grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
              01 · Naming Words &amp; Nouns
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
              People, Places, Animals &amp; Things
            </h3>
            <p className="text-base text-[#4B5D55]">
              Tap any word card to see what kind of naming word it represents in the world around
              us.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap gap-3">
              {NOUN_ITEMS.map((item, idx) => (
                <button
                  key={item.word}
                  type="button"
                  onClick={() => setSelectedNounIdx(idx)}
                  className={`rounded-2xl border px-5 py-3 font-display text-xl font-semibold cursor-pointer transition-colors ${
                    idx === selectedNounIdx
                      ? 'border-[#26352F] bg-[#DDE9D9] text-[#26352F]'
                      : 'border-[#26352F]/15 bg-[#F6ECD9]/60 text-[#26352F] hover:bg-[#DDE9D9]/50'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>
            <div className="rounded-2xl bg-[#F6ECD9]/75 p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
                  Category: {activeNoun.category}
                </p>
                <p className="text-base font-medium text-[#26352F]">{activeNoun.hint}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-[#466B56]" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* 2. Homophones: KNIGHT and NIGHT */}
        <div className="rounded-3xl border border-[#26352F]/12 bg-[#C5E3EC]/35 p-7 sm:p-10 grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
              02 · Homophones
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
              KNIGHT and NIGHT
            </h3>
            <p className="text-base text-[#26352F]/85">
              Same spoken sound, completely different story meaning! Toggle between both spellings
              to see why context helps children remember.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex gap-3">
              {(['KNIGHT', 'NIGHT'] as const).map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => setHomophoneChoice(word)}
                  className={`rounded-2xl border px-6 py-3 font-display text-2xl font-bold cursor-pointer transition-colors ${
                    homophoneChoice === word
                      ? 'border-[#26352F] bg-[#26352F] text-[#FFF8ED]'
                      : 'border-[#26352F]/20 bg-[#FFF8ED] text-[#26352F]'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-[#26352F]/12 bg-[#FFF8ED] p-6 space-y-2">
              {homophoneChoice === 'KNIGHT' ? (
                <>
                  <p className="font-display text-xl font-semibold text-[#26352F]">
                    The brave <span className="underline decoration-[#EF9B82] decoration-2">knight</span> rode past the castle.
                  </p>
                  <p className="text-sm text-[#4B5D55]">
                    Starts with a quiet silent <strong>K</strong>—a storybook hero wearing armour.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-xl font-semibold text-[#26352F]">
                    Stars shine brightly in the dark <span className="underline decoration-[#466B56] decoration-2">night</span>.
                  </p>
                  <p className="text-sm text-[#4B5D55]">
                    Means bedtime and moonlight—no silent K at the front.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 3 & 4 Side by Side: Silent Letters + Punctuation */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 3. Silent Letters */}
          <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 sm:p-9 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
              03 · Silent Letters
            </span>
            <h3 className="font-display text-2xl font-semibold text-[#26352F]">
              Spot the quiet letter hiding in plain sight
            </h3>

            <div className="flex flex-wrap gap-2">
              {SILENT_LETTER_WORDS.map((item, idx) => (
                <button
                  key={item.word}
                  type="button"
                  onClick={() => setSilentWordIdx(idx)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold cursor-pointer transition-colors ${
                    idx === silentWordIdx
                      ? 'bg-[#EF9B82] text-[#26352F]'
                      : 'bg-[#F6ECD9] text-[#26352F] hover:bg-[#EF9B82]/40'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-[#F6ECD9]/75 p-5 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {activeSilent.word.split('').map((char, i) => {
                  const isSilent = char === activeSilent.silent && (activeSilent.word !== 'ISLAND' || i === 1);
                  return (
                    <span
                      key={`${activeSilent.word}-${i}`}
                      className={`inline-flex h-11 w-10 items-center justify-center rounded-xl border font-display text-xl font-bold ${
                        isSilent
                          ? 'border-dashed border-[#9A3412] bg-[#EF9B82]/35 text-[#9A3412]'
                          : 'border-[#26352F]/15 bg-[#FFF8ED] text-[#26352F]'
                      }`}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
              <p className="text-sm text-[#4B5D55] pt-2">
                Silent letter: <strong className="text-[#26352F]">{activeSilent.silent}</strong> ·{' '}
                {activeSilent.spoken}
              </p>
            </div>
          </div>

          {/* 4. Punctuation Marks */}
          <div className="rounded-3xl border border-[#26352F]/12 bg-[#DDE9D9]/45 p-7 sm:p-9 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
              04 · Punctuation Marks &amp; Their Roles
            </span>
            <h3 className="font-display text-2xl font-semibold text-[#26352F]">
              How one little mark changes a sentence&apos;s voice
            </h3>

            <div className="flex gap-3">
              {PUNCTUATION_ROLES.map((p, idx) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setPunctIdx(idx)}
                  className={`flex h-12 w-14 items-center justify-center rounded-2xl border font-display text-2xl font-bold cursor-pointer transition-colors ${
                    idx === punctIdx
                      ? 'border-[#26352F] bg-[#26352F] text-[#FFF8ED]'
                      : 'border-[#26352F]/20 bg-[#FFF8ED] text-[#26352F]'
                  }`}
                  aria-label={p.name}
                >
                  {p.mark}
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-[#FFF8ED] p-5 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
                {activePunct.name}
              </p>
              <p className="font-display text-2xl font-semibold text-[#26352F]">
                “{activePunct.example}”
              </p>
              <p className="text-sm text-[#4B5D55]">{activePunct.role}</p>
            </div>
          </div>
        </div>

        {/* 5. Spelling Patterns: sweep -> swept */}
        <div className="rounded-3xl border border-[#26352F]/12 bg-[#F6ECD9]/75 p-7 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
                05 · Spelling Patterns
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
                Spotting pattern families: sweep → swept
              </h3>
              <p className="text-base text-[#4B5D55]">
                Tap each present-tense word to reveal its matching past-tense partner—showing how
                “-eep” words follow a friendly pattern together.
              </p>
            </div>
            <Sparkles className="h-6 w-6 text-[#466B56]" aria-hidden="true" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {SPELLING_FAMILIES.map((pair) => {
              const isRevealed = Boolean(revealedPast[pair.present]);
              return (
                <button
                  key={pair.present}
                  type="button"
                  onClick={() =>
                    setRevealedPast((prev) => ({
                      ...prev,
                      [pair.present]: !prev[pair.present],
                    }))
                  }
                  className="flex items-center justify-between rounded-2xl border border-[#26352F]/15 bg-[#FFF8ED] p-5 text-left cursor-pointer hover:border-[#466B56] transition-colors"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#4B5D55]">Today</p>
                    <p className="font-display text-2xl font-bold text-[#26352F]">
                      {pair.present}
                    </p>
                  </div>
                  <span className="font-hand text-2xl text-[#466B56]">→</span>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#4B5D55]">Yesterday</p>
                    <p className="font-display text-2xl font-bold text-[#466B56]">
                      {isRevealed ? pair.past : '?'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        headline="Turn grammar curiosity into lasting clarity."
        description="Enquire about Scribbles' online English Grammar sessions via Instagram DM."
      />
    </div>
  );
}
