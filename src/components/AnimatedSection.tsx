import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  staggerSelector?: string;
  id?: string;
}

export default function AnimatedSection({
  children,
  className = '',
  staggerSelector,
  id,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const targets = staggerSelector ? el.querySelectorAll(staggerSelector) : [el];
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0.15, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, staggerSelector]);

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  );
}
