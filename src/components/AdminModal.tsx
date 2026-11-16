import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import {
  X,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  ShieldCheck,
  CarFront,
  Gauge,
  Settings2,
  Fuel,
  Users,
  Snowflake,
  RotateCcw,
  CheckCircle2,
  LogOut,
} from 'lucide-react';
import {
  VEHICLE_CATEGORIES,
  type CategoryId,
  type FleetVehicle,
} from '../data/fleetData';
import { useFleet } from '../context/FleetContext';
import { usePreferences } from '../context/PreferencesContext';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVehicleDeleted?: (deletedId: string) => void;
}

const ADMIN_PASSCODE = 'admin2026';
const SESSION_KEY = 'auros_admin_unlocked';

function compressImageFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Impossible de lire le fichier image.'));
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl !== 'string') {
        reject(new Error('Format image invalide.'));
        return;
      }

      const img = new Image();
      img.onerror = () => resolve(dataUrl);
      img.onload = () => {
        const maxWidth = 1100;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const targetW = Math.round(img.width * scale);
        const targetH = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, targetW, targetH);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export function AdminModal({ isOpen, onClose, onVehicleDeleted }: AdminModalProps) {
  const {
    vehicles,
    availableVehicles,
    addVehicle,
    toggleVehicleAvailability,
    deleteVehicle,
    resetDefaultFleet,
  } = useFleet();
  const { formatPrice } = usePreferences();

  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Form states for adding a vehicle
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId>('luxe');
  const [pricePerDay, setPricePerDay] = useState('450');
  const [transmission, setTransmission] = useState('Automatique');
  const [fuel, setFuel] = useState('Essence');
  const [seats, setSeats] = useState('5');
  const [power, setPower] = useState('320 CH');
  const [hasAc, setHasAc] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedPreviewName, setUploadedPreviewName] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [listFilter, setListFilter] = useState<CategoryId | 'all'>('all');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (passwordInput.trim() === ADMIN_PASSCODE) {
      setAuthenticated(true);
      setPasswordInput('');
      try {
        window.sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // Ignore storage errors
      }
    } else {
      setAuthError('Mot de passe incorrect. Veuillez réessayer.');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPasswordInput('');
    setAuthError('');
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).');
      return;
    }

    try {
      const base64 = await compressImageFileToBase64(file);
      setImageUrl(base64);
      setUploadedPreviewName(file.name);
    } catch {
      setFormError('Échec du chargement de l’image locale. Vérifiez le fichier.');
    }
  };

  const handleAddVehicle = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const trimmedName = name.trim();
    const parsedPrice = Number(pricePerDay);
    const parsedSeats = Math.max(2, Math.min(15, Number(seats) || 5));

    if (!trimmedName) {
      setFormError('Veuillez saisir le nom ou le modèle du véhicule.');
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setFormError('Veuillez saisir un prix par jour valide (supérieur à 0).');
      return;
    }

    const categoryObj =
      VEHICLE_CATEGORIES.find((c) => c.id === categoryId) ?? VEHICLE_CATEGORIES[0];

    const finalImage = imageUrl.trim() || categoryObj.image;
    const finalPower = power.trim() || '220 CH';

    const featuresList = [
      hasAc ? 'Climatisation automatique' : 'Ventilation confort',
      `Boîte ${transmission}`,
      `${parsedSeats} places`,
      'Assurance tous risques incluse',
    ];

    const newCarPayload: Omit<FleetVehicle, 'id'> = {
      categoryId,
      name: trimmedName,
      subtitle: `${categoryObj.title} · ${transmission} · ${fuel}`,
      pricePerDay: Math.round(parsedPrice),
      power: finalPower,
      transmission,
      seats: parsedSeats,
      fuel,
      hasAc,
      isAvailable,
      acceleration: '5,4 s (0–100)',
      luggage: `${Math.max(2, Math.min(8, parsedSeats - 1))} valises`,
      insurance: 'Assurance tous risques incluse',
      description: `${trimmedName} disponible à la location dans la catégorie ${categoryObj.title}. Confort haut de gamme, entretien certifié AUROS CARS et assistance 24/7.`,
      features: featuresList,
      image: finalImage,
    };

    addVehicle(newCarPayload);

    setName('');
    setPricePerDay('450');
    setPower('320 CH');
    setIsAvailable(true);
    setImageUrl('');
    setUploadedPreviewName('');
    setFormSuccess(`« ${trimmedName} » a été ajouté à la catégorie ${categoryObj.title} et sauvegardé.`);
  };

  const handleDelete = (id: string) => {
    deleteVehicle(id);
    onVehicleDeleted?.(id);
  };

  const displayedVehicles =
    listFilter === 'all'
      ? vehicles
      : vehicles.filter((v) => v.categoryId === listFilter);

  const availableCount = availableVehicles.length;
  const rentedCount = vehicles.length - availableCount;

  const previewImg =
    imageUrl.trim() ||
    (VEHICLE_CATEGORIES.find((c) => c.id === categoryId) ?? VEHICLE_CATEGORIES[0]).image;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      onClick={onClose}
    >
      {!authenticated ? (
        /* Step 1: Protected Password Login Card */
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-2xl bg-[#111111] border border-amber-500/40 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.95),0_0_32px_-12px_rgba(245,175,25,0.3)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#0a0a0a]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-[#f5af19]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5af19]">
                  AUROS CARS
                </p>
                <h2 id="admin-modal-title" className="text-base font-bold text-stone-100">
                  Accès Administrateur
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer l’espace administrateur"
              className="w-8 h-8 rounded-full border border-stone-800 bg-[#151515] text-stone-300 hover:text-[#fde08d] hover:border-amber-500/50 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-6 space-y-5" noValidate>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Saisissez le mot de passe administrateur pour gérer la flotte et la
              disponibilité des véhicules en temps réel.
            </p>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative flex items-center">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Ex: admin2026"
                  autoFocus
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-[#0a0a0a] border border-stone-800 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-[#f5af19]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  className="absolute right-3 text-stone-400 hover:text-[#fde08d] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-stone-500">
                Code d’accès démo : <code className="text-[#fde08d]">admin2026</code>
              </p>
            </div>

            {authError && (
              <p
                className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2"
                role="alert"
              >
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Déverrouiller le Tableau de Bord</span>
            </button>
          </form>
        </div>
      ) : (
        /* Step 2: Unlocked Admin Fleet Management Dashboard */
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl rounded-2xl bg-[#111111] border border-amber-500/40 shadow-[0_24px_70px_-12px_rgba(0,0,0,0.95),0_0_38px_-12px_rgba(245,175,25,0.28)] overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Sticky Dashboard Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-stone-800 bg-[#0a0a0a] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-[#f5af19] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#f5af19]">
                  AUROS CARS · Espace Administrateur
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h2 id="admin-modal-title" className="text-lg sm:text-xl font-bold text-stone-100">
                    Gestion de la Flotte ({vehicles.length})
                  </h2>
                  <span className="text-xs font-semibold text-emerald-400 tabular-nums">
                    ● {availableCount} Disponible{availableCount > 1 ? 's' : ''}
                  </span>
                  <span className="text-xs font-semibold text-red-400 tabular-nums">
                    ● {rentedCount} Louée{rentedCount > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={resetDefaultFleet}
                title="Restaurer la flotte par défaut"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-stone-300 border border-stone-800 bg-[#151515] hover:border-amber-500/45 hover:text-[#fde08d] transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Réinitialiser</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-stone-300 border border-stone-800 bg-[#151515] hover:border-amber-500/45 hover:text-[#fde08d] transition-colors cursor-pointer whitespace-nowrap"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Verrouiller</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le tableau de bord"
                className="w-9 h-9 rounded-full border border-stone-800 bg-[#151515] text-stone-300 hover:text-[#fde08d] hover:border-amber-500/50 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Body: Add Form + Complete Registered Vehicles List with Availability Toggles */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-8">
            {/* Section A: Add Vehicle Form */}
            <form
              onSubmit={handleAddVehicle}
              noValidate
              className="rounded-2xl bg-[#0a0a0a]/90 border border-amber-500/30 p-5 sm:p-6 space-y-5"
            >
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone-800/90">
                <div className="flex items-center gap-2.5">
                  <Plus className="w-5 h-5 text-[#f5af19]" />
                  <h3 className="text-base sm:text-lg font-bold text-stone-100">
                    Ajouter un nouveau véhicule
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-stone-400">
                  Sauvegarde automatique (localStorage)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Nom / Modèle */}
                <div className="md:col-span-5">
                  <label
                    htmlFor="admin-car-name"
                    className="block text-xs font-semibold text-stone-300 mb-1.5"
                  >
                    Nom / Modèle de la voiture *
                  </label>
                  <input
                    id="admin-car-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Mercedes-AMG GT, Range Rover Sport"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-stone-800 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#f5af19]"
                  />
                </div>

                {/* Catégorie */}
                <div className="md:col-span-4">
                  <label
                    htmlFor="admin-car-category"
                    className="block text-xs font-semibold text-stone-300 mb-1.5"
                  >
                    Catégorie *
                  </label>
                  <select
                    id="admin-car-category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value as CategoryId)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-[#f5af19]"
                  >
                    {VEHICLE_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prix par jour */}
                <div className="md:col-span-3">
                  <label
                    htmlFor="admin-car-price"
                    className="block text-xs font-semibold text-stone-300 mb-1.5"
                  >
                    Prix par jour (TND / DT) *
                  </label>
                  <input
                    id="admin-car-price"
                    type="number"
                    min={1}
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(e.target.value)}
                    placeholder="450"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-stone-800 text-sm font-bold text-[#fde08d] tabular-nums focus:outline-none focus:border-[#f5af19]"
                  />
                </div>

                {/* Transmission */}
                <div className="md:col-span-3">
                  <label
                    htmlFor="admin-car-transmission"
                    className="block text-xs font-semibold text-stone-300 mb-1.5"
                  >
                    Transmission
                  </label>
                  <select
                    id="admin-car-transmission"
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-[#f5af19]"
                  >
                    <option value="Automatique">Automatique</option>
                    <option value="Manuelle">Manuelle</option>
                  </select>
                </div>

                {/* Carburant */}
                <div className="md:col-span-3">
                  <label
                    htmlFor="admin-car-fuel"
                    className="block text-xs font-semibold text-stone-300 mb-1.5"
                  >
                    Carburant
                  </label>
                  <select
                    id="admin-car-fuel"
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-[#f5af19]"
                  >
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Électrique">Électrique</option>
                  </select>
                </div>

                {/* Places */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="admin-car-seats"
                    className="block text-xs font-semibold text-stone-300 mb-1.5"
                  >
                    Places
                  </label>
                  <select
                    id="admin-car-seats"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-stone-800 text-sm text-stone-100 tabular-nums focus:outline-none focus:border-[#f5af19]"
                  >
                    <option value="2">2 places</option>
                    <option value="4">4 places</option>
                    <option value="5">5 places</option>
                    <option value="7">7 places</option>
                    <option value="9">9 places</option>
                  </select>
                </div>

                {/* Puissance */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="admin-car-power"
                    className="block text-xs font-semibold text-stone-300 mb-1.5"
                  >
                    Puissance
                  </label>
                  <input
                    id="admin-car-power"
                    type="text"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    placeholder="320 CH"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-[#f5af19]"
                  />
                </div>

                {/* Climatisation Toggle */}
                <div className="md:col-span-2 flex items-end">
                  <label className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#111111] border border-stone-800 hover:border-amber-500/45 text-xs font-semibold text-stone-200 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasAc}
                      onChange={(e) => setHasAc(e.target.checked)}
                      className="accent-[#f5af19] w-4 h-4 cursor-pointer"
                    />
                    <Snowflake className="w-3.5 h-3.5 text-[#f5af19]" />
                    <span>Clim.</span>
                  </label>
                </div>

                {/* Image URL + Upload Local Base64 */}
                <div className="md:col-span-8">
                  <label
                    htmlFor="admin-car-image-url"
                    className="block text-xs font-semibold text-stone-300 mb-1.5"
                  >
                    Image du véhicule (URL ou fichier local)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1 flex items-center">
                      <ImageIcon className="w-4 h-4 text-[#f5af19] absolute left-3 pointer-events-none" />
                      <input
                        id="admin-car-image-url"
                        type="url"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          setUploadedPreviewName('');
                        }}
                        placeholder="https://... (laisser vide pour photo de catégorie par défaut)"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#111111] border border-stone-800 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#f5af19]"
                      />
                    </div>

                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#151515] border border-amber-500/40 hover:border-[#f5af19] text-xs font-semibold text-[#fde08d] cursor-pointer whitespace-nowrap shrink-0 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>{uploadedPreviewName ? 'Image chargée' : 'Importer image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  {uploadedPreviewName && (
                    <p className="text-[11px] text-emerald-400 mt-1">
                      Fichier converti en Base64 : {uploadedPreviewName}
                    </p>
                  )}
                </div>

                {/* Live Thumbnail Preview */}
                <div className="md:col-span-4 flex items-center gap-3 p-2.5 rounded-xl bg-[#111111] border border-stone-800/90">
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-stone-800">
                    <img
                      src={previewImg}
                      alt="Aperçu véhicule"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 text-xs">
                    <p className="font-semibold text-stone-200 truncate">
                      {name.trim() || 'Aperçu du modèle'}
                    </p>
                    <p className="text-[#f5af19] font-bold tabular-nums mt-0.5">
                      {formatPrice(Math.max(1, Number(pricePerDay) || 450))} / jour
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsAvailable((prev) => !prev)}
                      className={`mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer ${
                        isAvailable ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      <span>{isAvailable ? '🟢 Disponible' : '🔴 Louée'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {formError && (
                <p className="text-xs font-medium text-amber-400" role="alert">
                  {formError}
                </p>
              )}

              {formSuccess && (
                <div
                  className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3.5 py-2.5"
                  role="status"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-[#0a0a0a] bg-gold-gradient gold-glow-btn cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enregistrer le véhicule</span>
                </button>
              </div>
            </form>

            {/* Section B: Complete Registered Vehicles List with Real-time Availability Toggle + Delete */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <CarFront className="w-5 h-5 text-[#f5af19]" />
                  <h3 className="text-base sm:text-lg font-bold text-stone-100">
                    Liste complète des véhicules ({displayedVehicles.length})
                  </h3>
                </div>

                {/* Filter by category */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                  <button
                    type="button"
                    onClick={() => setListFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                      listFilter === 'all'
                        ? 'bg-gold-gradient text-[#0a0a0a] font-bold'
                        : 'bg-[#0a0a0a] border border-stone-800 text-stone-300 hover:text-[#fde08d]'
                    }`}
                  >
                    Toutes ({vehicles.length})
                  </button>
                  {VEHICLE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setListFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                        listFilter === cat.id
                          ? 'bg-gold-gradient text-[#0a0a0a] font-bold'
                          : 'bg-[#0a0a0a] border border-stone-800 text-stone-300 hover:text-[#fde08d]'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {displayedVehicles.length === 0 ? (
                <div className="rounded-xl bg-[#0a0a0a] border border-stone-800 p-8 text-center text-sm text-stone-400">
                  Aucun véhicule enregistré dans cette catégorie. Utilisez le formulaire ci-dessus pour en ajouter un.
                </div>
              ) : (
                <div className="space-y-3">
                  {displayedVehicles.map((car) => {
                    const catObj = VEHICLE_CATEGORIES.find((c) => c.id === car.categoryId);
                    const carAvailable = car.isAvailable !== false;

                    return (
                      <div
                        key={car.id}
                        className={`rounded-xl bg-[#0a0a0a] border p-3.5 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors ${
                          carAvailable
                            ? 'border-stone-800/90 hover:border-amber-500/45'
                            : 'border-red-500/30 bg-[#120b0b]/90 opacity-90'
                        }`}
                      >
                        {/* Left: Miniature Photo + Name + Category + Price + Technical Specs */}
                        <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                          <div className="w-24 sm:w-28 h-16 sm:h-18 rounded-lg overflow-hidden bg-[#141414] border border-stone-800 shrink-0 relative">
                            <img
                              src={car.image}
                              alt={car.name}
                              referrerPolicy="no-referrer"
                              className={`w-full h-full object-cover transition-all ${
                                carAvailable ? '' : 'grayscale opacity-65'
                              }`}
                            />
                          </div>

                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5af19]">
                                {catObj?.title ?? car.categoryId}
                              </span>
                              <span className="text-stone-700" aria-hidden="true">•</span>
                              <span className="text-xs font-extrabold text-gold-gradient tabular-nums">
                                {formatPrice(car.pricePerDay)}{' '}
                                <span className="text-[11px] font-normal text-stone-400">
                                  / jour
                                </span>
                              </span>
                            </div>

                            <h4 className="text-sm sm:text-base font-bold text-stone-100 truncate">
                              {car.name}
                            </h4>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-400">
                              <span className="inline-flex items-center gap-1">
                                <Gauge className="w-3 h-3 text-[#f5af19]" />
                                {car.power}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Settings2 className="w-3 h-3 text-[#f5af19]" />
                                {car.transmission}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Fuel className="w-3 h-3 text-[#f5af19]" />
                                {car.fuel}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Users className="w-3 h-3 text-[#f5af19]" />
                                {car.seats} places
                              </span>
                              {car.hasAc !== false && (
                                <span className="inline-flex items-center gap-1">
                                  <Snowflake className="w-3 h-3 text-[#f5af19]" />
                                  Clim.
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Interactive Availability Toggle Switch + Status Badge + Delete Button */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-800/80 shrink-0">
                          {/* Availability Toggle + Status Badge */}
                          <button
                            type="button"
                            role="switch"
                            aria-checked={carAvailable}
                            aria-label={`Changer le statut de disponibilité pour ${car.name}`}
                            onClick={() => toggleVehicleAvailability(car.id)}
                            className={`inline-flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5af19] ${
                              carAvailable
                                ? 'bg-emerald-500/12 border-emerald-500/45 text-emerald-300 hover:border-amber-400/60'
                                : 'bg-red-500/12 border-red-500/45 text-red-300 hover:border-red-400/75'
                            }`}
                          >
                            {/* Visual Toggle Track & Thumb */}
                            <span
                              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                                carAvailable
                                  ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                                  : 'bg-red-500/70'
                              }`}
                              aria-hidden="true"
                            >
                              <span
                                className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                  carAvailable ? 'translate-x-4.5' : 'translate-x-1'
                                }`}
                              />
                            </span>

                            <span>
                              {carAvailable
                                ? 'Disponible (موجود)'
                                : 'Louée / Indisponible (مكري / غير موجود)'}
                            </span>
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDelete(car.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 hover:border-red-400/50 transition-colors shrink-0 cursor-pointer whitespace-nowrap"
                            aria-label={`Supprimer ${car.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
