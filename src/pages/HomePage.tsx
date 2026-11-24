import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, Compass, Sparkles, Search, Instagram } from 'lucide-react';
import {
  BRAND,
  LEARNING_CHECKPOINTS,
  PARENT_STORY_THEMES,
  PROGRAMMES,
} from '../data/scribblesData';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReducedMotion } from '../hooks/useReducedMotion';
import ScrollPath from '../components/ScrollPath';
import PathCheckpoint from '../components/PathCheckpoint';
import LearningIllustration from '../components/LearningIllustration';
import ParentStory from '../components/ParentStory';
import CTASection from '../components/CTASection';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  usePageMeta({
    title: 'Scribbles | Kids Learning — Helping Children Master English',
    description:
      'Scribbles | Kids Learning in Lucknow helps children build English confidence through phonics, communication, grammar, early learning, tuition, and Reading Detective.',
  });

  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const heroPathRef = useRef<SVGPathElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [demoWordStep, setDemoWordStep] = useState<'sounds' | 'blend' | 'word'>('sounds');

  useEffect(() => {
    const heroPath = heroPathRef.current;
    if (!heroPath || prefersReducedMotion) return;

    const len = heroPath.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(heroPath, { strokeDasharray: len, strokeDashoffset: len * 0.72 });
      gsap.to(heroPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroPath,
          start: 'top 65%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      });
    }, heroPathRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="paper-grain">
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        {/* Background sweeping learning path */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 420"
          className="pointer-events-none absolute top-24 left-0 w-full h-auto opacity-65"
          fill="none"
        >
          <path
            d="M -40 310 C 260 190, 480 390, 760 220 C 1020 60, 1220 260, 1480 120"
            stroke="#26352F"
            strokeOpacity="0.1"
            strokeWidth="2.5"
            strokeDasharray="8 10"
          />
          <path
            ref={heroPathRef}
            d="M -40 310 C 260 190, 480 390, 760 220 C 1020 60, 1220 260, 1480 120"
            stroke="#466B56"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase text-[#466B56]">
                {BRAND.location} · Online &amp; Offline Learning
              </p>

              <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.75rem)] font-bold leading-[1.06] text-[#26352F]">
                Little minds. Big discoveries.
              </h1>

              <p className="max-w-xl text-lg sm:text-xl leading-relaxed text-[#4B5D55]">
                Helping children build confidence in English through phonics, communication,
                grammar and meaningful learning experiences.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/programmes"
                  className="inline-flex items-center gap-2 rounded-full bg-[#466B56] px-7 py-3.5 text-base font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors"
                >
                  <span>Explore Our Programmes</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#26352F]/25 bg-[#FFF8ED] px-7 py-3.5 text-base font-semibold text-[#26352F] hover:bg-[#F6ECD9] transition-colors"
                >
                  <span>Enquire for Admissions</span>
                </Link>
              </div>

              <p className="font-hand text-2xl text-[#466B56] pt-2">
                “{BRAND.motto}”
              </p>
            </div>

            <div className="lg:col-span-5">
              <LearningIllustration variant="hero" className="mx-auto max-w-md lg:max-w-none" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRODUCTION */}
      <section className="border-t border-[#26352F]/10 bg-[#F6ECD9]/45 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 space-y-3">
              <p className="font-hand text-2xl text-[#466B56]">Welcome to Scribbles</p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#26352F] leading-tight">
                {BRAND.subMotto}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-relaxed text-[#26352F]/90">
              <p>
                Scribbles is an educational initiative based in Lucknow dedicated to{' '}
                <strong className="font-semibold text-[#26352F]">
                  helping children master English
                </strong>{' '}
                with curiosity and genuine understanding.
              </p>
              <p className="text-[#4B5D55]">
                Every child walks a different learning path. Rather than rushing through textbook
                rules or relying on rote memorisation, Scribbles focuses on visual clarity, steady
                encouragement, and building lasting confidence step by step.
              </p>
              <div className="grid gap-4 sm:grid-cols-3 pt-2 border-t border-[#26352F]/10">
                <div>
                  <p className="font-display text-lg font-semibold text-[#26352F]">Interactive</p>
                  <p className="text-sm text-[#4B5D55]">Engaging rather than monotonous</p>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-[#26352F]">Visual</p>
                  <p className="text-sm text-[#4B5D55]">Clear concepts over dry theory</p>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-[#26352F]">Understanding</p>
                  <p className="text-sm text-[#4B5D55]">Confidence over memorisation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR LEARNING JOURNEY (Asymmetric Editorial Composition) */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-10 border-b border-[#26352F]/10">
          <div className="max-w-2xl space-y-2">
            <p className="font-hand text-2xl text-[#466B56]">Our Learning Journey</p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#26352F]">
              Five pathways to English confidence
            </h2>
          </div>
          <Link
            to="/programmes"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#466B56] hover:text-[#26352F] whitespace-nowrap"
          >
            <span>Compare Online &amp; Offline Programmes</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Asymmetric bento-editorial layout (not 5 identical cards) */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Phonics — Featured Wide Banner */}
          <Link
            to={PROGRAMMES[0].slug}
            className="group lg:col-span-7 flex flex-col justify-between rounded-[2rem] border border-[#26352F]/12 bg-[#DDE9D9]/65 p-8 sm:p-10 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-wider uppercase text-[#466B56]">
                01 · Online Learning
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
                Phonics
              </h3>
              <p className="max-w-lg text-base sm:text-lg text-[#26352F]/85 leading-relaxed">
                {PROGRAMMES[0].shortSummary}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-[#26352F]/10 pt-5">
              <span className="font-hand text-2xl text-[#466B56]">c + a + t → cat</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#26352F] group-hover:text-[#466B56]">
                <span>Explore Phonics</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>

          {/* Communication — Tall Sky Column */}
          <Link
            to={PROGRAMMES[1].slug}
            className="group lg:col-span-5 flex flex-col justify-between rounded-[2rem] border border-[#26352F]/12 bg-[#C5E3EC]/55 p-8 sm:p-10 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-wider uppercase text-[#4B5D55]">
                02 · Online Learning
              </span>
              <h3 className="font-display text-3xl font-semibold text-[#26352F]">
                Communication
              </h3>
              <p className="text-base text-[#26352F]/85 leading-relaxed">
                {PROGRAMMES[1].shortSummary}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-[#26352F]/10 pt-5">
              <span className="font-hand text-xl text-[#26352F]">Express with ease</span>
              <ArrowRight className="h-4 w-4 text-[#26352F] transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Link>

          {/* Grammar */}
          <Link
            to={PROGRAMMES[2].slug}
            className="group lg:col-span-4 flex flex-col justify-between rounded-[2rem] border border-[#26352F]/12 bg-[#F5CB65]/30 p-7 sm:p-8 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-[#4B5D55]">
                03 · Online Learning
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
                Grammar
              </h3>
              <p className="text-sm sm:text-base text-[#26352F]/85 leading-relaxed">
                {PROGRAMMES[2].shortSummary}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[#26352F]/10 pt-4">
              <span className="font-hand text-xl text-[#26352F]">sweep → swept</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Link>

          {/* Early Learning */}
          <Link
            to={PROGRAMMES[3].slug}
            className="group lg:col-span-4 flex flex-col justify-between rounded-[2rem] border border-[#26352F]/12 bg-[#EF9B82]/25 p-7 sm:p-8 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-[#4B5D55]">
                04 · Offline Learning · Lucknow
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
                Early Learning
              </h3>
              <p className="text-sm sm:text-base text-[#26352F]/85 leading-relaxed">
                {PROGRAMMES[3].shortSummary}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[#26352F]/10 pt-4">
              <span className="font-hand text-xl text-[#26352F]">Gentle beginnings</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Link>

          {/* Tuition */}
          <Link
            to={PROGRAMMES[4].slug}
            className="group lg:col-span-4 flex flex-col justify-between rounded-[2rem] border border-[#26352F]/12 bg-[#F6ECD9] p-7 sm:p-8 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-[#4B5D55]">
                05 · Offline Learning · Lucknow
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
                Tuition
              </h3>
              <p className="text-sm sm:text-base text-[#26352F]/85 leading-relaxed">
                {PROGRAMMES[4].shortSummary}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[#26352F]/10 pt-4">
              <span className="font-hand text-xl text-[#26352F]">Steady clarity</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION 4 — THE LEARNING PATH (Scroll-controlled SVG + 5 Checkpoints + Interactive Demo) */}
      <section className="border-y border-[#26352F]/10 bg-[#FFF8ED] py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end pb-14">
            <div className="lg:col-span-7 space-y-3">
              <p className="font-hand text-2xl text-[#466B56]">Learn Through Understanding</p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#26352F]">
                Follow the pencil along the learning path
              </h2>
              <p className="max-w-2xl text-base sm:text-lg text-[#4B5D55]">
                Scroll down to trace how sounds become words, words open stories, and stories help
                children express their own ideas.
              </p>
            </div>

            {/* Interactive Sound -> Word mini explorer */}
            <div className="lg:col-span-5 rounded-3xl border border-[#26352F]/12 bg-[#F6ECD9]/75 p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#466B56]">
                  Interactive Sound Demo
                </span>
                <div className="flex gap-1.5" role="group" aria-label="Word building steps">
                  {(['sounds', 'blend', 'word'] as const).map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setDemoWordStep(step)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold capitalize cursor-pointer transition-colors ${
                        demoWordStep === step
                          ? 'bg-[#26352F] text-[#FFF8ED]'
                          : 'bg-[#FFF8ED] text-[#26352F] hover:bg-[#DDE9D9]'
                      }`}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 py-3">
                {demoWordStep === 'sounds' && (
                  <>
                    <span className="rounded-xl border border-[#26352F]/20 bg-[#EF9B82]/55 px-4 py-2 font-display text-2xl font-bold">
                      /k/
                    </span>
                    <span className="text-[#4B5D55]">+</span>
                    <span className="rounded-xl border border-[#26352F]/20 bg-[#F5CB65]/65 px-4 py-2 font-display text-2xl font-bold">
                      /æ/
                    </span>
                    <span className="text-[#4B5D55]">+</span>
                    <span className="rounded-xl border border-[#26352F]/20 bg-[#DDE9D9] px-4 py-2 font-display text-2xl font-bold">
                      /t/
                    </span>
                  </>
                )}
                {demoWordStep === 'blend' && (
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-xl border border-[#26352F]/20 bg-[#EF9B82]/55 px-4 py-2 font-display text-2xl font-bold">
                      C
                    </span>
                    <span className="rounded-xl border border-[#26352F]/20 bg-[#F5CB65]/65 px-4 py-2 font-display text-2xl font-bold">
                      A
                    </span>
                    <span className="rounded-xl border border-[#26352F]/20 bg-[#DDE9D9] px-4 py-2 font-display text-2xl font-bold">
                      T
                    </span>
                  </div>
                )}
                {demoWordStep === 'word' && (
                  <div className="rounded-2xl border border-[#466B56] bg-[#DDE9D9]/80 px-8 py-2.5 font-display text-3xl font-bold tracking-wide text-[#26352F]">
                    CAT
                  </div>
                )}
              </div>
              <p className="text-center text-xs text-[#4B5D55]">
                Tap Sounds, Blend, and Word to watch individual sounds join together.
              </p>
            </div>
          </div>

          {/* Scroll-driven Path Canvas + 5 Checkpoints */}
          <div ref={journeyContainerRef} className="relative py-6">
            <ScrollPath
              triggerRef={journeyContainerRef}
              variant="journey"
              className="absolute inset-y-0 left-0 right-0 z-0"
            />

            <div className="relative z-10 space-y-16 md:space-y-24 pl-14 md:pl-0">
              {LEARNING_CHECKPOINTS.map((checkpoint, idx) => (
                <PathCheckpoint
                  key={checkpoint.number}
                  checkpoint={checkpoint}
                  align={idx % 2 === 0 ? 'left' : 'right'}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FEATURED READING DETECTIVE */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 rounded-[2rem] border border-[#26352F]/12 bg-[#C5E3EC]/40 p-7 sm:p-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#466B56]">
              Featured Learning Activity · Ages 4–7
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#26352F] leading-tight">
              Scribbles Reading Detective
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#26352F]/85">
              Reading is not simply saying words correctly. Children should understand stories,
              connect clues, and think beyond what is written.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-sm text-[#26352F]">
              <div className="flex items-start gap-2.5">
                <BookOpen className="mt-0.5 h-4 w-4 text-[#466B56] shrink-0" aria-hidden="true" />
                <span>Three short reading passages</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Search className="mt-0.5 h-4 w-4 text-[#466B56] shrink-0" aria-hidden="true" />
                <span>Six thinking questions</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Compass className="mt-0.5 h-4 w-4 text-[#466B56] shrink-0" aria-hidden="true" />
                <span>Finding clues &amp; predictions</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles className="mt-0.5 h-4 w-4 text-[#466B56] shrink-0" aria-hidden="true" />
                <span>Easy-to-medium difficulty</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/reading-lab"
                className="inline-flex items-center gap-2 rounded-full bg-[#26352F] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#FFF8ED] hover:bg-[#466B56] transition-colors"
              >
                <span>Try the Interactive Reading Lab</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <LearningIllustration variant="detective" className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      {/* SECTION 6 — LITTLE STEPS, BIG PROGRESS */}
      <section className="border-t border-[#26352F]/10 bg-[#F6ECD9]/45 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="font-hand text-2xl text-[#466B56]">Little Steps, Big Progress</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
                Parent feedback &amp; learning milestones
              </h2>
            </div>
            <Link
              to="/parent-stories"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#466B56] hover:text-[#26352F] whitespace-nowrap"
            >
              <span>View All Parent Stories</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PARENT_STORY_THEMES.map((story, idx) => (
              <ParentStory key={story.id} story={story} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — ONLINE AND OFFLINE LEARNING */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl space-y-3 pb-10">
          <p className="font-hand text-2xl text-[#466B56]">Flexible Formats</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
            Online and offline learning
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#26352F]/12 bg-[#DDE9D9]/50 p-8 sm:p-10 space-y-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#466B56]">
              Online Learning · Anywhere
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
              Phonics, Communication &amp; Grammar
            </h3>
            <p className="text-base leading-relaxed text-[#26352F]/85">
              Interactive online sessions bringing visual explanations, sound-blending practice,
              storytelling dialogue, and engaging grammar concepts directly to your home.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold">
              <Link to="/programmes/phonics" className="ink-underline text-[#466B56]">
                Phonics
              </Link>
              <span aria-hidden="true" className="text-[#4B5D55]">·</span>
              <Link to="/programmes/communication" className="ink-underline text-[#466B56]">
                Communication
              </Link>
              <span aria-hidden="true" className="text-[#4B5D55]">·</span>
              <Link to="/programmes/grammar" className="ink-underline text-[#466B56]">
                Grammar
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[#26352F]/12 bg-[#EF9B82]/22 p-8 sm:p-10 space-y-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#4B5D55]">
              Offline Learning · {BRAND.location}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
              Early Learning &amp; Tuition
            </h3>
            <p className="text-base leading-relaxed text-[#26352F]/85">
              A warm, attentive offline setting in Lucknow offering Early Learning and Tuition
              focused on steady foundations, personal attention, and understanding without stress.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold">
              <Link to="/programmes/early-learning" className="ink-underline text-[#26352F]">
                Early Learning
              </Link>
              <span aria-hidden="true" className="text-[#4B5D55]">·</span>
              <Link to="/programmes/tuition" className="ink-underline text-[#26352F]">
                Tuition
              </Link>
              <span aria-hidden="true" className="text-[#4B5D55]">·</span>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 ink-underline text-[#466B56]"
              >
                <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                <span>DM {BRAND.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <CTASection />
    </div>
  );
}
