import { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  CarFront,
  Flag,
  Leaf,
  Users,
  Gauge,
  Settings2,
  Fuel,
  Snowflake,
  Check,
  X,
} from 'lucide-react';
import {
  VEHICLE_CATEGORIES,
  type CategoryId,
  type FleetVehicle,
} from '../data/fleetData';
import { usePreferences } from '../context/PreferencesContext';
import { useFleet } from '../context/FleetContext';

interface CategoryFleetSectionProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  onReserveVehicle: (vehicle: FleetVehicle) => void;
  onSelectVehicleDetail: (vehicle: FleetVehicle) => void;
}

const CATEGORY_ICONS: Record<CategoryId, typeof Crown> = {
  luxe: Crown,
  suv: CarFront,
  sport: Flag,
  eco: Leaf,
  van: Users,
};

export function CategoryFleetSection({
  selectedCategory,
  onSelectCategory,
  onReserveVehicle,
  onSelectVehicleDetail,
}: CategoryFleetSectionProps) {
  const { t, formatPrice } = usePreferences();
  const { availableVehicles } = useFleet();
  const [filteredSectionOpen, setFilteredSectionOpen] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const filteredSectionRef = useRef<HTMLDivElement | null>(null);

  const currentIdx = VEHICLE_CATEGORIES.findIndex((c) => c.id === selectedCategory);
  const filteredVehicles = availableVehicles.filter((v) => v.categoryId === selectedCategory);
  const activeCategoryObj = VEHICLE_CATEGORIES[currentIdx] ?? VEHICLE_CATEGORIES[0];

  const scrollCardIntoTrack = (categoryId: CategoryId) => {
    const track = trackRef.current;
    const card = cardRefs.current[categoryId];
    if (!track || !card) return;

    const targetLeft =
      card.offsetLeft - track.clientWidth / 2 + card.clientWidth / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollCardIntoTrack(selectedCategory);
  }, [selectedCategory]);

  const handleCycle = (dir: -1 | 1) => {
    const nextIdx = (currentIdx + dir + VEHICLE_CATEGORIES.length) % VEHICLE_CATEGORIES.length;
    const nextId = VEHICLE_CATEGORIES[nextIdx].id;
    onSelectCategory(nextId);
    scrollCardIntoTrack(nextId);
  };

  const handleSelectCard = (id: CategoryId) => {
    onSelectCategory(id);
    scrollCardIntoTrack(id);
  };

  const handleOpenCategoryShowcase = (id: CategoryId) => {
    onSelectCategory(id);
    scrollCardIntoTrack(id);
    setFilteredSectionOpen(true);

    setTimeout(() => {
      filteredSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 60);
  };

  return (
    <section id="fleet" className="relative pt-14 sm:pt-16 pb-20 sm:pb-24 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle nocturnal emerald + gold ambient glow */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[340px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16,185,129,0.55) 0%, rgba(245,175,25,0.28) 45%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#f5af19]" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-gradient tracking-tight text-balance">
              {t.fleet.heading}
            </h2>
            <span className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#f5af19]" />
          </div>
          <p className="text-sm sm:text-base text-stone-300 font-normal">
            {t.fleet.subheading}
          </p>
        </div>

        {/* Interactive Horizontal Category Carousel Slider */}
        <div className="relative flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => handleCycle(-1)}
            aria-label="Catégorie précédente"
            className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-amber-500/45 bg-[#111111]/95 text-[#fde08d] flex items-center justify-center hover:border-[#f5af19] hover:bg-amber-500/15 hover:shadow-[0_0_20px_-4px_rgba(245,175,25,0.45)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19] z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={trackRef}
            role="region"
            aria-label="Carrousel des catégories de véhicules"
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-3 px-1 flex-1"
          >
            {VEHICLE_CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.id];
              const isSelected = category.id === selectedCategory;
              const categoryCount = availableVehicles.filter((v) => v.categoryId === category.id).length;

              return (
                <article
                  key={category.id}
                  ref={(el) => {
                    cardRefs.current[category.id] = el;
                  }}
                  onClick={() => handleSelectCard(category.id)}
                  className={`group relative snap-center shrink-0 flex-[0_0_82%] sm:flex-[0_0_47%] md:flex-[0_0_31.5%] lg:flex-[0_0_calc((100%-3.75rem)/4)] rounded-2xl overflow-hidden bg-[#111111] border cursor-pointer category-card-glow flex flex-col justify-between p-4 transition-all duration-300 ${
                    isSelected
                      ? 'border-[#f5af19] shadow-[0_0_32px_-8px_rgba(245,175,25,0.45),0_0_24px_-8px_rgba(16,185,129,0.28)] scale-[1.01]'
                      : 'border-stone-800/90 hover:border-amber-500/60 opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* Top subtle emerald/gold rim */}
                  <div
                    className={`absolute inset-x-0 top-0 h-24 pointer-events-none transition-opacity duration-200 ${
                      isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-90'
                    }`}
                    style={{
                      background:
                        category.accentTone === 'emerald'
                          ? 'radial-gradient(ellipse at top, rgba(16,185,129,0.28), transparent 75%)'
                          : 'radial-gradient(ellipse at top, rgba(245,175,25,0.25), transparent 75%)',
                    }}
                  />

                  {/* Category Icon */}
                  <div className="relative z-10 flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-[#0a0a0a]/80 border border-amber-500/35 flex items-center justify-center text-[#f5af19] mx-auto group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Car Visual Container */}
                  <div className="relative z-10 aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#0a0a0a] my-2">
                    <img
                      src={category.image}
                      alt={t.fleet.categories[category.id].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent 55%, rgba(17,17,17,0.85) 100%)',
                      }}
                    />
                  </div>

                  {/* Category Copy & CTA */}
                  <div className="relative z-10 text-center pt-1 flex flex-col items-center">
                    <h3 className="text-base font-bold text-stone-100 group-hover:text-[#fde08d] transition-colors">
                      {t.fleet.categories[category.id].title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 mb-4">
                      {t.fleet.categories[category.id].subtitle} · {categoryCount}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCategoryShowcase(category.id);
                      }}
                      className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d] ${
                        isSelected
                          ? 'bg-gold-gradient text-[#0a0a0a] gold-glow-btn'
                          : 'bg-[#1a1a1a] text-[#fde08d] border border-amber-500/35 group-hover:bg-gold-gradient group-hover:text-[#0a0a0a] group-hover:border-transparent'
                      }`}
                    >
                      <span>{t.fleet.seeVehicles}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => handleCycle(1)}
            aria-label="Catégorie suivante"
            className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-amber-500/45 bg-[#111111]/95 text-[#fde08d] flex items-center justify-center hover:border-[#f5af19] hover:bg-amber-500/15 hover:shadow-[0_0_20px_-4px_rgba(245,175,25,0.45)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19] z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slider Indicator Dots & Direct Showroom Showcase Link */}
        <div className="mt-5 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2">
            {VEHICLE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCard(cat.id)}
                aria-label={`Sélectionner ${t.fleet.categories[cat.id].title}`}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  cat.id === selectedCategory
                    ? 'w-7 bg-gold-gradient'
                    : 'w-2 bg-stone-700 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>

          {availableVehicles[0] && (
            <button
              type="button"
              onClick={() => onSelectVehicleDetail(availableVehicles[0])}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#fde08d] border border-amber-500/40 bg-[#111111]/90 hover:border-[#f5af19] hover:bg-amber-500/12 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
            >
              <span>{t.fleet.discoverModels}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dedicated Filtered Category Showcase Section (Appears & Scrolls Into View on "Voir les véhicules →") */}
        {filteredSectionOpen && (
          <div
            ref={filteredSectionRef}
            id="category-filtered-section"
            className="mt-14 scroll-mt-24 rounded-2xl bg-[#111111]/95 border border-amber-500/35 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.9),0_0_36px_-12px_rgba(245,175,25,0.22)] p-5 sm:p-8 animate-showcase-enter"
          >
            {/* Header with Chosen Category Title & Close Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-800/90">
              <div className="space-y-1">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#f5af19]">
                  {t.fleet.modalEyebrow} · {filteredVehicles.length}{' '}
                  {filteredVehicles.length > 1 ? 'modèles' : 'modèle'}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gold-gradient tracking-tight">
                  {t.fleet.categories[activeCategoryObj.id].title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400">
                  {t.fleet.categories[activeCategoryObj.id].subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFilteredSectionOpen(false)}
                aria-label="Fermer la section catégorie"
                className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-stone-800 bg-[#0a0a0a] text-xs font-semibold text-stone-300 hover:text-[#fde08d] hover:border-amber-500/50 cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Fermer</span>
              </button>
            </div>

            {/* Category Quick-Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filtrer par catégorie"
              className="mt-5 flex items-center gap-1.5 bg-[#0a0a0a] p-1.5 rounded-xl border border-stone-800/90 overflow-x-auto no-scrollbar"
            >
              {VEHICLE_CATEGORIES.map((cat) => {
                const active = cat.id === selectedCategory;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      active
                        ? 'bg-gold-gradient text-[#0a0a0a] font-bold'
                        : 'text-stone-400 hover:text-stone-100 hover:bg-white/[0.04]'
                    }`}
                  >
                    {t.fleet.categories[cat.id].title}
                  </button>
                );
              })}
            </div>

            {/* Filtered Vehicle Cards */}
            {filteredVehicles.length === 0 ? (
              <div className="mt-6 rounded-xl bg-[#0a0a0a] border border-stone-800 p-10 text-center text-sm text-stone-400">
                {t.fleet.noVehiclesInCategory}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVehicles.map((vehicle) => (
                  <article
                    key={vehicle.id}
                    className="group rounded-2xl bg-[#0a0a0a] border border-stone-800/90 hover:border-amber-500/55 overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-lg"
                  >
                    {/* Vehicle Photo + Category Badge */}
                    <div
                      onClick={() => onSelectVehicleDetail(vehicle)}
                      className="aspect-[16/10] relative overflow-hidden bg-[#141414] cursor-pointer"
                    >
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(10,10,10,0.45) 0%, transparent 45%, rgba(10,10,10,0.85) 100%)',
                        }}
                      />
                      <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full bg-[#0a0a0a]/85 backdrop-blur-md border border-amber-500/45 text-[11px] font-bold text-[#fde08d]">
                        {t.fleet.categories[vehicle.categoryId].title}
                      </span>
                    </div>

                    {/* Card Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <h4
                            onClick={() => onSelectVehicleDetail(vehicle)}
                            className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-[#fde08d] transition-colors leading-snug cursor-pointer"
                          >
                            {vehicle.name}
                          </h4>
                          <div className="text-right shrink-0">
                            <span className="text-lg font-extrabold text-gold-gradient tabular-nums">
                              {formatPrice(vehicle.pricePerDay)}
                            </span>
                            <span className="block text-[11px] text-stone-400">
                              {t.fleet.perDay}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                          {vehicle.subtitle}
                        </p>

                        {/* Technical Characteristics (Icons + Text) */}
                        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-stone-300">
                          <span className="inline-flex items-center gap-1.5">
                            <Gauge className="w-3.5 h-3.5 text-[#f5af19] shrink-0" />
                            <span className="tabular-nums truncate">{vehicle.power}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Settings2 className="w-3.5 h-3.5 text-[#f5af19] shrink-0" />
                            <span className="truncate">{vehicle.transmission}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Fuel className="w-3.5 h-3.5 text-[#f5af19] shrink-0" />
                            <span className="truncate">{vehicle.fuel}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-[#f5af19] shrink-0" />
                            <span className="tabular-nums">{vehicle.seats} {t.detail.places}</span>
                          </span>
                          {vehicle.hasAc !== false && (
                            <span className="inline-flex items-center gap-1.5 col-span-2 text-stone-300">
                              <Snowflake className="w-3.5 h-3.5 text-[#f5af19] shrink-0" />
                              <span>{t.fleet.acIncluded}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-3.5 border-t border-stone-800/80 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                            <Check className="w-3.5 h-3.5 shrink-0" />
                            <span>{t.fleet.insuranceIncluded}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => onSelectVehicleDetail(vehicle)}
                            className="text-xs font-semibold text-[#fde08d] hover:underline underline-offset-4 cursor-pointer"
                          >
                            {t.fleet.details} →
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onReserveVehicle(vehicle)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d]"
                        >
                          <span>{t.fleet.reserveThisVehicle}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
