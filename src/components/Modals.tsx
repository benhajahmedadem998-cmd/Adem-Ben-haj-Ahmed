import { useState, useEffect, type FormEvent } from 'react';
import {
  X,
  Calendar,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Headset,
  PlaneLanding,
  Sparkles,
  Play,
  Pause,
  ChevronRight,
  Clock,
} from 'lucide-react';
import {
  BRAND_IMAGES,
  VEHICLE_CATEGORIES,
  RENTAL_LOCATIONS,
  TIME_SLOTS,
  type FleetVehicle,
  type SearchBookingCriteria,
} from '../data/fleetData';
import { usePreferences } from '../context/PreferencesContext';
import { useFleet } from '../context/FleetContext';

interface BookingModalProps {
  isOpen: boolean;
  initialVehicle: FleetVehicle | null;
  initialSearch?: SearchBookingCriteria | null;
  onClose: () => void;
}

export function BookingModal({
  isOpen,
  initialVehicle,
  initialSearch,
  onClose,
}: BookingModalProps) {
  const { t, formatPrice } = usePreferences();
  const { availableVehicles } = useFleet();
  const today = new Date().toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];

  const [vehicleId, setVehicleId] = useState(initialVehicle?.id ?? availableVehicles[0]?.id ?? '');
  const [pickupDate, setPickupDate] = useState(initialSearch?.pickupDate ?? today);
  const [pickupTime, setPickupTime] = useState(initialSearch?.pickupTime ?? '10:00');
  const [returnDate, setReturnDate] = useState(initialSearch?.returnDate ?? threeDaysLater);
  const [returnTime, setReturnTime] = useState(initialSearch?.returnTime ?? '10:00');
  const [location, setLocation] = useState(
    initialSearch?.pickupLocation ?? RENTAL_LOCATIONS[0]
  );
  const [returnLocation, setReturnLocation] = useState(
    initialSearch?.returnLocation ?? RENTAL_LOCATIONS[0]
  );
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [confirmationRef, setConfirmationRef] = useState<string | null>(null);

  useEffect(() => {
    if (initialVehicle) {
      setVehicleId(initialVehicle.id);
    }
  }, [initialVehicle]);

  useEffect(() => {
    if (initialSearch) {
      setLocation(initialSearch.pickupLocation);
      setReturnLocation(initialSearch.returnLocation);
      setPickupDate(initialSearch.pickupDate);
      setPickupTime(initialSearch.pickupTime);
      setReturnDate(initialSearch.returnDate);
      setReturnTime(initialSearch.returnTime);
    }
  }, [initialSearch]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedVehicle =
    availableVehicles.find((v) => v.id === vehicleId) ?? initialVehicle ?? availableVehicles[0];

  if (!selectedVehicle) return null;

  const startMs = new Date(pickupDate).getTime();
  const endMs = new Date(returnDate).getTime();
  const days =
    Number.isFinite(startMs) && Number.isFinite(endMs) && endMs > startMs
      ? Math.ceil((endMs - startMs) / 86400000)
      : 1;
  const totalPrice = days * selectedVehicle.pricePerDay;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setError('Veuillez remplir votre nom, numéro de téléphone et adresse e-mail.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Adresse e-mail invalide.');
      return;
    }

    if (endMs <= startMs) {
      setError('La date de retour doit être postérieure à la date de prise en charge.');
      return;
    }

    const ref = `AUROS-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationRef(ref);
  };

  const resetAndClose = () => {
    setConfirmationRef(null);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#111111] border border-amber-500/35 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#0a0a0a]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f5af19]">
              {t.booking.eyebrow}
            </p>
            <h2 id="booking-modal-title" className="text-lg sm:text-xl font-bold text-stone-100">
              {t.booking.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Fermer la fenêtre de réservation"
            className="w-9 h-9 rounded-full border border-stone-800 bg-[#151515] text-stone-300 hover:text-[#fde08d] hover:border-amber-500/50 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmationRef ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5af19]">
                {t.booking.confirmedEyebrow}
              </p>
              <h3 className="text-2xl font-bold text-stone-100 mt-1">
                {t.booking.reference} {confirmationRef}
              </h3>
              <p className="text-sm text-stone-300 mt-2 max-w-md mx-auto">
                Merci {fullName}. Votre demande pour{' '}
                <strong className="text-[#fde08d]">{selectedVehicle.name}</strong> ({days}{' '}
                {days > 1 ? t.booking.days : t.booking.day}) a bien été transmise à notre agence de Tunis.
              </p>
            </div>

            <div className="rounded-xl bg-[#0a0a0a] border border-stone-800 p-4 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
              <div className="flex justify-between gap-2">
                <span className="text-stone-400">{t.booking.pickupLocation}</span>
                <span className="text-stone-100 font-medium text-right">{location}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-stone-400">{t.booking.returnLocation}</span>
                <span className="text-stone-100 font-medium text-right">{returnLocation}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-stone-400">{t.booking.startDateTime}</span>
                <span className="text-stone-100 font-medium tabular-nums text-right">
                  {pickupDate} ({pickupTime}) → {returnDate} ({returnTime})
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-800">
                <span className="text-stone-300 font-semibold">{t.booking.estimateFor} ({t.booking.insuranceIncluded})</span>
                <span className="text-[#fde08d] font-bold tabular-nums">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={resetAndClose}
              className="px-7 py-3 rounded-full text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn cursor-pointer"
            >
              {t.booking.backToFleet}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
            {/* Vehicle preview banner */}
            <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#0a0a0a] border border-stone-800">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                referrerPolicy="no-referrer"
                className="w-24 h-18 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <label htmlFor="booking-vehicle" className="block text-[11px] uppercase tracking-wider text-[#f5af19] font-semibold mb-1">
                  {t.booking.selectedModel}
                </label>
                <select
                  id="booking-vehicle"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full bg-[#151515] border border-stone-700 rounded-lg px-3 py-2 text-sm font-semibold text-stone-100 focus:outline-none focus:border-[#f5af19]"
                >
                  {availableVehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} — {formatPrice(v.pricePerDay)} {t.fleet.perDay}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickup-date" className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#f5af19]" />
                  <span>{t.booking.startDateTime}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="pickup-date"
                    type="date"
                    min={today}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-[#f5af19] tabular-nums"
                  />
                  <div className="relative flex items-center w-24 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#f5af19] absolute left-2.5 pointer-events-none" />
                    <select
                      aria-label="Heure de début"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full pl-8 pr-2 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 tabular-nums focus:outline-none focus:border-[#f5af19]"
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="return-date" className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#f5af19]" />
                  <span>{t.booking.returnDateTime}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="return-date"
                    type="date"
                    min={pickupDate}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-[#f5af19] tabular-nums"
                  />
                  <div className="relative flex items-center w-24 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#f5af19] absolute left-2.5 pointer-events-none" />
                    <select
                      aria-label="Heure de retour"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="w-full pl-8 pr-2 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 tabular-nums focus:outline-none focus:border-[#f5af19]"
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickup-location" className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f5af19]" />
                  <span>{t.booking.pickupLocation}</span>
                </label>
                <select
                  id="pickup-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-[#f5af19]"
                >
                  {RENTAL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="return-location" className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f5af19]" />
                  <span>{t.booking.returnLocation}</span>
                </label>
                <select
                  id="return-location"
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-[#f5af19]"
                >
                  {RENTAL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label htmlFor="driver-name" className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Nom complet
                </label>
                <input
                  id="driver-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Sami Ben Amor"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#f5af19]"
                />
              </div>
              <div>
                <label htmlFor="driver-phone" className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Téléphone
                </label>
                <input
                  id="driver-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+216 20 000 000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#f5af19]"
                />
              </div>
              <div>
                <label htmlFor="driver-email" className="block text-xs font-semibold text-stone-300 mb-1.5">
                  E-mail
                </label>
                <input
                  id="driver-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.tn"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#f5af19]"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs font-medium text-amber-400" role="alert">
                {error}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-800">
              <div>
                <span className="text-xs text-stone-400">
                  {t.booking.estimateFor}{' '}
                  <strong className="text-stone-200 tabular-nums">{days}</strong>{' '}
                  {days > 1 ? t.booking.days : t.booking.day} · {t.booking.insuranceIncluded}
                </span>
                <p className="text-xl font-extrabold text-gold-gradient tabular-nums">
                  {formatPrice(totalPrice)}
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn whitespace-nowrap cursor-pointer"
              >
                <span>{t.booking.confirmBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export function VideoModal({ isOpen, onClose, onBookNow }: VideoModalProps) {
  const [playing, setPlaying] = useState(true);
  const [slideIdx, setSlideIdx] = useState(0);

  const scenes = [
    {
      title: 'Chapitre 01 · Nocturne Supercar',
      subtitle: 'L’allure incomparable sur les avenues illuminées de Tunis.',
      image: BRAND_IMAGES.hero,
    },
    {
      title: 'Chapitre 02 · Grand Tourisme',
      subtitle: 'Puissance maîtrisée, confort acoustique et finition d’exception.',
      image: BRAND_IMAGES.whyChoose,
    },
    {
      title: 'Chapitre 03 · Collection 2026',
      subtitle: 'Berlines de prestige, SUV 4x4 et coupés sportifs prêts au départ.',
      image: VEHICLE_CATEGORIES[2].image,
    },
  ];

  useEffect(() => {
    if (!isOpen || !playing) return;
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % scenes.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [isOpen, playing, scenes.length]);

  if (!isOpen) return null;

  const activeScene = scenes[slideIdx];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Film de présentation AUROS CARS"
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0e0e0e] border border-amber-500/35 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-800">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#f5af19]">
            AUROS CARS · Brand Showcase
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la vidéo"
            className="w-8 h-8 rounded-full border border-stone-800 text-stone-300 hover:text-[#fde08d] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative aspect-video bg-black overflow-hidden">
          <img
            src={activeScene.image}
            alt={activeScene.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.88) 100%)',
            }}
          />

          <div className="absolute bottom-5 inset-x-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5af19]">
                {activeScene.title}
              </p>
              <p className="text-base sm:text-lg font-medium text-stone-100 mt-1">
                {activeScene.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151515]/90 border border-amber-500/40 text-xs font-semibold text-[#fde08d] cursor-pointer"
              >
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{playing ? 'Pause' : 'Lecture'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookNow();
                }}
                className="px-5 py-2 rounded-full text-xs font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn cursor-pointer"
              >
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-[#0a0a0a] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            {scenes.map((scene, idx) => (
              <button
                key={scene.title}
                type="button"
                onClick={() => setSlideIdx(idx)}
                aria-label={scene.title}
                className={`h-1.5 flex-1 rounded-full transition-colors cursor-pointer ${
                  idx === slideIdx ? 'bg-gold-gradient' : 'bg-stone-800 hover:bg-stone-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export function ServicesModal({ isOpen, onClose, onBookNow }: ServicesModalProps) {
  if (!isOpen) return null;

  const pillars = [
    {
      icon: PlaneLanding,
      title: 'Accueil VIP Aéroport Tunis-Carthage',
      desc: 'Remise immédiate des clés dès votre arrivée au terminal ou livraison directement à votre hôtel à Gammarth, La Marsa ou Les Berges du Lac.',
    },
    {
      icon: ShieldCheck,
      title: 'Couverture Tous Risques Intégrale',
      desc: 'Chaque location inclut l’assurance complète, le contrôle technique pré-livraison en 40 points et un contrat transparent sans frais cachés.',
    },
    {
      icon: Headset,
      title: 'Conciergerie & Chauffeur 24/7',
      desc: 'Besoin d’un chauffeur bilingue, d’une prolongation de séjour ou d’un transfert événementiel ? Notre ligne dédiée reste joignable jour et nuit.',
    },
    {
      icon: Sparkles,
      title: 'Préparation Esthétique Concours',
      desc: 'Nettoyage complet, traitement céramique et parfum d’habitacle signature avant chaque départ.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="services-modal-title"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#111111] border border-amber-500/35 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-stone-800">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f5af19]">
              AUROS CARS · Services Premium
            </p>
            <h2 id="services-modal-title" className="text-2xl font-bold text-stone-100 mt-1">
              L’art de la mobilité sur mesure
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer les détails de service"
            className="w-9 h-9 rounded-full border border-stone-800 bg-[#0a0a0a] text-stone-300 hover:text-[#fde08d] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-xl bg-[#0a0a0a] border border-stone-800/90 p-5 space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#f5af19]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-100">{item.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-5 border-t border-stone-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-stone-300 border border-stone-700 hover:border-stone-500 cursor-pointer"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookNow();
            }}
            className="px-6 py-2.5 rounded-full text-xs font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn cursor-pointer"
          >
            Réserver un véhicule →
          </button>
        </div>
      </div>
    </div>
  );
}
