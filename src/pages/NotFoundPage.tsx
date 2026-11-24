import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found — Scribbles | Kids Learning',
    description: 'Return to Scribbles | Kids Learning to explore our English learning programmes.',
  });

  return (
    <div className="paper-grain min-h-[70vh] flex items-center justify-center px-5 pt-28 pb-16">
      <div className="max-w-md text-center space-y-5">
        <p className="font-hand text-3xl text-[#466B56]">Looks like this page wandered off the path</p>
        <h1 className="font-display text-4xl font-bold text-[#26352F]">Page not found</h1>
        <p className="text-base text-[#4B5D55]">
          Let&apos;s guide you back to our learning journey and programmes.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#466B56] px-6 py-3 text-sm font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
