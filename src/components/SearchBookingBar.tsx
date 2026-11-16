import { useState, type FormEvent } from 'react';
import { MapPin, CalendarDays, Clock, ChevronDown, Search } from 'lucide-react';
import {
  RENTAL_LOCATIONS,
  TIME_SLOTS,
  type SearchBookingCriteria,
} from '../data/fleetData';
import { usePreferences } from '../context/PreferencesContext';

interface SearchBookingBarProps {
  onSearch: (criteria: SearchBookingCriteria) => void;
}

export function SearchBookingBar({ onSearch }: SearchBookingBarProps) {
  const { t } = usePreferences();
  const today = new Date().toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];

  const [pickupLocation, setPickupLocation] = useState(RENTAL_LOCATIONS[0]);
  const [returnLocation, setReturnLocation] = useState(RENTAL_LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState(today);
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(threeDaysLater);
  const [returnTime, setReturnTime] = useState('10:00');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const start = new Date(`${pickupDate}T${pickupTime}:00`).getTime();
    const end = new Date(`${returnDate}T${returnTime}:00`).getTime();

    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      setError(t.search.dateError);
      return;
    }

    onSearch({
      pickupLocation,
      returnLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
    });
  };

  return (
    <section
      aria-label="Barre de recherche et réservation rapide"
      className="relative z-20 bg-[#0a0a0a] pt-8 sm:pt-10 pb-2 px-4 sm:px-8"
    >
      <div className="max-w-[1320px] mx-auto">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl bg-[#111111]/92 backdrop-blur-xl border border-amber-500/35 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9),0_0_32px_-12px_rgba(245,175,25,0.25)] p-3 sm:p-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:items-center gap-2.5 xl:gap-0 xl:divide-x xl:divide-stone-800/90">
            {/* Lieu de prise en charge */}
            <div className="xl:flex-[1.3] xl:pr-3 px-3 py-2 rounded-xl xl:rounded-none bg-[#0a0a0a]/65 xl:bg-transparent border border-stone-800/80 xl:border-0 min-w-0">
              <label
                htmlFor="search-pickup-location"
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1 whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[#f5af19] shrink-0" aria-hidden="true" />
                <span>{t.search.pickupLocation}</span>
              </label>
              <div className="relative flex items-center">
                <select
                  id="search-pickup-location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full pr-6 py-1 bg-transparent text-sm font-semibold text-stone-100 appearance-none truncate focus:outline-none focus:text-[#fde08d] cursor-pointer"
                >
                  {RENTAL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#111111] text-stone-100">
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-[#f5af19]/80 absolute right-0 pointer-events-none shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Lieu de retour */}
            <div className="xl:flex-[1.3] xl:px-3 px-3 py-2 rounded-xl xl:rounded-none bg-[#0a0a0a]/65 xl:bg-transparent border border-stone-800/80 xl:border-0 min-w-0">
              <label
                htmlFor="search-return-location"
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1 whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[#f5af19] shrink-0" aria-hidden="true" />
                <span>{t.search.returnLocation}</span>
              </label>
              <div className="relative flex items-center">
                <select
                  id="search-return-location"
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className="w-full pr-6 py-1 bg-transparent text-sm font-semibold text-stone-100 appearance-none truncate focus:outline-none focus:text-[#fde08d] cursor-pointer"
                >
                  {RENTAL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#111111] text-stone-100">
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-[#f5af19]/80 absolute right-0 pointer-events-none shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Date de début */}
            <div className="xl:flex-[0.95] xl:px-3 px-3 py-2 rounded-xl xl:rounded-none bg-[#0a0a0a]/65 xl:bg-transparent border border-stone-800/80 xl:border-0 min-w-0">
              <label
                htmlFor="search-pickup-date"
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1 whitespace-nowrap"
              >
                <CalendarDays className="w-3.5 h-3.5 text-[#f5af19] shrink-0" aria-hidden="true" />
                <span>{t.search.pickupDate}</span>
              </label>
              <input
                id="search-pickup-date"
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full py-1 bg-transparent text-sm font-semibold text-stone-100 tabular-nums [color-scheme:dark] focus:outline-none focus:text-[#fde08d]"
              />
            </div>

            {/* Heure de début */}
            <div className="xl:flex-[0.82] xl:px-3 px-3 py-2 rounded-xl xl:rounded-none bg-[#0a0a0a]/65 xl:bg-transparent border border-stone-800/80 xl:border-0 min-w-0">
              <label
                htmlFor="search-pickup-time"
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1 whitespace-nowrap"
              >
                <Clock className="w-3.5 h-3.5 text-[#f5af19] shrink-0" aria-hidden="true" />
                <span>{t.search.pickupTime}</span>
              </label>
              <div className="relative flex items-center">
                <select
                  id="search-pickup-time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full pr-5 py-1 bg-transparent text-sm font-semibold text-stone-100 tabular-nums appearance-none focus:outline-none focus:text-[#fde08d] cursor-pointer"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t} className="bg-[#111111] text-stone-100">
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-[#f5af19]/80 absolute right-0 pointer-events-none shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Date de retour */}
            <div className="xl:flex-[0.95] xl:px-3 px-3 py-2 rounded-xl xl:rounded-none bg-[#0a0a0a]/65 xl:bg-transparent border border-stone-800/80 xl:border-0 min-w-0">
              <label
                htmlFor="search-return-date"
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1 whitespace-nowrap"
              >
                <CalendarDays className="w-3.5 h-3.5 text-[#f5af19] shrink-0" aria-hidden="true" />
                <span>{t.search.returnDate}</span>
              </label>
              <input
                id="search-return-date"
                type="date"
                min={pickupDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full py-1 bg-transparent text-sm font-semibold text-stone-100 tabular-nums [color-scheme:dark] focus:outline-none focus:text-[#fde08d]"
              />
            </div>

            {/* Heure de retour */}
            <div className="xl:flex-[0.82] xl:px-3 px-3 py-2 rounded-xl xl:rounded-none bg-[#0a0a0a]/65 xl:bg-transparent border border-stone-800/80 xl:border-0 min-w-0">
              <label
                htmlFor="search-return-time"
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1 whitespace-nowrap"
              >
                <Clock className="w-3.5 h-3.5 text-[#f5af19] shrink-0" aria-hidden="true" />
                <span>{t.search.returnTime}</span>
              </label>
              <div className="relative flex items-center">
                <select
                  id="search-return-time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full pr-5 py-1 bg-transparent text-sm font-semibold text-stone-100 tabular-nums appearance-none focus:outline-none focus:text-[#fde08d] cursor-pointer"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t} className="bg-[#111111] text-stone-100">
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-[#f5af19]/80 absolute right-0 pointer-events-none shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="sm:col-span-2 lg:col-span-2 xl:pl-3 flex items-center">
              <button
                type="submit"
                className="w-full xl:w-auto h-12 px-6 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0a0a0a] bg-gold-gradient gold-glow-btn inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde08d]"
              >
                <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.search.searchBtn}</span>
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-2.5 px-2 text-xs font-medium text-amber-400" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
