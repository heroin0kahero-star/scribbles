import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, MapPin } from 'lucide-react';
import { BRAND } from '../data/scribblesData';

export default function Footer() {
  return (
    <footer className="border-t border-[#26352F]/10 bg-[#F6ECD9]/60 text-[#26352F]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Introduction */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block" aria-label="Scribbles Home">
              <img
                src={BRAND.logoSrc}
                alt="Scribbles | Kids Learning"
                className="h-14 w-auto object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="font-display text-xl text-[#26352F] leading-snug">
              {BRAND.tagline}.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-[#4B5D55]">
              {BRAND.motto} {BRAND.subMotto}
            </p>
            <div className="flex flex-col gap-2.5 pt-1 text-sm text-[#26352F]">
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#466B56] shrink-0" aria-hidden="true" />
                <span>{BRAND.location} · Online &amp; Offline Learning</span>
              </div>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[#466B56] hover:text-[#345241] transition-colors w-fit"
              >
                <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{BRAND.instagramHandle}</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-sans text-xs font-bold tracking-wider uppercase text-[#4B5D55]">
              Explore
            </h2>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-[#466B56] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#466B56] transition-colors">
                  About Scribbles
                </Link>
              </li>
              <li>
                <Link to="/reading-lab" className="hover:text-[#466B56] transition-colors">
                  Reading Lab
                </Link>
              </li>
              <li>
                <Link to="/parent-stories" className="hover:text-[#466B56] transition-colors">
                  Parent Stories
                </Link>
              </li>
              <li>
                <Link to="/learning-journal" className="hover:text-[#466B56] transition-colors">
                  Learning Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#466B56] transition-colors">
                  Contact &amp; Admissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Programmes Links */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="font-sans text-xs font-bold tracking-wider uppercase text-[#4B5D55]">
              Programmes
            </h2>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/programmes" className="font-semibold hover:text-[#466B56] transition-colors">
                  All Programmes Overview
                </Link>
              </li>
              <li>
                <Link to="/programmes/phonics" className="hover:text-[#466B56] transition-colors">
                  Phonics (Online)
                </Link>
              </li>
              <li>
                <Link to="/programmes/communication" className="hover:text-[#466B56] transition-colors">
                  Communication (Online)
                </Link>
              </li>
              <li>
                <Link to="/programmes/grammar" className="hover:text-[#466B56] transition-colors">
                  Grammar (Online)
                </Link>
              </li>
              <li>
                <Link to="/programmes/early-learning" className="hover:text-[#466B56] transition-colors">
                  Early Learning (Offline)
                </Link>
              </li>
              <li>
                <Link to="/programmes/tuition" className="hover:text-[#466B56] transition-colors">
                  Tuition (Offline)
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions Box */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[#26352F]/12 bg-[#FFF8ED] p-6 space-y-4">
              <p className="font-hand text-xl text-[#466B56]">Admissions Open</p>
              <h3 className="font-display text-xl font-semibold text-[#26352F]">
                Start with a calm conversation
              </h3>
              <p className="text-sm leading-relaxed text-[#4B5D55]">
                Admissions enquiries are received through Instagram DMs at{' '}
                <span className="font-semibold text-[#26352F]">{BRAND.instagramHandle}</span>.
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#466B56] px-5 py-2.5 text-sm font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors"
                >
                  <span>Enquire for Admissions</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[#26352F]/10 pt-8 text-xs text-[#4B5D55] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name} · {BRAND.location}
          </p>
          <p>{BRAND.motto}</p>
        </div>
      </div>
    </footer>
  );
}
