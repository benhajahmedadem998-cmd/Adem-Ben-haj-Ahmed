import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crown,
  Fuel,
  Gauge,
  Heart,
  Luggage,
  Settings2,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import { type FleetVehicle } from '../data/fleetData';
import { usePreferences } from '../context/PreferencesContext';
import { useFleet } from '../context/FleetContext';

interface VehicleDetailPageProps {
  vehicle: FleetVehicle;
  onSelectVehicle: (vehicle: FleetVehicle) => void;
  onBackHome: () => void;
  onReserve: (vehicle: FleetVehicle) => void;
}

const LEFT_SIDEBAR_IDS = [
  'bmw-serie-3',
  'mercedes-classe-c',
  'audi-a4',
  'tesla-model-3',
  'toyota-corolla',
];

const RIGHT_SIDEBAR_IDS = [
  'mercedes-classe-c',
  'audi-a4',
  'bmw-serie-5',
  'tesla-model-3',
];

const SHOWROOM_CYCLE_IDS = [
  'bmw-serie-3',
  'mercedes-classe-c',
  'audi-a4',
  'tesla-model-3',
  'toyota-corolla',
  'bmw-serie-5',
];

export function VehicleDetailPage({
  vehicle,
  onSelectVehicle,
  onBackHome,
  onReserve,
}: VehicleDetailPageProps) {
  const { currency, t, formatAmount } = usePreferences();
  const { availableVehicles } = useFleet();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [specsExpanded, setSpecsExpanded] = useState(false);

  const isFavorite = Boolean(favorites[vehicle.id]);

  const toggleFavorite = () => {
    setFavorites((prev) => ({
      ...prev,
      [vehicle.id]: !prev[vehicle.id],
    }));
  };

  const leftVehicles = LEFT_SIDEBAR_IDS.map((id) =>
    availableVehicles.find((v) => v.id === id)
  ).filter((v): v is FleetVehicle => Boolean(v));

  const rightVehicles = RIGHT_SIDEBAR_IDS.map((id) =>
    availableVehicles.find((v) => v.id === id)
  ).filter((v): v is FleetVehicle => Boolean(v));

  // Build dynamic cycle list so Prev/Next arrows work seamlessly for any selected vehicle
  const defaultPool = SHOWROOM_CYCLE_IDS.map((id) => availableVehicles.find((v) => v.id === id)).filter(
    (v): v is FleetVehicle => Boolean(v)
  );
  const showroomPool =
    defaultPool.length > 0
      ? defaultPool.some((v) => v.id === vehicle.id)
        ? defaultPool
        : [vehicle, ...defaultPool]
      : availableVehicles.length > 0
        ? availableVehicles
        : [vehicle];

  const currentIdx = Math.max(
    0,
    showroomPool.findIndex((v) => v.id === vehicle.id)
  );

  const handlePrevModel = () => {
    const prevIdx = (currentIdx - 1 + showroomPool.length) % showroomPool.length;
    onSelectVehicle(showroomPool[prevIdx]);
  };

  const handleNextModel = () => {
    const nextIdx = (currentIdx + 1) % showroomPool.length;
    onSelectVehicle(showroomPool[nextIdx]);
  };

  return (
    <section className="relative pt-24 sm:pt-28 pb-16 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle nocturnal gold + emerald atmospheric glow */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[380px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245,175,25,0.45) 0%, rgba(16,185,129,0.22) 55%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Strict 3-Column Layout: Left ("Catégories") | Center (Main Vehicle) | Right ("Options similaires") */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Colonne de Gauche : "Catégories" */}
          <aside className="lg:col-span-3 order-2 lg:order-1 rounded-2xl bg-[#111111]/95 border border-amber-500/35 shadow-[0_0_32px_-14px_rgba(245,175,25,0.3)] p-4 sm:p-5 flex flex-col justify-between gap-5">
            <div>
              {/* Panel Header */}
              <div className="pb-3 mb-4 border-b border-stone-800/90 relative">
                <div className="flex items-center gap-2.5">
                  <CarFront className="w-5 h-5 text-[#f5af19] shrink-0" aria-hidden="true" />
                  <h2 className="text-base font-bold text-stone-100 tracking-tight">
                    {t.detail.categories}
                  </h2>
                </div>
                <span
                  className="absolute bottom-0 left-0 w-16 h-[2px] bg-gold-gradient rounded-full"
                  aria-hidden="true"
                />
              </div>

              {/* Vertical List of Interactive Car Miniature Cards */}
              <div className="space-y-2.5">
                {leftVehicles.map((item) => {
                  const isActive = item.id === vehicle.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectVehicle(item)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`group w-full rounded-xl p-2.5 flex items-center justify-between gap-3 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19] ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500/18 via-[#1a150b] to-[#111111] border border-[#f5af19] shadow-[0_0_24px_-8px_rgba(245,175,25,0.5)]'
                          : 'bg-[#0a0a0a]/90 border border-stone-800/90 hover:border-amber-500/55 hover:bg-[#141414]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-16 h-11 rounded-lg overflow-hidden bg-[#050505] border border-stone-800/80 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                            isActive
                              ? 'text-[#fde08d]'
                              : 'text-stone-200 group-hover:text-[#fde08d]'
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>

                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          isActive
                            ? 'bg-gold-gradient text-[#0a0a0a] shadow-[0_0_12px_rgba(245,175,25,0.65)]'
                            : 'bg-[#f5af19]/90 text-[#0a0a0a]'
                        }`}
                        aria-hidden="true"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Button: "Voir Toutes les Voitures ->" */}
            <button
              type="button"
              onClick={onBackHome}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-[#fde08d] border border-amber-500/45 bg-[#0a0a0a]/80 hover:bg-gold-gradient hover:text-[#0a0a0a] hover:border-transparent transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
            >
              <span>{t.detail.seeAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </aside>

          {/* Colonne Centrale : "Détails du Modèle Principal" */}
          <article className="lg:col-span-6 order-1 lg:order-2 rounded-2xl bg-[#111111]/95 border border-amber-500/45 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.9),0_0_36px_-12px_rgba(245,175,25,0.28)] overflow-hidden flex flex-col justify-between">
            {/* Showcase Image Frame with Top Badge, Favorite Icon & Dynamic Prev/Next Arrows */}
            <div className="relative aspect-[16/10] bg-[#070707] overflow-hidden">
              <img
                key={vehicle.id}
                src={vehicle.image}
                alt={vehicle.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover animate-showcase-enter"
              />

              {/* Subtle Top & Bottom Scrim */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.6) 0%, transparent 32%, transparent 55%, rgba(17,17,17,0.98) 100%)',
                }}
              />

              {/* Top Overlay: "Premium" Badge & Heart Favorite Toggle */}
              <div className="absolute top-4 inset-x-4 sm:inset-x-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-amber-500/50 text-xs font-semibold text-[#fde08d] shadow-md">
                  <Crown className="w-3.5 h-3.5 text-[#f5af19]" aria-hidden="true" />
                  <span>{t.detail.premium}</span>
                </span>

                <button
                  type="button"
                  onClick={toggleFavorite}
                  aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  aria-pressed={isFavorite}
                  className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19] ${
                    isFavorite
                      ? 'bg-amber-500/20 border-[#f5af19] text-[#f5af19]'
                      : 'bg-[#0a0a0a]/75 border-stone-700 text-stone-200 hover:border-amber-500/60 hover:text-[#fde08d]'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? 'fill-[#f5af19] text-[#f5af19]' : ''}`}
                  />
                </button>
              </div>

              {/* Dynamic Prev / Next Model Switcher Arrows */}
              <button
                type="button"
                onClick={handlePrevModel}
                aria-label="Modèle précédent"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0a0a0a]/75 backdrop-blur-md border border-amber-500/35 text-stone-200 hover:text-[#0a0a0a] hover:bg-gold-gradient hover:border-transparent flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNextModel}
                aria-label="Modèle suivant"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0a0a0a]/75 backdrop-blur-md border border-amber-500/35 text-stone-200 hover:text-[#0a0a0a] hover:bg-gold-gradient hover:border-transparent flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Model Identity, Price, Specs Bar & CTA */}
            <div
              key={`meta-${vehicle.id}`}
              className="px-5 sm:px-7 pb-6 pt-2 flex-1 flex flex-col justify-between gap-5 animate-showcase-enter"
            >
              {/* Name, Slogan & Prominent Price */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold italic tracking-tight text-stone-100 leading-tight">
                    {vehicle.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1">
                    {vehicle.subtitle}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <div className="flex items-baseline sm:justify-end gap-1.5">
                    {currency === 'USD' && (
                      <span className="text-xl sm:text-2xl font-extrabold italic text-[#fde08d]">
                        $
                      </span>
                    )}
                    <span className="text-2xl sm:text-3xl font-extrabold italic text-gold-gradient tabular-nums">
                      {formatAmount(vehicle.pricePerDay)}
                    </span>
                    <span className="text-base font-bold italic text-[#f5af19]">
                      {currency}
                    </span>
                  </div>
                  <span className="block text-xs text-stone-400 font-medium">
                    {t.detail.perDay}
                  </span>
                </div>
              </div>

              {/* Gold Accent Divider */}
              <div
                className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/55 to-transparent"
                aria-hidden="true"
              />

              {/* Technical Specs Bar: Puissance | Boîte de vitesse | Carburant */}
              <div className="grid grid-cols-3 divide-x divide-stone-800/90 py-1">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-2 text-center sm:text-left">
                  <Gauge className="w-6 h-6 text-[#f5af19] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-stone-100 tabular-nums">
                      {vehicle.power}
                    </p>
                    <p className="text-[11px] text-stone-400">{t.detail.power}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-2 text-center sm:text-left">
                  <Settings2 className="w-6 h-6 text-[#f5af19] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-stone-100">
                      {vehicle.transmission}
                    </p>
                    <p className="text-[11px] text-stone-400">{t.detail.transmission}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-2 text-center sm:text-left">
                  <Fuel className="w-6 h-6 text-[#f5af19] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-stone-100">
                      {vehicle.fuel}
                    </p>
                    <p className="text-[11px] text-stone-400">{t.detail.fuel}</p>
                  </div>
                </div>
              </div>

              {/* Expandable Full Technical Sheet (on-demand without cluttering default showcase) */}
              {specsExpanded && (
                <div className="rounded-xl bg-[#0a0a0a]/90 border border-amber-500/25 p-4 space-y-3 text-left">
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {vehicle.description}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-stone-300 pt-1 border-t border-stone-800/80">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#f5af19] shrink-0" aria-hidden="true" />
                      <span>{vehicle.seats} {t.detail.places}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Luggage className="w-3.5 h-3.5 text-[#f5af19] shrink-0" aria-hidden="true" />
                      <span>{vehicle.luggage}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 col-span-2 sm:col-span-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                      <span>{vehicle.acceleration}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {vehicle.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1.5 text-[11px] text-stone-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#f5af19] shrink-0" aria-hidden="true" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Glowing Gold CTA Button + Optional Full Specs Toggle */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onReserve(vehicle)}
                  className="inline-flex items-center justify-center gap-2.5 px-10 py-3.5 rounded-full text-sm sm:text-base font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d]"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>{t.detail.reserve}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => setSpecsExpanded((prev) => !prev)}
                  aria-expanded={specsExpanded}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-xs font-semibold text-stone-200 border border-stone-700 bg-[#0a0a0a]/80 hover:border-amber-500/55 hover:text-[#fde08d] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
                >
                  <span>{specsExpanded ? t.detail.hideDetails : t.detail.techSheet}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      specsExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </article>

          {/* Colonne de Droite : "Options similaires" */}
          <aside className="lg:col-span-3 order-3 rounded-2xl bg-[#111111]/95 border border-amber-500/35 shadow-[0_0_32px_-14px_rgba(245,175,25,0.3)] p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div>
              {/* Panel Header */}
              <div className="pb-3 mb-4 border-b border-stone-800/90 relative">
                <div className="flex items-center gap-2.5">
                  <Star
                    className="w-5 h-5 text-[#f5af19] fill-[#f5af19] shrink-0"
                    aria-hidden="true"
                  />
                  <h2 className="text-base font-bold text-stone-100 tracking-tight">
                    {t.detail.similarOptions}
                  </h2>
                </div>
                <span
                  className="absolute bottom-0 left-0 w-16 h-[2px] bg-gold-gradient rounded-full"
                  aria-hidden="true"
                />
              </div>

              {/* Vertical List of Alternative / Similar Vehicles */}
              <div className="space-y-3">
                {rightVehicles.map((item) => {
                  const isActive = item.id === vehicle.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectVehicle(item)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`group w-full rounded-xl p-3 flex items-center justify-between gap-3 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19] ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500/18 via-[#1a150b] to-[#111111] border border-[#f5af19] shadow-[0_0_24px_-8px_rgba(245,175,25,0.5)]'
                          : 'bg-[#0a0a0a]/90 border border-stone-800/90 hover:border-amber-500/55 hover:bg-[#141414]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-[#050505] border border-stone-800/80 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                              isActive
                                ? 'text-[#fde08d]'
                                : 'text-stone-100 group-hover:text-[#fde08d]'
                            }`}
                          >
                            {item.name}
                          </h3>
                          <p className="text-xs font-bold text-gold-gradient tabular-nums mt-0.5">
                            {currency === 'USD' ? `$${formatAmount(item.pricePerDay)} USD` : `${formatAmount(item.pricePerDay)} TND`}{' '}
                            <span className="text-[10px] font-normal text-stone-400">
                              {t.detail.perDay}
                            </span>
                          </p>
                        </div>
                      </div>

                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          isActive
                            ? 'bg-gold-gradient text-[#0a0a0a] shadow-[0_0_12px_rgba(245,175,25,0.65)]'
                            : 'bg-[#f5af19]/90 text-[#0a0a0a]'
                        }`}
                        aria-hidden="true"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl bg-[#0a0a0a]/80 border border-stone-800/80 p-3.5 text-center">
              <p className="text-xs font-medium text-stone-300">
                {t.detail.insuranceBanner}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
