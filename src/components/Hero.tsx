import { ArrowRight, Play, Gem, ShieldCheck, Headset, ChevronDown } from 'lucide-react';
import { BRAND_IMAGES } from '../data/fleetData';
import { usePreferences } from '../context/PreferencesContext';

interface HeroProps {
  onExploreFleet: () => void;
  onWatchVideo: () => void;
}

export function Hero({ onExploreFleet, onWatchVideo }: HeroProps) {
  const { t } = usePreferences();
  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-[820px] flex items-center pt-24 pb-16 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Supercar & Eagle Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src={BRAND_IMAGES.hero}
          alt="Supercar noire AUROS CARS avec aigle doré dans une ville illuminée la nuit"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center lg:object-[68%_center]"
        />
        {/* Measured scrim for crisp WCAG AA legibility + nocturnal emerald/gold ambiance */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(95deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.82) 38%, rgba(10,10,10,0.38) 68%, rgba(10,10,10,0.72) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.65) 0%, transparent 25%, transparent 68%, #0a0a0a 100%)',
          }}
        />
        {/* Subtle emerald nocturnal glow */}
        <div
          className="absolute -bottom-24 left-1/4 w-[540px] h-[240px] rounded-full blur-[110px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
        {/* Left Hero Editorial Copy */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-gold-gradient" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase text-[#f5af19]">
              {t.hero.eyebrow}
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] text-gold-gradient uppercase text-balance">
            AUROS CARS
          </h1>

          <p className="mt-2 font-serif italic font-semibold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] text-gold-gradient text-balance">
            {t.hero.slogan}
          </p>

          <p className="mt-5 text-base sm:text-lg text-stone-200/90 max-w-xl leading-relaxed font-normal">
            {t.hero.desc}
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExploreFleet}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d]"
            >
              <span>{t.hero.explore}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onWatchVideo}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-stone-100 border border-[#f5af19]/50 bg-[#111111]/65 backdrop-blur-sm hover:bg-[#f5af19]/15 hover:border-[#fde08d] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#f5af19] text-[#f5af19]">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              <span>{t.hero.watchVideo}</span>
            </button>
          </div>
        </div>

        {/* Right Side Luxury Highlights Rail (Desktop) */}
        <aside
          aria-label="Engagements AUROS CARS"
          className="hidden lg:flex flex-col gap-5 py-6 px-5 rounded-2xl bg-[#111111]/70 backdrop-blur-md border border-amber-500/20 self-end lg:self-center shrink-0"
        >
          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#f5af19]">
              <Gem className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-stone-200 leading-tight">
              {t.hero.luxuryCars}
            </span>
          </div>

          <div className="h-[1px] w-full bg-stone-800" aria-hidden="true" />

          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#f5af19]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-stone-200 leading-tight">
              {t.hero.fullInsurance}
            </span>
          </div>

          <div className="h-[1px] w-full bg-stone-800" aria-hidden="true" />

          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#f5af19]">
              <Headset className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-stone-200 leading-tight">
              {t.hero.support}
            </span>
          </div>
        </aside>
      </div>

      {/* Bottom Bar: Scroll Down + Brand Mantra */}
      <div className="absolute bottom-5 inset-x-0 z-10 max-w-[1320px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        <a
          href="#fleet"
          className="inline-flex items-center gap-2 text-xs font-medium text-stone-300 hover:text-[#fde08d] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19] rounded-md px-2 py-1"
        >
          <span className="w-5 h-7 rounded-full border border-amber-500/60 flex items-start justify-center p-1">
            <ChevronDown className="w-3 h-3 text-[#f5af19] animate-bounce" />
          </span>
          <span>{t.hero.scrollDown}</span>
        </a>

        <p className="hidden sm:block font-serif italic text-sm tracking-wide text-[#fde08d]/90">
          Rent · Drive · Enjoy
        </p>
      </div>
    </section>
  );
}
