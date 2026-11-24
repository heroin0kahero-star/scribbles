import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LearningCheckpoint } from '../data/scribblesData';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface PathCheckpointProps {
  checkpoint: LearningCheckpoint;
  align?: 'left' | 'right';
}

export default function PathCheckpoint({
  checkpoint,
  align = 'left',
}: PathCheckpointProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tiles = el.querySelectorAll('.checkpoint-tile');
      gsap.fromTo(
        el,
        { opacity: 0.25, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      );
      if (tiles.length > 0) {
        gsap.fromTo(
          tiles,
          { opacity: 0, y: 12, rotate: -4 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col gap-4 rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED]/95 p-7 sm:p-9 max-w-xl ${
        align === 'right' ? 'md:ml-auto' : 'md:mr-auto'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#466B56] tabular-nums">
          {checkpoint.number}. {checkpoint.label}
        </span>
        <span className="font-hand text-xl text-[#4B5D55]">{checkpoint.note}</span>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F] leading-snug">
        “{checkpoint.copy}”
      </h3>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        {checkpoint.letters.map((tile, idx) => (
          <span
            key={tile}
            style={{
              backgroundColor: idx === 0 ? checkpoint.accentColor : '#F6ECD9',
            }}
            className="checkpoint-tile inline-flex min-w-[3rem] items-center justify-center rounded-xl border border-[#26352F]/15 px-3.5 py-2 font-display text-lg font-bold text-[#26352F] transition-transform duration-200 hover:-translate-y-1"
          >
            {tile}
          </span>
        ))}
      </div>
    </div>
  );
}
