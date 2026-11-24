import { useEffect, useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export type IllustrationVariant =
  | 'hero'
  | 'open-book'
  | 'sound-tiles'
  | 'detective'
  | 'speech'
  | 'grammar'
  | 'early-learning'
  | 'tuition';

interface LearningIllustrationProps {
  variant: IllustrationVariant;
  className?: string;
}

export default function LearningIllustration({
  variant,
  className = '',
}: LearningIllustrationProps) {
  const uid = useId().replace(/:/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const maskShape = el.querySelector('.organic-mask-shape');
      if (maskShape) {
        gsap.fromTo(
          maskShape,
          { scale: 0.72, transformOrigin: 'center center' },
          {
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      const drawnStrokes = el.querySelectorAll('.svg-draw-line');
      drawnStrokes.forEach((node) => {
        const path = node as SVGGeometryElement;
        if (typeof path.getTotalLength === 'function') {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  if (variant === 'hero') {
    return (
      <div ref={rootRef} className={`relative ${className}`}>
        <svg
          viewBox="0 0 540 460"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Illustrated learning path with open storybook, letter tiles, pencil, and stars"
          fill="none"
        >
          <defs>
            <clipPath id={`hero-blob-${uid}`}>
              <path
                className="organic-mask-shape"
                d="M 85 75 C 190 15, 390 25, 465 115 C 535 200, 505 345, 395 405 C 280 465, 110 435, 55 335 C 5 245, 10 120, 85 75 Z"
              />
            </clipPath>
          </defs>

          {/* Soft organic backdrop */}
          <g clipPath={`url(#hero-blob-${uid})`}>
            <rect width="540" height="460" fill="#DDE9D9" fillOpacity="0.6" />
            <circle cx="420" cy="110" r="110" fill="#C5E3EC" fillOpacity="0.7" />
            <circle cx="130" cy="360" r="95" fill="#F5CB65" fillOpacity="0.35" />
          </g>

          {/* Curved hand-drawn trail inside hero illustration */}
          <path
            className="svg-draw-line"
            d="M 48 345 C 125 270, 170 120, 275 160 C 370 196, 365 315, 485 245"
            stroke="#466B56"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="7 8"
          />

          {/* Open Storybook */}
          <g transform="translate(155, 175)">
            <path
              d="M 0 18 C 35 2, 78 2, 108 18 L 108 128 C 78 112, 35 112, 0 128 Z"
              fill="#FFF8ED"
              stroke="#26352F"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M 108 18 C 138 2, 181 2, 216 18 L 216 128 C 181 112, 138 112, 108 128 Z"
              fill="#FFF8ED"
              stroke="#26352F"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <line x1="22" y1="45" x2="84" y2="42" stroke="#26352F" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="66" x2="78" y2="63" stroke="#26352F" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="87" x2="66" y2="85" stroke="#26352F" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="162" cy="64" r="24" fill="#F5CB65" fillOpacity="0.55" stroke="#26352F" strokeWidth="2" />
            <text
              x="162"
              y="72"
              textAnchor="middle"
              fill="#26352F"
              fontFamily="Fraunces, serif"
              fontWeight="700"
              fontSize="20"
            >
              Aa
            </text>
          </g>

          {/* Letter tiles C - A - T */}
          <g transform="translate(72, 92) rotate(-7)">
            <rect width="54" height="54" rx="12" fill="#EF9B82" stroke="#26352F" strokeWidth="2.2" />
            <text x="27" y="36" textAnchor="middle" fill="#26352F" fontFamily="Fraunces, serif" fontWeight="700" fontSize="26">
              C
            </text>
          </g>
          <g transform="translate(136, 70) rotate(4)">
            <rect width="54" height="54" rx="12" fill="#F5CB65" stroke="#26352F" strokeWidth="2.2" />
            <text x="27" y="36" textAnchor="middle" fill="#26352F" fontFamily="Fraunces, serif" fontWeight="700" fontSize="26">
              A
            </text>
          </g>
          <g transform="translate(202, 86) rotate(-3)">
            <rect width="54" height="54" rx="12" fill="#FFF8ED" stroke="#26352F" strokeWidth="2.2" />
            <text x="27" y="36" textAnchor="middle" fill="#26352F" fontFamily="Fraunces, serif" fontWeight="700" fontSize="26">
              T
            </text>
          </g>

          {/* Hand-drawn Pencil */}
          <g transform="translate(382, 80) rotate(24)">
            <rect x="0" y="24" width="22" height="84" rx="4" fill="#F5CB65" stroke="#26352F" strokeWidth="2.2" />
            <rect x="0" y="96" width="22" height="14" rx="3" fill="#EF9B82" stroke="#26352F" strokeWidth="2.2" />
            <polygon points="0,24 22,24 11,4" fill="#FFF8ED" stroke="#26352F" strokeWidth="2.2" strokeLinejoin="round" />
            <polygon points="7,11 15,11 11,4" fill="#26352F" />
          </g>

          {/* Small decorative star accents */}
          <path
            d="M 442 325 L 448 339 L 462 345 L 448 351 L 442 365 L 436 351 L 422 345 L 436 339 Z"
            fill="#F5CB65"
            stroke="#26352F"
            strokeWidth="1.8"
          />
          <path
            d="M 94 245 L 98 255 L 108 259 L 98 263 L 94 273 L 90 263 L 80 259 L 90 255 Z"
            fill="#C5E3EC"
            stroke="#26352F"
            strokeWidth="1.6"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'detective') {
    return (
      <div ref={rootRef} className={className}>
        <svg
          viewBox="0 0 420 340"
          className="h-auto w-full"
          role="img"
          aria-label="Illustrated Reading Detective magnifying glass over storybook clues"
          fill="none"
        >
          <defs>
            <clipPath id={`detective-mask-${uid}`}>
              <rect className="organic-mask-shape" x="20" y="20" width="380" height="300" rx="48" />
            </clipPath>
          </defs>
          <g clipPath={`url(#detective-mask-${uid})`}>
            <rect width="420" height="340" fill="#C5E3EC" fillOpacity="0.45" />
            <circle cx="330" cy="80" r="85" fill="#F5CB65" fillOpacity="0.35" />
          </g>
          {/* Open clue notebook */}
          <rect x="65" y="65" width="245" height="205" rx="20" fill="#FFF8ED" stroke="#26352F" strokeWidth="2.5" />
          <line x1="95" y1="110" x2="275" y2="110" stroke="#26352F" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
          <line x1="95" y1="145" x2="255" y2="145" stroke="#26352F" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
          <line x1="95" y1="180" x2="225" y2="180" stroke="#EF9B82" strokeWidth="5" strokeLinecap="round" />
          <line x1="95" y1="215" x2="245" y2="215" stroke="#26352F" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
          {/* Magnifying glass */}
          <g transform="translate(210, 125)">
            <circle cx="62" cy="62" r="52" fill="#FFF8ED" fillOpacity="0.7" stroke="#26352F" strokeWidth="4" />
            <circle cx="62" cy="62" r="40" stroke="#466B56" strokeWidth="2" strokeDasharray="5 5" />
            <text x="62" y="71" textAnchor="middle" fill="#26352F" fontFamily="Fraunces, serif" fontWeight="700" fontSize="28">
              ?
            </text>
            <line x1="100" y1="100" x2="148" y2="148" stroke="#26352F" strokeWidth="10" strokeLinecap="round" />
            <line x1="100" y1="100" x2="148" y2="148" stroke="#EF9B82" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'speech') {
    return (
      <div ref={rootRef} className={className}>
        <svg
          viewBox="0 0 420 320"
          className="h-auto w-full"
          role="img"
          aria-label="Illustrated speech bubbles showing expressive English dialogue"
          fill="none"
        >
          <rect x="20" y="20" width="380" height="280" rx="40" fill="#C5E3EC" fillOpacity="0.4" />
          <path
            d="M 55 75 H 255 A 22 22 0 0 1 277 97 V 147 A 22 22 0 0 1 255 169 H 112 L 76 196 L 86 169 H 55 A 22 22 0 0 1 33 147 V 97 A 22 22 0 0 1 55 75 Z"
            fill="#FFF8ED"
            stroke="#26352F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <text x="64" y="118" fill="#26352F" fontFamily="Fraunces, serif" fontWeight="600" fontSize="19">
            “Tell me what happened
          </text>
          <text x="64" y="144" fill="#466B56" fontFamily="Fraunces, serif" fontWeight="600" fontSize="19">
            next in your story!”
          </text>

          <path
            d="M 165 185 H 365 A 22 22 0 0 1 387 207 V 249 A 22 22 0 0 1 365 271 H 335 L 344 295 L 308 271 H 165 A 22 22 0 0 1 143 249 V 207 A 22 22 0 0 1 165 185 Z"
            fill="#F5CB65"
            fillOpacity="0.55"
            stroke="#26352F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <text x="172" y="236" fill="#26352F" fontFamily="Caveat, cursive" fontWeight="700" fontSize="26">
            “I noticed a clue!”
          </text>
        </svg>
      </div>
    );
  }

  if (variant === 'grammar') {
    return (
      <div ref={rootRef} className={className}>
        <svg
          viewBox="0 0 420 320"
          className="h-auto w-full"
          role="img"
          aria-label="Playful grammar illustration with punctuation marks and word cards"
          fill="none"
        >
          <rect x="20" y="20" width="380" height="280" rx="40" fill="#F5CB65" fillOpacity="0.25" />
          <g transform="translate(55, 65) rotate(-5)">
            <rect width="125" height="90" rx="18" fill="#FFF8ED" stroke="#26352F" strokeWidth="2.4" />
            <text x="62" y="48" textAnchor="middle" fill="#26352F" fontFamily="Fraunces, serif" fontWeight="700" fontSize="22">
              Knight
            </text>
            <text x="62" y="72" textAnchor="middle" fill="#4B5D55" fontFamily="Caveat, cursive" fontSize="18">
              silent k
            </text>
          </g>
          <g transform="translate(225, 58) rotate(5)">
            <rect width="125" height="90" rx="18" fill="#C5E3EC" stroke="#26352F" strokeWidth="2.4" />
            <text x="62" y="48" textAnchor="middle" fill="#26352F" fontFamily="Fraunces, serif" fontWeight="700" fontSize="22">
              Night
            </text>
            <text x="62" y="72" textAnchor="middle" fill="#4B5D55" fontFamily="Caveat, cursive" fontSize="18">
              same sound
            </text>
          </g>
          <g transform="translate(108, 178)">
            <rect width="205" height="82" rx="18" fill="#DDE9D9" stroke="#26352F" strokeWidth="2.4" />
            <text x="102" y="48" textAnchor="middle" fill="#26352F" fontFamily="Fraunces, serif" fontWeight="700" fontSize="22">
              sweep → swept
            </text>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={className}>
      <svg
        viewBox="0 0 420 320"
        className="h-auto w-full"
        role="img"
        aria-label="Warm editorial learning notebook and storybook illustration"
        fill="none"
      >
        <defs>
          <clipPath id={`book-mask-${uid}`}>
            <path
              className="organic-mask-shape"
              d="M 48 62 C 130 16, 290 22, 368 78 C 414 140, 400 245, 336 286 C 248 320, 95 308, 44 246 C 14 190, 12 104, 48 62 Z"
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#book-mask-${uid})`}>
          <rect width="420" height="320" fill="#DDE9D9" fillOpacity="0.55" />
          <circle cx="325" cy="245" r="78" fill="#EF9B82" fillOpacity="0.35" />
        </g>
        <rect x="92" y="74" width="236" height="172" rx="20" fill="#FFF8ED" stroke="#26352F" strokeWidth="2.5" />
        <line x1="210" y1="74" x2="210" y2="246" stroke="#26352F" strokeWidth="2" />
        <circle cx="152" cy="145" r="28" fill="#F5CB65" fillOpacity="0.65" stroke="#26352F" strokeWidth="2" />
        <text x="152" y="153" textAnchor="middle" fill="#26352F" fontFamily="Fraunces, serif" fontWeight="700" fontSize="22">
          abc
        </text>
        <line x1="234" y1="120" x2="302" y2="120" stroke="#466B56" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="234" y1="150" x2="294" y2="150" stroke="#26352F" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
        <line x1="234" y1="180" x2="282" y2="180" stroke="#26352F" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
