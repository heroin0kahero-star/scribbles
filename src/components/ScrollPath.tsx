import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ScrollPathProps {
  /** DOM selector or ref target that defines the scroll range */
  triggerRef: React.RefObject<HTMLElement | null>;
  variant?: 'journey' | 'vertical';
  className?: string;
}

export default function ScrollPath({
  triggerRef,
  variant = 'journey',
  className = '',
}: ScrollPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const desktopPencilRef = useRef<SVGGElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobilePencilRef = useRef<SVGGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const triggerEl = triggerRef.current;
    const containerEl = containerRef.current;
    if (!triggerEl || !containerEl) return;

    const animatePathElement = (
      pathEl: SVGPathElement | null,
      travelerEl: SVGGElement | null
    ) => {
      if (!pathEl) return null;
      const totalLength = pathEl.getTotalLength();
      if (!totalLength) return null;

      if (prefersReducedMotion) {
        pathEl.style.strokeDasharray = 'none';
        pathEl.style.strokeDashoffset = '0';
        if (travelerEl) {
          const endPoint = pathEl.getPointAtLength(totalLength);
          travelerEl.setAttribute(
            'transform',
            `translate(${endPoint.x}, ${endPoint.y})`
          );
        }
        return null;
      }

      pathEl.style.strokeDasharray = `${totalLength}`;
      pathEl.style.strokeDashoffset = `${totalLength}`;

      const updateAtProgress = (progress: number) => {
        const clamped = Math.max(0, Math.min(1, progress));
        const drawLength = totalLength * clamped;
        pathEl.style.strokeDashoffset = `${totalLength - drawLength}`;

        if (travelerEl) {
          const point = pathEl.getPointAtLength(drawLength);
          const lookAhead = pathEl.getPointAtLength(
            Math.min(totalLength, drawLength + 4)
          );
          const angle =
            (Math.atan2(lookAhead.y - point.y, lookAhead.x - point.x) * 180) /
            Math.PI;
          travelerEl.setAttribute(
            'transform',
            `translate(${point.x}, ${point.y}) rotate(${angle * 0.15})`
          );
        }
      };

      updateAtProgress(0.04);

      return ScrollTrigger.create({
        trigger: triggerEl,
        start: 'top 65%',
        end: 'bottom 80%',
        scrub: 0.65,
        onUpdate: (self) => updateAtProgress(self.progress),
      });
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const st = animatePathElement(desktopPathRef.current, desktopPencilRef.current);
        return () => st?.kill();
      });

      mm.add('(max-width: 767px)', () => {
        const st = animatePathElement(mobilePathRef.current, mobilePencilRef.current);
        return () => st?.kill();
      });
    }, containerRef);

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(triggerEl);

    return () => {
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, [triggerRef, prefersReducedMotion, variant]);

  const desktopD =
    variant === 'journey'
      ? 'M 140 40 C 380 80, 720 180, 620 340 C 520 500, 120 560, 180 760 C 240 960, 760 1000, 660 1220 C 560 1440, 150 1500, 240 1720 C 330 1920, 680 1980, 520 2180'
      : 'M 120 30 C 220 240, 40 480, 140 720 C 230 940, 50 1160, 130 1420';

  const desktopViewBox = variant === 'journey' ? '0 0 800 2240' : '0 0 260 1460';

  const mobileD =
    variant === 'journey'
      ? 'M 32 24 C 68 220, 12 420, 44 640 C 76 860, 14 1060, 40 1300 C 66 1540, 16 1760, 38 1980'
      : 'M 32 20 C 56 260, 14 520, 36 800 C 58 1040, 20 1240, 34 1420';

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Desktop responsive SVG path */}
      <svg
        viewBox={desktopViewBox}
        preserveAspectRatio="none"
        className="hidden md:block h-full w-full overflow-visible"
        fill="none"
      >
        {/* Subtle dashed guide track */}
        <path
          d={desktopD}
          stroke="#26352F"
          strokeOpacity="0.1"
          strokeWidth="2.5"
          strokeDasharray="8 10"
          strokeLinecap="round"
        />
        {/* Active scroll-drawn pencil line */}
        <path
          ref={desktopPathRef}
          d={desktopD}
          stroke="#466B56"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Traveler moving via getPointAtLength */}
        <g ref={desktopPencilRef}>
          <circle r="16" fill="#F5CB65" fillOpacity="0.45" />
          <circle r="7" fill="#EF9B82" stroke="#26352F" strokeWidth="2" />
          <path
            d="M -4 -18 L 4 -18 L 6 -6 L -6 -6 Z"
            fill="#F5CB65"
            stroke="#26352F"
            strokeWidth="1.6"
          />
          <polygon points="-4,-18 4,-18 0,-26" fill="#26352F" />
        </g>
      </svg>

      {/* Simplified vertical mobile SVG composition */}
      <svg
        viewBox="0 0 80 2020"
        preserveAspectRatio="none"
        className="block md:hidden h-full w-16 overflow-visible"
        fill="none"
      >
        <path
          d={mobileD}
          stroke="#26352F"
          strokeOpacity="0.12"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
        <path
          ref={mobilePathRef}
          d={mobileD}
          stroke="#466B56"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g ref={mobilePencilRef}>
          <circle r="11" fill="#F5CB65" fillOpacity="0.5" />
          <circle r="5.5" fill="#EF9B82" stroke="#26352F" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}
