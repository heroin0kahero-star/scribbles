import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../data/scribblesData';

const PROGRAMME_LINKS = [
  { label: 'All Programmes Overview', to: '/programmes', group: 'Overview' },
  { label: 'Phonics', to: '/programmes/phonics', group: 'Online Learning' },
  { label: 'Communication', to: '/programmes/communication', group: 'Online Learning' },
  { label: 'Grammar', to: '/programmes/grammar', group: 'Online Learning' },
  { label: 'Early Learning', to: '/programmes/early-learning', group: 'Offline Learning' },
  { label: 'Tuition', to: '/programmes/tuition', group: 'Offline Learning' },
  { label: 'Learning Journal', to: '/learning-journal', group: 'Resources' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isProgrammeActive =
    location.pathname.startsWith('/programmes') || location.pathname === '/learning-journal';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled || mobileOpen
            ? 'bg-[#FFF8ED]/95 backdrop-blur-md border-b border-[#26352F]/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-8 px-5 sm:px-8">
          {/* Zone 1: Single clean blended brand logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 rounded-md focus-visible:outline-offset-4"
            aria-label="Scribbles | Kids Learning Home"
          >
            <img
              src={BRAND.logoSrc}
              alt="Scribbles | Kids Learning"
              className="h-11 w-auto object-contain mix-blend-multiply sm:h-12"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Zone 2: Concise single-line desktop navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-[15px] font-semibold text-[#26352F]"
          >
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `ink-underline whitespace-nowrap shrink-0 py-1 transition-colors ${
                  isActive ? 'text-[#466B56]' : 'text-[#26352F] hover:text-[#466B56]'
                }`
              }
            >
              About
            </NavLink>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 py-1 cursor-pointer transition-colors ${
                  isProgrammeActive ? 'text-[#466B56]' : 'text-[#26352F] hover:text-[#466B56]'
                }`}
              >
                <span>Programmes</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {dropdownOpen && (
                <div
                  role="menu"
                  aria-label="Programmes submenu"
                  className="absolute left-0 top-full mt-3 w-72 rounded-2xl border border-[#26352F]/12 bg-[#FFF8ED] p-3 shadow-lg"
                >
                  <Link
                    to="/programmes"
                    role="menuitem"
                    className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#26352F] hover:bg-[#DDE9D9]/55 transition-colors"
                  >
                    <span>Programmes Overview</span>
                    <ArrowUpRight className="h-4 w-4 text-[#466B56]" aria-hidden="true" />
                  </Link>

                  <div className="my-2 border-t border-[#26352F]/10" />
                  <p className="px-3.5 py-1 text-xs font-semibold tracking-wide text-[#4B5D55]">
                    Online Learning
                  </p>
                  {PROGRAMME_LINKS.filter((item) => item.group === 'Online Learning').map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      role="menuitem"
                      className="block rounded-xl px-3.5 py-2 text-sm font-medium text-[#26352F] hover:bg-[#DDE9D9]/50 hover:text-[#466B56] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="my-2 border-t border-[#26352F]/10" />
                  <p className="px-3.5 py-1 text-xs font-semibold tracking-wide text-[#4B5D55]">
                    Offline Learning · Lucknow
                  </p>
                  {PROGRAMME_LINKS.filter((item) => item.group === 'Offline Learning').map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      role="menuitem"
                      className="block rounded-xl px-3.5 py-2 text-sm font-medium text-[#26352F] hover:bg-[#DDE9D9]/50 hover:text-[#466B56] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="my-2 border-t border-[#26352F]/10" />
                  <Link
                    to="/learning-journal"
                    role="menuitem"
                    className="block rounded-xl px-3.5 py-2 text-sm font-semibold text-[#466B56] hover:bg-[#DDE9D9]/50 transition-colors"
                  >
                    Learning Journal
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/reading-lab"
              className={({ isActive }) =>
                `ink-underline whitespace-nowrap shrink-0 py-1 transition-colors ${
                  isActive ? 'text-[#466B56]' : 'text-[#26352F] hover:text-[#466B56]'
                }`
              }
            >
              Reading Lab
            </NavLink>

            <NavLink
              to="/parent-stories"
              className={({ isActive }) =>
                `ink-underline whitespace-nowrap shrink-0 py-1 transition-colors ${
                  isActive ? 'text-[#466B56]' : 'text-[#26352F] hover:text-[#466B56]'
                }`
              }
            >
              Parent Stories
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `ink-underline whitespace-nowrap shrink-0 py-1 transition-colors ${
                  isActive ? 'text-[#466B56]' : 'text-[#26352F] hover:text-[#466B56]'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Zone 3: Single primary CTA on desktop + mobile menu trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#466B56] px-5 py-2.5 text-sm font-semibold text-[#FFF8ED] whitespace-nowrap shrink-0 hover:bg-[#345241] transition-colors"
            >
              Enquire for Admissions
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#26352F]/15 text-[#26352F] hover:bg-[#DDE9D9]/50 lg:hidden cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen navigation drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-30 overflow-y-auto bg-[#FFF8ED] pt-24 pb-10 px-6 lg:hidden"
        >
          <nav className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 border-b border-[#26352F]/10 pb-6">
              <Link
                to="/"
                className="flex min-h-[48px] items-center font-display text-2xl font-semibold text-[#26352F]"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="flex min-h-[48px] items-center font-display text-2xl font-semibold text-[#26352F]"
              >
                About Scribbles
              </Link>
              <Link
                to="/reading-lab"
                className="flex min-h-[48px] items-center font-display text-2xl font-semibold text-[#26352F]"
              >
                Reading Lab
              </Link>
              <Link
                to="/parent-stories"
                className="flex min-h-[48px] items-center font-display text-2xl font-semibold text-[#26352F]"
              >
                Parent Stories
              </Link>
              <Link
                to="/learning-journal"
                className="flex min-h-[48px] items-center font-display text-2xl font-semibold text-[#26352F]"
              >
                Learning Journal
              </Link>
            </div>

            <div className="space-y-2 border-b border-[#26352F]/10 pb-6">
              <p className="text-xs font-bold tracking-wide text-[#4B5D55]">Programmes</p>
              <Link
                to="/programmes"
                className="flex min-h-[44px] items-center text-base font-bold text-[#466B56]"
              >
                All Programmes Overview
              </Link>
              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {PROGRAMME_LINKS.filter((l) => l.group !== 'Overview' && l.group !== 'Resources').map(
                  (item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex min-h-[44px] items-center justify-between rounded-xl px-3 py-2 text-base font-medium text-[#26352F] hover:bg-[#DDE9D9]/45"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-[#4B5D55]">{item.group}</span>
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                to="/contact"
                className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#466B56] px-6 py-3 text-base font-semibold text-[#FFF8ED]"
              >
                Enquire for Admissions
              </Link>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#26352F]/20 px-6 py-3 text-base font-semibold text-[#26352F]"
              >
                <span>Instagram {BRAND.instagramHandle}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
