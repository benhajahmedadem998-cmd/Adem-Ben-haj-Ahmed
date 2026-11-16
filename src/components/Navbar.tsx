import { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, Globe, Lock, Menu, X } from 'lucide-react';
import { EagleLogo } from './EagleLogo';
import {
  LANGUAGE_OPTIONS,
  usePreferences,
  type Currency,
} from '../context/PreferencesContext';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onNavigateSection?: (href: string) => void;
}

export function Navbar({ onOpenBooking, onOpenAdmin, onNavigateSection }: NavbarProps) {
  const { language, setLanguage, currency, setCurrency, t } = usePreferences();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.fleet, href: '#fleet' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveHash(href);
    setMobileOpen(false);
    if (onNavigateSection) {
      onNavigateSection(href);
    }
  };

  const activeLangOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === language) ?? LANGUAGE_OPTIONS[0];

  const currencies: Currency[] = ['TND', 'USD'];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#0a0a0a]/92 backdrop-blur-md border-b border-amber-500/15 shadow-lg shadow-black/50'
          : 'bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/55 to-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-16 md:h-20 flex items-center justify-between gap-3 md:gap-6">
        {/* Zone 1: Brand Logo */}
        <a
          href="#home"
          onClick={() => handleLinkClick('#home')}
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19] rounded-lg pr-2"
        >
          <EagleLogo className="w-11 h-11 md:w-12 md:h-12 transition-transform duration-200 group-hover:scale-105" />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg md:text-xl font-bold tracking-wide text-gold-gradient whitespace-nowrap">
              Auros Cars
            </span>
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.22em] text-stone-300/90 uppercase whitespace-nowrap mt-1">
              Rent A Car
            </span>
          </div>
        </a>

        {/* Zone 2: Center Navigation Links + Integrated Language Dropdown & Currency Switcher */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 min-w-0">
          <nav className="flex items-center gap-5 xl:gap-6" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19] rounded ${
                    isActive
                      ? 'text-[#fde08d]'
                      : 'text-stone-300 hover:text-[#fde08d]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-gold-gradient transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Subtle Golden Divider */}
          <span className="h-5 w-[1px] bg-amber-500/25 shrink-0" aria-hidden="true" />

          {/* Language Dropdown + Currency Switcher right next to main links */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* 1. Language Dropdown */}
            <div ref={langDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={langMenuOpen}
                aria-label={t.nav.languageLabel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111]/90 border border-amber-500/35 hover:border-[#f5af19] text-xs font-semibold text-stone-200 hover:text-[#fde08d] shadow-[0_0_16px_-8px_rgba(245,175,25,0.45)] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
              >
                <Globe className="w-3.5 h-3.5 text-[#f5af19] shrink-0" aria-hidden="true" />
                <span>{activeLangOption.short}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#f5af19]/80 transition-transform duration-150 ${
                    langMenuOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {langMenuOpen && (
                <div
                  role="listbox"
                  aria-label={t.nav.languageLabel}
                  className="absolute right-0 mt-2 w-40 rounded-xl bg-[#111111]/98 backdrop-blur-xl border border-amber-500/40 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.95),0_0_24px_-10px_rgba(245,175,25,0.3)] py-1.5 z-50"
                >
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const isSelected = opt.code === language;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setLanguage(opt.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 flex items-center justify-between text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/15 text-[#fde08d] font-semibold'
                            : 'text-stone-300 hover:bg-white/[0.05] hover:text-[#fde08d]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-[#f5af19]" aria-hidden="true" />
                        ) : (
                          <span className="text-[10px] font-semibold text-stone-500">
                            {opt.short}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Currency Switcher (TND / USD) */}
            <div
              role="group"
              aria-label={t.nav.currencyLabel}
              className="inline-flex items-center p-0.5 rounded-full bg-[#111111]/90 border border-amber-500/35 shadow-[0_0_16px_-8px_rgba(245,175,25,0.45)] shrink-0"
            >
              {currencies.map((curr) => {
                const isSelected = currency === curr;
                return (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    aria-pressed={isSelected}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d] ${
                      isSelected
                        ? 'bg-gold-gradient text-[#0a0a0a] shadow-[0_2px_10px_rgba(245,175,25,0.45)]'
                        : 'text-stone-300 hover:text-[#fde08d]'
                    }`}
                  >
                    {curr === 'USD' ? '$ USD' : 'TND'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Zone 3: Primary Action + Discreet Admin Access + Mobile Drawer Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenAdmin}
            aria-label="Ouvrir l’espace administrateur"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-stone-300 border border-stone-800 bg-[#111111]/80 hover:border-amber-500/45 hover:text-[#fde08d] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
          >
            <Lock className="w-3.5 h-3.5 text-[#f5af19]/85" aria-hidden="true" />
            <span>Admin</span>
          </button>

          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs md:text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d]"
          >
            {t.nav.reserve}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-stone-800 bg-[#111111]/80 text-stone-200 hover:text-[#fde08d] hover:border-amber-500/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0e0e0e]/98 backdrop-blur-xl border-b border-amber-500/20 px-5 py-5 space-y-4">
          <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeHash === link.href
                    ? 'bg-amber-500/12 text-[#fde08d]'
                    : 'text-stone-300 hover:bg-white/5 hover:text-[#fde08d]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Language & Currency Switchers */}
          <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#f5af19]" aria-hidden="true" />
              <div className="inline-flex items-center p-0.5 rounded-full bg-[#151515] border border-amber-500/30">
                {LANGUAGE_OPTIONS.map((opt) => {
                  const active = opt.code === language;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => setLanguage(opt.code)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-gold-gradient text-[#0a0a0a] font-bold'
                          : 'text-stone-300 hover:text-[#fde08d]'
                      }`}
                    >
                      {opt.short}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              role="group"
              aria-label={t.nav.currencyLabel}
              className="inline-flex items-center p-0.5 rounded-full bg-[#151515] border border-amber-500/35"
            >
              {currencies.map((curr) => {
                const isSelected = currency === curr;
                return (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gold-gradient text-[#0a0a0a]'
                        : 'text-stone-300 hover:text-[#fde08d]'
                    }`}
                  >
                    {curr === 'USD' ? '$ USD' : 'TND'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800/80 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-full text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn cursor-pointer"
            >
              {t.nav.reserveVehicle}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 rounded-full text-xs font-semibold text-stone-300 border border-stone-800 bg-[#151515] hover:border-amber-500/45 hover:text-[#fde08d] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#f5af19]" />
              <span>Espace Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
