import { ArrowRight, Gem, ShieldCheck, Headset, Zap } from 'lucide-react';
import { BRAND_IMAGES } from '../data/fleetData';
import { usePreferences } from '../context/PreferencesContext';

interface WhyChooseSectionProps {
  onLearnMore: () => void;
}

const ADVANTAGE_ICONS = [Gem, ShieldCheck, Headset, Zap];

export function WhyChooseSection({ onLearnMore }: WhyChooseSectionProps) {
  const { t } = usePreferences();
  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 bg-[#0e0e0e] overflow-hidden border-y border-stone-900"
    >
      {/* Full-bleed dark automotive backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={BRAND_IMAGES.whyChoose}
          alt="Coupé grand tourisme noir sur avenue nocturne illuminée"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.68) 45%, rgba(10,10,10,0.92) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #0a0a0a 0%, transparent 25%, transparent 75%, #0a0a0a 100%)',
          }}
        />
        {/* Subtle emerald & gold glow accents */}
        <div
          className="absolute bottom-0 right-1/4 w-[480px] h-[220px] rounded-full blur-[120px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        />
      </div>

      <div id="services" className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Agency Presentation */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-10 bg-gold-gradient" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f5af19]">
                {t.why.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-stone-100 text-balance">
              {t.why.titleStart}{' '}
              <span className="block text-gold-gradient uppercase tracking-tight mt-1">
                AUROS CARS ?
              </span>
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-lg">
              {t.why.desc}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d]"
              >
                <span>{t.why.learnMore}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: 4 Gold-Icon Advantage Badges */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {t.why.advantages.map((item, idx) => {
              const Icon = ADVANTAGE_ICONS[idx] ?? Gem;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl bg-[#111111]/85 backdrop-blur-md border border-amber-500/20 hover:border-[#f5af19]/60 p-5 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/35 flex items-center justify-center text-[#f5af19] mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-stone-100 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
