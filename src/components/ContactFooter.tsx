import { useState, type FormEvent } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Instagram, Facebook, Youtube, Music2, Lock } from 'lucide-react';
import { EagleLogo } from './EagleLogo';
import { usePreferences } from '../context/PreferencesContext';

interface ContactFooterProps {
  onNavigateSection?: (href: string) => void;
  onOpenAdmin?: () => void;
}

export function ContactFooter({ onNavigateSection, onOpenAdmin }: ContactFooterProps) {
  const { t } = usePreferences();
  const [name, setName] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !contactInput.trim() || !message.trim()) {
      setError(t.footer.errorEmpty);
      return;
    }

    const isEmailOrPhone =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInput.trim()) ||
      /^[+\d\s()-]{8,}$/.test(contactInput.trim());

    if (!isEmailOrPhone) {
      setError(t.footer.errorContact);
      return;
    }

    setSubmitted(true);
    setName('');
    setContactInput('');
    setMessage('');
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#080808] border-t border-amber-500/20 pt-16 pb-8 overflow-hidden"
    >
      {/* Subtle emerald/gold bottom horizon glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[200px] blur-[130px] opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom, rgba(16,185,129,0.5) 0%, rgba(245,175,25,0.35) 55%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Concierge Contact Strip */}
        <div className="rounded-2xl bg-[#111111]/90 border border-stone-800/90 p-6 sm:p-8 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f5af19]">
              {t.footer.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-100">
              {t.footer.heading}
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-6 flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-stone-100">
                    {t.footer.sentTitle}
                  </h3>
                  <p className="text-sm text-stone-300">
                    {t.footer.sentDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-[#fde08d] underline underline-offset-4 cursor-pointer"
                  >
                    {t.footer.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" noValidate>
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    {t.footer.namePlaceholder}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.footer.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#f5af19]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-info" className="sr-only">
                    {t.footer.contactPlaceholder}
                  </label>
                  <input
                    id="contact-info"
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder={t.footer.contactPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#f5af19]"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3.5">
                  <label htmlFor="contact-message" className="sr-only">
                    {t.footer.messagePlaceholder}
                  </label>
                  <input
                    id="contact-message"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.footer.messagePlaceholder}
                    className="flex-1 px-4 py-3 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#f5af19]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d]"
                  >
                    <span>{t.footer.send}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {error && (
                  <p className="sm:col-span-2 text-xs text-amber-400 font-medium" role="alert">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Navigation & Coordinates */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-stone-800/80">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => onNavigateSection?.('#home')}
            className="flex items-center gap-3.5 shrink-0 group"
          >
            <EagleLogo className="w-14 h-14 transition-transform duration-200 group-hover:scale-105" />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-bold tracking-wide text-gold-gradient">
                Auros Cars
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-stone-300 uppercase mt-1">
                Rent A Car · The Art of Driving
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav
            aria-label="Liens de pied de page"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-stone-300"
          >
            <a
              href="#home"
              onClick={() => onNavigateSection?.('#home')}
              className="hover:text-[#fde08d] transition-colors whitespace-nowrap"
            >
              {t.nav.home}
            </a>
            <span className="text-stone-700" aria-hidden="true">|</span>
            <a
              href="#fleet"
              onClick={() => onNavigateSection?.('#fleet')}
              className="hover:text-[#fde08d] transition-colors whitespace-nowrap"
            >
              {t.nav.fleet}
            </a>
            <span className="text-stone-700" aria-hidden="true">|</span>
            <a
              href="#services"
              onClick={() => onNavigateSection?.('#services')}
              className="hover:text-[#fde08d] transition-colors whitespace-nowrap"
            >
              {t.nav.services}
            </a>
            <span className="text-stone-700" aria-hidden="true">|</span>
            <a
              href="#about"
              onClick={() => onNavigateSection?.('#about')}
              className="hover:text-[#fde08d] transition-colors whitespace-nowrap"
            >
              {t.nav.about}
            </a>
            <span className="text-stone-700" aria-hidden="true">|</span>
            <a
              href="#contact"
              onClick={() => onNavigateSection?.('#contact')}
              className="hover:text-[#fde08d] transition-colors whitespace-nowrap"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-start gap-3 lg:gap-1.5 text-xs text-stone-300">
            <a
              href="tel:+21671123456"
              className="inline-flex items-center gap-2 hover:text-[#fde08d] transition-colors tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#f5af19]" />
              <span>+216 71 123 456</span>
            </a>
            <a
              href="mailto:contact@auroscars.tn"
              className="inline-flex items-center gap-2 hover:text-[#fde08d] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#f5af19]" />
              <span>contact@auroscars.tn</span>
            </a>
            <span className="inline-flex items-center gap-2 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-[#f5af19]" />
              <span>Tunis, Tunisia</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {[
              { label: 'Facebook', icon: Facebook, href: '#contact' },
              { label: 'Instagram', icon: Instagram, href: '#contact' },
              { label: 'YouTube', icon: Youtube, href: '#contact' },
              { label: 'TikTok', icon: Music2, href: '#contact' },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-[#151515] border border-amber-500/30 flex items-center justify-center text-[#f5af19] hover:bg-gold-gradient hover:text-[#0a0a0a] hover:border-transparent transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-[#fde08d] transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3 text-[#f5af19]/80" aria-hidden="true" />
                <span>Admin</span>
              </button>
            )}
            <p className="font-serif italic text-[#fde08d]/80">
              Drive Your Dreams
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
