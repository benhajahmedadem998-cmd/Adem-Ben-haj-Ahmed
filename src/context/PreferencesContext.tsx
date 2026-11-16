import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CategoryId } from '../data/fleetData';

export type Language = 'fr' | 'en' | 'ar';
export type Currency = 'TND' | 'USD';

const TND_TO_USD_RATE = 0.32;

export const LANGUAGE_OPTIONS: { code: Language; label: string; short: string }[] = [
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'AR' },
];

export const TRANSLATIONS = {
  fr: {
    nav: {
      home: 'Accueil',
      fleet: 'Nos Véhicules',
      services: 'Services',
      about: 'À Propos',
      contact: 'Contact',
      reserve: 'Réserver',
      reserveVehicle: 'Réserver un véhicule →',
      languageLabel: 'Langue',
      currencyLabel: 'Devise',
    },
    hero: {
      eyebrow: 'LOCATION DE PRESTIGE',
      slogan: 'Drive Your Dreams',
      desc: 'Vivez le luxe, la liberté et la performance avec notre service de location de véhicules haut de gamme.',
      explore: 'Explorer la flotte',
      watchVideo: 'Voir la vidéo',
      luxuryCars: 'Voitures de Luxe',
      fullInsurance: 'Assurance Complète',
      support: 'Assistance 24/7',
      scrollDown: 'Défiler',
    },
    search: {
      pickupLocation: 'Prise en charge',
      returnLocation: 'Lieu de retour',
      pickupDate: 'Date de début',
      pickupTime: 'Heure début',
      returnDate: 'Date de retour',
      returnTime: 'Heure retour',
      searchBtn: 'RECHERCHER',
      dateError: 'La date et l’heure de retour doivent être postérieures au départ.',
    },
    fleet: {
      heading: 'Nos catégories de véhicules',
      subheading: 'Trouvez le véhicule adapté à vos besoins',
      seeVehicles: 'Voir les véhicules',
      discoverModels: 'Découvrir les fiches modèles détaillées',
      modalEyebrow: 'Flotte disponible',
      perDay: '/ jour',
      insuranceIncluded: 'Assurance incluse',
      details: 'Détails',
      reserve: 'Réserver',
      reserveThisVehicle: 'Réserver ce véhicule',
      acIncluded: 'Climatisation',
      noVehiclesInCategory: 'Aucun véhicule disponible dans cette catégorie pour le moment.',
      categories: {
        luxe: { title: 'Voitures de Luxe', subtitle: 'Élégance au volant' },
        suv: { title: 'SUV & 4x4', subtitle: 'Confort et puissance' },
        sport: { title: 'Voitures Sportives', subtitle: 'Sensations garanties' },
        eco: { title: 'Économiques', subtitle: 'Économisez en toute sérénité' },
        van: { title: 'Minibus & Vans', subtitle: 'Voyagez en groupe' },
      } as Record<CategoryId, { title: string; subtitle: string }>,
    },
    detail: {
      categories: 'Catégories',
      seeAll: 'Voir Toutes les Voitures',
      premium: 'Premium',
      similarOptions: 'Options similaires',
      perDay: '/ Jour',
      power: 'Puissance',
      transmission: 'Boîte de vitesse',
      fuel: 'Carburant',
      reserve: 'Réserver',
      techSheet: 'Fiche technique',
      hideDetails: 'Masquer détails',
      places: 'places',
      insuranceBanner: 'Assurance tous risques & assistance 24/7 incluses',
    },
    why: {
      eyebrow: 'Excellence & Sur-mesure',
      titleStart: 'Pourquoi choisir',
      desc: 'Nous vous offrons une expérience de location unique, avec des véhicules récents, un service fiable et un accompagnement personnalisé.',
      learnMore: 'En savoir plus',
      advantages: [
        {
          title: 'Véhicules Récents',
          detail: 'Flotte millésime 2025–2026 contrôlée avant chaque remise de clés.',
        },
        {
          title: 'Assurance Complète',
          detail: 'Couverture tous risques premium et franchise optimisée incluse.',
        },
        {
          title: 'Assistance 24/7',
          detail: 'Conciergerie dédiée et dépannage prioritaire partout en Tunisie.',
        },
        {
          title: 'Réservation Rapide',
          detail: 'Confirmation immédiate en ligne et livraison aéroport ou hôtel.',
        },
      ],
    },
    process: {
      title: 'Comment ça marche ?',
      subtitle: 'Une location simple en 3 étapes',
      steps: [
        { line1: 'Choisissez', line2: 'votre date' },
        { line1: 'Sélectionnez', line2: 'votre véhicule' },
        { line1: 'Confirmez', line2: 'votre réservation' },
      ],
      ctaTitle: 'Réservez dès maintenant !',
      ctaDesc: 'Profitez de nos meilleures offres sur toute la flotte 2026.',
      ctaBtn: 'Réserver',
    },
    testimonials: {
      title: 'Ce que disent nos clients',
      subtitle: 'Votre satisfaction, notre priorité',
    },
    footer: {
      eyebrow: 'Conciergerie Privée',
      heading: 'Un besoin spécifique ou une livraison sur mesure ?',
      desc: 'Notre équipe basée à Tunis répond sous 15 minutes pour organiser vos transferts VIP, mariages, déplacements professionnels ou locations longue durée.',
      namePlaceholder: 'Nom complet',
      contactPlaceholder: 'E-mail ou téléphone',
      messagePlaceholder: 'Véhicule souhaité, dates ou demande particulière...',
      send: 'Envoyer',
      sentTitle: 'Demande transmise avec succès',
      sentDesc: 'Un conseiller AUROS CARS vous recontactera très rapidement.',
      sendAnother: 'Envoyer un autre message',
      errorEmpty: 'Veuillez renseigner votre nom, vos coordonnées et votre message.',
      errorContact: 'Veuillez saisir une adresse e-mail ou un numéro de téléphone valide.',
      copyright: '© 2026 AUROS CARS. Tous droits réservés.',
    },
    booking: {
      eyebrow: 'AUROS CARS Conciergerie',
      title: 'Réserver votre véhicule',
      selectedModel: 'Modèle sélectionné',
      startDateTime: 'Date & heure de début',
      returnDateTime: 'Date & heure de retour',
      pickupLocation: 'Lieu de prise en charge',
      returnLocation: 'Lieu de retour',
      fullName: 'Nom complet',
      phone: 'Téléphone',
      email: 'E-mail',
      estimateFor: 'Estimation pour',
      day: 'jour',
      days: 'jours',
      insuranceIncluded: 'Assurance incluse',
      confirmBtn: 'Confirmer la réservation',
      confirmedEyebrow: 'Réservation enregistrée',
      reference: 'Référence',
      backToFleet: 'Retour à la flotte',
    },
  },
  en: {
    nav: {
      home: 'Home',
      fleet: 'Our Fleet',
      services: 'Services',
      about: 'About Us',
      contact: 'Contact',
      reserve: 'Book Now',
      reserveVehicle: 'Book a Vehicle →',
      languageLabel: 'Language',
      currencyLabel: 'Currency',
    },
    hero: {
      eyebrow: 'PREMIUM CAR RENTAL',
      slogan: 'Drive Your Dreams',
      desc: 'Experience luxury, freedom and performance with our bespoke premium car rental service.',
      explore: 'Explore Our Fleet',
      watchVideo: 'Watch Video',
      luxuryCars: 'Luxury Cars',
      fullInsurance: 'Full Insurance',
      support: '24/7 Support',
      scrollDown: 'Scroll Down',
    },
    search: {
      pickupLocation: 'Pick-up Location',
      returnLocation: 'Return Location',
      pickupDate: 'Pick-up Date',
      pickupTime: 'Pick-up Time',
      returnDate: 'Return Date',
      returnTime: 'Return Time',
      searchBtn: 'SEARCH VEHICLES',
      dateError: 'Return date and time must be after pick-up.',
    },
    fleet: {
      heading: 'Our Vehicle Categories',
      subheading: 'Find the perfect vehicle tailored to your journey',
      seeVehicles: 'View Vehicles',
      discoverModels: 'Explore Detailed Model Showcases',
      modalEyebrow: 'Available Fleet',
      perDay: '/ day',
      insuranceIncluded: 'Insurance included',
      details: 'Details',
      reserve: 'Book Now',
      reserveThisVehicle: 'Book This Vehicle',
      acIncluded: 'Air Conditioning',
      noVehiclesInCategory: 'No vehicles currently available in this category.',
      categories: {
        luxe: { title: 'Luxury Cars', subtitle: 'Elegance behind the wheel' },
        suv: { title: 'SUV & 4x4', subtitle: 'Comfort and power' },
        sport: { title: 'Sports Cars', subtitle: 'Pure driving thrills' },
        eco: { title: 'Economy', subtitle: 'Drive smart with peace of mind' },
        van: { title: 'Minibuses & Vans', subtitle: 'Travel together in comfort' },
      } as Record<CategoryId, { title: string; subtitle: string }>,
    },
    detail: {
      categories: 'Categories',
      seeAll: 'View All Vehicles',
      premium: 'Premium',
      similarOptions: 'Similar Options',
      perDay: '/ Day',
      power: 'Power',
      transmission: 'Transmission',
      fuel: 'Fuel',
      reserve: 'Book Now',
      techSheet: 'Technical Sheet',
      hideDetails: 'Hide Details',
      places: 'seats',
      insuranceBanner: 'Comprehensive insurance & 24/7 roadside assistance included',
    },
    why: {
      eyebrow: 'Bespoke Excellence',
      titleStart: 'Why choose',
      desc: 'We deliver an unforgettable rental experience featuring late-model luxury vehicles, reliable service, and personalized concierge support.',
      learnMore: 'Learn More',
      advantages: [
        {
          title: 'Latest Models',
          detail: '2025–2026 fleet inspected to perfection before every handover.',
        },
        {
          title: 'Full Insurance',
          detail: 'Comprehensive all-risk coverage included with zero hidden fees.',
        },
        {
          title: '24/7 Assistance',
          detail: 'Dedicated concierge & priority roadside assistance across Tunisia.',
        },
        {
          title: 'Instant Booking',
          detail: 'Fast online confirmation with airport or hotel doorstep delivery.',
        },
      ],
    },
    process: {
      title: 'How It Works?',
      subtitle: 'Simple luxury rental in 3 steps',
      steps: [
        { line1: 'Choose', line2: 'your dates' },
        { line1: 'Select', line2: 'your vehicle' },
        { line1: 'Confirm', line2: 'your booking' },
      ],
      ctaTitle: 'Book Now!',
      ctaDesc: 'Enjoy exclusive rates across our entire 2026 fleet.',
      ctaBtn: 'Book Now',
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Your satisfaction is our highest standard',
    },
    footer: {
      eyebrow: 'Private Concierge',
      heading: 'Looking for bespoke delivery or VIP chauffeur service?',
      desc: 'Our Tunis concierge team responds within 15 minutes to arrange VIP airport transfers, weddings, corporate travel, or long-term rentals.',
      namePlaceholder: 'Full name',
      contactPlaceholder: 'Email or phone number',
      messagePlaceholder: 'Desired vehicle, dates or special request...',
      send: 'Send',
      sentTitle: 'Request sent successfully',
      sentDesc: 'An AUROS CARS advisor will contact you shortly.',
      sendAnother: 'Send another message',
      errorEmpty: 'Please enter your name, contact details and message.',
      errorContact: 'Please enter a valid email address or phone number.',
      copyright: '© 2026 AUROS CARS. All rights reserved.',
    },
    booking: {
      eyebrow: 'AUROS CARS Concierge',
      title: 'Book Your Vehicle',
      selectedModel: 'Selected Model',
      startDateTime: 'Pick-up Date & Time',
      returnDateTime: 'Return Date & Time',
      pickupLocation: 'Pick-up Location',
      returnLocation: 'Return Location',
      fullName: 'Full Name',
      phone: 'Phone',
      email: 'Email',
      estimateFor: 'Estimated total for',
      day: 'day',
      days: 'days',
      insuranceIncluded: 'Insurance included',
      confirmBtn: 'Confirm Booking',
      confirmedEyebrow: 'Booking Confirmed',
      reference: 'Reference',
      backToFleet: 'Back to Fleet',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      fleet: 'أسطولنا',
      services: 'الخدمات',
      about: 'من نحن',
      contact: 'اتصل بنا',
      reserve: 'احجز الآن',
      reserveVehicle: 'احجز سيارة →',
      languageLabel: 'اللغة',
      currencyLabel: 'العملة',
    },
    hero: {
      eyebrow: 'تأجير سيارات فاخرة',
      slogan: 'Drive Your Dreams',
      desc: 'استمتع بالفخامة والحرية والأداء العالي مع خدمة تأجير السيارات الفاخرة المصممة خصيصًا لك.',
      explore: 'استكشف أسطولنا',
      watchVideo: 'شاهد الفيديو',
      luxuryCars: 'سيارات فاخرة',
      fullInsurance: 'تأمين شامل',
      support: 'دعم 24/7',
      scrollDown: 'تصفح للأسفل',
    },
    search: {
      pickupLocation: 'مكان الاستلام',
      returnLocation: 'مكان الإرجاع',
      pickupDate: 'تاريخ الاستلام',
      pickupTime: 'وقت الاستلام',
      returnDate: 'تاريخ الإرجاع',
      returnTime: 'وقت الإرجاع',
      searchBtn: 'بحث',
      dateError: 'يجب أن يكون تاريخ ووقت الإرجاع بعد الاستلام.',
    },
    fleet: {
      heading: 'فئات السيارات لدينا',
      subheading: 'اختر السيارة المثالية لرحلتك',
      seeVehicles: 'عرض السيارات',
      discoverModels: 'اكتشف بطاقات الموديلات المفصلة',
      modalEyebrow: 'الأسطول المتاح',
      perDay: '/ يوم',
      insuranceIncluded: 'تأمين شامل',
      details: 'التفاصيل',
      reserve: 'احجز',
      reserveThisVehicle: 'احجز هذه السيارة',
      acIncluded: 'تكييف هواء',
      noVehiclesInCategory: 'لا توجد سيارات متاحة في هذه الفئة حاليًا.',
      categories: {
        luxe: { title: 'سيارات فاخرة', subtitle: 'أناقة وفخامة على الطريق' },
        suv: { title: 'دفع رباعي SUV', subtitle: 'راحة وقوة فائقة' },
        sport: { title: 'سيارات رياضية', subtitle: 'إثارة وأداء استثنائي' },
        eco: { title: 'سيارات اقتصادية', subtitle: 'تنقل بذكاء وهدوء' },
        van: { title: 'حافلات وفانات', subtitle: 'سفر مريح للمجموعات' },
      } as Record<CategoryId, { title: string; subtitle: string }>,
    },
    detail: {
      categories: 'الفئات',
      seeAll: 'عرض جميع السيارات',
      premium: 'فاخرة',
      similarOptions: 'خيارات مشابهة',
      perDay: '/ يوم',
      power: 'القوة',
      transmission: 'ناقل الحركة',
      fuel: 'الوقود',
      reserve: 'احجز الآن',
      techSheet: 'المواصفات الفنية',
      hideDetails: 'إخفاء التفاصيل',
      places: 'مقاعد',
      insuranceBanner: 'تأمين شامل ومساعدة على الطريق 24/7',
    },
    why: {
      eyebrow: 'التميز والخدمة الخاصة',
      titleStart: 'لماذا تختار',
      desc: 'نقدم لك تجربة تأجير استثنائية بسيارات حديثة، خدمة موثوقة ومرافقة شخصية في كل رحلة.',
      learnMore: 'اعرف المزيد',
      advantages: [
        {
          title: 'سيارات حديثة',
          detail: 'أسطول 2025–2026 مفحوص بعناية قبل كل تسليم.',
        },
        {
          title: 'تأمين شامل',
          detail: 'تغطية شاملة ضد جميع المخاطر بدون رسوم خفية.',
        },
        {
          title: 'دعم 24/7',
          detail: 'خدمة كونسيرج ومساعدة فورية في جميع أنحاء تونس.',
        },
        {
          title: 'حجز فوري',
          detail: 'تأكيد سريع عبر الإنترنت مع توصيل للمطار أو الفندق.',
        },
      ],
    },
    process: {
      title: 'كيف تعمل الخدمة؟',
      subtitle: 'تأجير بسيط في 3 خطوات',
      steps: [
        { line1: 'اختر', line2: 'التاريخ المناسب' },
        { line1: 'حدد', line2: 'سيارتك المفضلة' },
        { line1: 'أكد', line2: 'حجزك بسهولة' },
      ],
      ctaTitle: 'احجز الآن!',
      ctaDesc: 'استفد من أفضل عروضنا على أسطول 2026.',
      ctaBtn: 'احجز',
    },
    testimonials: {
      title: 'آراء عملائنا',
      subtitle: 'رضاكم هو أولويتنا القصوى',
    },
    footer: {
      eyebrow: 'الكونسيرج الخاص',
      heading: 'هل تحتاج إلى توصيل خاص أو خدمة سائق؟',
      desc: 'يرد فريقنا في تونس خلال 15 دقيقة لتنظيم تنقلات كبار الشخصيات، الأعراس، رحلات العمل أو التأجير طويل الأمد.',
      namePlaceholder: 'الاسم الكامل',
      contactPlaceholder: 'البريد الإلكتروني أو الهاتف',
      messagePlaceholder: 'السيارة المطلوبة، التواريخ أو أي طلب خاص...',
      send: 'إرسال',
      sentTitle: 'تم إرسال الطلب بنجاح',
      sentDesc: 'سيتواصل معك مستشار AUROS CARS في أقرب وقت.',
      sendAnother: 'إرسال رسالة أخرى',
      errorEmpty: 'يرجى إدخال الاسم ومعلومات الاتصال والرسالة.',
      errorContact: 'يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح.',
      copyright: '© 2026 AUROS CARS. جميع الحقوق محفوظة.',
    },
    booking: {
      eyebrow: 'كونسيرج AUROS CARS',
      title: 'احجز سيارتك',
      selectedModel: 'الموديل المختار',
      startDateTime: 'تاريخ ووقت الاستلام',
      returnDateTime: 'تاريخ ووقت الإرجاع',
      pickupLocation: 'مكان الاستلام',
      returnLocation: 'مكان الإرجاع',
      fullName: 'الاسم الكامل',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      estimateFor: 'التكلفة التقديرية لمدة',
      day: 'يوم',
      days: 'أيام',
      insuranceIncluded: 'تأمين شامل',
      confirmBtn: 'تأكيد الحجز',
      confirmedEyebrow: 'تم تأكيد الحجز',
      reference: 'المرجع',
      backToFleet: 'العودة إلى الأسطول',
    },
  },
};

