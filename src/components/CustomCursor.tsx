import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') {
      setEnabled(false);
      return;
    }
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    const el = cursorRef.current;
    if (!el) return;

    let active = false;

    const onMove = (e: MouseEvent) => {
      if (!active) {
        active = true;
        el.style.opacity = '1';
      }
      el.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
    };

    const onLeave = () => {
      active = false;
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 h-6 w-6 rounded-full border-2 border-[#466B56]/55 bg-[#F5CB65]/15 opacity-0 transition-opacity duration-150 hidden lg:block"
    />
  );
}
