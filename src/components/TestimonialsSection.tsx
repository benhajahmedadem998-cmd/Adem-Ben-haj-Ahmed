import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/fleetData';
import { usePreferences } from '../context/PreferencesContext';

export function TestimonialsSection() {
  const { t } = usePreferences();
  const [startIndex, setStartIndex] = useState(0);

  const total = TESTIMONIALS.length;

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const visibleTestimonials = [
    TESTIMONIALS[startIndex % total],
    TESTIMONIALS[(startIndex + 1) % total],
    TESTIMONIALS[(startIndex + 2) % total],
  ];

  return (
    <section className="relative py-20 bg-[#0a0a0a] overflow-hidden">
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-48 blur-[120px] opacity-15 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245,175,25,0.45) 0%, rgba(16,185,129,0.25) 55%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#f5af19]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gold-gradient tracking-tight">
              {t.testimonials.title}
            </h2>
            <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#f5af19]" />
          </div>
          <p className="text-sm text-stone-300">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Carousel Row */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Avis précédent"
            className="shrink-0 w-10 h-10 rounded-full border border-amber-500/40 bg-[#111111] text-[#fde08d] flex items-center justify-center hover:border-[#f5af19] hover:bg-amber-500/15 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
            {visibleTestimonials.map((item, idx) => (
              <article
                key={`${item.id}-${idx}`}
                className={`rounded-2xl bg-[#111111]/95 border border-amber-500/20 hover:border-amber-500/45 p-6 transition-all duration-200 flex flex-col justify-between gap-4 ${
                  idx === 2 ? 'hidden md:flex' : idx === 1 ? 'hidden sm:flex' : 'flex'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Circular Gold-Rimmed Client Avatar */}
                  <div className="w-13 h-13 rounded-full p-[2px] bg-gold-gradient shrink-0">
                    <div className="w-full h-full rounded-full bg-[#191610] flex items-center justify-center text-sm font-bold text-[#fde08d] tracking-wide">
                      {item.initials}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-stone-100 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 truncate">{item.role}</p>
                    <div
                      className="flex items-center gap-1 mt-1"
                      aria-label={`Note ${item.rating} sur 5 étoiles`}
                    >
                      {Array.from({ length: item.rating }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-3.5 h-3.5 text-[#f5af19] fill-[#f5af19]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  « {item.quote} »
                </blockquote>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Avis suivant"
            className="shrink-0 w-10 h-10 rounded-full border border-amber-500/40 bg-[#111111] text-[#fde08d] flex items-center justify-center hover:border-[#f5af19] hover:bg-amber-500/15 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-7 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setStartIndex(idx)}
              aria-label={`Afficher l'avis de ${t.name}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === startIndex
                  ? 'w-7 bg-gold-gradient'
                  : 'w-2 bg-stone-700 hover:bg-stone-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