interface PreferencesContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (typeof TRANSLATIONS)['fr'];
  convertPrice: (priceInTnd: number) => number;
  formatPrice: (priceInTnd: number) => string;
  formatAmount: (priceInTnd: number) => string;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem('auros_lang');
      if (saved === 'fr' || saved === 'en' || saved === 'ar') return saved;
    } catch {
      // Ignore storage failures
    }
    return 'fr';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = window.localStorage.getItem('auros_currency');
      if (saved === 'TND' || saved === 'USD') return saved;
    } catch {
      // Ignore storage failures
    }
    return 'TND';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem('auros_lang', lang);
    } catch {
      // Ignore storage failures
    }
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      window.localStorage.setItem('auros_currency', curr);
    } catch {
      // Ignore storage failures
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const convertPrice = (priceInTnd: number): number => {
    if (currency === 'USD') {
      return Math.max(1, Math.round(priceInTnd * TND_TO_USD_RATE));
    }
    return priceInTnd;
  };

  const formatAmount = (priceInTnd: number): string => {
    const val = convertPrice(priceInTnd);
    const locale = language === 'en' ? 'en-US' : 'fr-FR';
    return val.toLocaleString(locale);
  };

  const formatPrice = (priceInTnd: number): string => {
    const valStr = formatAmount(priceInTnd);
    return currency === 'USD' ? `$${valStr} USD` : `${valStr} TND`;
  };

  const t = TRANSLATIONS[language] as (typeof TRANSLATIONS)['fr'];

  return (
    <PreferencesContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        convertPrice,
        formatPrice,
        formatAmount,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return ctx;
}
