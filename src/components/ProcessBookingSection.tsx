import { ArrowRight, CalendarDays, Car, ShieldCheck, ChevronsRight } from 'lucide-react';
import { BRAND_IMAGES } from '../data/fleetData';
import { usePreferences } from '../context/PreferencesContext';

interface ProcessBookingSectionProps {
  onOpenBooking: () => void;
  onScrollToFleet: () => void;
}

export function ProcessBookingSection({
  onOpenBooking,
  onScrollToFleet,
}: ProcessBookingSectionProps) {
  const { t } = usePreferences();

  const steps = [
    {
      num: 1,
      icon: CalendarDays,
      line1: t.process.steps[0].line1,
      line2: t.process.steps[0].line2,
      onClick: onOpenBooking,
    },
    {
      num: 2,
      icon: Car,
      line1: t.process.steps[1].line1,
      line2: t.process.steps[1].line2,
      onClick: onScrollToFleet,
    },
    {
      num: 3,
      icon: ShieldCheck,
      line1: t.process.steps[2].line1,
      line2: t.process.steps[2].line2,
      onClick: onOpenBooking,
    },
  ];

  return (
    <section id="process" className="relative py-16 sm:py-20 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle emerald/gold atmospheric mesh */}
      <div
        className="absolute inset-y-0 left-1/3 w-[560px] rounded-full blur-[150px] opacity-18 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(245,175,25,0.35) 50%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          {/* Left: Comment ça marche ? (3 horizontal steps inside luminous gold-bordered block) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#111111]/95 border border-amber-500/35 shadow-[0_0_40px_-14px_rgba(245,175,25,0.28)] p-6 sm:p-8 flex flex-col justify-center">
            {/* Centered Title with Decorative Gold Dashes */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-1.5">
                <span
                  className="h-[2px] w-8 sm:w-14 bg-gradient-to-r from-transparent via-[#f5af19] to-[#fde08d] rounded-full"
                  aria-hidden="true"
                />
                <h2 className="text-2xl sm:text-3xl font-bold text-gold-gradient tracking-tight">
                  {t.process.title}
                </h2>
                <span
                  className="h-[2px] w-8 sm:w-14 bg-gradient-to-l from-transparent via-[#f5af19] to-[#fde08d] rounded-full"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm text-stone-300 font-normal">
                {t.process.subtitle}
              </p>
            </div>

            {/* 3 Horizontal Step Cards linked by >> separators */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-2.5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="flex flex-col md:flex-row items-center gap-2.5 flex-1 min-w-0"
                  >
                    <button
                      type="button"
                      onClick={step.onClick}
                      className="group w-full flex-1 flex items-center gap-3 px-4 py-4 rounded-xl bg-[#0a0a0a]/90 border border-amber-500/30 shadow-[0_0_24px_-10px_rgba(245,175,25,0.3)] hover:border-[#fde08d]/75 hover:shadow-[0_0_28px_-6px_rgba(245,175,25,0.45)] hover:-translate-y-0.5 transition-all duration-200 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
                    >
                      <span className="w-9 h-9 rounded-full border-2 border-[#f5af19] bg-[#14110b] shadow-[0_0_12px_-2px_rgba(245,175,25,0.5)] flex items-center justify-center text-sm font-extrabold text-[#fde08d] shrink-0 tabular-nums group-hover:scale-105 transition-transform">
                        {step.num}
                      </span>

                      <div className="w-9 h-9 rounded-lg bg-amber-500/12 border border-amber-500/30 flex items-center justify-center text-[#f5af19] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="leading-snug min-w-0">
                        <span className="block text-sm font-semibold text-stone-100 group-hover:text-[#fde08d] transition-colors">
                          {step.line1}
                        </span>
                        <span className="block text-xs text-stone-400">
                          {step.line2}
                        </span>
                      </div>
                    </button>

                    {index < steps.length - 1 && (
                      <div
                        className="flex items-center justify-center shrink-0 text-[#f5af19] py-0.5 md:py-0"
                        aria-hidden="true"
                      >
                        <ChevronsRight className="w-5 h-5 rotate-90 md:rotate-0 drop-shadow-[0_0_6px_rgba(245,175,25,0.5)]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Réservez dès maintenant ! + Key Fob */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-amber-500/45 shadow-[0_0_40px_-14px_rgba(245,175,25,0.35)] bg-gradient-to-br from-[#241908] via-[#161108] to-[#0c0c0c] p-6 sm:p-7 flex items-center justify-between gap-4">
            {/* Warm golden atmospheric sheen */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 80% 50%, rgba(245,175,25,0.24) 0%, transparent 65%)',
              }}
            />

            <div className="relative z-10 flex-1 min-w-0">
              <h2 className="text-xl font-extrabold text-[#fde08d] leading-tight text-balance">
                {t.process.ctaTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 mb-5">
                {t.process.ctaDesc}
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d]"
              >
                <span>{t.process.ctaBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative z-10 w-32 sm:w-36 aspect-[4/3] rounded-xl overflow-hidden border border-amber-500/30 shadow-2xl shrink-0">
              <img
                src={BRAND_IMAGES.keyFob}
                alt="Clé intelligente dorée AUROS CARS"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

