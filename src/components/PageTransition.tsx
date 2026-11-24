import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const progressEl = progressRef.current;
    if (!wrapper) return;

    if (prefersReducedMotion) {
      wrapper.style.opacity = '1';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );

      if (progressEl) {
        gsap.fromTo(
          progressEl,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, [pathname, prefersReducedMotion]);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none"
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-[#466B56]"
        />
      </div>
      <div ref={wrapperRef}>{children}</div>
    </>
  );
}
